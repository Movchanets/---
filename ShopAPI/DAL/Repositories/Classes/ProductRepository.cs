using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Product;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes
{
    public class ProductRepository : GenericRepository<ProductEntity, int>, IProductRepository
    {
        private readonly AppEFContext _dbContext;

        public ProductRepository(AppEFContext dbContext)
            : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ProductEntity> Products => GetAll()
            .Include(f => f.UsersFavorite)
            .Include(c => c.Category)
            .Include(p => p.Images.Where(x => x.IsDelete == false))
            .AsNoTracking();

    

        public async Task<ExclusionResultVM> GetByPagination(ExclusionVM model)
        {
            var products = Products;

            // List products from category name and children category
            products = GetProductsByCategoryName(products, model.CategoryName);

            if (!String.IsNullOrWhiteSpace(model.Search))
                products = products
                    .Where(x => (x.Name + x.Description)
                        .ToLower()
                        .Contains(model.Search.ToLower()));

            int countProducts = products.Count();
            int countPages = (int)Math.Ceiling(countProducts / (double)model.CountOnPage);


            products = SortProducts(products, model.Sort);

            products = products
                .Skip((model.Page - 1) * model.CountOnPage)
                .Take(model.CountOnPage);

            var result = new ExclusionResultVM()
            {
                CurrentPage = model.Page,
                Pages = countPages,
                TotalElements = countProducts,
                Payload = await products.ToListAsync()
            };

            return result;
        }

        public async Task<bool> SetFavorite(int productId, string userEmail)
        {
            var user = _dbContext.Users.Include(u => u.FavoriteProducts).FirstOrDefault(u => u.Email == userEmail);
            var product = _dbContext.Products.FirstOrDefault(p => p.Id == productId);

            if (product == null || user == null) return false;

            if (user.FavoriteProducts.Contains(product))
            {
                user.FavoriteProducts.Remove(product);
            }
            else
            {
                user.FavoriteProducts.Add(product);
            }

            var result = await _dbContext.SaveChangesAsync();
            return result != 0;
        }

        public IQueryable<ProductEntity> GetFavorites(string userEmail)
        {
            var user = _dbContext.Users.AsNoTracking().FirstOrDefault(u => u.Email == userEmail);

            var result = Products.Where(p => p.UsersFavorite.Any(uf => uf.Id == user.Id));

            return result;
        }

        public async Task<ProductEntity[]> GetUniqueProducts()
        {
            var result = await Products.ToArrayAsync();
            if (result.Length < 2) return null;

            var random = new Random();

            for (int i = result.Length - 1; i > 0; i--)
            {
                int pos = random.Next(i + 1);
                if (pos != i) Swap(ref result[pos], ref result[i]);
            }

            return result.Take(6).ToArray();
        }

        public async Task UpdateQuantityAsync(int itemProductId, int itemQuantity)
        {
            var product = _dbContext.Products.FirstOrDefault(x => x.Id == itemProductId);
            if(product == null) return; 
            if(itemQuantity > 0)
            {
                product.Quantity -= (uint)itemQuantity;
            }
            else
            {
                product.Quantity += (uint)Math.Abs(itemQuantity);
            }
             await _dbContext.SaveChangesAsync();
        }

        private IQueryable<ProductEntity> SortProducts(IQueryable<ProductEntity> products, string sort)
        {
            switch (sort?.ToLower()??"")
            {
                case "name":
                    return products.OrderBy(x => x.Name);
                case "date" :
                    return products.OrderBy(x => x.DateCreated);
                case "quantity":
                    return products.OrderBy(x => x.Quantity);   
                case "price":
                    return products.OrderBy(x => x.Price);
                default:
                    return products.OrderByDescending(x => x.Id);
            }
        }

        private IQueryable<ProductEntity> GetProductsByCategoryName(IQueryable<ProductEntity> products, string caegoryName)
        {
            var category = _dbContext.Categories.FirstOrDefault(x => x.Name.Equals(caegoryName));

            IQueryable<ProductEntity> resultList = products;

            return products;
        }

        public async Task<List<ProductByQuery>> GetProductByQuery(string query)
        {
            var result = await _dbContext.Products
                .Where(e => e.Name.ToLower().Contains(query.ToLower()))
                .Include( p => p.Images)
                .Select(e => new ProductByQuery { 
                    Id= e.Id,
                    Name=e.Name,
                    Image= e.Images.FirstOrDefault().Name })
                .OrderBy(e=>e.Name.ToLower())
                .Take(10)
                .ToListAsync();

            return result;
        }

        private void Swap<T>(ref T x, ref T y)
        {
            (x, y) = (y, x);
        }
    }
}