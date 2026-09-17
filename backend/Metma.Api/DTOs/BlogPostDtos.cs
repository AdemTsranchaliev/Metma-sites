namespace Metma.Api.DTOs;

public record BlogPostDto(
    Guid Id,
    Guid SiteId,
    string Title,
    string Slug,
    string? Excerpt,
    string? BodyHtml,
    string? CoverImageUrl,
    bool IsPublished,
    DateTime? PublishedAtUtc);

public record CreateBlogPostRequest(
    Guid SiteId,
    string Title,
    string Slug,
    string? Excerpt,
    string? BodyHtml,
    string? CoverImageUrl,
    bool IsPublished);

public record UpdateBlogPostRequest(
    string Title,
    string Slug,
    string? Excerpt,
    string? BodyHtml,
    string? CoverImageUrl,
    bool IsPublished);
