import prisma from '../../config/prismaClient';
import { Prisma } from '../../generated/prisma/client';

const CreateWalletService = async (tx: Prisma.TransactionClient, userId: string) => {
    try {
        const wallet = await tx.wallet.create({
            data: {
                userId
            }
        });
        return wallet;
    }
 catch (error) {
        throw new Error('Failed to create wallet');
    }
}

const GetWalletService = async (userId: string) => {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {
                userId
            }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    } catch (error) {
        throw new Error('Failed to get wallet');
    }   
}

const UpdateWalletBalanceService = async (tx: Prisma.TransactionClient, walletId: string, amount: number, type: string) => {
    try {
        // Lock the wallet row to avoid concurrent balance updates
        const rows: any = await tx.$queryRaw`SELECT * FROM "Wallet" WHERE id = ${walletId} FOR UPDATE`;
        const wallet = rows && rows[0];
        if (!wallet) {
            throw new Error('Wallet not found');
        }

        if (type === 'debit' && wallet.balance < amount) {
            throw new Error('Insufficient balance');
        }

        const action = type === 'credit' ? 'increment' : 'decrement';
        const updated = await tx.wallet.update({
            where: { id: walletId },
            data: {
                balance: {
                    [action]: amount
                }
            }
        });
        return updated;
    } catch (error) {
        throw new Error('Failed to update wallet balance');
    }
}

export { CreateWalletService, GetWalletService, UpdateWalletBalanceService };
