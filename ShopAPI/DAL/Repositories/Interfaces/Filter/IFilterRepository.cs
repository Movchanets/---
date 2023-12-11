using DAL.Data.Models.Filter;
using DAL.Entities.Filters;

namespace DAL.Repositories.Interfaces.Filter
{
    public interface IFilterRepository
    {
        public IQueryable<FilterEntity> Filters { get; }
        public Task<int> ConnectFilterByProduct(ConnectionFilterVM model);
        public Task<List<FilterEntity>> GetFiltersByProductIdAsync(int id);

    }
}
