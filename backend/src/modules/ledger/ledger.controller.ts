import {Request, Response} from 'express';
import { GetLedgerEntriesService } from './ledger.services';
import { GetWalletService } from '../Wallet/wallet.services';

const getLedgerEntriesController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const wallet = await GetWalletService(userId);
        const walletId = wallet.id;
        const ledgerEntries = await GetLedgerEntriesService(walletId);
        res.status(200).json(ledgerEntries);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export { getLedgerEntriesController };