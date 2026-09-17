namespace Metma.Api.Models;

public class MediaAsset
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? SiteId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long SizeBytes { get; set; }
    public string R2Key { get; set; } = string.Empty;
    public string PublicUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public Site? Site { get; set; }
}
