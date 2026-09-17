using Metma.Api.Data;
using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models;
using Metma.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Metma.Api.Services;

public class BlogPostService(MetmaDbContext db) : IBlogPostService
{
    public async Task<IReadOnlyList<BlogPostDto>> GetBySiteAsync(Guid siteId, bool publishedOnly = true, CancellationToken cancellationToken = default)
    {
        var query = db.BlogPosts.AsNoTracking().Where(x => x.SiteId == siteId);

        if (publishedOnly)
        {
            query = query.Where(x => x.IsPublished);
        }

        var posts = await query
            .OrderByDescending(x => x.PublishedAtUtc ?? x.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        return posts.Select(ToDto).ToList();
    }

    public async Task<BlogPostDto?> GetBySlugAsync(SiteCode siteCode, string slug, CancellationToken cancellationToken = default)
    {
        var post = await db.BlogPosts.AsNoTracking()
            .Where(x => x.Site!.Code == siteCode && x.Slug == slug && x.IsPublished)
            .FirstOrDefaultAsync(cancellationToken);

        return post is null ? null : ToDto(post);
    }

    public async Task<BlogPostDto> CreateAsync(CreateBlogPostRequest request, CancellationToken cancellationToken = default)
    {
        var post = new BlogPost
        {
            SiteId = request.SiteId,
            Title = request.Title,
            Slug = request.Slug,
            Excerpt = request.Excerpt,
            BodyHtml = request.BodyHtml,
            CoverImageUrl = request.CoverImageUrl,
            IsPublished = request.IsPublished,
            PublishedAtUtc = request.IsPublished ? DateTime.UtcNow : null
        };

        db.BlogPosts.Add(post);
        await db.SaveChangesAsync(cancellationToken);
        return ToDto(post);
    }

    public async Task<BlogPostDto?> UpdateAsync(Guid id, UpdateBlogPostRequest request, CancellationToken cancellationToken = default)
    {
        var post = await db.BlogPosts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (post is null)
        {
            return null;
        }

        var wasPublished = post.IsPublished;
        post.Title = request.Title;
        post.Slug = request.Slug;
        post.Excerpt = request.Excerpt;
        post.BodyHtml = request.BodyHtml;
        post.CoverImageUrl = request.CoverImageUrl;
        post.IsPublished = request.IsPublished;
        post.UpdatedAtUtc = DateTime.UtcNow;

        if (!wasPublished && request.IsPublished)
        {
            post.PublishedAtUtc = DateTime.UtcNow;
        }

        await db.SaveChangesAsync(cancellationToken);
        return ToDto(post);
    }

    private static BlogPostDto ToDto(BlogPost post) =>
        new(
            post.Id,
            post.SiteId,
            post.Title,
            post.Slug,
            post.Excerpt,
            post.BodyHtml,
            post.CoverImageUrl,
            post.IsPublished,
            post.PublishedAtUtc);
}
