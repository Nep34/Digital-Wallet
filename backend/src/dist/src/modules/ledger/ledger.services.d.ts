import { Prisma } from '../../generated/prisma/client';
import { Ledger, LedgerType } from './ledger.type';
declare const CreateLedgerEntryService: (tx: Prisma.TransactionClient, transactionId: string, amount: number, type: LedgerType, walletId: string, balanceAfter: number) => Promise<Ledger>;
declare const GetLedgerEntriesService: (walletId: string) => Promise<Ledger[]>;
export { CreateLedgerEntryService, GetLedgerEntriesService };
//# sourceMappingURL=ledger.services.d.ts.map