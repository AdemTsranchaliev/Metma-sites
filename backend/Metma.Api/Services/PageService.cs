using Metma.Api.Data;
using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models;
using Metma.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Metma.Api.Services;

public class PageService(MetmaDbContext db) : IPageService
{
    public async Task<IReadOnlyList<PageDto>> GetBySiteAsync(Guid siteId, CancellationToken cancellationToken = default)
    {
        var pages = await db.Pages.AsNoTracking()
            .Where(x => x.SiteId == siteId)
            .OrderBy(x => x.Title)
            .ToListAsync(cancellationToken);

        return pages.Select(ToDto).ToList();
    }

    public async Task<PageDto?> GetBySlugAsync(SiteCode siteCode, string slug, CancellationToken cancellationToken = default)
    {
        var page = await db.Pages.AsNoTracking()
            .Where(x => x.Site!.Code == siteCode && x.Slug == slug && x.IsPublished)
            .FirstOrDefaultAsync(cancellationToken);

        return page is null ? null : ToDto(page);
    }

    public async Task<PageDto> CreateAsync(CreatePageRequest request, CancellationToken cancellationToken = default)
    {
        var page = new Page
        {
            SiteId = request.SiteId,
            Title = request.Title,
            Slug = request.Slug,
            HeroTitle = request.HeroTitle,
            HeroSubtitle = request.HeroSubtitle,
            BodyHtml = request.BodyHtml,
            MetaTitle = request.MetaTitle,
            MetaDescription = request.MetaDescription,
            RedirectUrl = request.RedirectUrl,
            IsPublished = request.IsPublished
        };

        db.Pages.Add(page);
        await db.SaveChangesAsync(cancellationToken);
        return ToDto(page);
    }

    public async Task<PageDto?> UpdateAsync(Guid id, UpdatePageRequest request, CancellationToken cancellationToken = default)
    {
        var page = await db.Pages.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (page is null)
        {
            return null;
        }

        page.Title = request.Title;
        page.Slug = request.Slug;
        page.HeroTitle = request.HeroTitle;
        page.HeroSubtitle = request.HeroSubtitle;
        page.BodyHtml = request.BodyHtml;
        page.MetaTitle = request.MetaTitle;
        page.MetaDescription = request.MetaDescription;
        page.RedirectUrl = request.RedirectUrl;
        page.IsPublished = request.IsPublished;
        page.UpdatedAtUtc = DateTime.UtcNow;

        await db.SaveChangesAsync(cancellationToken);
        return ToDto(page);
    }

    private static PageDto ToDto(Page page) =>
        new(
            page.Id,
            page.SiteId,
            page.Title,
            page.Slug,
            page.HeroTitle,
            page.HeroSubtitle,
            page.BodyHtml,
            page.MetaTitle,
            page.MetaDescription,
            page.RedirectUrl,
            page.IsPublished);
}
