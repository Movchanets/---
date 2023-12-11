using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes
{
    public class CategoryRepository : GenericRepository<CategoryEntity, int>,
        ICategoryRepository
    {
        private readonly AppEFContext _dbContext;

        public CategoryRepository(AppEFContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<CategoryEntity> Categories()
        {
            return GetAll().Include(c => c.Products).AsNoTracking();
        }
    }
}
