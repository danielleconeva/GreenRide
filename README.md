# GreenRide — Full Stack (Frontend + Backend)

GreenRide is a full‑stack carpooling platform that enables **ride discovery, publishing, booking**, and **eco‑impact tracking**. It comprises a **TypeScript React** frontend and a **Node.js/Express + MongoDB** backend. The system is designed for browser clients using **HTTP‑only JWT cookies** with **CORS credentials** enabled, prioritizing security, accessibility, and responsive UX.

---

## 1) Architecture & Domain

### Frontend (Runtime & Libraries)
- **React 18 + TypeScript** for the view layer.
- **React Router** for client‑side routing and route guards.
- **@tanstack/react-query** for fetching, caching, and request lifecycle control.
- **Redux Toolkit** for global UI/auth/notification state.
- **styled-components** for component‑scoped styling & theming.
- **lucide-react** for icons.
- **Vite** as the development server & build tool.

**Feature Domains (UI)**
- **Search & Discovery** — Location typeahead, date & passenger filters, amenities and price sorting; eco‑informed results.
- **Ride Publication & Management** — Route, schedule, capacity, price, amenities; edit/delete with confirmation modal.
- **Booking** — Passenger selection, optional driver note, price summary, booking summary, and post‑booking “next steps”.
- **Account & Profile** — Auth flows (login/signup), profile header with stats & badges, personal + vehicle info editors.
- **Eco Impact** — Duration‑based CO₂ estimations for **incremental bookings** and **ride full‑capacity potential**.

### Backend (Runtime & Data)
- **Express (Node.js)** as the application layer.
- **MongoDB (Mongoose)** as the persistence layer, favoring document models with relational references where needed (**User**, **Ride**, **Booking**).

**Core Domain Flows (Service)**
- **Auth** — Registration/Login issue a JWT in an HTTP‑only cookie; Logout clears it. Middleware (`auth`, `isAuth`, `isGuest`) enforces coarse‑grained access control.
- **Rides** — Drivers publish/manage rides. Public search filters: `from`, `to`, `date`, `passengers`. Reads are public; mutations are owner‑scoped.
- **Bookings** — Passengers reserve seats. Booking mutates both **ride capacity** and **eco stats** for passenger and driver, with strict authorization on read.
- **Eco Impact** — Derived values from **approximated distance (duration‑based)** and **occupants**. Recomputed on create/cancel.
- **Achievements** — Threshold‑based (e.g., total rides, CO₂ saved). Persisted on the user document and updated alongside eco stats.

---

## 2) Security & Session Model

### Cookie‑Based Auth (Client & Server Contract)
- Token is stored in an **HTTP‑only cookie** (`SameSite=None; Secure` in production). The client never reads tokens directly.
- All API requests must use **`credentials: "include"`** (or Axios `withCredentials: true`) so cookies are sent with CORS.
- The server treats the cookie as the single source of truth; **bearer headers are not required**.

### Session Hygiene & Guards
- On verification failure/expiry, the backend proactively **clears the cookie**.
- Middleware:
  - `isAuth` → rejects unauthenticated access with **401**.
  - `isGuest` → blocks login/register for already‑authenticated users with **403**.
- Frontend route guards:
  - `ProtectedRoute` → redirects unauthenticated users to **/login**.
  - `GuestRoute` → redirects authenticated users away from guest‑only pages.

### CORS & HTTPS
- Origins are **explicitly allow‑listed** on the backend.
- `credentials: true` must be enabled, and **HTTPS** is required in production to satisfy `Secure` cookies.

---

## 3) Data Integrity & Concurrency (Backend)

### Seat Accounting
- Booking validates **availability** and **self‑booking** (drivers cannot book their own rides).
- Seat decrement uses an **atomic conditional update** (`$inc` gated by `seatsAvailable >= seats`).  
  On race/failure the booking is rolled back and the client receives a clear message (e.g., *“Seats were just taken.”*).

### Passenger Set & Eco Impact
- `passengers` is derived from **non‑cancelled bookings** and stored as a unique list of user IDs.
- `occupants = 1 (driver) + unique passengers`.
- `ecoImpact` is recomputed on every booking create/cancel; both **passenger and driver** eco stats are adjusted (+/–) and **floored at zero** to prevent negative drift.

### Status Transitions
- `pending → confirmed` (service creates directly as `confirmed`), `confirmed → cancelled` (by booking owner only).

---

## 4) Data Access & Client State (Frontend)

### Fetching & Caching (React Query)
- Keys:
  - `["rides", params]` — search results
  - `["rides", "my"]` — current user’s published rides
  - `["ride", rideId]` — ride details
  - `["profile"]` — full user profile
- Policy: public reads are cached briefly; **mutations** invalidate relevant caches.

### Global UI State (Redux Toolkit)
- `auth` — user snapshot and loading flags.
- `notifications` — ephemeral toasts.
- Cross‑component UI state that is not server‑derived.

---

## 5) UI Composition, Accessibility & UX

### Design System
- Centralized theme via **styled-components** (colors, typography, elevations).
- Patterns: reusable **cards** (Trip Details, Driver Info, Price Summary, Eco Badge), **city typeahead**, amenity toggles, confirmation portal, and a **global loader** bound to React Query + auth.

### Accessibility
- Semantic headings and **form labels**; key components include descriptive `aria-*` attributes.
- Focus rings and keyboard‑operable menus/modals.
- Color palette meets contrast guidance; motion is subtle and non‑blocking.

