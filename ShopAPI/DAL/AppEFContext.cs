using DAL.Entities;
using DAL.Entities.Filters;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AppEFContext : IdentityDbContext<UserEntity, RoleEntity, long,
        IdentityUserClaim<long>, UserRoleEntity, IdentityUserLogin<long>,
        IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public AppEFContext(DbContextOptions<AppEFContext> options) : base(options)
        {
        }

        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<ProductImageEntity> ProductImages { get; set; }
        public DbSet<OrderEntity> Orders { get; set; }


        public DbSet<FilterNameEntity> FilterNames { get; set; }
        public DbSet<FilterValueEntity> FitlerValues { get; set; }
        public DbSet<FilterNameGroupEntity> FilterNameGroups { get; set; }
        public DbSet<FilterEntity> Filters { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasKey(u => new { u.UserId, u.RoleId });

                ur.HasOne(u => u.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.RoleId)
                    .IsRequired();

                ur.HasOne(u => u.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });

            builder.Entity<ProductEntity>()
                .HasMany(e => e.Images)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.ProductId)
                .IsRequired();

        

            builder.Entity<OrderEntity>()
                .HasOne(e => e.User)
                .WithMany(c => c.Orders)
                .HasForeignKey(c => c.UserId);
            builder.Entity<DetailEntity>()
                .HasOne(e => e.Order)
                .WithMany(c => c.Details)
                .HasForeignKey(c => c.OrderId);

            builder.Entity<CategoryEntity>()
                .HasMany(e => e.Products)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();

          

            

            builder.Entity<UserEntity>()
                .HasMany(u => u.FavoriteProducts)
                .WithMany(p => p.UsersFavorite)
                .UsingEntity("UserProductFavorites_tbl");

            builder.Entity<FilterNameGroupEntity>(fng => { fng.HasKey(b => new { b.FilterNameId, b.FilterValueId }); });
            builder.Entity<FilterEntity>(f => { f.HasKey(b => new { b.FilterNameId, b.FilterValueId, b.ProductId }); });
        }
    }
}