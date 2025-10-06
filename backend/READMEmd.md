# GreenRide API — Backend

GreenRide’s backend is a stateless REST service for authentication, ride publication and discovery, seat bookings, eco-impact computation, and user achievement tracking. It is designed for browser clients that use **HTTP-only JWT cookies** with **CORS credentials** enabled.

---

## 1) Architecture & Domain

### Runtime & Data

-   **Express (Node.js)** as the application layer.
-   **MongoDB (Mongoose)** as the persistence layer, favoring document models with relational references where needed (**User**, **Ride**, **Booking**).

### Core Domain Flows

-   **Auth** — Registration/Login produce a JWT set as an HTTP-only cookie; Logout clears it. Middleware (`auth`, `isAuth`, `isGuest`) provides coarse-grained access control.
-   **Rides** — Drivers create and manage rides. Public search supports `from`, `to`, `date`, and `passengers` filters. Reads are public; mutation is owner-scoped.
-   **Bookings** — Passengers reserve seats against a ride. Booking mutates **both** ride capacity and eco stats for passenger and driver, with strict authorization on read.
-   **Eco Impact** — Derived values calculated from **approximated distance** (duration-based) and **occupants**. Recomputed on every booking create/cancel.
-   **Achievements** — Threshold-based (e.g., total rides, CO₂ saved). Persisted on the user document and recomputed as eco stats change.

---

## 2) Security Model

### JWT in HTTP-only Cookie

-   Token is issued on successful auth and stored in a cookie with `httpOnly`, `sameSite="none"`, `secure` (in production).
-   The server treats the cookie as the single source of truth; no bearer tokens in headers are required.

### Session Hygiene

-   On verification failure or expiry, the cookie is proactively cleared.
-   `isAuth` short-circuits unauthorized access with **401**.
-   `isGuest` prevents duplicate login/register attempts by already authenticated users with **403**.

### CORS & Credentials

-   Origins are explicitly allow-listed.
-   `credentials: true` **must** be used by the client; HTTPS is required in production to satisfy `secure` cookies.

---

## 3) Data Integrity & Concurrency

### Seat Accounting

-   Book requests validate **availability** and **self-booking** (driver cannot book own ride).
-   Seats are decremented using an atomic update condition (`$inc` with `seatsAvailable: { $gte: seats }`).  
    If the update races and fails, the just-created booking is rolled back (deleted) and a user-facing message indicates seats were taken.

### Passenger Set & Eco Impact

-   Ride `passengers` is derived from **non-cancelled bookings** and stored as a unique list of user IDs.
-   `occupants = 1 (driver) + unique passengers`.
-   `ecoImpact` is recomputed for the ride on every booking create/cancel.
-   **Both** passenger and driver eco stats are adjusted (+/–) and floored at zero to prevent negative drift.

### Status Transitions

-   Booking: `pending → confirmed` (service creates directly as `confirmed`), `confirmed → cancelled` (on user cancellation).  
    Only the **booking owner** can cancel.

---

## 4) Validation & Error Semantics

### Validation

-   Mongoose schema validation for structural integrity.
-   Controller-level business validations (e.g., seat availability, ownership checks).
-   Normalization for critical fields (trim, case folding for email; password confirmation checks).

### Error Surface

-   Uniform error payload:
    ```json
    { "error": "message" }
    ```
-   Status codes:
    -   **400** – invalid input / business rule violation
    -   **401** – unauthenticated
    -   **403** – forbidden (ownership or access)
    -   **404** – resource not found
    -   **500** – unexpected server error

---

## 5) Performance & Scalability Considerations

-   **Query Paths** — Search endpoints apply anchored day windows for `date` and regex matching for `from`/`to`; case-insensitive indexes are recommended for scale.
-   **Population Strategy** — Minimal selective population (e.g., `driver: username, rating, car`) limits payload size without sacrificing UI needs.
-   **Derived Values** — Eco computations are **O(1)** and persisted, avoiding repeated recomputation on read paths.
-   **Write Contention** — Atomic seat operations mitigate over-booking under concurrency.

---

## 6) Observability & Operations

### Logging

-   Startup logs for DB connectivity.
-   Controller-level error logs for unexpected exceptions.
-   Authentication failures emit explicit messages without leaking secrets.

