using Metma.Api.DTOs;
using Metma.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Metma.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController(IMediaService mediaService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MediaAssetDto>>> GetBySite(
        [FromQuery] Guid? siteId,
        CancellationToken cancellationToken)
        => Ok(await mediaService.GetBySiteAsync(siteId, cancellationToken));

    [HttpPost("register")]
    public async Task<ActionResult<MediaAssetDto>> Register(
        [FromBody] CreateMediaAssetRequest request,
        CancellationToken cancellationToken)
    {
        var created = await mediaService.RegisterAsync(request, cancellationToken);
        return Ok(created);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await mediaService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
