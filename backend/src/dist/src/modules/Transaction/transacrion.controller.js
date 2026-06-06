"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionsController = exports.CreateTransactionController = void 0;
const transaction_services_1 = require("./transaction.services");
const CreateTransactionController = async (req, res) => {
    try {
        const { amount, type, senderWalletId, receiverWalletId, description } = req.body;
        const idempotencyKey = (req.headers['idempotency-key'] || req.headers['Idempotency-Key']);
        if (!amount || !type || !senderWalletId || !receiverWalletId) {
            return res.status(400).json({ message: 'Amount, type, senderWalletId and receiverWalletId are required' });
        }
        const payload = {
            amount,
            type,
            senderWalletId,
            receiverWalletId,
            description
        };
        if (idempotencyKey)
            payload.idempotencyKey = idempotencyKey;
        const transaction = await (0, transaction_services_1.CreateTransactionService)(payload);
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.CreateTransactionController = CreateTransactionController;
const GetTransactionsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await (0, transaction_services_1.GetTransactionsService)(userId);
        res
            .status(200)
            .json(transactions);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.GetTransactionsController = GetTransactionsController;
//# sourceMappingURL=transacrion.controller.js.map