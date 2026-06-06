import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ledgerEntry
 *
 */
export type ledgerEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$ledgerEntryPayload>;
export type AggregateLedgerEntry = {
    _count: LedgerEntryCountAggregateOutputType | null;
    _avg: LedgerEntryAvgAggregateOutputType | null;
    _sum: LedgerEntrySumAggregateOutputType | null;
    _min: LedgerEntryMinAggregateOutputType | null;
    _max: LedgerEntryMaxAggregateOutputType | null;
};
export type LedgerEntryAvgAggregateOutputType = {
    amount: number | null;
    balanceAfter: number | null;
};
export type LedgerEntrySumAggregateOutputType = {
    amount: number | null;
    balanceAfter: number | null;
};
export type LedgerEntryMinAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    transactionId: string | null;
    type: $Enums.LedgerType | null;
    amount: number | null;
    balanceAfter: number | null;
    createdAt: Date | null;
};
export type LedgerEntryMaxAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    transactionId: string | null;
    type: $Enums.LedgerType | null;
    amount: number | null;
    balanceAfter: number | null;
    createdAt: Date | null;
};
export type LedgerEntryCountAggregateOutputType = {
    id: number;
    walletId: number;
    transactionId: number;
    type: number;
    amount: number;
    balanceAfter: number;
    createdAt: number;
    _all: number;
};
export type LedgerEntryAvgAggregateInputType = {
    amount?: true;
    balanceAfter?: true;
};
export type LedgerEntrySumAggregateInputType = {
    amount?: true;
    balanceAfter?: true;
};
export type LedgerEntryMinAggregateInputType = {
    id?: true;
    walletId?: true;
    transactionId?: true;
    type?: true;
    amount?: true;
    balanceAfter?: true;
    createdAt?: true;
};
export type LedgerEntryMaxAggregateInputType = {
    id?: true;
    walletId?: true;
    transactionId?: true;
    type?: true;
    amount?: true;
    balanceAfter?: true;
    createdAt?: true;
};
export type LedgerEntryCountAggregateInputType = {
    id?: true;
    walletId?: true;
    transactionId?: true;
    type?: true;
    amount?: true;
    balanceAfter?: true;
    createdAt?: true;
    _all?: true;
};
export type LedgerEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ledgerEntry to aggregate.
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ledgerEntries to fetch.
     */
    orderBy?: Prisma.ledgerEntryOrderByWithRelationInput | Prisma.ledgerEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ledgerEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ledgerEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ledgerEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ledgerEntries
    **/
    _count?: true | LedgerEntryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LedgerEntryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LedgerEntrySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LedgerEntryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LedgerEntryMaxAggregateInputType;
};
export type GetLedgerEntryAggregateType<T extends LedgerEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateLedgerEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLedgerEntry[P]> : Prisma.GetScalarType<T[P], AggregateLedgerEntry[P]>;
};
export type ledgerEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ledgerEntryWhereInput;
    orderBy?: Prisma.ledgerEntryOrderByWithAggregationInput | Prisma.ledgerEntryOrderByWithAggregationInput[];
    by: Prisma.LedgerEntryScalarFieldEnum[] | Prisma.LedgerEntryScalarFieldEnum;
    having?: Prisma.ledgerEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LedgerEntryCountAggregateInputType | true;
    _avg?: LedgerEntryAvgAggregateInputType;
    _sum?: LedgerEntrySumAggregateInputType;
    _min?: LedgerEntryMinAggregateInputType;
    _max?: LedgerEntryMaxAggregateInputType;
};
export type LedgerEntryGroupByOutputType = {
    id: string;
    walletId: string;
    transactionId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt: Date;
    _count: LedgerEntryCountAggregateOutputType | null;
    _avg: LedgerEntryAvgAggregateOutputType | null;
    _sum: LedgerEntrySumAggregateOutputType | null;
    _min: LedgerEntryMinAggregateOutputType | null;
    _max: LedgerEntryMaxAggregateOutputType | null;
};
export type GetLedgerEntryGroupByPayload<T extends ledgerEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LedgerEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LedgerEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LedgerEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>;
}>>;
export type ledgerEntryWhereInput = {
    AND?: Prisma.ledgerEntryWhereInput | Prisma.ledgerEntryWhereInput[];
    OR?: Prisma.ledgerEntryWhereInput[];
    NOT?: Prisma.ledgerEntryWhereInput | Prisma.ledgerEntryWhereInput[];
    id?: Prisma.StringFilter<"ledgerEntry"> | string;
    walletId?: Prisma.StringFilter<"ledgerEntry"> | string;
    transactionId?: Prisma.StringFilter<"ledgerEntry"> | string;
    type?: Prisma.EnumLedgerTypeFilter<"ledgerEntry"> | $Enums.LedgerType;
    amount?: Prisma.FloatFilter<"ledgerEntry"> | number;
    balanceAfter?: Prisma.FloatFilter<"ledgerEntry"> | number;
    createdAt?: Prisma.DateTimeFilter<"ledgerEntry"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
    transaction?: Prisma.XOR<Prisma.TransactionScalarRelationFilter, Prisma.TransactionWhereInput>;
};
export type ledgerEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    wallet?: Prisma.WalletOrderByWithRelationInput;
    transaction?: Prisma.TransactionOrderByWithRelationInput;
};
export type ledgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ledgerEntryWhereInput | Prisma.ledgerEntryWhereInput[];
    OR?: Prisma.ledgerEntryWhereInput[];
    NOT?: Prisma.ledgerEntryWhereInput | Prisma.ledgerEntryWhereInput[];
    walletId?: Prisma.StringFilter<"ledgerEntry"> | string;
    transactionId?: Prisma.StringFilter<"ledgerEntry"> | string;
    type?: Prisma.EnumLedgerTypeFilter<"ledgerEntry"> | $Enums.LedgerType;
    amount?: Prisma.FloatFilter<"ledgerEntry"> | number;
    balanceAfter?: Prisma.FloatFilter<"ledgerEntry"> | number;
    createdAt?: Prisma.DateTimeFilter<"ledgerEntry"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
    transaction?: Prisma.XOR<Prisma.TransactionScalarRelationFilter, Prisma.TransactionWhereInput>;
}, "id">;
export type ledgerEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ledgerEntryCountOrderByAggregateInput;
    _avg?: Prisma.ledgerEntryAvgOrderByAggregateInput;
    _max?: Prisma.ledgerEntryMaxOrderByAggregateInput;
    _min?: Prisma.ledgerEntryMinOrderByAggregateInput;
    _sum?: Prisma.ledgerEntrySumOrderByAggregateInput;
};
export type ledgerEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ledgerEntryScalarWhereWithAggregatesInput | Prisma.ledgerEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ledgerEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ledgerEntryScalarWhereWithAggregatesInput | Prisma.ledgerEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ledgerEntry"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"ledgerEntry"> | string;
    transactionId?: Prisma.StringWithAggregatesFilter<"ledgerEntry"> | string;
    type?: Prisma.EnumLedgerTypeWithAggregatesFilter<"ledgerEntry"> | $Enums.LedgerType;
    amount?: Prisma.FloatWithAggregatesFilter<"ledgerEntry"> | number;
    balanceAfter?: Prisma.FloatWithAggregatesFilter<"ledgerEntry"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ledgerEntry"> | Date | string;
};
export type ledgerEntryCreateInput = {
    id?: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutLedgerEntriesInput;
    transaction: Prisma.TransactionCreateNestedOneWithoutLedgerEntriesInput;
};
export type ledgerEntryUncheckedCreateInput = {
    id?: string;
    walletId: string;
    transactionId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutLedgerEntriesNestedInput;
    transaction?: Prisma.TransactionUpdateOneRequiredWithoutLedgerEntriesNestedInput;
};
export type ledgerEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntryCreateManyInput = {
    id?: string;
    walletId: string;
    transactionId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LedgerEntryListRelationFilter = {
    every?: Prisma.ledgerEntryWhereInput;
    some?: Prisma.ledgerEntryWhereInput;
    none?: Prisma.ledgerEntryWhereInput;
};
export type ledgerEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ledgerEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ledgerEntryAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
};
export type ledgerEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ledgerEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ledgerEntrySumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    balanceAfter?: Prisma.SortOrder;
};
export type ledgerEntryCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput> | Prisma.ledgerEntryCreateWithoutWalletInput[] | Prisma.ledgerEntryUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutWalletInput | Prisma.ledgerEntryCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.ledgerEntryCreateManyWalletInputEnvelope;
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
};
export type ledgerEntryUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput> | Prisma.ledgerEntryCreateWithoutWalletInput[] | Prisma.ledgerEntryUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutWalletInput | Prisma.ledgerEntryCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.ledgerEntryCreateManyWalletInputEnvelope;
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
};
export type ledgerEntryUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput> | Prisma.ledgerEntryCreateWithoutWalletInput[] | Prisma.ledgerEntryUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutWalletInput | Prisma.ledgerEntryCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.ledgerEntryUpsertWithWhereUniqueWithoutWalletInput | Prisma.ledgerEntryUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.ledgerEntryCreateManyWalletInputEnvelope;
    set?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    disconnect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    delete?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    update?: Prisma.ledgerEntryUpdateWithWhereUniqueWithoutWalletInput | Prisma.ledgerEntryUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.ledgerEntryUpdateManyWithWhereWithoutWalletInput | Prisma.ledgerEntryUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
};
export type ledgerEntryUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput> | Prisma.ledgerEntryCreateWithoutWalletInput[] | Prisma.ledgerEntryUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutWalletInput | Prisma.ledgerEntryCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.ledgerEntryUpsertWithWhereUniqueWithoutWalletInput | Prisma.ledgerEntryUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.ledgerEntryCreateManyWalletInputEnvelope;
    set?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    disconnect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    delete?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    update?: Prisma.ledgerEntryUpdateWithWhereUniqueWithoutWalletInput | Prisma.ledgerEntryUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.ledgerEntryUpdateManyWithWhereWithoutWalletInput | Prisma.ledgerEntryUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
};
export type ledgerEntryCreateNestedManyWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.ledgerEntryCreateWithoutTransactionInput[] | Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput | Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput[];
    createMany?: Prisma.ledgerEntryCreateManyTransactionInputEnvelope;
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
};
export type ledgerEntryUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.ledgerEntryCreateWithoutTransactionInput[] | Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput | Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput[];
    createMany?: Prisma.ledgerEntryCreateManyTransactionInputEnvelope;
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
};
export type ledgerEntryUpdateManyWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.ledgerEntryCreateWithoutTransactionInput[] | Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput | Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput[];
    upsert?: Prisma.ledgerEntryUpsertWithWhereUniqueWithoutTransactionInput | Prisma.ledgerEntryUpsertWithWhereUniqueWithoutTransactionInput[];
    createMany?: Prisma.ledgerEntryCreateManyTransactionInputEnvelope;
    set?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    disconnect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    delete?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    update?: Prisma.ledgerEntryUpdateWithWhereUniqueWithoutTransactionInput | Prisma.ledgerEntryUpdateWithWhereUniqueWithoutTransactionInput[];
    updateMany?: Prisma.ledgerEntryUpdateManyWithWhereWithoutTransactionInput | Prisma.ledgerEntryUpdateManyWithWhereWithoutTransactionInput[];
    deleteMany?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
};
export type ledgerEntryUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.ledgerEntryCreateWithoutTransactionInput[] | Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput | Prisma.ledgerEntryCreateOrConnectWithoutTransactionInput[];
    upsert?: Prisma.ledgerEntryUpsertWithWhereUniqueWithoutTransactionInput | Prisma.ledgerEntryUpsertWithWhereUniqueWithoutTransactionInput[];
    createMany?: Prisma.ledgerEntryCreateManyTransactionInputEnvelope;
    set?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    disconnect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    delete?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    connect?: Prisma.ledgerEntryWhereUniqueInput | Prisma.ledgerEntryWhereUniqueInput[];
    update?: Prisma.ledgerEntryUpdateWithWhereUniqueWithoutTransactionInput | Prisma.ledgerEntryUpdateWithWhereUniqueWithoutTransactionInput[];
    updateMany?: Prisma.ledgerEntryUpdateManyWithWhereWithoutTransactionInput | Prisma.ledgerEntryUpdateManyWithWhereWithoutTransactionInput[];
    deleteMany?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
};
export type EnumLedgerTypeFieldUpdateOperationsInput = {
    set?: $Enums.LedgerType;
};
export type ledgerEntryCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
    transaction: Prisma.TransactionCreateNestedOneWithoutLedgerEntriesInput;
};
export type ledgerEntryUncheckedCreateWithoutWalletInput = {
    id?: string;
    transactionId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryCreateOrConnectWithoutWalletInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput>;
};
export type ledgerEntryCreateManyWalletInputEnvelope = {
    data: Prisma.ledgerEntryCreateManyWalletInput | Prisma.ledgerEntryCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type ledgerEntryUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ledgerEntryUpdateWithoutWalletInput, Prisma.ledgerEntryUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.ledgerEntryCreateWithoutWalletInput, Prisma.ledgerEntryUncheckedCreateWithoutWalletInput>;
};
export type ledgerEntryUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ledgerEntryUpdateWithoutWalletInput, Prisma.ledgerEntryUncheckedUpdateWithoutWalletInput>;
};
export type ledgerEntryUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.ledgerEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.ledgerEntryUpdateManyMutationInput, Prisma.ledgerEntryUncheckedUpdateManyWithoutWalletInput>;
};
export type ledgerEntryScalarWhereInput = {
    AND?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
    OR?: Prisma.ledgerEntryScalarWhereInput[];
    NOT?: Prisma.ledgerEntryScalarWhereInput | Prisma.ledgerEntryScalarWhereInput[];
    id?: Prisma.StringFilter<"ledgerEntry"> | string;
    walletId?: Prisma.StringFilter<"ledgerEntry"> | string;
    transactionId?: Prisma.StringFilter<"ledgerEntry"> | string;
    type?: Prisma.EnumLedgerTypeFilter<"ledgerEntry"> | $Enums.LedgerType;
    amount?: Prisma.FloatFilter<"ledgerEntry"> | number;
    balanceAfter?: Prisma.FloatFilter<"ledgerEntry"> | number;
    createdAt?: Prisma.DateTimeFilter<"ledgerEntry"> | Date | string;
};
export type ledgerEntryCreateWithoutTransactionInput = {
    id?: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutLedgerEntriesInput;
};
export type ledgerEntryUncheckedCreateWithoutTransactionInput = {
    id?: string;
    walletId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryCreateOrConnectWithoutTransactionInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput>;
};
export type ledgerEntryCreateManyTransactionInputEnvelope = {
    data: Prisma.ledgerEntryCreateManyTransactionInput | Prisma.ledgerEntryCreateManyTransactionInput[];
    skipDuplicates?: boolean;
};
export type ledgerEntryUpsertWithWhereUniqueWithoutTransactionInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ledgerEntryUpdateWithoutTransactionInput, Prisma.ledgerEntryUncheckedUpdateWithoutTransactionInput>;
    create: Prisma.XOR<Prisma.ledgerEntryCreateWithoutTransactionInput, Prisma.ledgerEntryUncheckedCreateWithoutTransactionInput>;
};
export type ledgerEntryUpdateWithWhereUniqueWithoutTransactionInput = {
    where: Prisma.ledgerEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ledgerEntryUpdateWithoutTransactionInput, Prisma.ledgerEntryUncheckedUpdateWithoutTransactionInput>;
};
export type ledgerEntryUpdateManyWithWhereWithoutTransactionInput = {
    where: Prisma.ledgerEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.ledgerEntryUpdateManyMutationInput, Prisma.ledgerEntryUncheckedUpdateManyWithoutTransactionInput>;
};
export type ledgerEntryCreateManyWalletInput = {
    id?: string;
    transactionId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transaction?: Prisma.TransactionUpdateOneRequiredWithoutLedgerEntriesNestedInput;
};
export type ledgerEntryUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntryUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntryCreateManyTransactionInput = {
    id?: string;
    walletId: string;
    type: $Enums.LedgerType;
    amount: number;
    balanceAfter: number;
    createdAt?: Date | string;
};
export type ledgerEntryUpdateWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutLedgerEntriesNestedInput;
};
export type ledgerEntryUncheckedUpdateWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntryUncheckedUpdateManyWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    balanceAfter?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ledgerEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    transactionId?: boolean;
    type?: boolean;
    amount?: boolean;
    balanceAfter?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerEntry"]>;
