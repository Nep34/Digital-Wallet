import { GetWalletService } from './wallet.services';
import { Request, Response } from 'express';

const GetWallet = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const wallet = await GetWalletService(userId);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { GetWallet};