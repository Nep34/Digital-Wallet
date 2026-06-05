import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/token';
import { User as UserType } from './auth.types';
import  prisma  from '../../config/prismaClient';
import {CreateWalletService} from '../Wallet/wallet.services';
const loginService = async (email: string, password: string) => {
    // Implement login logic here
    try {
        const user: UserType | null = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        
        const token: string = generateToken(user.id.toString());
        return { user, token };
    } catch (error) {
        throw new Error('Login failed');
    }
};

const registerService = async (name: string, email: string, password: string) => {
    // Implement registration logic here
    try {
        const existingUser: UserType | null = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const result =await prisma.$transaction(async (tx) => {
            const newUser: UserType = await tx.user.create({ data: { name, email, password: hashedPassword } });
            await CreateWalletService(tx,newUser.id);
            const token: string = generateToken(newUser.id.toString());
            return { user: newUser, token };
        });
        return result;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

// const LogoutService = async (token: string) => {
//     // Implement logout logic here (e.g., invalidate token)
//     try {



export { loginService, registerService };