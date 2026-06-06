import express from "express";
import { env } from "./config/env";
import type {} from "./types/express";
import authRouter from './modules/Auth/auth.route';
import ledgerRouter from './modules/ledger/ledger.routes';
import transactionRouter from './modules/Transaction/transaction.route';
import walletRouter from './modules/Wallet/wallet.route';
import userRouter from './modules/User/user.route';
import authMiddleware from './middlewares/auth.middleware';

const app = express();
app.use(express.json());

// Module routes
app.use('/auth', authRouter);
// Protected routes
app.use('/ledger', authMiddleware, ledgerRouter);
app.use('/transactions', authMiddleware, transactionRouter);
app.use('/wallet', authMiddleware, walletRouter);
app.use('/users', authMiddleware, userRouter);

// Healthcheck
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
