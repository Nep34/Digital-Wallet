import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(135deg,_#05101d_0%,_#0b1628_55%,_#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between gap-12 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Digital Wallet</p>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/login" className="rounded-full px-4 py-2 text-slate-200 transition hover:bg-white/10">
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-200">
              Register
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-8">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
              Secure payments, clean flows
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              A wallet dashboard built around fast access and replay-safe transfers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Sign in, register, and manage your wallet from dedicated pages. The dashboard keeps balances, transactions, and transfer actions separate from account access.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Sign in
              </Link>
              <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <InfoCard title="Dedicated login" text="A focused page for returning users." />
            <InfoCard title="Dedicated register" text="A separate flow for new users." />
            <InfoCard title="Dedicated home" text="A landing page that introduces the app." />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <FeatureTile title="Axios" text="Shared HTTP client for backend requests and auth token injection." />
          <FeatureTile title="TanStack Query" text="Server state, caching, and invalidation for wallet data." />
          <FeatureTile title="Idempotency" text="Transaction submits include an Idempotency-Key header." />
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function FeatureTile({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-xl shadow-black/15 backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}
