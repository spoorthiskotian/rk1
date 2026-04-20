# RK — Multi-Disciplinary Engineer Portfolio

A cinematic, silver-themed portfolio for a polymath engineer (software · hardware · robotics · IoT · automotive). React + Vite frontend, Express + MariaDB backend with an authenticated admin console.

## Stack

**Frontend**
- React 18 · TypeScript · Vite
- Tailwind CSS (custom silver/ink theme, Fraunces + Space Grotesk + JetBrains Mono)
- Framer Motion for page/loader/card transitions
- React Router

**Backend**
- Node.js + Express (ESM)
- MariaDB (database name: `rk`)
- JWT auth, bcrypt-hashed admin password

## Directory layout

```
d:\rk
├── backend/                  Express API + MariaDB
│   ├── server.js
│   ├── db.js
│   ├── schema.sql            CREATE DATABASE rk + tables
│   ├── routes/
│   ├── middleware/
│   └── scripts/seed.js       Seeds dummy profile / gallery / projects / experiences
└── frontend/                 React + Vite
    ├── index.html
    └── src/
        ├── App.tsx
        ├── pages/            Home, Experience, WorkDetail, AdminLogin, AdminDashboard
        ├── components/       Loader, Navbar, Hero, Gallery, About, Work, Contact, Footer, CursorGlow
        └── lib/              api.ts, types.ts
```

## Setup

### 1. Database

Install MariaDB (or MySQL 8+). Make sure the service is running.

Create the database + tables:

```bash
mysql -u root -p < backend/schema.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# edit .env with your DB credentials and a long random JWT_SECRET
npm install
npm run seed       # seeds admin user + dummy data
npm run dev        # dev with nodemon
# or: npm start
```

Default admin credentials (change in `.env`):
- username: `rk_admin`
- password: `rk_super_secret`

Backend runs at `http://localhost:4000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Vite is configured to proxy `/api/*` to the backend automatically.

## Admin access

Per your spec, the admin login is an unlinked endpoint — users cannot discover it. An admin opens:

```
http://localhost:5173/login
```

…authenticates, then lands on `/admin` where four tabs let them edit:

- **Profile** — name, title, tagline, hero image URL, education fields (university / college / branch / program), about description, email, business/personal WhatsApp, LinkedIn, Instagram, Facebook, X URLs
- **Gallery** — add/delete images (image URL + caption)
- **Projects** — create/edit/delete work entries (title, category, images, description, tech stack, live URL, repo URL)
- **Experiences** — company, role, designation, description, start/end years

All edits are persisted to MariaDB immediately and reflect on the public site on refresh.

## Page map

| Route             | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `/`               | Home: hero, gallery, about, work (animated cards), contact, footer |
| `/experience`     | Full experience timeline page                           |
| `/work/:id`       | Project detail page — receives the hovered card image via shared `layoutId` transition |
| `/login`          | Hidden admin login                                      |
| `/admin`          | Admin dashboard (guarded by JWT)                        |

## Highlights

- **3-second loader** — shiny-silver "RK" mark drawn in via animated SVG stroke + film-grain vignette, shown once per session.
- **Cinematic dark + silver theme** — every page is dark with radial light wash, SVG film grain, and shine-gradient silver headings.
- **Shared element transition** — hovering a Work card expands it horizontally; clicking View animates the image + title smoothly into the detail page (Framer Motion `layoutId`).
- **Dual contact form** — segmented toggle morphs between Business and Personal fields; messages save to `contact_messages`.
- **Independent admin** — auth-gated CRUD for every content type; nothing hard-coded in the frontend.

## Content

All content is stored in MariaDB. The frontend fetches everything at runtime — images, copy, links, education, experience, projects. The seed script preloads believable dummy content (Apogée telemetry cloud, H.A.N.D.S. prosthetic, Hex-Strategy IoT grid, K. Herzer drive-by-wire, HUMAN? identity gate, Saarthi rover) so the site looks real on first boot. Delete or edit any of it from `/admin`.

## Production build

```bash
# backend
cd backend && npm start

# frontend
cd frontend && npm run build && npm run preview
```

For deployment behind a single domain, serve the frontend `dist/` from a static host / Nginx and proxy `/api/*` to the Node server. The admin route stays at `/login` on your domain (e.g. `rk.in/login`).

## Security notes

- Change `ADMIN_PASSWORD` and `JWT_SECRET` in `.env` before shipping.
- Admin routes require `Authorization: Bearer <token>`; public endpoints (GET profile/gallery/projects/experiences, POST contact) do not.
- bcrypt cost factor is 10; raise for production.
