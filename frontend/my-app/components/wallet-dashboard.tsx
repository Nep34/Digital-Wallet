'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from 'react';
import { useMutation, useQuery, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import api from '../lib/api';
import { clearToken, readToken, subscribeToTokenChanges } from '../lib/storage';

type WalletPage = 'overview' | 'profile' | 'activity' | 'history' | 'move';

type Wallet = {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Transaction = {
  id: string;
  refrenceId: string;
  senderWalletId: string;
  receiverWalletId: string;
  amount: number;
  type: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  description?: string | null;
  createdAt: string;
};

const initialTransferForm = {
  amount: '',
  type: 'TRANSFER' as Transaction['type'],
  receiverWalletId: '',
  description: '',
};

const navItems = [
  { label: 'Overview', href: '/dashboard', page: 'overview' },
  { label: 'Move money', href: '/dashboard/move', page: 'move' },
  { label: 'Activity', href: '/dashboard/activity', page: 'activity' },
  { label: 'History', href: '/dashboard/history', page: 'history' },
  { label: 'Profile', href: '/dashboard/profile', page: 'profile' },
] as const;

export default function WalletDashboard({ page = 'overview' }: { page?: WalletPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [transferForm, setTransferForm] = useState(initialTransferForm);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);

  const token = useSyncExternalStore(subscribeToTokenChanges, readToken, () => null);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [router, token]);

  const walletQuery = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const { data } = await api.get<Wallet>('/wallet');
      return data;
    },
    enabled: Boolean(token),
  });

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await api.get<Transaction[]>('/transactions');
      return data;
    },
    enabled: Boolean(token),
  });

  const transactionMutation = useMutation({
    mutationFn: async () => {
      const amount = Number(transferForm.amount);
      const walletId = walletQuery.data?.id;
      const receiverWalletId = transferForm.receiverWalletId.trim();

      if (!walletId) {
        throw new Error('Wallet is not loaded yet');
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('Enter an amount greater than zero');
      }

      if (transferForm.type === 'TRANSFER' && !receiverWalletId) {
        throw new Error('Enter the receiver wallet ID');
      }

      const body = {
        amount,
        type: transferForm.type,
        senderWalletId: walletId,
        receiverWalletId: transferForm.type === 'TRANSFER' ? receiverWalletId : walletId,
        description: transferForm.description || undefined,
      };

      const { data } = await api.post<Transaction>('/transactions', body, {
        headers: { 'Idempotency-Key': crypto.randomUUID() },
      });
      return data;
    },
    onSuccess: async (transaction) => {
      setTransferMessage(`${getTransactionTitle(transaction, walletQuery.data?.id)} submitted.`);
      setTransferForm(initialTransferForm);
      await queryClient.invalidateQueries({ queryKey: ['wallet'] });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: unknown) => {
      setTransferMessage(error instanceof Error ? error.message : 'Transaction failed');
    },
  });

  const wallet = walletQuery.data;
  const walletId = wallet?.id;
  const transactions = transactionsQuery.data ?? [];
  const recentTransaction = transactions[0] ?? null;
  const currency = wallet?.currency ?? 'NPR';
  const walletCode = wallet?.id ? `Wallet ${wallet.id.slice(0, 8).toUpperCase()}` : 'Wallet loading';

  const balanceLabel = useMemo(() => {
    if (!wallet) return '0.00';
    return formatMoney(wallet.balance);
  }, [wallet]);

  const completedTransactions = transactions.filter((item) => item.status === 'COMPLETED');
  const transferCount = transactions.filter((item) => item.type === 'TRANSFER').length;
  const depositCount = transactions.filter((item) => item.type === 'DEPOSIT').length;
  const withdrawalCount = transactions.filter((item) => item.type === 'WITHDRAWAL').length;
  const moneyIn = completedTransactions
    .filter((item) => getTransactionDirection(item, walletId) === 'credit')
    .reduce((total, item) => total + item.amount, 0);
  const moneyOut = completedTransactions
    .filter((item) => getTransactionDirection(item, walletId) === 'debit')
    .reduce((total, item) => total + item.amount, 0);

  const stats = {
    wallet,
    walletId,
    transactions,
    recentTransaction,
    currency,
    walletCode,
    balanceLabel,
    transferCount,
    depositCount,
    withdrawalCount,
    moneyIn,
    moneyOut,
  };

  if (!token) {
    return <DashboardShellLoading message="Redirecting to secure access..." />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_#05101d_0%,_#0b1628_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Wallet</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{getPageTitle(page)}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                {wallet?.status ?? 'Checking wallet'}
              </div>
              <button
                onClick={() => {
                  clearToken();
                  queryClient.clear();
                  router.replace('/login');
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const active = pathname === item.href || page === item.page;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'border-emerald-300/30 bg-emerald-300/15 text-emerald-100'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        {page === 'overview' ? <OverviewPage stats={stats} /> : null}
        {page === 'move' ? (
          <MoveMoneyPage
            wallet={wallet}
            transferForm={transferForm}
            setTransferForm={setTransferForm}
            transferMessage={transferMessage}
            setTransferMessage={setTransferMessage}
            transactionMutation={transactionMutation}
          />
        ) : null}
        {page === 'activity' ? <ActivityPage stats={stats} transactionsQueryError={Boolean(transactionsQuery.error)} transactionsLoading={transactionsQuery.isLoading} /> : null}
        {page === 'history' ? <HistoryPage transactions={transactions} currency={currency} walletId={walletId} loading={transactionsQuery.isLoading} error={Boolean(transactionsQuery.error)} /> : null}
        {page === 'profile' ? <ProfilePage wallet={wallet} walletCode={walletCode} /> : null}
      </div>
    </main>
  );
}

function OverviewPage({ stats }: { stats: WalletStats }) {
  const { wallet, balanceLabel, currency, walletCode, transactions, recentTransaction, moneyIn, moneyOut } = stats;

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
        <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
          Available balance
        </p>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {wallet ? `${balanceLabel} ${currency}` : 'Loading balance'}
        </h2>
        <p className="mt-3 text-sm text-slate-400">{walletCode}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Money in" value={`${formatMoney(moneyIn)} ${currency}`} />
          <StatCard label="Money out" value={`${formatMoney(moneyOut)} ${currency}`} />
          <StatCard label="Transactions" value={String(transactions.length)} />
        </div>
      </div>

      <aside className="rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Latest activity</h3>
        <div className="mt-5">
          {recentTransaction ? <TransactionSummary item={recentTransaction} currency={currency} walletId={stats.walletId} /> : <p className="text-sm text-slate-400">No transactions yet.</p>}
        </div>
        <div className="mt-6 grid gap-3">
          <Link href="/dashboard/move" className="rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:brightness-110">
            Move money
          </Link>
          <Link href="/dashboard/history" className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
            View history
          </Link>
        </div>
      </aside>
    </section>
  );
}

