import prisma from '../../config/prismaClient';
import { Ledger, LedgerType } from './ledger.type';

const CreateLedgerEntryService = async (transactionId: string, amount: number, type: LedgerType, walletId: string, balanceAfter: number): Promise<Ledger> => {
    try {

        const ledgerEntry = await prisma.ledgerEntry.create({
            data: {
                transactionId,
                amount,
                balanceAfter,
                type,
                walletId
                
            }
        });
        return ledgerEntry;
    } catch (error) {
        throw new Error('Failed to create ledger entry');
    }
}

const GetLedgerEntriesService = async (walletId: string): Promise<Ledger[]> => {
    try {
        const ledgerEntries = await prisma.ledgerEntry.findMany({
            where: {
                walletId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return ledgerEntries;
    } catch (error) {
        throw new Error('Failed to get ledger entries');
    }
}

export { CreateLedgerEntryService, GetLedgerEntriesService };