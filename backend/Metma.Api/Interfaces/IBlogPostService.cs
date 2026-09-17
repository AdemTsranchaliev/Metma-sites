using Metma.Api.DTOs;
using Metma.Api.Models.Enums;

namespace Metma.Api.Interfaces;

public interface IBlogPostService
{
    Task<IReadOnlyList<BlogPostDto>> GetBySiteAsync(Guid siteId, bool publishedOnly = true, CancellationToken cancellationToken = default);
    Task<BlogPostDto?> GetBySlugAsync(SiteCode siteCode, string slug, CancellationToken cancellationToken = default);
    Task<BlogPostDto> CreateAsync(CreateBlogPostRequest request, CancellationToken cancellationToken = default);
    Task<BlogPostDto?> UpdateAsync(Guid id, UpdateBlogPostRequest request, CancellationToken cancellationToken = default);
}
