# Real Estate Marketplace

A modern full-stack real estate marketplace built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **shadcn/ui** (`@base-ui/react`), **Clerk** for authentication, and **Prisma 7 + Prisma Postgres** for data.

## Features

- **Home page** with animated sections: hero + functional search box (Buy/Rent toggle), stats strip, browse-by-category, latest properties with All / For Sale / For Rent tabs, featured listings, how-it-works, CTA banner.
- **Marketplace** with URL-driven search (`?q=` and `?status=`) — hit the DB with case-insensitive title/location filtering.
- **Properties page** with branded header, live listing stats (total / sale / rent / locations) and a filter toolbar.
- **Property detail pages** — breadcrumbs, quick-facts, highlights, sticky agent contact form, and similar listings.
- **Add property modal** (server action backed) that persists listings to Postgres.
- **Clerk authentication** with user sync via webhooks into a `User` model.

## Tech Stack

| Layer     | Tech                                              |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19                |
| Styling   | Tailwind CSS v4 + shadcn/ui + @base-ui/react      |
| Auth      | Clerk (email/password, webhook user sync)         |
| Database  | Prisma 7 + @prisma/adapter-pg + Prisma Postgres   |
| Icons     | lucide-react                                      |

## Getting Started

### Prerequisites

- Node.js 20+
- A Prisma Postgres (or any Postgres) connection string
- Clerk account with a publishable key, secret key, and webhook signing secret

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Prisma Postgres / Postgres connection string
DATABASE_URL="postgresql://..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
CLERK_WEBHOOK_SIGNING_SECRET="whsec_..."
```

Create a local copy for Next.js runtime secrets as well (`.env.local`) with the Clerk keys.

### 3. Set up the database

This project uses **Prisma 7** with the **driver adapter** pattern and a `prisma.config.ts` (no datasource URL in the schema):

```bash
npm run db:generate   # generate the Prisma client
npm run db:migrate    # apply migrations & generate client
```

Or, to create the schema without migrations:

```bash
npm run db:push
```

Seed the database with sample properties:

```bash
npx tsx prisma/seed.ts
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `npm run dev`            | Start the dev server              |
| `npm run build`          | Production build                  |
| `npm run start`          | Start the production server       |
| `npm run typecheck`      | Run TypeScript type checking      |
| `npm run lint`           | Run ESLint                        |
| `npm run format`         | Format with Prettier              |
| `npm run db:generate`    | Generate the Prisma client        |
| `npm run db:migrate`     | Apply DB migrations               |
| `npm run db:push`        | Push schema without migrations    |
| `npm run db:studio`      | Open Prisma Studio                |

## Project Structure

```
app/
  (protected)/properties/   # Properties listing page with stats + filter toolbar
  api/webhooks/clerk/       # Clerk user webhook sync
  marketplace/              # Searchable marketplace
  property/[propertyId]/    # Property detail page
components/
  home/                     # Home page sections (hero, stats, categories, listings…)
  layout/                   # FrontendLayout wrapper
  properties/               # Card, grid, toolbar, add-property modal, input form
  ui/                       # shadcn/ui primitives + Reveal animation wrapper
lib/
  db.ts                     # Prisma client (driver adapter)
  actions.ts                # Server actions (save property, revalidation)
prisma/
  schema.prisma            # Property + User models
  seed.ts                  # Sample listings
```

## Routes

| Route                     | Description                            |
| ------------------------- | -------------------------------------- |
| `/`                       | Landing page with all home sections    |
| `/marketplace`            | Browse + search all listings           |
| `/properties`             | Full collection with stats + filters   |
| `/property/[propertyId]`  | Listing detail page                    |
| `/sign-in`, `/sign-up`    | Clerk auth pages                       |

## Notes

- **Next.js 16**: this version has breaking changes vs. earlier versions — consult the guides in `node_modules/next/dist/docs/` when making framework-level changes.
- **Prisma 7**: uses `prisma.config.ts` + driver adapters (`@prisma/adapter-pg`); the datasource URL lives in the config, not the schema.
- The home page is statically prerendered, so the "Latest Properties" snapshot updates after a new property is saved (server action revalidates `/`, `/marketplace`, and `/properties`).