function MoveMoneyPage({
  wallet,
  transferForm,
  setTransferForm,
  transferMessage,
  setTransferMessage,
  transactionMutation,
}: {
  wallet?: Wallet;
  transferForm: typeof initialTransferForm;
  setTransferForm: Dispatch<SetStateAction<typeof initialTransferForm>>;
  transferMessage: string | null;
  setTransferMessage: Dispatch<SetStateAction<string | null>>;
  transactionMutation: UseMutationResult<Transaction, unknown, void, unknown>;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Actions</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Send, top up, or withdraw.</h2>
        <div className="mt-6 grid gap-3">
          <InfoTile label="Transfer" value="Send money to another wallet." />
          <InfoTile label="Deposit" value="Add money to your wallet." />
          <InfoTile label="Withdrawal" value="Move money out of your wallet." />
        </div>
      </aside>

      <section className="rounded-lg border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Move money</h3>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setTransferMessage(null);
            transactionMutation.mutate();
          }}
        >
          <InputField
            label="Amount"
            value={transferForm.amount}
            onChange={(value) => setTransferForm((current) => ({ ...current, amount: value }))}
            placeholder="2500"
            type="number"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Type"
              value={transferForm.type}
              onChange={(value) => {
                const nextType = value as Transaction['type'];
                setTransferForm((current) => ({
                  ...current,
                  type: nextType,
                  receiverWalletId: nextType === 'TRANSFER' ? current.receiverWalletId : wallet?.id ?? current.receiverWalletId,
                }));
              }}
              options={[
                { label: 'Transfer', value: 'TRANSFER' },
                { label: 'Deposit', value: 'DEPOSIT' },
                { label: 'Withdrawal', value: 'WITHDRAWAL' },
              ]}
            />
            <InputField
              label="Send to wallet"
              value={transferForm.receiverWalletId}
              onChange={(value) => setTransferForm((current) => ({ ...current, receiverWalletId: value }))}
              placeholder="Receiver wallet ID"
              disabled={transferForm.type !== 'TRANSFER'}
            />
          </div>

          <InputField
            label="Description"
            value={transferForm.description}
            onChange={(value) => setTransferForm((current) => ({ ...current, description: value }))}
            placeholder="Groceries, rent, savings..."
          />

          <button
            type="submit"
            disabled={transactionMutation.isPending || !wallet}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {transactionMutation.isPending ? 'Processing...' : getSubmitLabel(transferForm.type)}
          </button>

          {transferMessage ? (
            <Notice tone={transferMessage.toLowerCase().includes('submitted') ? 'success' : 'error'}>
              {transferMessage}
            </Notice>
          ) : null}
        </form>
      </section>
    </section>
  );
}

