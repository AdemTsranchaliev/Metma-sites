using Metma.Api.Configuration;
using Metma.Api.Data;
using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Metma.Api.Services;

public class MediaService(MetmaDbContext db, IR2StorageService r2Storage) : IMediaService
{
    public async Task<IReadOnlyList<MediaAssetDto>> GetBySiteAsync(Guid? siteId, CancellationToken cancellationToken = default)
    {
        var query = db.MediaAssets.AsNoTracking().AsQueryable();

        if (siteId.HasValue)
        {
            query = query.Where(x => x.SiteId == siteId);
        }

        var assets = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        return assets.Select(ToDto).ToList();
    }

    public async Task<MediaAssetDto> RegisterAsync(CreateMediaAssetRequest request, CancellationToken cancellationToken = default)
    {
        var asset = new MediaAsset
        {
            SiteId = request.SiteId,
            FileName = request.FileName,
            ContentType = request.ContentType,
            SizeBytes = request.SizeBytes,
            R2Key = request.R2Key,
            PublicUrl = string.IsNullOrWhiteSpace(request.PublicUrl)
                ? await r2Storage.BuildPublicUrlAsync(request.R2Key, cancellationToken)
                : request.PublicUrl,
            AltText = request.AltText
        };

        db.MediaAssets.Add(asset);
        await db.SaveChangesAsync(cancellationToken);
        return ToDto(asset);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var asset = await db.MediaAssets.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (asset is null)
        {
            return false;
        }

        await r2Storage.DeleteObjectAsync(asset.R2Key, cancellationToken);
        db.MediaAssets.Remove(asset);
        await db.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static MediaAssetDto ToDto(MediaAsset asset) =>
        new(asset.Id, asset.SiteId, asset.FileName, asset.ContentType, asset.SizeBytes, asset.PublicUrl, asset.AltText);
}

public class R2StorageService(IOptions<R2Options> options, ILogger<R2StorageService> logger) : IR2StorageService
{
    private readonly R2Options _options = options.Value;

    public Task<string> BuildPublicUrlAsync(string key, CancellationToken cancellationToken = default)
    {
        var baseUrl = _options.PublicBaseUrl.TrimEnd('/');
        return Task.FromResult($"{baseUrl}/{key.TrimStart('/')}");
    }

    public Task DeleteObjectAsync(string key, CancellationToken cancellationToken = default)
    {
        // TODO: integrate AWS SDK S3 client against Cloudflare R2 endpoint.
        logger.LogInformation("R2 delete placeholder for key {Key}", key);
        return Task.CompletedTask;
    }
}
