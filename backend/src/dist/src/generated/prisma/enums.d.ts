export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const WalletStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly CLOSED: "CLOSED";
};
export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];
export declare const LedgerType: {
    readonly DEBIT: "DEBIT";
    readonly CREDIT: "CREDIT";
};
export type LedgerType = (typeof LedgerType)[keyof typeof LedgerType];
export declare const TransactionType: {
    readonly TRANSFER: "TRANSFER";
    readonly DEPOSIT: "DEPOSIT";
    readonly WITHDRAWAL: "WITHDRAWAL";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
//# sourceMappingURL=enums.d.ts.map