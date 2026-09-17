using Metma.Api.DTOs;
using Metma.Api.Models.Enums;

namespace Metma.Api.Interfaces;

public interface ISiteService
{
    Task<IReadOnlyList<SiteDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<SiteDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<SiteDto?> GetByCodeAsync(SiteCode code, CancellationToken cancellationToken = default);
    Task<SiteDto> CreateAsync(CreateSiteRequest request, CancellationToken cancellationToken = default);
    Task<SiteDto?> UpdateAsync(Guid id, UpdateSiteRequest request, CancellationToken cancellationToken = default);
}
