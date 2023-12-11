
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes.Filter
{
    public class FilterNameRepository : GenericRepository<FilterNameEntity, int> , IFilterNameRepository
    {
        private readonly AppEFContext _dbCcontext;
        public FilterNameRepository(AppEFContext dbContext) : base(dbContext)
        {
            _dbCcontext = dbContext;
        }

        public IQueryable<FilterNameEntity> FilterNames => GetAll().AsNoTracking();
    }
}