export type ledgerEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    transactionId?: boolean;
    type?: boolean;
    amount?: boolean;
    balanceAfter?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerEntry"]>;
export type ledgerEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    transactionId?: boolean;
    type?: boolean;
    amount?: boolean;
    balanceAfter?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerEntry"]>;
export type ledgerEntrySelectScalar = {
    id?: boolean;
    walletId?: boolean;
    transactionId?: boolean;
    type?: boolean;
    amount?: boolean;
    balanceAfter?: boolean;
    createdAt?: boolean;
};
export type ledgerEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "walletId" | "transactionId" | "type" | "amount" | "balanceAfter" | "createdAt", ExtArgs["result"]["ledgerEntry"]>;
export type ledgerEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
};
export type ledgerEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
};
export type ledgerEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    transaction?: boolean | Prisma.TransactionDefaultArgs<ExtArgs>;
};
export type $ledgerEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ledgerEntry";
    objects: {
        wallet: Prisma.$WalletPayload<ExtArgs>;
        transaction: Prisma.$TransactionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        walletId: string;
        transactionId: string;
        type: $Enums.LedgerType;
        amount: number;
        balanceAfter: number;
        createdAt: Date;
    }, ExtArgs["result"]["ledgerEntry"]>;
    composites: {};
};
export type ledgerEntryGetPayload<S extends boolean | null | undefined | ledgerEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload, S>;
export type ledgerEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ledgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LedgerEntryCountAggregateInputType | true;
};
export interface ledgerEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ledgerEntry'];
        meta: {
            name: 'ledgerEntry';
        };
    };
    /**
     * Find zero or one LedgerEntry that matches the filter.
     * @param {ledgerEntryFindUniqueArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ledgerEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, ledgerEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one LedgerEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ledgerEntryFindUniqueOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ledgerEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ledgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryFindFirstArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ledgerEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, ledgerEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryFindFirstOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ledgerEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ledgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more LedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany()
     *
     * // Get first 10 LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ledgerEntryFindManyArgs>(args?: Prisma.SelectSubset<T, ledgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a LedgerEntry.
     * @param {ledgerEntryCreateArgs} args - Arguments to create a LedgerEntry.
     * @example
     * // Create one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.create({
     *   data: {
     *     // ... data to create a LedgerEntry
     *   }
     * })
     *
     */
    create<T extends ledgerEntryCreateArgs>(args: Prisma.SelectSubset<T, ledgerEntryCreateArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many LedgerEntries.
     * @param {ledgerEntryCreateManyArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ledgerEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, ledgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many LedgerEntries and returns the data saved in the database.
     * @param {ledgerEntryCreateManyAndReturnArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ledgerEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ledgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a LedgerEntry.
     * @param {ledgerEntryDeleteArgs} args - Arguments to delete one LedgerEntry.
     * @example
     * // Delete one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.delete({
     *   where: {
     *     // ... filter to delete one LedgerEntry
     *   }
     * })
     *
     */
    delete<T extends ledgerEntryDeleteArgs>(args: Prisma.SelectSubset<T, ledgerEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one LedgerEntry.
     * @param {ledgerEntryUpdateArgs} args - Arguments to update one LedgerEntry.
     * @example
     * // Update one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ledgerEntryUpdateArgs>(args: Prisma.SelectSubset<T, ledgerEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more LedgerEntries.
     * @param {ledgerEntryDeleteManyArgs} args - Arguments to filter LedgerEntries to delete.
     * @example
     * // Delete a few LedgerEntries
     * const { count } = await prisma.ledgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ledgerEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ledgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ledgerEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, ledgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LedgerEntries and returns the data updated in the database.
     * @param {ledgerEntryUpdateManyAndReturnArgs} args - Arguments to update many LedgerEntries.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ledgerEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ledgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one LedgerEntry.
     * @param {ledgerEntryUpsertArgs} args - Arguments to update or create a LedgerEntry.
     * @example
     * // Update or create a LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.upsert({
     *   create: {
     *     // ... data to create a LedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerEntry we want to update
     *   }
     * })
     */
    upsert<T extends ledgerEntryUpsertArgs>(args: Prisma.SelectSubset<T, ledgerEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__ledgerEntryClient<runtime.Types.Result.GetResult<Prisma.$ledgerEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryCountArgs} args - Arguments to filter LedgerEntries to count.
     * @example
     * // Count the number of LedgerEntries
     * const count = await prisma.ledgerEntry.count({
     *   where: {
     *     // ... the filter for the LedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends ledgerEntryCountArgs>(args?: Prisma.Subset<T, ledgerEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LedgerEntryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerEntryAggregateArgs>(args: Prisma.Subset<T, LedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetLedgerEntryAggregateType<T>>;
    /**
     * Group by LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ledgerEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ledgerEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ledgerEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: ledgerEntryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ledgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ledgerEntry model
     */
    readonly fields: ledgerEntryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ledgerEntry.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ledgerEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transaction<T extends Prisma.TransactionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TransactionDefaultArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ledgerEntry model
 */
export interface ledgerEntryFieldRefs {
    readonly id: Prisma.FieldRef<"ledgerEntry", 'String'>;
    readonly walletId: Prisma.FieldRef<"ledgerEntry", 'String'>;
    readonly transactionId: Prisma.FieldRef<"ledgerEntry", 'String'>;
    readonly type: Prisma.FieldRef<"ledgerEntry", 'LedgerType'>;
    readonly amount: Prisma.FieldRef<"ledgerEntry", 'Float'>;
    readonly balanceAfter: Prisma.FieldRef<"ledgerEntry", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"ledgerEntry", 'DateTime'>;
}
/**
 * ledgerEntry findUnique
 */
export type ledgerEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ledgerEntry to fetch.
     */
    where: Prisma.ledgerEntryWhereUniqueInput;
};
/**
 * ledgerEntry findUniqueOrThrow
 */
export type ledgerEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ledgerEntry to fetch.
     */
    where: Prisma.ledgerEntryWhereUniqueInput;
};
/**
 * ledgerEntry findFirst
 */
export type ledgerEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ledgerEntry to fetch.
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ledgerEntries to fetch.
     */
    orderBy?: Prisma.ledgerEntryOrderByWithRelationInput | Prisma.ledgerEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ledgerEntries.
     */
    cursor?: Prisma.ledgerEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ledgerEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ledgerEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ledgerEntries.
     */
    distinct?: Prisma.LedgerEntryScalarFieldEnum | Prisma.LedgerEntryScalarFieldEnum[];
};
/**
 * ledgerEntry findFirstOrThrow
 */
