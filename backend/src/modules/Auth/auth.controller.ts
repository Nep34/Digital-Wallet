import { loginService, registerService } from './auth.services';
import { Request, Response } from 'express';

const loginController = async (req: Request, res: Response) => {
    try {
        const email = req.body.email?.trim();
        const { password } = req.body;
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
        const name = req.body.name?.trim();
        const email = req.body.email?.trim();
        const { password } = req.body;
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
