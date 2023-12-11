using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<CategoryEntity, int>
    {
        public IQueryable<CategoryEntity> Categories();
    }
}
