using Metma.Api.Data;
using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models;
using Metma.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Metma.Api.Services;

public class SiteService(MetmaDbContext db) : ISiteService
{
    public async Task<IReadOnlyList<SiteDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var sites = await db.Sites
            .AsNoTracking()
            .OrderBy(x => x.Code)
            .ToListAsync(cancellationToken);

        return sites.Select(ToDto).ToList();
    }

    public async Task<SiteDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var site = await db.Sites.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        return site is null ? null : ToDto(site);
    }

    public async Task<SiteDto?> GetByCodeAsync(SiteCode code, CancellationToken cancellationToken = default)
    {
        var site = await db.Sites.AsNoTracking().FirstOrDefaultAsync(x => x.Code == code, cancellationToken);
        return site is null ? null : ToDto(site);
    }

    public async Task<SiteDto> CreateAsync(CreateSiteRequest request, CancellationToken cancellationToken = default)
    {
        var site = new Site
        {
            Code = request.Code,
            Name = request.Name,
            Domain = request.Domain,
            DefaultLocale = request.DefaultLocale
        };

        db.Sites.Add(site);
        await db.SaveChangesAsync(cancellationToken);
        return ToDto(site);
    }

    public async Task<SiteDto?> UpdateAsync(Guid id, UpdateSiteRequest request, CancellationToken cancellationToken = default)
    {
        var site = await db.Sites.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (site is null)
        {
            return null;
        }

        site.Name = request.Name;
        site.Domain = request.Domain;
        site.DefaultLocale = request.DefaultLocale;
        site.IsActive = request.IsActive;
        site.UpdatedAtUtc = DateTime.UtcNow;

        await db.SaveChangesAsync(cancellationToken);
        return ToDto(site);
    }

    private static SiteDto ToDto(Site site) =>
        new(site.Id, site.Code, site.Name, site.Domain, site.DefaultLocale, site.IsActive);
}