function ActivityPage({
  stats,
  transactionsLoading,
  transactionsQueryError,
}: {
  stats: WalletStats;
  transactionsLoading: boolean;
  transactionsQueryError: boolean;
}) {
  const { transferCount, depositCount, withdrawalCount, recentTransaction, currency, transactions, walletId } = stats;
  const latestItems = transactions.slice(0, 5);

  return (
    <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Activity snapshot</h2>
        <div className="mt-5 grid gap-3">
          <InfoTile label="Transfers" value={String(transferCount)} />
          <InfoTile label="Deposits" value={String(depositCount)} />
          <InfoTile label="Withdrawals" value={String(withdrawalCount)} />
        </div>
      </aside>

      <section className="rounded-lg border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Recent activity</h3>
        <div className="mt-5 space-y-3">
          {transactionsLoading ? <p className="text-sm text-slate-400">Loading activity...</p> : null}
          {transactionsQueryError ? <Notice tone="error">Failed to load activity.</Notice> : null}
          {!transactionsLoading && !transactionsQueryError && recentTransaction ? (
            latestItems.map((item) => <TransactionSummary key={item.id} item={item} currency={currency} walletId={walletId} />)
          ) : null}
          {!transactionsLoading && !transactionsQueryError && !recentTransaction ? <p className="text-sm text-slate-400">No activity yet.</p> : null}
        </div>
      </section>
    </section>
  );
}