export type ledgerEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ledgerEntry to fetch.
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ledgerEntries to fetch.
     */
    orderBy?: Prisma.ledgerEntryOrderByWithRelationInput | Prisma.ledgerEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ledgerEntries.
     */
    cursor?: Prisma.ledgerEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ledgerEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ledgerEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ledgerEntries.
     */
    distinct?: Prisma.LedgerEntryScalarFieldEnum | Prisma.LedgerEntryScalarFieldEnum[];
};
/**
 * ledgerEntry findMany
 */
export type ledgerEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ledgerEntries to fetch.
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ledgerEntries to fetch.
     */
    orderBy?: Prisma.ledgerEntryOrderByWithRelationInput | Prisma.ledgerEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ledgerEntries.
     */
    cursor?: Prisma.ledgerEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ledgerEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ledgerEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ledgerEntries.
     */
    distinct?: Prisma.LedgerEntryScalarFieldEnum | Prisma.LedgerEntryScalarFieldEnum[];
};
/**
 * ledgerEntry create
 */
export type ledgerEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * The data needed to create a ledgerEntry.
     */
    data: Prisma.XOR<Prisma.ledgerEntryCreateInput, Prisma.ledgerEntryUncheckedCreateInput>;
};
/**
 * ledgerEntry createMany
 */
