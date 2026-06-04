import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/token';
import { User as UserType } from './auth.types';
import  prisma  from '../../config/prismaClient';
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
        const newUser: UserType = await prisma.user.create({ data: { name, email, password: hashedPassword } });
        const token: string = generateToken(newUser.id.toString());
        return { user: newUser, token };
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export { loginService, registerService };