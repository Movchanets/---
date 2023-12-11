using DAL.Data.Helpers;
using DAL.Data.Models.Filter;
using DAL.Entities;
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DAL.Repositories.Classes.Filter
{
    public class FilterRepository : IFilterRepository
    {
        private readonly AppEFContext _dbContext;
        public FilterRepository(AppEFContext context)
        {
            _dbContext = context;
        }

        public IQueryable<FilterEntity> Filters => _dbContext.Filters.AsNoTracking();

        public async Task<int> ConnectFilterByProduct(ConnectionFilterVM model)
        {
            //Remove old connection if they exist
            IQueryable<FilterEntity> query = _dbContext.Filters;
            var predicate = PredicateBuilder.False<FilterEntity>();
            foreach (var item in model.RemoveConnectionFilters)
            {
                predicate = predicate
                            .Or(f => 
                            f.ProductId == model.ProductId &&
                            f.FilterNameId == item.FilterNameId &&
                            f.FilterValueId == item.FilterValueId);
            }
            query = query.Where(predicate);
            _dbContext.Filters.RemoveRange(query);
            await _dbContext.SaveChangesAsync();

            //Added new connection  
            List< FilterEntity > list = new List< FilterEntity >();
            foreach(var item in model.ConnectionFilters)
            {
                var newFilter = new FilterEntity
                {
                    FilterNameId = item.FilterNameId,
                    FilterValueId = item.FilterValueId,
                    ProductId = model.ProductId,
                };
                list.Add( newFilter );
            }
          
            if(list.Count > 0 )
            await _dbContext.Filters.AddRangeAsync(list);
            var res = await _dbContext.SaveChangesAsync();

            return res;
        }

        public async Task<List<FilterEntity>> GetFiltersByProductIdAsync(int id)
        {
            var res = await _dbContext.Filters.Where(e => e.ProductId == id).ToListAsync();
            return res;
        }
    }
}
