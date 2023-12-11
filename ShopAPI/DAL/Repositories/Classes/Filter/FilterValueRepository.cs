
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes.Filter
{
    public class FilterValueRepository : GenericRepository<FilterValueEntity, int> ,IFilterValueRepository
    {
        public FilterValueRepository(AppEFContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<FilterValueEntity> FilterValues => GetAll().AsNoTracking();
    }
}
