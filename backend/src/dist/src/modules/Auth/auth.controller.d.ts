import { Request, Response } from 'express';
declare const loginController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const registerController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { loginController, registerController };
//# sourceMappingURL=auth.controller.d.ts.map