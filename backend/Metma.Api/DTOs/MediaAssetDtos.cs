namespace Metma.Api.DTOs;

public record MediaAssetDto(
    Guid Id,
    Guid? SiteId,
    string FileName,
    string ContentType,
    long SizeBytes,
    string PublicUrl,
    string? AltText);

public record CreateMediaAssetRequest(
    Guid? SiteId,
    string FileName,
    string ContentType,
    long SizeBytes,
    string R2Key,
    string PublicUrl,
    string? AltText);
