namespace Metma.Api.DTOs;

public record ProductDto(
    Guid Id,
    Guid SiteId,
    Guid? CategoryId,
    string Sku,
    string Name,
    string Slug,
    string? ShortDescription,
    string? Description,
    decimal? Price,
    string Currency,
    string? ImageUrl,
    bool IsFeatured,
    bool IsActive,
    int SortOrder);

public record CreateProductRequest(
    Guid SiteId,
    Guid? CategoryId,
    string Sku,
    string Name,
    string Slug,
    string? ShortDescription,
    string? Description,
    decimal? Price,
    string Currency,
    string? ImageUrl,
    bool IsFeatured,
    int SortOrder);

public record UpdateProductRequest(
    Guid? CategoryId,
    string Sku,
    string Name,
    string Slug,
    string? ShortDescription,
    string? Description,
    decimal? Price,
    string Currency,
    string? ImageUrl,
    bool IsFeatured,
    bool IsActive,
    int SortOrder);
