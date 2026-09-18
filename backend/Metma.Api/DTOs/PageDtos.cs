namespace Metma.Api.DTOs;

public record PageDto(
    Guid Id,
    Guid SiteId,
    string Title,
    string Slug,
    string? HeroTitle,
    string? HeroSubtitle,
    string? BodyHtml,
    string? MetaTitle,
    string? MetaDescription,
    string? RedirectUrl,
    bool IsPublished);

public record CreatePageRequest(
    Guid SiteId,
    string Title,
    string Slug,
    string? HeroTitle,
    string? HeroSubtitle,
    string? BodyHtml,
    string? MetaTitle,
    string? MetaDescription,
    string? RedirectUrl,
    bool IsPublished);

public record UpdatePageRequest(
    string Title,
    string Slug,
    string? HeroTitle,
    string? HeroSubtitle,
    string? BodyHtml,
    string? MetaTitle,
    string? MetaDescription,
    string? RedirectUrl,
    bool IsPublished);
