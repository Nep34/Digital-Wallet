import { Request, Response } from 'express';
declare const CreateTransactionController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const GetTransactionsController: (req: Request, res: Response) => Promise<void>;
export { CreateTransactionController, GetTransactionsController };
//# sourceMappingURL=transacrion.controller.d.ts.map