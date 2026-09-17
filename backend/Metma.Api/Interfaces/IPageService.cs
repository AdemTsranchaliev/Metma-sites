using Metma.Api.DTOs;
using Metma.Api.Models.Enums;

namespace Metma.Api.Interfaces;

public interface IPageService
{
    Task<IReadOnlyList<PageDto>> GetBySiteAsync(Guid siteId, CancellationToken cancellationToken = default);
    Task<PageDto?> GetBySlugAsync(SiteCode siteCode, string slug, CancellationToken cancellationToken = default);
    Task<PageDto> CreateAsync(CreatePageRequest request, CancellationToken cancellationToken = default);
    Task<PageDto?> UpdateAsync(Guid id, UpdatePageRequest request, CancellationToken cancellationToken = default);
}
