using DAL.Data.Constants;
using DAL.Entities;
using DAL.Entities.Filters;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Text.Json;

namespace DAL.Initializer
{
    public static class SeederDB
    {
        public static async void SeedData(this IApplicationBuilder app)
        {
            using (IServiceScope scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                       .CreateScope())
            {
                UserManager<UserEntity> userManager =
                    scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                RoleManager<RoleEntity> roleManager =
                    scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                AppEFContext dbContext = scope.ServiceProvider.GetRequiredService<AppEFContext>();

                var contex = scope.ServiceProvider.GetRequiredService<AppEFContext>();
                contex.Database.Migrate();

                if (!roleManager.Roles.Any())
                {
                    IdentityResult result = await roleManager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.Administrator
                    });

                    result = await roleManager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.User
                    });
                }

                if (!userManager.Users.Any())
                {
                    string admin = "admin@gmail.com";
                    UserEntity userAdmin = new UserEntity
                    {
                        Email = admin,
                        UserName = admin,
                        FirstName = "Admin",
                        LastName = "Admin",
                        IsBlocked = false
                    };

                    IdentityResult result = await userManager.CreateAsync(userAdmin, "123456");
                    result = await userManager.AddToRoleAsync(userAdmin, Roles.Administrator);


                    string simplUserName = "user@gmail.com";
                    UserEntity user = new UserEntity
                    {
                        Email = simplUserName,
                        UserName = simplUserName,
                        FirstName = "User1",
                        LastName = "User",
                        IsBlocked = false
                    };

                    result = await userManager.CreateAsync(user, "123456");
                    result = await userManager.AddToRoleAsync(user, Roles.User);
                    result = await userManager.AddToRoleAsync(user, Roles.Administrator);

                    //from testing
                    for (int i = 0; i < 10; i++)
                    {
                        string email = Path.GetRandomFileName() + "@test.ua";
                        UserEntity us = new UserEntity
                        {
                            Email = email,
                            UserName = email,
                            FirstName = Path.GetRandomFileName(),
                            LastName = Path.GetRandomFileName(),
                            IsBlocked = false
                        };

                        result = await userManager.CreateAsync(us, "123456");
                        result = await userManager.AddToRoleAsync(us, (i / 3 == 0) ? Roles.Administrator : Roles.User);
                    }

                    await dbContext.SaveChangesAsync();
                }

                if (!dbContext.Categories.Any())
                {
                    var categories = new List<CategoryEntity>
                    {
                        new CategoryEntity
                        {
                            Name = "Food",
                            Image = "",

                        },
                        new CategoryEntity()
                        {
                            Name = "Clothes",
                            Image = ""
                        },
                        new CategoryEntity()
                        {
                            Name = "Electronics",
                            Image = ""
                        }
                    };
                    await dbContext.Categories.AddRangeAsync(categories);
                    await dbContext.SaveChangesAsync();

                }

                if (!dbContext.Products.Any())
                {
                    var products = new List<ProductEntity>();
                    products.Add(new ProductEntity
                    {
                        Name = "Apple",
                        Price = 20,
                        Quantity = 10,
                        CategoryId = 1,
                        Description = "Apple",
                    });
                    products.Add(new ProductEntity
                    {
                        Name = "Banana",
                        Price = 30,
                        Quantity = 10,
                        CategoryId = 1,
                    });
                products.Add(new ProductEntity
                {
                    Name = "Orange",
                    Price = 40,
                    Quantity = 10,
                    CategoryId = 1,
                });
                products.Add(new ProductEntity
                {
                    Name = "T-shirt",
                    Price = 50,
                    Quantity = 10,
                    CategoryId = 2,
                });
                products.Add(new ProductEntity()
                {
                    Name = "Laptop",
                    Price = 6000,
                    Quantity = 3,
                    CategoryId = 3,
                });
                dbContext.Products.AddRange(products);
               await  dbContext.SaveChangesAsync();
                }
            }
        
    }
        }
    }