### Runtime Configuration (conceptual keys)

-   **Database:** `MONGO_URI`, `MONGO_DB_NAME`
-   **Auth:** `JWT_SECRET`, `AUTH_COOKIE_NAME`
-   **Server:** `PORT`, `NODE_ENV`
-   **CORS:** allow-listed origins configured in server code

> Values are expected to be provided via environment configuration in your deployment platform. **No plaintext defaults** should be relied upon for production.

### Deployment Posture

-   Enforce **HTTPS** on the frontend domain(s).
-   Ensure CORS origins match deployed client URLs.
-   Plan **JWT secret rotation**; tokens are short-lived (`expiresIn: 2d`) by default.

---

## 7) Compatibility Contract (Frontend)

-   Clients **must** send credentials with every request.
-   Date filters use a **day window** on `departureDate`; client UIs should pass ISO date or `YYYY-MM-DD`.
-   Seat selection must be an integer **≥ 1**; client should surface server messages for races (“Seats were just taken…”).
-   Public reads are cacheable; mutations require auth cookie.

---

## 8) Extendability & Risk Controls

### Recommended Enhancements

-   Input schema validation (**Zod/Joi**) to unify request contracts and error messages.
-   **Rate limiting** on auth and booking endpoints.
-   **Pagination** for ride and booking lists.
-   **Idempotency keys** for booking creation to avoid duplicate posts on flaky networks.
-   **Soft deletes** / archival flags for auditability.
-   **OpenAPI** contract + Swagger UI for consumer integration.
-   **Metrics & tracing** (e.g., request latency, booking failure reasons, seat contention rate).

### Data Lifecycle

-   Achievements are recomputed **deterministically** from `ecoStats`; they are also persisted with `unlockedAt` for timeline UX.
-   Eco stats are **monotonic** except when reversing actions (cancellation), with non-negative floors.

---

## 9) Compliance & Security Posture

-   Passwords are hashed using **bcrypt** before persistence; raw passwords are never logged.
-   Cookies are **HTTP-only** and **secure** in production, mitigating XSS token theft.
-   No PII is returned beyond what the routes explicitly select; public profile endpoint limits exposure.

---

## Installation (Local)

### Prereqs

-   **Node.js 18+** (recommended **20+**)
-   **MongoDB Atlas** database (connection string)
-   Frontend URL for CORS (e.g., `http://localhost:5173` for local)

### Steps

1. **Install deps**
    ```bash
    npm install
    ```
2. **Configure environment** (set in your shell or a local env file that you **do not commit**)
    ```bash
    PORT=8080
    NODE_ENV=development
    MONGO_URI=<your_mongodb_uri>
    MONGO_DB_NAME=greenride
    JWT_SECRET=<strong_random_string>
    AUTH_COOKIE_NAME=auth
    ```
3. **Run the API**
    ```bash
    npm run dev   # if using nodemon
    # or
    node src/server.js
    ```
4. **Client config**  
   Ensure your client sends credentials:
    ```ts
    fetch("/api/...", { credentials: "include" }); // or Axios with { withCredentials: true }
    ```
    Add the client origin to the server’s allowed origins (CORS config in `server.js`).

---

## Environment & Availability

### Production (Fly.io)

-   **Base URL:** `https://greenride-api.fly.dev/api`
-   **Cookie Scope:** issued for the Fly.io domain; HTTP-only, `SameSite=None`, `Secure` (production).
-   **CORS:** configured to allow the public frontend at `https://green-ride-flax.vercel.app` (credentials required).
-   **Auth Contract:** clients must send requests with credentials (e.g., `withCredentials: true`).
-   **Observed Behavior:** cold starts are minimized via Fly Machines auto-start; health and error logs are monitored via Fly tooling.

### Local (Developer Environment)

-   **Base URL:** `http://localhost:8080/api`
-   **CORS:** allow-list includes `http://localhost:5173` for local frontend development.

### Versioning & Backwards Compatibility

-   The public contract (routes, auth via HTTP-only cookie, error envelope `{ error: string }`) is **stable**.
-   Non-breaking updates may occur without notice; breaking changes will be versioned or communicated prior to rollout.
