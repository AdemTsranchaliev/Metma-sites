using Metma.Api.Configuration;
using Metma.Api.Data;
using Metma.Api.Interfaces;
using Metma.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<R2Options>(builder.Configuration.GetSection(R2Options.SectionName));
builder.Services.Configure<CorsSettings>(builder.Configuration.GetSection(CorsSettings.SectionName));

builder.Services.AddDbContext<MetmaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ISiteService, SiteService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPageService, PageService>();
builder.Services.AddScoped<IBlogPostService, BlogPostService>();
builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddSingleton<IR2StorageService, R2StorageService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var corsOrigins = builder.Configuration.GetSection(CorsSettings.SectionName)
    .Get<CorsSettings>()?.AllowedOrigins
    ??
    [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"
    ];

builder.Services.AddCors(options =>
{
    options.AddPolicy("MetmaFrontends", policy =>
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MetmaFrontends");
app.UseAuthorization();
app.MapControllers();

app.Run();
