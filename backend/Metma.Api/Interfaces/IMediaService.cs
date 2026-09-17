using Metma.Api.DTOs;

namespace Metma.Api.Interfaces;

public interface IMediaService
{
    Task<IReadOnlyList<MediaAssetDto>> GetBySiteAsync(Guid? siteId, CancellationToken cancellationToken = default);
    Task<MediaAssetDto> RegisterAsync(CreateMediaAssetRequest request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}

/// <summary>
/// Placeholder for Cloudflare R2 uploads (S3-compatible). Wire AWS SDK / R2 client later.
/// </summary>
public interface IR2StorageService
{
    Task<string> BuildPublicUrlAsync(string key, CancellationToken cancellationToken = default);
    Task DeleteObjectAsync(string key, CancellationToken cancellationToken = default);
}
