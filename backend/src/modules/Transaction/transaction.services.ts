import prisma from '../../config/prismaClient';
import { getRedisValue, setRedisValue } from '../../config/redisClient';
import { Transaction, TransactionTypes } from './transaction.type';
import { UpdateWalletBalanceService } from '../Wallet/wallet.services';
import { CreateLedgerEntryService } from '../ledger/ledger.services';

type CreateTransactionPayload = {
    amount: number;
    type: TransactionTypes;
    senderWalletId: string;
    receiverWalletId: string;
    description?: string;
    idempotencyKey?: string;
};
// Service to create a transaction and update wallet balances atomically

const CreateTransactionService = async ({ amount, type, senderWalletId, receiverWalletId, description, idempotencyKey }: CreateTransactionPayload) => {
    try {
        // If idempotencyKey provided, check Redis for existing entry
        const redisKey = idempotencyKey ? `idem:${idempotencyKey}` : null;
        if (redisKey) {
            const existingRaw = await getRedisValue(redisKey);
            if (existingRaw) {
                try {
                    const parsed = JSON.parse(existingRaw);
                    if (parsed.transactionId) {
                        const existingTx = await prisma.transaction.findUnique({ where: { id: parsed.transactionId } });
                        if (existingTx) return existingTx;
                    }
                    // If it's in progress or completed without transaction, reject to avoid duplicate work
                    throw new Error('Request with this idempotency key is already in progress or completed');
                } catch (e) {
                    // malformed cache entry; continue to attempt creating a fresh one
                }
            }

            // Set a lock in Redis with 24hr TTL to mark in-progress
            const lockValue = JSON.stringify({ status: 'IN_PROGRESS', requestBody: { amount, type, senderWalletId, receiverWalletId, description } });
            await setRedisValue(redisKey, lockValue, 24 * 60 * 60);
        }
        const transaction = await prisma.$transaction(async (tx) => {
            // Lock sender and receiver wallet rows to prevent concurrent modifications
            const senderRows: any = await tx.$queryRaw`SELECT * FROM "Wallet" WHERE id = ${senderWalletId} FOR UPDATE`;
            const senderWallet = senderRows && senderRows[0];

            const receiverRows: any = await tx.$queryRaw`SELECT * FROM "Wallet" WHERE id = ${receiverWalletId} FOR UPDATE`;
            const receiverWallet = receiverRows && receiverRows[0];

            if (!senderWallet) {
                throw new Error('Sender wallet not found');
            }

            if (!receiverWallet) {
                throw new Error('Receiver wallet not found');
            }

            if (amount <= 0) {
                throw new Error('Amount must be greater than zero');
            }

            if (type === 'TRANSFER' && senderWallet.balance < amount) {
                throw new Error('Insufficient balance');
            }

            const createdTransaction: Transaction = await tx.transaction.create({
                data: {
                    amount,
                    refrenceId: `TXN-${senderWalletId + Date.now()}`,
                    type,
                    senderWalletId,
                    receiverWalletId,
                    description: description ?? null,
                    status: 'COMPLETED'
                }
            });

            if (type === 'TRANSFER') {
                const updatedSenderWallet = await UpdateWalletBalanceService(tx, senderWalletId, amount, 'debit');
                const updatedReceiverWallet = await UpdateWalletBalanceService(tx, receiverWalletId, amount, 'credit');

                await CreateLedgerEntryService(tx, createdTransaction.id, amount, 'DEBIT', senderWalletId, updatedSenderWallet.balance);
                await CreateLedgerEntryService(tx, createdTransaction.id, amount, 'CREDIT', receiverWalletId, updatedReceiverWallet.balance);
            } else if (type === 'DEPOSIT') {
                const updatedReceiverWallet = await UpdateWalletBalanceService(tx, receiverWalletId, amount, 'credit');

                await CreateLedgerEntryService(tx, createdTransaction.id, amount, 'CREDIT', receiverWalletId, updatedReceiverWallet.balance);
            } else if (type === 'WITHDRAWAL') {
                if (senderWallet.balance < amount) {
                    throw new Error('Insufficient balance');
                }

                const updatedSenderWallet = await UpdateWalletBalanceService(tx, senderWalletId, amount, 'debit');

                await CreateLedgerEntryService(tx, createdTransaction.id, amount, 'DEBIT', senderWalletId, updatedSenderWallet.balance);
            }

            return createdTransaction;
        });

        // If idempotency key was used, update Redis with the completed response and transactionId (keep 24hr TTL)
        if (redisKey) {
            const completedValue = JSON.stringify({ status: 'COMPLETED', transactionId: transaction.id, response: transaction });
            await setRedisValue(redisKey, completedValue, 24 * 60 * 60);
        }

        return transaction;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create transaction');
    }
}

const GetTransactionsService = async (userId: string) => {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {    
                userId
            }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        const walletId = wallet.id;
        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { senderWalletId: walletId },
                    { receiverWalletId: walletId }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to get transactions');
    }   
}

export { CreateTransactionService, GetTransactionsService };
