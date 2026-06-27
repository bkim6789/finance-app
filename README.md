# Finance App

Auth-gated todos application with a local mock API.

## Features

- Login with mock server credentials.
- Error message shown when login fails.
- Todos load only after successful login.
- If a user has no saved todos, defaults are seeded as `a`, `b`, `c`.
- Todo filtering by label.
- Add new todos from the main todos UI.
- Explicit `Save Todos` button that persists todos to the mock server.
- Todo values update every 5 seconds.
- Value integer base is derived from the first letter: `a = 1`, `b = 2`, ..., `z = 26`.
- Decimal precision changes randomly (1 to 4 decimals) on each refresh tick.

## Credentials

- Username: `admin`
- Password: `password123`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Run both frontend and mock API:

```bash
npm run dev:all
```

Alternative in separate terminals:

```bash
npm run dev:api
```

```bash
npm run dev
```

## API Endpoints (Mock Server)

- `POST /api/v1/login`
	- Body: `{ "username": string, "password": string }`
- `GET /api/v1/todos?username=<username>`
- `POST /api/v1/todos`
	- Body: `{ "username": string, "todos": Todo[] }`

The mock server stores todos in memory, scoped by username.

## Scripts

- `npm run dev`: Start Vite frontend.
- `npm run dev:api`: Start local mock API server.
- `npm run dev:all`: Start both processes concurrently.
- `npm run build`: Build frontend.
- `npm run lint`: Run ESLint.
