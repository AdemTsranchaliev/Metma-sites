using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Metma.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController(IBlogPostService blogPostService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BlogPostDto>>> GetBySite(
        [FromQuery] Guid siteId,
        [FromQuery] bool publishedOnly = true,
        CancellationToken cancellationToken = default)
        => Ok(await blogPostService.GetBySiteAsync(siteId, publishedOnly, cancellationToken));

    [HttpGet("by-slug")]
    public async Task<ActionResult<BlogPostDto>> GetBySlug(
        [FromQuery] SiteCode siteCode,
        [FromQuery] string slug,
        CancellationToken cancellationToken)
    {
        var post = await blogPostService.GetBySlugAsync(siteCode, slug, cancellationToken);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<BlogPostDto>> Create([FromBody] CreateBlogPostRequest request, CancellationToken cancellationToken)
    {
        var created = await blogPostService.CreateAsync(request, cancellationToken);
        return Ok(created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<BlogPostDto>> Update(Guid id, [FromBody] UpdateBlogPostRequest request, CancellationToken cancellationToken)
    {
        var updated = await blogPostService.UpdateAsync(id, request, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }
}
