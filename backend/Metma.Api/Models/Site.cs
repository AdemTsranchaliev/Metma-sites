using Metma.Api.Models.Enums;

namespace Metma.Api.Models;

public class Site
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public SiteCode Code { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Domain { get; set; } = string.Empty;
    public string DefaultLocale { get; set; } = "en";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Page> Pages { get; set; } = new List<Page>();
    public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();
}