### Error & Race Handling
- Inline form validation (login/signup); defensive numeric parsing (price/seat inputs).
- Server errors surface in **notifications** and section‑level hints.
- Concurrency conflicts (seat races) are rendered verbatim from server messages.

---

## 6) Performance & Scalability

- **Frontend** — Lean component boundaries; derived values memoized where beneficial; React Query dedupes in‑flight requests.
- **Backend** —
  - Search applies **anchored day windows** for `departureDate` and **case‑insensitive** regex on `from/to` (indexes recommended).
  - **Selective population** (e.g., `driver: username, rating, car`) to keep payloads small.
  - Eco computations are **O(1)** and persisted to avoid recomputation on read.
  - Atomic writes mitigate over‑booking contention.

---

## 7) Validation & Error Semantics (Backend)

- **Validation** — Mongoose schema validation for structure; controller‑level business rules (ownership, seat availability, etc.).
- **Normalization** — Trimming and case folding (e.g., email), password confirmation checks.
- **Error Envelope** — Uniform payload:
  ```json
  { "error": "message" }
  ```
- **Status Codes**
  - `400` invalid input / business rule violation
  - `401` unauthenticated
  - `403` forbidden (ownership/access)
  - `404` resource not found
  - `500` unexpected server error

---

## 8) Configuration

### Frontend (Vite)
- `VITE_API_URL` — base URL of the backend API (e.g., `https://greenride-api.fly.dev/api`)

> All fetch/axios calls **must** include credentials: `fetch(url, { credentials: "include" })` or Axios `{ withCredentials: true }`.  
> Ensure the backend CORS allow‑lists **all** deployed frontend origins and sets cookies with `SameSite=None; Secure` in production.

### Backend (conceptual keys)
- `MONGO_URI`, `MONGO_DB_NAME`
- `JWT_SECRET`, `AUTH_COOKIE_NAME`
- `PORT`, `NODE_ENV`
- CORS allow‑listed origins (configured in server code)

---

## 9) Installation (Local Development)

### Prerequisites
- **Node.js 18+** (20+ recommended)
- **MongoDB** (Atlas connection string suggested)

### Backend — Run Locally
```bash
# install deps
npm install

# set environment (do not commit .env with secrets)
export PORT=8080
export NODE_ENV=development
export MONGO_URI="<your_mongodb_uri>"
export MONGO_DB_NAME="greenride"
export JWT_SECRET="<strong_random_string>"
export AUTH_COOKIE_NAME="auth"

# start the API (nodemon or node)
npm run dev
# or
node src/server.js
```

### Frontend — Run Locally (Vite)
```bash
# install deps
npm install

# configure API base (Vite requires VITE_ prefix)
echo 'VITE_API_URL=http://localhost:8080/api' > .env

# start dev server
npm run dev

# build & preview
npm run build
npm run preview
```

---

## 10) Deployment

### Frontend — **Vercel** (production)
- Hosted at: **https://green-ride-flax.vercel.app/**
- Provide `VITE_API_URL` at build time (pointing to the production API).
- Enforce HTTPS. Cookies require `Secure` in production.

### Backend — **Fly.io** (production)
- Base API URL: **https://greenride-api.fly.dev/api**
- Cookies: HTTP‑only, `SameSite=None`, `Secure` (production).
- CORS: allow‑list the Vercel domain above; `credentials: true`.

> When staging or self‑hosting, ensure **both sides** (frontend origin & API) are aligned on CORS and cookie attributes. Mixed‑origin or non‑TLS setups will prevent cookies from being sent.

---

## 11) Compatibility Contract (Client ⇄ Server)

- **Auth:** Cookie‑based session; no Authorization header required.
- **Reads:** Public endpoints are cacheable; mutations require an active session (cookie present).
- **Search:** Client passes `from`, `to`, `date (YYYY‑MM‑DD)`, `passengers`.
- **Driver Public Data:** Minimal profile fields exposed (e.g., username, optional phone, vehicle) for UI rendering.
- **Booking:** Client submits integer passenger count ≥ 1; surfaces server race/conflict messages verbatim.

---

## 12) Observability & Operations (Backend)

- Startup logs confirm DB connectivity.
- Controller error logs for unexpected exceptions.
- Auth failures emit explicit, non‑revealing messages.
- Plan for **JWT secret rotation**; tokens are short‑lived by default (`expiresIn: 2d`).

---

## 13) Troubleshooting

- **401/403 despite login** — Verify `credentials: "include"`/`withCredentials: true` and that the API CORS allow‑lists the current frontend origin.
- **Cookies not sent** — Ensure **HTTPS** on both API and frontend, and cookies are set with `SameSite=None; Secure`.
- **Vite env not applied** — Variables must be prefixed with `VITE_`; restart `npm run dev` after editing `.env`.
- **Seat race errors** — This is expected under contention; retry the booking with an updated seat count or alternative ride.

---

## 14) Privacy & Compliance

- No tokens in JS‑accessible storage; session is cookie‑managed.
- Only minimal PII is rendered (username, optional phone for drivers). Avoid logging PII in the client.
- Public profile endpoints are intentionally limited in the fields they expose.

---

## 15) Versioning & Backwards Compatibility

- The public contract (routes, cookie‑based auth, uniform error envelope) is **stable**.
- Non‑breaking UI/service updates may ship without notice. Breaking API changes are versioned or coordinated with release notes.

---

**Production URLs**  
- **Frontend (Vercel):** https://green-ride-flax.vercel.app/  
- **Backend (Fly.io):** https://greenride-api.fly.dev/api

**Purpose**: A cleaner, easier, more sustainable commute. 🌱
