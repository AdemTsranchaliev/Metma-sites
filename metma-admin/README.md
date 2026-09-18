# Metma Admin

Next.js admin panel for managing content across **BG / DE / USA** via `Metma.Api`.

## Run

```bash
cd metma-admin
cp .env.example .env.local   # if needed
npm install
npm run dev
```

Open: [http://localhost:3003](http://localhost:3003)

API default: `http://localhost:5080` (`NEXT_PUBLIC_API_BASE_URL`)

## What’s included

- Sidebar + **site switcher** (`?site=De|Bg|Usa`)
- Dashboard counts
- List views: Products, Pages, Blog, Media, Sites
- Graceful errors when API/SQL is down

## Next

- Auth (login / roles)
- Create / edit forms
- R2 upload UI
- Publish workflow
