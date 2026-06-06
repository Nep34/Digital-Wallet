'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { clearToken, readToken, writeToken } from '../lib/storage';

type AuthMode = 'login' | 'register';

type User = {
  id: string;
  name?: string | null;
  email: string;
};

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

type AuthResponse = {
  user: User;
  token: string;
};

const initialTransferForm = {
  amount: '',
  type: 'TRANSFER' as Transaction['type'],
  receiverWalletId: '',
  description: '',
};

export default function WalletDashboard() {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<AuthMode>('login');
  const [token, setToken] = useState<string | null>(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [transferForm, setTransferForm] = useState(initialTransferForm);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);

  useEffect(() => {
    setToken(readToken());
  }, []);

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

  const authMutation = useMutation({
    mutationFn: async () => {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload =
        mode === 'login'
          ? { email: authForm.email, password: authForm.password }
          : { name: authForm.name, email: authForm.email, password: authForm.password };

      const { data } = await api.post<AuthResponse>(endpoint, payload);
      return data;
    },
    onSuccess: async ({ user, token: nextToken }) => {
      writeToken(nextToken);
      setToken(nextToken);
      setAuthMessage(`Welcome, ${user.name || user.email}.`);
      setAuthForm({ name: '', email: '', password: '' });
      await queryClient.invalidateQueries({ queryKey: ['wallet'] });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: unknown) => {
      setAuthMessage(error instanceof Error ? error.message : 'Authentication failed');
    },
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

  const balanceLabel = useMemo(() => {
    if (!wallet) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(wallet.balance);
  }, [wallet]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(135deg,_#07111f_0%,_#0b1324_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/8 px-6 py-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Digital Wallet Control Center
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Move money, track balance, and replay-safe every submission with idempotency.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Sign in, inspect your wallet, then send transfers or deposits from a polished dashboard powered by Axios and TanStack Query.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[430px]">
              <StatCard label="Wallet" value={wallet ? wallet.id.slice(0, 8) : '—'} />
              <StatCard label="Currency" value={wallet?.currency ?? 'NPR'} />
              <StatCard label="Status" value={wallet?.status ?? 'Locked'} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Access</h2>
                <p className="text-sm text-slate-400">Login or register to load your wallet and recent transactions.</p>
              </div>
              {isAuthed ? (
                <button
                  onClick={() => {
                    clearToken();
                    setToken(null);
                    queryClient.clear();
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  Sign out
                </button>
              ) : null}
            </div>

            <div className="mt-5 flex rounded-full border border-white/10 bg-white/5 p-1">
              {(['login', 'register'] as AuthMode[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                    mode === item ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setAuthMessage(null);
                authMutation.mutate();
              }}
            >
              {mode === 'register' ? (
                <InputField
                  label="Full name"
                  value={authForm.name}
                  onChange={(value) => setAuthForm((current) => ({ ...current, name: value }))}
                  placeholder="Ada Lovelace"
                />
              ) : null}
              <InputField
                label="Email"
                value={authForm.email}
                onChange={(value) => setAuthForm((current) => ({ ...current, email: value }))}
                placeholder="you@example.com"
                type="email"
              />
              <InputField
                label="Password"
                value={authForm.password}
                onChange={(value) => setAuthForm((current) => ({ ...current, password: value }))}
                placeholder="••••••••"
                type="password"
              />

              <button
                type="submit"
                disabled={authMutation.isPending}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {authMutation.isPending ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}
              </button>

              {authMessage ? <Notice tone={isAuthed ? 'success' : 'info'}>{authMessage}</Notice> : null}
            </form>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick setup</p>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>1. Set <span className="font-semibold text-white">NEXT_PUBLIC_API_BASE_URL</span> to your backend URL.</p>
                <p>2. Register or sign in.</p>
                <p>3. Use your wallet ID for deposits or withdrawals, or a receiver wallet ID for transfers.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Wallet</h2>
                    <p className="text-sm text-slate-400">Current balance and metadata from the protected `/wallet` route.</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Balance</p>
                    <p className="text-2xl font-semibold text-white">{balanceLabel} {wallet?.currency ?? 'NPR'}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <InfoTile label="Wallet ID" value={wallet?.id ?? 'Sign in to load'} />
                  <InfoTile label="User ID" value={wallet?.userId ?? '—'} />
                  <InfoTile label="Status" value={wallet?.status ?? '—'} />
                </div>

                {!isAuthed ? (
                  <p className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Authenticate to fetch your wallet data and submit transactions.
                  </p>
                ) : walletQuery.isLoading ? (
                  <p className="mt-6 text-sm text-slate-400">Loading wallet...</p>
                ) : walletQuery.error ? (
                  <Notice tone="error">Failed to load wallet.</Notice>
                ) : null}
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Transaction Composer</h2>
                <p className="mt-1 text-sm text-slate-400">Every submit sends an `Idempotency-Key` header so retries do not duplicate the request.</p>

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
                    disabled={transactionMutation.isPending || !isAuthed}
                    className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {transactionMutation.isPending ? 'Submitting…' : 'Submit transaction'}
                  </button>

                  {transferMessage ? <Notice tone={transferMessage.toLowerCase().includes('success') ? 'success' : 'error'}>{transferMessage}</Notice> : null}
                </form>
              </section>
            </div>

            <section className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">Recent transactions</h2>
                  <p className="text-sm text-slate-400">Latest items fetched from the protected `/transactions` route.</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {transactions.length} items
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
                {isAuthed ? (
                  transactionsQuery.isLoading ? (
                    <div className="p-6 text-sm text-slate-400">Loading transactions...</div>
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
                  )
                ) : (
                  <div className="p-6 text-sm text-slate-400">Sign in to view your transaction history.</div>
                )}
              </div>
            </section>
          </div>
        </section>
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