function HistoryPage({
  transactions,
  currency,
  walletId,
  loading,
  error,
}: {
  transactions: Transaction[];
  currency: string;
  walletId?: string;
  loading: boolean;
  error: boolean;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">Transaction history</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
          {transactions.length} items
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
        {loading ? <div className="p-6 text-sm text-slate-400">Loading transactions...</div> : null}
        {error ? (
          <div className="p-6">
            <Notice tone="error">Failed to load transaction history.</Notice>
          </div>
        ) : null}
        {!loading && !error && transactions.length ? (
          <div className="divide-y divide-white/10">
            {transactions.map((item) => (
              <div key={item.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] sm:items-center">
                <div>
                  <p className="font-medium text-white">{item.description || getTransactionTitle(item, walletId)}</p>
                  <p className="text-sm text-slate-400">{formatDate(item.createdAt)}</p>
                </div>
                <Pill tone={getTransactionDirection(item, walletId) === 'credit' ? 'emerald' : 'amber'}>{getTransactionActionLabel(item, walletId)}</Pill>
                <Pill tone={item.status === 'COMPLETED' ? 'emerald' : item.status === 'FAILED' ? 'rose' : 'slate'}>{item.status}</Pill>
                <p className={`text-right text-sm font-semibold ${getTransactionDirection(item, walletId) === 'credit' ? 'text-emerald-200' : 'text-white'}`}>
                  {getTransactionAmountPrefix(item, walletId)}{formatMoney(item.amount)} {currency}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        {!loading && !error && !transactions.length ? <div className="p-6 text-sm text-slate-400">No transactions yet.</div> : null}
      </div>
    </section>
  );
}

function ProfilePage({ wallet, walletCode }: { wallet?: Wallet; walletCode: string }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="rounded-lg border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Profile</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Account and wallet details</h2>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Keep the technical identifiers here so the main wallet screens stay clean.
        </p>
      </aside>

      <section className="rounded-lg border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Wallet details</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <InfoTile label="Wallet" value={walletCode} />
          <InfoTile label="Status" value={wallet?.status ?? 'Loading'} />
          <InfoTile label="Currency" value={wallet?.currency ?? 'NPR'} />
          <InfoTile label="Balance" value={wallet ? `${formatMoney(wallet.balance)} ${wallet.currency}` : 'Loading'} />
          <InfoTile label="Wallet ID" value={wallet?.id ?? 'Loading'} />
          <InfoTile label="User ID" value={wallet?.userId ?? 'Loading'} />
          <InfoTile label="Created" value={wallet ? formatFullDate(wallet.createdAt) : 'Loading'} />
          <InfoTile label="Updated" value={wallet ? formatFullDate(wallet.updatedAt) : 'Loading'} />
        </div>
      </section>
    </section>
  );
}

type WalletStats = {
  wallet?: Wallet;
  walletId?: string;
  transactions: Transaction[];
  recentTransaction: Transaction | null;
  currency: string;
  walletCode: string;
  balanceLabel: string;
  transferCount: number;
  depositCount: number;
  withdrawalCount: number;
  moneyIn: number;
  moneyOut: number;
};

function DashboardShellLoading({ message = 'Loading dashboard...' }: { message?: string }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_#05101d_0%,_#0b1628_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/10 bg-slate-950/80 px-8 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Wallet</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">{message}</h1>
        </div>
      </div>
    </main>
  );
}

function TransactionSummary({ item, currency, walletId }: { item: Transaction; currency: string; walletId?: string }) {
  const direction = getTransactionDirection(item, walletId);

  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-white">{item.description || getTransactionTitle(item, walletId)}</p>
          <p className="mt-1 text-sm text-slate-400">{formatDate(item.createdAt)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={direction === 'credit' ? 'emerald' : 'amber'}>{getTransactionActionLabel(item, walletId)}</Pill>
          <p className={`text-sm font-semibold ${direction === 'credit' ? 'text-emerald-200' : 'text-white'}`}>
            {getTransactionAmountPrefix(item, walletId)}{formatMoney(item.amount)} {currency}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-950 text-white">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Notice({ tone, children }: { tone: 'success' | 'error' | 'info'; children: React.ReactNode }) {
  const tones = {
    success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    error: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
    info: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  } as const;

  return <div className={`rounded-lg border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/7 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function Pill({ tone, children }: { tone: 'emerald' | 'sky' | 'amber' | 'rose' | 'slate'; children: React.ReactNode }) {
  const tones = {
    emerald: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/20',
    sky: 'bg-sky-400/10 text-sky-200 border-sky-400/20',
    amber: 'bg-amber-400/10 text-amber-200 border-amber-400/20',
    rose: 'bg-rose-400/10 text-rose-200 border-rose-400/20',
    slate: 'bg-slate-400/10 text-slate-200 border-slate-400/20',
  } as const;

  return <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${tones[tone]}`}>{children}</span>;
}

function getPageTitle(page: WalletPage) {
  const titles = {
    overview: 'Wallet overview',
    move: 'Move money',
    activity: 'Wallet activity',
    history: 'Transaction history',
    profile: 'Profile',
  } as const;

  return titles[page];
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getTransactionDirection(item: Transaction, walletId?: string) {
  if (item.type === 'DEPOSIT') return 'credit';
  if (item.type === 'WITHDRAWAL') return 'debit';
  if (walletId && item.receiverWalletId === walletId) return 'credit';
  return 'debit';
}

function getTransactionActionLabel(item: Transaction, walletId?: string) {
  return getTransactionDirection(item, walletId) === 'credit' ? 'Credit' : 'Debit';
}

function getTransactionAmountPrefix(item: Transaction, walletId?: string) {
  return getTransactionDirection(item, walletId) === 'credit' ? '+' : '-';
}

function getTransactionTitle(item: Transaction, walletId?: string) {
  if (item.type === 'DEPOSIT') return 'Wallet top up';
  if (item.type === 'WITHDRAWAL') return 'Cash withdrawal';
  return getTransactionDirection(item, walletId) === 'credit' ? 'Transfer received' : 'Transfer sent';
}

function getSubmitLabel(type: Transaction['type']) {
  const labels = {
    TRANSFER: 'Send money',
    DEPOSIT: 'Add money',
    WITHDRAWAL: 'Withdraw money',
  } as const;

  return labels[type];
}
