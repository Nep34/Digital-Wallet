import { loginService, registerService } from './auth.services';
import { Request, Response } from 'express';
import {CreateWalletService} from '../Wallet/wallet.services';
import prisma from '../../config/prismaClient';

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const { user, token } = await loginService(email, password);
        res.status(200).json({ user, token });
    }
    catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};
const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const { user, token } = await registerService(name, email, password);
        res.status(201).json({ user, token });
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// const LogoutController = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];

export { loginController, registerController };