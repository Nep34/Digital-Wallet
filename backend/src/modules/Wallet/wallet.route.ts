import router from 'express';
import { GetWallet } from './wallet.controller';

const walletRouter = router.Router();

walletRouter.get('/', GetWallet);

export default walletRouter;
