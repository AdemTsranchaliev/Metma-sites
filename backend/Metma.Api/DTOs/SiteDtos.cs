using Metma.Api.Models.Enums;

namespace Metma.Api.DTOs;

public record SiteDto(
    Guid Id,
    SiteCode Code,
    string Name,
    string Domain,
    string DefaultLocale,
    bool IsActive);

public record CreateSiteRequest(
    SiteCode Code,
    string Name,
    string Domain,
    string DefaultLocale);

public record UpdateSiteRequest(
    string Name,
    string Domain,
    string DefaultLocale,
    bool IsActive);
