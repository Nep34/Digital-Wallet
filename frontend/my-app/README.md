# Digital Wallet Frontend

A polished Next.js app for the backend wallet API.

## Setup

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Install dependencies and start the app:

```bash
npm install
npm run dev
```

## Features

- Login and registration
- Wallet summary
- Recent transactions
- Transaction submission with `Idempotency-Key`

## API contract used

- `POST /auth/login`
- `POST /auth/register`
- `GET /wallet`
- `GET /transactions`
- `POST /transactions`
