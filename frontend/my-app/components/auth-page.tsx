'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { readToken, writeToken } from '../lib/storage';

type AuthMode = 'login' | 'register';

type AuthResponse = {
  user: {
    id: string;
    name?: string | null;
    email: string;
  };
  token: string;
};

const copy = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Sign in to your wallet',
    subtitle: 'Use your account to view balances, send funds, and review transaction history.',
    submit: 'Sign in',
    footer: 'Need an account?',
    footerLink: '/register',
    footerLinkLabel: 'Create one',
  },
  register: {
    eyebrow: 'Join the wallet',
    title: 'Create your account',
    subtitle: 'Set up access to the wallet dashboard in a few seconds.',
    submit: 'Create account',
    footer: 'Already have an account?',
    footerLink: '/login',
    footerLinkLabel: 'Sign in',
  },
} as const;

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

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
    onSuccess: ({ user, token }) => {
      writeToken(token);
      setMessage(`Signed in as ${user.name || user.email}. Redirecting...`);
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      setMessage(error instanceof Error ? error.message : 'Authentication failed');
    },
  });

  const hasToken = Boolean(readToken());
  const content = copy[mode];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_26%),linear-gradient(135deg,_#06101d_0%,_#0b1628_50%,_#111827_100%)] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8 lg:p-10">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
              Digital Wallet
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Fast, clean access for your wallet flow.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Separate pages for sign in, sign up, and the dashboard keep the experience focused and easier to navigate.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <FeatureCard title="Secure" text="Bearer token auth stored locally for the session." />
              <FeatureCard title="Simple" text="One task per page, with no mixed login/register state." />
              <FeatureCard title="Fast" text="Axios + TanStack Query for responsive server-state handling." />
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Current session</p>
                <p className="mt-2 text-sm text-slate-300">
                  {hasToken ? 'You already have a stored token.' : 'No stored token found yet.'}
                </p>
              </div>
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{content.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">{content.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{content.subtitle}</p>
            </div>

            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setMessage(null);
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
                {authMutation.isPending ? 'Working…' : content.submit}
              </button>

              {message ? <Notice tone={message.toLowerCase().includes('redirecting') ? 'success' : 'error'}>{message}</Notice> : null}
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
              <span>{content.footer}</span>
              <Link href={content.footerLink} className="font-semibold text-emerald-300 transition hover:text-emerald-200">
                {content.footerLinkLabel}
              </Link>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-400">
              Your backend should expose `/auth/login` and `/auth/register` with `{ user, token }` responses.
            </div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/10"
      />
    </label>
  );
}

function Notice({ tone, children }: { tone: 'success' | 'error'; children: React.ReactNode }) {
  const tones = {
    success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    error: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  } as const;

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>;
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}