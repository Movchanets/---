
using DAL.Data.Models.Filter;
using DAL.Entities.Filters;

namespace DAL.Repositories.Interfaces.Filter
{
    public interface IFilterGroupRepository
    {
        public IQueryable<FilterNameGroupEntity> FilterGroups { get; }
        Task<bool> CreateAsync(CreateFilterGroupVM model);

        Task<bool> UpdateAsync(CreateFilterGroupVM model);
    }
}
