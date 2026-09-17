using Metma.Api.Models;
using Metma.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Metma.Api.Data;

public class MetmaDbContext(DbContextOptions<MetmaDbContext> options) : DbContext(options)
{
    public DbSet<Site> Sites => Set<Site>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<Page> Pages => Set<Page>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<MediaAsset> MediaAssets => Set<MediaAsset>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Site>(entity =>
        {
            entity.HasIndex(x => x.Code).IsUnique();
            entity.HasIndex(x => x.Domain).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(200);
            entity.Property(x => x.Domain).HasMaxLength(255);
            entity.Property(x => x.DefaultLocale).HasMaxLength(10);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasIndex(x => new { x.SiteId, x.Slug }).IsUnique();
            entity.HasIndex(x => new { x.SiteId, x.Sku }).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(300);
            entity.Property(x => x.Sku).HasMaxLength(100);
            entity.Property(x => x.Slug).HasMaxLength(300);
            entity.Property(x => x.Currency).HasMaxLength(3);
            entity.Property(x => x.Price).HasPrecision(18, 2);
            entity.HasOne(x => x.Site).WithMany(x => x.Products).HasForeignKey(x => x.SiteId);
            entity.HasOne(x => x.Category).WithMany(x => x.Products).HasForeignKey(x => x.CategoryId);
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.HasIndex(x => new { x.SiteId, x.Slug }).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(200);
            entity.Property(x => x.Slug).HasMaxLength(200);
            entity.HasOne(x => x.Site).WithMany().HasForeignKey(x => x.SiteId);
        });

        modelBuilder.Entity<Page>(entity =>
        {
            entity.HasIndex(x => new { x.SiteId, x.Slug }).IsUnique();
            entity.Property(x => x.Title).HasMaxLength(300);
            entity.Property(x => x.Slug).HasMaxLength(300);
            entity.HasOne(x => x.Site).WithMany(x => x.Pages).HasForeignKey(x => x.SiteId);
        });

        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasIndex(x => new { x.SiteId, x.Slug }).IsUnique();
            entity.Property(x => x.Title).HasMaxLength(300);
            entity.Property(x => x.Slug).HasMaxLength(300);
            entity.HasOne(x => x.Site).WithMany(x => x.BlogPosts).HasForeignKey(x => x.SiteId);
        });

        modelBuilder.Entity<MediaAsset>(entity =>
        {
            entity.Property(x => x.FileName).HasMaxLength(255);
            entity.Property(x => x.ContentType).HasMaxLength(100);
            entity.Property(x => x.R2Key).HasMaxLength(500);
            entity.Property(x => x.PublicUrl).HasMaxLength(1000);
            entity.HasOne(x => x.Site).WithMany().HasForeignKey(x => x.SiteId);
        });

        SeedSites(modelBuilder);
    }

    private static void SeedSites(ModelBuilder modelBuilder)
    {
        var seedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Site>().HasData(
            new Site
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Code = SiteCode.Bg,
                Name = "Metma Bulgaria",
                Domain = "metma.bg",
                DefaultLocale = "bg",
                IsActive = true,
                CreatedAtUtc = seedDate
            },
            new Site
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Code = SiteCode.De,
                Name = "Metma Germany",
                Domain = "metma-de.com",
                DefaultLocale = "de",
                IsActive = true,
                CreatedAtUtc = seedDate
            },
            new Site
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Code = SiteCode.Usa,
                Name = "Metma USA",
                Domain = "metma-usa.com",
                DefaultLocale = "en",
                IsActive = true,
                CreatedAtUtc = seedDate
            });
    }
}
