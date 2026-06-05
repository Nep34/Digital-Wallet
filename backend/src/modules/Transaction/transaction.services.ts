import prisma  from '../../config/prismaClient';
import { Transaction, TransactionTypes } from './transaction.type';

const CreateTransactionService = async (amount: number, type: TransactionTypes, senderWalletId: string, receiverWalletId: string, description: string) => {
    try {
        const transaction: Transaction = await prisma.transaction.create({
            data: {
                amount,
                refrenceId: `TXN-${Date.now()}`,
                type,
                senderWalletId,
                receiverWalletId,
                description
            }
        });
        return transaction;
    } catch (error) {
        throw new Error('Failed to create transaction');
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