export type ledgerEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ledgerEntries.
     */
    data: Prisma.ledgerEntryCreateManyInput | Prisma.ledgerEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ledgerEntry createManyAndReturn
 */
export type ledgerEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * The data used to create many ledgerEntries.
     */
    data: Prisma.ledgerEntryCreateManyInput | Prisma.ledgerEntryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ledgerEntry update
 */
export type ledgerEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * The data needed to update a ledgerEntry.
     */
    data: Prisma.XOR<Prisma.ledgerEntryUpdateInput, Prisma.ledgerEntryUncheckedUpdateInput>;
    /**
     * Choose, which ledgerEntry to update.
     */
    where: Prisma.ledgerEntryWhereUniqueInput;
};
/**
 * ledgerEntry updateMany
 */
export type ledgerEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ledgerEntries.
     */
    data: Prisma.XOR<Prisma.ledgerEntryUpdateManyMutationInput, Prisma.ledgerEntryUncheckedUpdateManyInput>;
    /**
     * Filter which ledgerEntries to update
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * Limit how many ledgerEntries to update.
     */
    limit?: number;
};
/**
 * ledgerEntry updateManyAndReturn
 */
export type ledgerEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * The data used to update ledgerEntries.
     */
    data: Prisma.XOR<Prisma.ledgerEntryUpdateManyMutationInput, Prisma.ledgerEntryUncheckedUpdateManyInput>;
    /**
     * Filter which ledgerEntries to update
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * Limit how many ledgerEntries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ledgerEntry upsert
 */
