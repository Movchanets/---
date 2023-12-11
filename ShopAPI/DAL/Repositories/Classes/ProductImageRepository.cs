using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes
{
    public class ProductImageRepository : GenericRepository<ProductImageEntity, int>, IProductImageRepository
    {
        private readonly AppEFContext _dbContext;

        public ProductImageRepository(AppEFContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ProductImageEntity> GetAllByProductId(int productId)
        {
            return _dbContext.Set<ProductImageEntity>().AsNoTracking()
                .Where(e => e.ProductId == productId)
                .Where(e => e.IsDelete == false);
        }
    }
}
