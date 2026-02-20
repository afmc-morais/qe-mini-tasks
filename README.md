# qe-mini-tasks (SaaS-style)

Senior Quality Engineering portfolio project built to showcase:
- E2E automation with Playwright
- CI-ready database setup (PostgreSQL + Prisma migrations + seed)
- Authentication testing (happy path + access control)
- Stable selectors and accessibility-first UI

---

## Tech Stack
- Next.js + TailwindCSS
- Prisma ORM (v7) + PostgreSQL (Docker)
- Playwright (E2E)

---

## Local Setup

### 1) Start PostgreSQL (Docker)
```
docker compose up -d
```
---

### 2) Configure env

Create a .env at project root:

```
DATABASE_URL="postgresql://qe:qe_pass@localhost:5433/qe_mini_tasks?schema=public"
JWT_SECRET="local_dev_secret"
```
---

### 3) Migrate + seed

```
npx prisma migrate dev
npx prisma db seed
```
---

### 4) Run the app

```
npm run dev
```
---

## Health check:

- GET /api/health

Protected area:

- /app/tasks

Login:

- /login

Demo credentials (seeded):

- Email: demo@qe-mini-tasks.com
- Password: demo123

---

### E2E Tests (Playwright)

## Run tests

```
npm run pw:test
```

## Open report

```
npm run pw:report
```
---

## What this project demonstrates (Senior QE focus)

- Risk-based E2E coverage for authentication and access control
- Reliable, accessibility-first locators (getByLabel, roles)
- Reproducible test environments (migrations + seed)
- CI-friendly structure (ready for GitHub Actions)
