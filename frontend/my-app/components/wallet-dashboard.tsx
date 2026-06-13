'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { clearToken, readToken, subscribeToTokenChanges } from '../lib/storage';

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

export default function WalletDashboard() {
  const router = useRouter();
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

      if (!walletId) {
        throw new Error('Wallet is not loaded yet');
      }

      const headers = {
        'Idempotency-Key': crypto.randomUUID(),
      };

      const body = {
        amount,
        type: transferForm.type,
        senderWalletId: walletId,
        receiverWalletId: transferForm.type === 'TRANSFER' ? transferForm.receiverWalletId : walletId,
        description: transferForm.description || undefined,
      };

      const { data } = await api.post<Transaction>('/transactions', body, { headers });
      return data;
    },
    onSuccess: async () => {
      setTransferMessage('Transaction submitted successfully.');
      setTransferForm(initialTransferForm);
      await queryClient.invalidateQueries({ queryKey: ['wallet'] });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: unknown) => {
      setTransferMessage(error instanceof Error ? error.message : 'Transaction failed');
    },
  });

  const isAuthed = Boolean(token);
  const wallet = walletQuery.data;
  const transactions = transactionsQuery.data ?? [];
  const recentTransaction = transactions[0] ?? null;
  const transferCount = transactions.filter((item) => item.type === 'TRANSFER').length;
  const depositCount = transactions.filter((item) => item.type === 'DEPOSIT').length;
  const withdrawalCount = transactions.filter((item) => item.type === 'WITHDRAWAL').length;

  const balanceLabel = useMemo(() => {
    if (!wallet) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(wallet.balance);
  }, [wallet]);

  const updatedAtLabel = useMemo(() => {
    if (!wallet) return 'Waiting for session';

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(wallet.updatedAt));
  }, [wallet]);

  if (!isAuthed) {
    return <DashboardShellLoading message="Redirecting to secure access..." />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_#05101d_0%,_#0b1628_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 px-6 py-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Digital Wallet</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Session active
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
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                  Wallet overview
                </p>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {wallet ? `${balanceLabel} ${wallet.currency}` : 'Loading balance'}
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-[460px] xl:grid-cols-3">
                <StatCard label="Wallet status" value={wallet?.status ?? 'Loading'} />
                <StatCard label="Updated" value={wallet ? updatedAtLabel : 'Loading'} />
                <StatCard label="Transactions" value={String(transactions.length)} />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Wallet ID" value={wallet?.id ?? 'Loading'} />
              <MetricCard label="User ID" value={wallet?.userId ?? 'Loading'} />
              <MetricCard label="Currency" value={wallet?.currency ?? 'NPR'} />
              <MetricCard label="Latest status" value={recentTransaction?.status ?? 'None'} />
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">Activity snapshot</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  Live
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <InfoTile label="Transfers" value={String(transferCount)} />
                <InfoTile label="Deposits" value={String(depositCount)} />
                <InfoTile label="Withdrawals" value={String(withdrawalCount)} />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4">
                {transactionsQuery.isLoading ? (
                  <p className="text-sm text-slate-400">Loading transactions...</p>
                ) : transactionsQuery.error ? (
                  <Notice tone="error">Failed to load recent transactions.</Notice>
                ) : recentTransaction ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Latest item</p>
                      <p className="mt-2 text-sm font-semibold text-white">{recentTransaction.refrenceId}</p>
                      <p className="mt-1 text-sm text-slate-400">{recentTransaction.description || 'No description provided'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Pill tone={recentTransaction.type === 'TRANSFER' ? 'emerald' : recentTransaction.type === 'DEPOSIT' ? 'sky' : 'amber'}>
                        {recentTransaction.type}
                      </Pill>
                      <Pill tone={recentTransaction.status === 'COMPLETED' ? 'emerald' : recentTransaction.status === 'FAILED' ? 'rose' : 'slate'}>
                        {recentTransaction.status}
                      </Pill>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No transactions yet.</p>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">New transaction</h3>

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
                    label="Receiver wallet ID"
                    value={transferForm.receiverWalletId}
                    onChange={(value) => setTransferForm((current) => ({ ...current, receiverWalletId: value }))}
                    placeholder={wallet?.id ?? 'wallet-id'}
                    disabled={transferForm.type !== 'TRANSFER'}
                  />
                </div>

                <InputField
                  label="Description"
                  value={transferForm.description}
                  onChange={(value) => setTransferForm((current) => ({ ...current, description: value }))}
                  placeholder="Invoice payment"
                />

                <button
                  type="submit"
                  disabled={transactionMutation.isPending || !wallet}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {transactionMutation.isPending ? 'Submitting...' : 'Submit transaction'}
                </button>

                {transferMessage ? <Notice tone={transferMessage.toLowerCase().includes('success') ? 'success' : 'error'}>{transferMessage}</Notice> : null}
              </form>
            </section>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Recent transactions</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                {transactions.length} items
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
              {transactionsQuery.isLoading ? (
                <div className="p-6 text-sm text-slate-400">Loading transactions...</div>
              ) : transactionsQuery.error ? (
                <div className="p-6">
                  <Notice tone="error">Failed to load transaction history.</Notice>
                </div>
              ) : transactions.length ? (
                <div className="divide-y divide-white/10">
                  {transactions.map((item) => (
                    <div key={item.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] sm:items-center">
                      <div>
                        <p className="font-medium text-white">{item.refrenceId}</p>
                        <p className="text-sm text-slate-400">{item.description || 'No description provided'}</p>
                      </div>
                      <Pill tone={item.type === 'TRANSFER' ? 'emerald' : item.type === 'DEPOSIT' ? 'sky' : 'amber'}>{item.type}</Pill>
                      <Pill tone={item.status === 'COMPLETED' ? 'emerald' : item.status === 'FAILED' ? 'rose' : 'slate'}>{item.status}</Pill>
                      <p className="text-right text-sm font-semibold text-white">{item.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-sm text-slate-400">No transactions yet.</div>
              )}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Summary</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Account status</h3>

            <div className="mt-6 space-y-3">
              <InfoTile label="Wallet" value={wallet?.status ?? 'Loading'} />
              <InfoTile label="Recent item" value={recentTransaction?.status ?? 'None'} />
              <InfoTile label="Currency" value={wallet?.currency ?? 'NPR'} />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function DashboardShellLoading({ message = 'Loading dashboard...' }: { message?: string }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_#05101d_0%,_#0b1628_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-8 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Digital Wallet</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">{message}</h1>
        </div>
      </div>
    </main>
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
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
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
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
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

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/7 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-3 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
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
