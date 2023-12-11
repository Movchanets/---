
using DAL.Entities.Filters;

namespace DAL.Repositories.Interfaces.Filter
{
    public interface IFilterNameRepository : IGenericRepository<FilterNameEntity,int>
    {
        public IQueryable<FilterNameEntity> FilterNames { get; }

    }
}
