import { TransactionTypes } from './transaction.type';
type CreateTransactionPayload = {
    amount: number;
    type: TransactionTypes;
    senderWalletId: string;
    receiverWalletId: string;
    description?: string;
    idempotencyKey?: string;
};
declare const CreateTransactionService: ({ amount, type, senderWalletId, receiverWalletId, description, idempotencyKey }: CreateTransactionPayload) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums").TransactionStatus;
    type: import("../../generated/prisma/enums").TransactionType;
    amount: number;
    refrenceId: string;
    senderWalletId: string;
    receiverWalletId: string;
    description: string | null;
}>;
declare const GetTransactionsService: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums").TransactionStatus;
    type: import("../../generated/prisma/enums").TransactionType;
    amount: number;
    refrenceId: string;
    senderWalletId: string;
    receiverWalletId: string;
    description: string | null;
}[]>;
export { CreateTransactionService, GetTransactionsService };
//# sourceMappingURL=transaction.services.d.ts.map