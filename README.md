# Metma-sites

Multi-site Metma platform: three Next.js frontends + one ASP.NET Core API (MSSQL, Azure App Service ready, Cloudflare R2 for media).

## Structure

```
Metma-sites/
├── backend/Metma.Api/     # C# API (controllers, models, services, EF Core)
├── metma-bg/              # Bulgaria frontend  → localhost:3000
├── metma-de/              # Germany frontend   → localhost:3001
└── metma-usa/             # USA frontend       → localhost:3002
```

## Stack

| Layer | Tech |
|-------|------|
| Frontends | Next.js + TypeScript + Tailwind |
| Backend | ASP.NET Core 8 |
| Database | MSSQL / Azure SQL |
| Hosting | Azure App Service |
| Media | Cloudflare R2 |

## Backend folders

- `Controllers/` — Sites, Products, Pages, BlogPosts, Media
- `Models/` — entities + `Enums/SiteCode`
- `DTOs/` — request/response contracts
- `Interfaces/` + `Services/` — business logic
- `Data/MetmaDbContext.cs` — EF Core + seed for Bg/De/Usa
- `Configuration/` — R2 + CORS settings

## Run locally

### API

```bash
cd backend/Metma.Api
# set ConnectionStrings:DefaultConnection in appsettings.Development.json
dotnet run --launch-profile http
```

Swagger: http://localhost:5080/swagger

### Frontends

```bash
cd metma-bg && cp .env.example .env.local && npm run dev
cd metma-de && cp .env.example .env.local && npm run dev
cd metma-usa && cp .env.example .env.local && npm run dev
```

## Useful API examples

- `GET /api/sites`
- `GET /api/sites/by-code/De`
- `GET /api/products?siteCode=Bg&featuredOnly=true`
- `GET /api/pages/by-slug?siteCode=De&slug=home`
- `POST /api/media/register` — store R2 object metadata after upload

Admin panel and full R2 upload client come next.
