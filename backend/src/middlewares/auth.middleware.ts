import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const payload = verifyToken(token as string);
    (req as any).user = payload as { id: string};
    return next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
