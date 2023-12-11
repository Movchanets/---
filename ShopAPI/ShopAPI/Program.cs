using DAL;
using DAL.Entities.Identity;
using DAL.Initializer;
using DAL.Repositories.Classes;
using DAL.Repositories.Classes.Filter;
using DAL.Repositories.Interfaces;
using DAL.Repositories.Interfaces.Filter;
using DAL.Validation.Account;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Services;
using Services.Classess;
using Services.Classess.Filter;
using Services.Interfaces;
using Services.Interfaces.Filter;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add database context
builder.Services.AddDbContext<AppEFContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddIdentity<UserEntity, RoleEntity>(opt =>
{
    opt.Stores.MaxLengthForKeys = 128;
    opt.Password.RequireDigit = false;
    opt.Password.RequiredLength = 5;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<AppEFContext>()
.AddDefaultTokenProviders();

// Add repositories
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddScoped<IProductImageRepository, ProductImageRepository>();


builder.Services.AddScoped<IFilterRepository, FilterRepository>();
builder.Services.AddScoped<IFilterNameRepository, FilterNameRepository>();
builder.Services.AddScoped<IFilterValueRepository, FilterValueRepository>();
builder.Services.AddScoped<IFilterGroupRepository, FilterGroupRepository>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// Add services to the container
builder.Services.AddControllers();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductImagesService, ProductImagesService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddTransient<IEmailService, EmailService>();

builder.Services.AddScoped<IFiltersService, FiltersService>();
builder.Services.AddScoped<IFilterNameService , FilterNameService>();
builder.Services.AddScoped<IFilterValueService, FilterValueService>();
builder.Services.AddScoped<IFilterGroupService, FilterGroupService>();


builder.Services.AddTransient<IOrderService, OrderService>();
//Add Cors
builder.Services.AddCors();

//Add FluentValidation
builder.Services.AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<ValidatorLoginViewModel>());

// Add autoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

SymmetricSecurityKey signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JwtKey")));
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = signinKey,
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

string dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
if (!Directory.Exists(dir))
{
    Directory.CreateDirectory(dir);
}

app.UseStaticFiles(new StaticFileOptions
{
 
    FileProvider = new CompositeFileProvider(
        new PhysicalFileProvider(dir)
       
    ),
    RequestPath = "/images",
});


app.UseCors(options =>
{
    options.AllowAnyMethod()
    .AllowAnyOrigin()
    .AllowAnyHeader();
});

app.MapControllers();

app.SeedData();

app.Run();
