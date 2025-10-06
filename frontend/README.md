# GreenRide — Frontend

GreenRide’s frontend is a TypeScript React application for ride discovery, publishing, booking, and user eco‑impact tracking. It targets modern browsers and integrates with the GreenRide backend via **HTTP‑only JWT cookies** (CORS credentials enabled). The UI emphasizes clarity, mobile responsiveness, and accessibility.

---

## 1) Architecture & Domain

### Runtime & Libraries

-   **React 18 + TypeScript** for the view layer
-   **React Router** for client‑side routing and route guards
-   **@tanstack/react-query** for data fetching, caching, and request lifecycle
-   **Redux Toolkit** for global UI/auth/notification state
-   **styled-components** for component‑scoped styling & theming
-   **lucide-react** for icons

### Feature Domains

-   **Search & Discovery:** Location typeahead, date & passenger filters, amenities and price sorting.
-   **Ride Publication & Management:** Guided form (route, schedule, capacity, price, amenities); edit/delete with confirm modal.
-   **Booking:** Passenger count, optional driver note, price summary, booking summary, next steps.
-   **Account & Profile:** Auth (login/signup pages), profile header with stats & badges, personal + vehicle info editors.
-   **Eco Impact:** Lightweight, duration‑based CO₂ calculations for incremental bookings and ride potential.

---

## 2) Security & Session Model (Client Perspective)

-   **Session:** The backend issues **HTTP‑only cookies** on successful authentication. The frontend **does not** handle or store tokens directly.
-   **Requests:** All API calls use `credentials: "include"` to send cookies with CORS.
-   **Routing Guards:**
    -   `ProtectedRoute` blocks unauthenticated users (redirects to `/login`).
    -   `GuestRoute` blocks authenticated users on guest‑only routes (redirects to `/`).
-   **Logout:** Client‑side logout clears local auth state; backend cookie clearing occurs via the server logout endpoint.

---

## 3) Data Access & State

### Fetching & Caching

-   **React Query keys**
    -   `["rides", params]` – search results
    -   `["rides", "my"]` – current user’s published rides
    -   `["ride", rideId]` – ride details
    -   `["profile"]` – full user profile

### Cache Policy

-   Public reads are cached (short‑lived) for fast navigation.
-   Mutations (publish/edit/delete/booking) invalidate relevant caches.

### Global State (Redux Toolkit)

-   `auth`: user snapshot + loading flags
-   `notifications`: ephemeral toasts
-   Any non‑server‑derived UI state that needs to be shared

---

## 4) UI Composition & Design System

-   **styled-components theme** centralizes colors, spacing, and font stacks.
-   **Components** emphasize:
    -   Clear hierarchy and spacing
    -   Keyboard focus states and hover feedback
    -   Mobile‑first, fluid layouts with sensible breakpoints
-   **Patterns Included**
    -   Reusable cards (Trip Details, Driver Info, Price Summary, Eco Badge)
    -   Search form with suggestions, filters with range slider, amenity toggles
    -   Confirmation dialog via React portal
    -   Global loader bound to React Query + auth

---

## 5) Error Handling & UX Semantics

-   **Forms:** Inline validation messages with touched/error state for login/signup; defensive parsing for numeric inputs (e.g., price).
-   **Requests:** Server errors surface as uniform messages in notifications and/or section‑level hints.
-   **Race Conditions:** UI surfaces server‑side concurrency messages (e.g., “Seats were just taken”) without assuming success on optimistic updates.

---

## 6) Performance & Responsiveness

-   **Code:** Lean component boundaries; derived values memoized when beneficial.
-   **Network:** React Query dedupes in‑flight requests; caching reduces refetches.
-   **Rendering:** Lists and cards are lightweight; CSS‑only animations kept subtle.

---

## 7) Accessibility

-   **Semantics:** Headings, labels, and `aria-*` attributes on key components (e.g., summaries, totals).
-   **Focus Management:** Visible focus outlines, keyboard‑operable menus/modals.
-   **Contrast & Motion:** Color choices meet contrast guidelines; animations are brief and non‑blocking.

---

## 8) Observability & Feedback

-   **Notifications:** Dismissable, time‑bound toasts for successes/errors.
-   **Loading:** Global overlay spinner for background fetches; section spinners where appropriate.
-   **Empty States:** Clear, friendly copy for “no rides”, “no history”, etc.

---

## 9) Configuration

### Environment Variables

-   **Vite (recommended)**
    -   `VITE_API_URL` — base URL of the backend API (e.g., `https://api.example.com`)

> Ensure all fetch/axios calls specify `credentials: "include"` and the backend CORS allow‑lists the frontend origins.

---

## 10) Compatibility Contract (Backend)

-   **Auth:** Cookie‑based. No Authorization headers required by the client.
-   **Reads:** Public endpoints cacheable; mutation endpoints require active session (cookie).
-   **Search:** Client passes `from`, `to`, `date (YYYY‑MM‑DD)`, and `passengers`.
-   **Driver Public Data:** Minimal fields (e.g., username, phone, vehicle) displayed in ride cards/summaries.
-   **Booking:** Client submits integer passenger count ≥ 1; displays backend race/conflict messages verbatim.

---

## 11) Installation (Local)

**Prerequisites**

-   Node.js 18+ (20+ recommended)

**Steps**

```bash
# install
npm install

# set env (Vite)
echo "VITE_API_URL=http://localhost:8080/api" > .env

# run
npm run dev

# build & preview
npm run build
npm run preview
```

---

## 12) Build & Scripts

```jsonc
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
    }
}
```

---

## 13) Deployment Posture

-   **Hosting:** Deployed on **Vercel** for production delivery of the frontend.
    -   Example production URL: `https://green-ride-flax.vercel.app/`
-   **HTTPS:** Required for cookies with the `Secure` flag in production.
-   **CORS:** Backend must allow‑list deployed frontend origins and enable `credentials: true`.
-   **Caching:** Public GETs may be CDN‑cached (respecting auth/cookie boundaries).
-   **Env Management:** Provide `VITE_API_URL` at build time; rebuild for env changes.

> When self‑hosting or staging, ensure the backend’s cookie attributes (`SameSite=None; Secure`) and CORS allow‑list match the Vercel domain(s).

---

## 14) Compliance & Privacy

-   No tokens stored in JS‑accessible storage; session managed via HTTP‑only cookies.
-   Only minimal PII rendered (username, optional phone for drivers).  
    Avoid logging personal data in the client.

---

## 15) Troubleshooting

-   **401/403 on valid sessions:** Check `withCredentials/credentials: "include"` and CORS allow‑list on the API.
-   **Env not applied:** Vite requires the `VITE_` prefix; restart dev server after changes.
-   **Mixed content / Cookies not sent:** Use HTTPS on both API and frontend; `SameSite=None; Secure` requires TLS.

---

## 16) Versioning & Stability

-   The public client contract (cookie auth, error envelope, route shapes) mirrors the backend’s stable surface.  
    Non‑breaking UI changes ship frequently; breaking API changes are versioned or coordinated with backend release notes.

---

**Deployment:** Frontend hosted on **Vercel**.  
**Purpose:** A cleaner, easier, more sustainable commute. 🌱
