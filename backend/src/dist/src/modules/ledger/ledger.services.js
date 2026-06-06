"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLedgerEntriesService = exports.CreateLedgerEntryService = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
const CreateLedgerEntryService = async (tx, transactionId, amount, type, walletId, balanceAfter) => {
    try {
        const ledgerEntry = await tx.ledgerEntry.create({
            data: {
                transactionId,
                amount,
                balanceAfter,
                type,
                walletId
            }
        });
        return ledgerEntry;
    }
    catch (error) {
        throw new Error('Failed to create ledger entry');
    }
};
exports.CreateLedgerEntryService = CreateLedgerEntryService;
const GetLedgerEntriesService = async (walletId) => {
    try {
        const ledgerEntries = await prismaClient_1.default.ledgerEntry.findMany({
            where: {
                walletId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return ledgerEntries;
    }
    catch (error) {
        throw new Error('Failed to get ledger entries');
    }
};
exports.GetLedgerEntriesService = GetLedgerEntriesService;
//# sourceMappingURL=ledger.services.js.map