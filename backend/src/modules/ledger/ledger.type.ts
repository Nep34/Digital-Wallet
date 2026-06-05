import {ledgerEntry as ledgerType} from '../../generated/prisma/client';
import {LedgerType as LedgerEntryType} from '../../generated/prisma/enums';
export type Ledger = ledgerType;
export type LedgerType = LedgerEntryType;