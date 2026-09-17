# Metma.Api — ASP.NET Core 8 Web API

Shared backend for `metma-bg`, `metma-de`, and `metma-usa`.

## Run

```bash
dotnet run --launch-profile http
```

## Next steps

1. Point `ConnectionStrings:DefaultConnection` at Azure SQL / local MSSQL
2. `dotnet ef migrations add InitialCreate`
3. `dotnet ef database update`
4. Wire real Cloudflare R2 uploads in `R2StorageService`
