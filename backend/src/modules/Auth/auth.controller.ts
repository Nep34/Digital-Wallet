import { loginService } from './auth.service';
import { env } from '../../config/env';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
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

export { login };