"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionsService = exports.CreateTransactionService = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
const redisClient_1 = require("../../config/redisClient");
const wallet_services_1 = require("../Wallet/wallet.services");
const ledger_services_1 = require("../ledger/ledger.services");
// Service to create a transaction and update wallet balances atomically
const CreateTransactionService = async ({ amount, type, senderWalletId, receiverWalletId, description, idempotencyKey }) => {
    try {
        // If idempotencyKey provided, check Redis for existing entry
        const redisKey = idempotencyKey ? `idem:${idempotencyKey}` : null;
        if (redisKey) {
            const existingRaw = await (0, redisClient_1.getRedisValue)(redisKey);
            if (existingRaw) {
                try {
                    const parsed = JSON.parse(existingRaw);
                    if (parsed.transactionId) {
                        const existingTx = await prismaClient_1.default.transaction.findUnique({ where: { id: parsed.transactionId } });
                        if (existingTx)
                            return existingTx;
                    }
                    // If it's in progress or completed without transaction, reject to avoid duplicate work
                    throw new Error('Request with this idempotency key is already in progress or completed');
                }
                catch (e) {
                    // malformed cache entry; continue to attempt creating a fresh one
                }
            }
            // Set a lock in Redis with 24hr TTL to mark in-progress
            const lockValue = JSON.stringify({ status: 'IN_PROGRESS', requestBody: { amount, type, senderWalletId, receiverWalletId, description } });
            await (0, redisClient_1.setRedisValue)(redisKey, lockValue, 24 * 60 * 60);
        }
        const transaction = await prismaClient_1.default.$transaction(async (tx) => {
            // Lock sender and receiver wallet rows to prevent concurrent modifications
            const senderRows = await tx.$queryRaw `SELECT * FROM "Wallet" WHERE id = ${senderWalletId} FOR UPDATE`;
            const senderWallet = senderRows && senderRows[0];
            const receiverRows = await tx.$queryRaw `SELECT * FROM "Wallet" WHERE id = ${receiverWalletId} FOR UPDATE`;
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
            const createdTransaction = await tx.transaction.create({
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
                const updatedSenderWallet = await (0, wallet_services_1.UpdateWalletBalanceService)(tx, senderWalletId, amount, 'debit');
                const updatedReceiverWallet = await (0, wallet_services_1.UpdateWalletBalanceService)(tx, receiverWalletId, amount, 'credit');
                await (0, ledger_services_1.CreateLedgerEntryService)(tx, createdTransaction.id, amount, 'DEBIT', senderWalletId, updatedSenderWallet.balance);
                await (0, ledger_services_1.CreateLedgerEntryService)(tx, createdTransaction.id, amount, 'CREDIT', receiverWalletId, updatedReceiverWallet.balance);
            }
            else if (type === 'DEPOSIT') {
                const updatedReceiverWallet = await (0, wallet_services_1.UpdateWalletBalanceService)(tx, receiverWalletId, amount, 'credit');
                await (0, ledger_services_1.CreateLedgerEntryService)(tx, createdTransaction.id, amount, 'CREDIT', receiverWalletId, updatedReceiverWallet.balance);
            }
            else if (type === 'WITHDRAWAL') {
                if (senderWallet.balance < amount) {
                    throw new Error('Insufficient balance');
                }
                const updatedSenderWallet = await (0, wallet_services_1.UpdateWalletBalanceService)(tx, senderWalletId, amount, 'debit');
                await (0, ledger_services_1.CreateLedgerEntryService)(tx, createdTransaction.id, amount, 'DEBIT', senderWalletId, updatedSenderWallet.balance);
            }
            return createdTransaction;
        });
        // If idempotency key was used, update Redis with the completed response and transactionId (keep 24hr TTL)
        if (redisKey) {
            const completedValue = JSON.stringify({ status: 'COMPLETED', transactionId: transaction.id, response: transaction });
            await (0, redisClient_1.setRedisValue)(redisKey, completedValue, 24 * 60 * 60);
        }
        return transaction;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to create transaction');
    }
};
exports.CreateTransactionService = CreateTransactionService;
const GetTransactionsService = async (userId) => {
    try {
        const wallet = await prismaClient_1.default.wallet.findUnique({
            where: {
                userId
            }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        const walletId = wallet.id;
        const transactions = await prismaClient_1.default.transaction.findMany({
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
    }
    catch (error) {
        throw new Error('Failed to get transactions');
    }
};
exports.GetTransactionsService = GetTransactionsService;
//# sourceMappingURL=transaction.services.js.map