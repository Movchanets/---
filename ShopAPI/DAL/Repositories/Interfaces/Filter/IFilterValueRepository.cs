
using DAL.Entities.Filters;

namespace DAL.Repositories.Interfaces.Filter
{
    public interface IFilterValueRepository: IGenericRepository<FilterValueEntity,int>
    {
        IQueryable<FilterValueEntity> FilterValues { get; }

    }
}
