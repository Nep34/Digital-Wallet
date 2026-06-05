import {Request, Response} from 'express';
import { CreateLedgerEntryService, GetLedgerEntriesService } from './ledger.services';

const getLedgerEntriesController = async (req: Request, res: Response) => {
    try {
        const walletId = req.user.walletId;
        const ledgerEntries = await GetLedgerEntriesService(walletId);
        res.status(200).json(ledgerEntries);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export { getLedgerEntriesController };