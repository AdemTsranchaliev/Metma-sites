using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Metma.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SitesController(ISiteService siteService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SiteDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await siteService.GetAllAsync(cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SiteDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var site = await siteService.GetByIdAsync(id, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }

    [HttpGet("by-code/{code}")]
    public async Task<ActionResult<SiteDto>> GetByCode(SiteCode code, CancellationToken cancellationToken)
    {
        var site = await siteService.GetByCodeAsync(code, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }

    [HttpPost]
    public async Task<ActionResult<SiteDto>> Create([FromBody] CreateSiteRequest request, CancellationToken cancellationToken)
    {
        var created = await siteService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<SiteDto>> Update(Guid id, [FromBody] UpdateSiteRequest request, CancellationToken cancellationToken)
    {
        var updated = await siteService.UpdateAsync(id, request, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }
}
