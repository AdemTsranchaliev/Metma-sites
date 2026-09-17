using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Metma.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Metma.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetBySite(
        [FromQuery] Guid? siteId,
        [FromQuery] SiteCode? siteCode,
        [FromQuery] bool featuredOnly = false,
        CancellationToken cancellationToken = default)
    {
        if (siteId.HasValue)
        {
            return Ok(await productService.GetBySiteAsync(siteId.Value, featuredOnly, cancellationToken));
        }

        if (siteCode.HasValue)
        {
            return Ok(await productService.GetBySiteCodeAsync(siteCode.Value, featuredOnly, cancellationToken));
        }

        return BadRequest("Provide siteId or siteCode.");
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var product = await productService.GetByIdAsync(id, cancellationToken);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpGet("by-slug")]
    public async Task<ActionResult<ProductDto>> GetBySlug(
        [FromQuery] Guid siteId,
        [FromQuery] string slug,
        CancellationToken cancellationToken)
    {
        var product = await productService.GetBySlugAsync(siteId, slug, cancellationToken);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductRequest request, CancellationToken cancellationToken)
    {
        var created = await productService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProductDto>> Update(Guid id, [FromBody] UpdateProductRequest request, CancellationToken cancellationToken)
    {
        var updated = await productService.UpdateAsync(id, request, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await productService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
