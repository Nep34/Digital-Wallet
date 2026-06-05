import {Request, Response} from 'express';
import { CreateTransactionService, GetTransactionsService } from './transaction.services';

const CreateTransactionController = async (req: Request, res: Response) => {
    try {
        const { amount, type, senderWalletId, receiverWalletId, description } = req.body;
        if(!amount || !type || !senderWalletId || !receiverWalletId) {
            return res.status(400).json({ message: 'Amount, type, senderWalletId and receiverWalletId are required' });
        }
        const transaction = await CreateTransactionService({
            amount,
            type,
            senderWalletId,
            receiverWalletId,
            description
        });
        res.status(201).json(transaction);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const GetTransactionsController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const transactions = await GetTransactionsService(userId);
        res
            .status(200)
            .json(transactions);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export { CreateTransactionController, GetTransactionsController };