export type ledgerEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * The filter to search for the ledgerEntry to update in case it exists.
     */
    where: Prisma.ledgerEntryWhereUniqueInput;
    /**
     * In case the ledgerEntry found by the `where` argument doesn't exist, create a new ledgerEntry with this data.
     */
    create: Prisma.XOR<Prisma.ledgerEntryCreateInput, Prisma.ledgerEntryUncheckedCreateInput>;
    /**
     * In case the ledgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ledgerEntryUpdateInput, Prisma.ledgerEntryUncheckedUpdateInput>;
};
/**
 * ledgerEntry delete
 */
export type ledgerEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
    /**
     * Filter which ledgerEntry to delete.
     */
    where: Prisma.ledgerEntryWhereUniqueInput;
};
/**
 * ledgerEntry deleteMany
 */
export type ledgerEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ledgerEntries to delete
     */
    where?: Prisma.ledgerEntryWhereInput;
    /**
     * Limit how many ledgerEntries to delete.
     */
    limit?: number;
};
/**
 * ledgerEntry without action
 */
export type ledgerEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ledgerEntry
     */
    select?: Prisma.ledgerEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ledgerEntry
     */
    omit?: Prisma.ledgerEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ledgerEntryInclude<ExtArgs> | null;
};
//# sourceMappingURL=ledgerEntry.d.ts.map