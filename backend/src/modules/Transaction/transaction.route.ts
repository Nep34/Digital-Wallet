import router from 'express';
import { CreateTransactionController, GetTransactionsController } from './transacrion.controller';

const transactionRouter = router.Router();

transactionRouter.post('/', CreateTransactionController);
transactionRouter.get('/', GetTransactionsController);

export default transactionRouter;
