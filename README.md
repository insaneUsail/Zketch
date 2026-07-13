# Zketch

**Real-time collaborative drawing canvas** — draw together with others in shared rooms, with live cursors, presence tracking, and persistent room state.

Zketch lets multiple users join a room and sketch on the same canvas simultaneously. Every stroke is broadcast over WebSockets to everyone else in the room in real time, room state is persisted so drawings survive reconnects/refreshes, and a lightweight chat sits alongside the canvas for coordination.

---

## Features

- 🎨 **Real-time collaborative canvas** — draw simultaneously with others, changes sync instantly via WebSockets
- 👥 **Presence tracking** — see who's currently active in a room
- 💾 **Persistent room state** — canvas state is saved so it survives refreshes and reconnects (clear-and-redraw loop rebuilds the canvas from stored state on join)
- 💬 **In-room chat** — talk to collaborators without leaving the canvas
- 🔐 **JWT authentication** — secured user sessions across the app and WebSocket connections
- 🏗️ **Monorepo architecture** — shared types and logic across frontend/backend via Turborepo

---

## Architecture

```
Client (Canvas UI)
      │
      ├── HTTP ──► Auth (JWT) / Room CRUD
      │
      └── WebSocket ──► Real-time draw events
                              │
                              ▼
                     WebSocket Server
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            Broadcast to Room      Persist to DB
            (presence + strokes)   (Prisma)
                                        │
                                        ▼
                              PostgreSQL (User, Room,
                              RoomState, Chat)
```

On join, a client fetches the persisted `RoomState` and replays it onto the canvas (clear-and-redraw), then starts receiving live stroke events over WebSocket for anything drawn after that point.

---

## Data Model (Prisma)

- **User** — account info, linked to rooms and chat messages
- **Room** — a drawing session; owns a `RoomState` and a set of participants
- **RoomState** — serialized canvas state, persisted so the drawing isn't lost between sessions
- **Chat** — messages scoped to a room

---

## Tech Stack

Turborepo (monorepo) · Prisma · PostgreSQL · WebSockets · JWT · Canvas API

---

## Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** instance (local or hosted, e.g. Supabase, Neon, Railway)
- **pnpm** (recommended for Turborepo) — or npm/yarn if the repo is configured for it

---

## 1. Clone and install

```bash
git clone https://github.com/insaneUsail/zketch.git
cd zketch
pnpm install
```

---

## 2. Configure environment variables

Create a `.env` file (or per-app `.env` files if the monorepo splits frontend/backend):

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/zketch

# Auth
JWT_SECRET=your_jwt_secret

# WebSocket server
WS_PORT=8080

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

Adjust variable names to match whatever your apps actually read from `process.env`.

---

## 3. Set up the database

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

This creates the `User`, `Room`, `RoomState`, and `Chat` tables and generates the Prisma client used across the monorepo.

---

## 4. Run in development

From the repo root, Turborepo runs all apps in parallel:

```bash
pnpm dev
```

This typically starts:
- The **frontend** (canvas UI) — e.g. `http://localhost:3000`
- The **WebSocket server** — e.g. `ws://localhost:8080`

If you need to run a single app instead of everything:

```bash
pnpm --filter web dev
pnpm --filter ws-server dev
```

(adjust filter names to match your actual package names in `package.json`)

---

## 5. Build for production

```bash
pnpm build
pnpm start
```

Deploy the frontend (e.g. Vercel) and the WebSocket server (e.g. a VM, Railway, Fly.io) separately, pointing `NEXT_PUBLIC_WS_URL` at the deployed WebSocket server's address.

---

## How it works, in short

1. User signs in → receives a JWT
2. User joins/creates a Room → `RoomState` is fetched and replayed onto the canvas
3. Client opens a WebSocket connection (authenticated via JWT) to the room's channel
4. Every stroke drawn is emitted as an event → broadcast to all other clients in the room → simultaneously persisted to `RoomState`
5. Presence updates (join/leave) are broadcast the same way so everyone sees who's currently in the room
6. Chat messages follow the same real-time path, scoped per room

---

## Troubleshooting

| Issue | Likely cause |
|---|---|
| Canvas doesn't sync between users | WebSocket connection failing — check `WS_PORT` / `NEXT_PUBLIC_WS_URL` match |
| Drawing disappears on refresh | `RoomState` not being persisted — check Prisma writes on stroke events |
| Auth errors on WebSocket connect | JWT not being passed/validated on the WS handshake |
| Prisma errors on migrate | `DATABASE_URL` misconfigured or Postgres not running |

---

## Contributing

Issues and PRs are welcome. For larger changes (new data model fields, different real-time transport, etc.), open an issue first to discuss the approach.

---

## License

[MIT](LICENSE)
