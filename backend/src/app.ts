import express from "express";
import { env } from "./config/env";
import authRouter from './modules/Auth/auth.route';
import ledgerRouter from './modules/ledger/ledger.routes';
import transactionRouter from './modules/Transaction/transaction.route';
import walletRouter from './modules/Wallet/wallet.route';
import userRouter from './modules/User/user.route';

const app = express();
app.use(express.json());

// Module routes
app.use('/auth', authRouter);
app.use('/ledger', ledgerRouter);
app.use('/transactions', transactionRouter);
app.use('/wallet', walletRouter);
app.use('/users', userRouter);

// Healthcheck
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
