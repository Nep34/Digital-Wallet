import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../User/user.model';
import {env} from '../../config/env';
const loginService = async (email: string, password: string) => {
    // Implement login logic here
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        
        const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    } catch (error) {
        throw new Error('Login failed');
    }
};