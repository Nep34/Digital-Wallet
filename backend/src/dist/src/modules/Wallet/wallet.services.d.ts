import { Prisma } from '../../generated/prisma/client';
declare const CreateWalletService: (tx: Prisma.TransactionClient, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    balance: number;
    currency: string;
    status: import("../../generated/prisma/enums").WalletStatus;
    userId: string;
}>;
declare const GetWalletService: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    balance: number;
    currency: string;
    status: import("../../generated/prisma/enums").WalletStatus;
    userId: string;
}>;
declare const UpdateWalletBalanceService: (tx: Prisma.TransactionClient, walletId: string, amount: number, type: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    balance: number;
    currency: string;
    status: import("../../generated/prisma/enums").WalletStatus;
    userId: string;
}>;
export { CreateWalletService, GetWalletService, UpdateWalletBalanceService };
//# sourceMappingURL=wallet.services.d.ts.map