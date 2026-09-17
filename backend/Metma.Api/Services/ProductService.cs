using Metma.Api.Data;
using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models;
using Metma.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Metma.Api.Services;

public class ProductService(MetmaDbContext db) : IProductService
{
    public async Task<IReadOnlyList<ProductDto>> GetBySiteAsync(Guid siteId, bool featuredOnly = false, CancellationToken cancellationToken = default)
    {
        var query = db.Products.AsNoTracking().Where(x => x.SiteId == siteId && x.IsActive);

        if (featuredOnly)
        {
            query = query.Where(x => x.IsFeatured);
        }

        var products = await query
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Name)
            .ToListAsync(cancellationToken);

        return products.Select(ToDto).ToList();
    }

    public async Task<IReadOnlyList<ProductDto>> GetBySiteCodeAsync(SiteCode siteCode, bool featuredOnly = false, CancellationToken cancellationToken = default)
    {
        var siteId = await db.Sites.AsNoTracking()
            .Where(x => x.Code == siteCode)
            .Select(x => x.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (siteId == Guid.Empty)
        {
            return [];
        }

        return await GetBySiteAsync(siteId, featuredOnly, cancellationToken);
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await db.Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        return product is null ? null : ToDto(product);
    }

    public async Task<ProductDto?> GetBySlugAsync(Guid siteId, string slug, CancellationToken cancellationToken = default)
    {
        var product = await db.Products.AsNoTracking()
            .FirstOrDefaultAsync(x => x.SiteId == siteId && x.Slug == slug && x.IsActive, cancellationToken);
        return product is null ? null : ToDto(product);
    }

    public async Task<ProductDto> CreateAsync(CreateProductRequest request, CancellationToken cancellationToken = default)
    {
        var product = new Product
        {
            SiteId = request.SiteId,
            CategoryId = request.CategoryId,
            Sku = request.Sku,
            Name = request.Name,
            Slug = request.Slug,
            ShortDescription = request.ShortDescription,
            Description = request.Description,
            Price = request.Price,
            Currency = request.Currency,
            ImageUrl = request.ImageUrl,
            IsFeatured = request.IsFeatured,
            SortOrder = request.SortOrder
        };

        db.Products.Add(product);
        await db.SaveChangesAsync(cancellationToken);
        return ToDto(product);
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request, CancellationToken cancellationToken = default)
    {
        var product = await db.Products.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (product is null)
        {
            return null;
        }

        product.CategoryId = request.CategoryId;
        product.Sku = request.Sku;
        product.Name = request.Name;
        product.Slug = request.Slug;
        product.ShortDescription = request.ShortDescription;
        product.Description = request.Description;
        product.Price = request.Price;
        product.Currency = request.Currency;
        product.ImageUrl = request.ImageUrl;
        product.IsFeatured = request.IsFeatured;
        product.IsActive = request.IsActive;
        product.SortOrder = request.SortOrder;
        product.UpdatedAtUtc = DateTime.UtcNow;

        await db.SaveChangesAsync(cancellationToken);
        return ToDto(product);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await db.Products.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (product is null)
        {
            return false;
        }

        product.IsActive = false;
        product.UpdatedAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static ProductDto ToDto(Product product) =>
        new(
            product.Id,
            product.SiteId,
            product.CategoryId,
            product.Sku,
            product.Name,
            product.Slug,
            product.ShortDescription,
            product.Description,
            product.Price,
            product.Currency,
            product.ImageUrl,
            product.IsFeatured,
            product.IsActive,
            product.SortOrder);
}
