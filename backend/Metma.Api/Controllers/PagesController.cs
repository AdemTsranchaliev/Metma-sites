using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Metma.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController(IPageService pageService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PageDto>>> GetBySite([FromQuery] Guid siteId, CancellationToken cancellationToken)
        => Ok(await pageService.GetBySiteAsync(siteId, cancellationToken));

    [HttpGet("by-slug")]
    public async Task<ActionResult<PageDto>> GetBySlug(
        [FromQuery] SiteCode siteCode,
        [FromQuery] string slug,
        CancellationToken cancellationToken)
    {
        var page = await pageService.GetBySlugAsync(siteCode, slug, cancellationToken);
        return page is null ? NotFound() : Ok(page);
    }

    [HttpPost]
    public async Task<ActionResult<PageDto>> Create([FromBody] CreatePageRequest request, CancellationToken cancellationToken)
    {
        var created = await pageService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetBySlug), new { siteCode = SiteCode.Bg, slug = created.Slug }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<PageDto>> Update(Guid id, [FromBody] UpdatePageRequest request, CancellationToken cancellationToken)
    {
        var updated = await pageService.UpdateAsync(id, request, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }
}
