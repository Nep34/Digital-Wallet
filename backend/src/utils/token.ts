import jwt from 'jsonwebtoken';
import {env} from '../config/env';
export const generateToken = (payload: string) => {
  return jwt.sign({ id: payload }, env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};