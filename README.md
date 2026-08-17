# Prajabandhan — Frontend UI Prototype

Premium matrimonial website UI for the **Kadiya Kumbhar / Prajapati** community.

## Scope

This project is **frontend only**:

- Next.js App Router + TypeScript + Tailwind CSS
- Mock/static data
- Demo interactions (wishlist localStorage, filters, forms, admin tables)
- No API, database, or real authentication

## Brand

Temporary brand placeholder: **Prajabandhan**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin demo login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Key routes

### Public

- `/` Homepage
- `/profiles` Profile listing + filters
- `/profile/[id]` Profile detail / biodata
- `/login`, `/register`, `/forgot-password`, `/change-password`
- `/wishlist`, `/dashboard`, `/my-profile`, `/partner-preferences`
- `/success-stories`, `/about`, `/contact`

### Admin

- `/admin/login`
- `/admin/dashboard`
- `/admin/men`, `/admin/women`, `/admin/children`
- Occupation pages under `/admin/business`, `/admin/doctors`, etc.
- Master pages under `/admin/states`, `/admin/cities`, etc.
- `/admin/settings`

## Notes

Backend/API/database integration is intentionally deferred. Keep using `src/data` and frontend state until services are added later.
