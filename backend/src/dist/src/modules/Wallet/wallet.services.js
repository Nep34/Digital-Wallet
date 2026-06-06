"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWalletBalanceService = exports.GetWalletService = exports.CreateWalletService = void 0;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
const CreateWalletService = async (tx, userId) => {
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
};
exports.CreateWalletService = CreateWalletService;
const GetWalletService = async (userId) => {
    try {
        const wallet = await prismaClient_1.default.wallet.findUnique({
            where: {
                userId
            }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    }
    catch (error) {
        throw new Error('Failed to get wallet');
    }
};
exports.GetWalletService = GetWalletService;
const UpdateWalletBalanceService = async (tx, walletId, amount, type) => {
    try {
        // Lock the wallet row to avoid concurrent balance updates
        const rows = await tx.$queryRaw `SELECT * FROM "Wallet" WHERE id = ${walletId} FOR UPDATE`;
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
    }
    catch (error) {
        throw new Error('Failed to update wallet balance');
    }
};
exports.UpdateWalletBalanceService = UpdateWalletBalanceService;
//# sourceMappingURL=wallet.services.js.map