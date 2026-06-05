import router from 'express';
import { getLedgerEntriesController } from './ledger.controller';

const ledgerRouter = router.Router();

ledgerRouter.get('/', getLedgerEntriesController);

export default ledgerRouter;
