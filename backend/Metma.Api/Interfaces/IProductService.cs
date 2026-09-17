using Metma.Api.DTOs;
using Metma.Api.Models.Enums;

namespace Metma.Api.Interfaces;

public interface IProductService
{
    Task<IReadOnlyList<ProductDto>> GetBySiteAsync(Guid siteId, bool featuredOnly = false, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ProductDto>> GetBySiteCodeAsync(SiteCode siteCode, bool featuredOnly = false, CancellationToken cancellationToken = default);
    Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProductDto?> GetBySlugAsync(Guid siteId, string slug, CancellationToken cancellationToken = default);
    Task<ProductDto> CreateAsync(CreateProductRequest request, CancellationToken cancellationToken = default);
    Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
