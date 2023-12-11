
using DAL.Data.Models.Filter;
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;

namespace DAL.Repositories.Classes.Filter
{
    public class FilterGroupRepository : IFilterGroupRepository
    {
        private readonly AppEFContext _dbContext;
        public FilterGroupRepository(AppEFContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<FilterNameGroupEntity> FilterGroups  => _dbContext.FilterNameGroups;

        public async Task<bool> CreateAsync(CreateFilterGroupVM model)
        {
            if (model.NewFilterValuesIdList.Count() == 0) return false;


            foreach (var item in model.NewFilterValuesIdList)
            {
                var entity = new FilterNameGroupEntity
                {
                    FilterNameId = model.FilterNameId,
                    FilterValueId = item,
                };
                _dbContext.Add(entity);
            }

            await _dbContext.SaveChangesAsync();

            return true;

        }

        public async Task<bool> UpdateAsync(CreateFilterGroupVM model)
        {
            var groups = _dbContext.FilterNameGroups.Where(g => g.FilterNameId == model.FilterNameId);
            if (groups.Count() == 0) return false;
            
            Dictionary<int, int>groupD = new Dictionary<int, int>();
            foreach (var item in groups)
            {
                groupD.Add(item.FilterValueId, model.FilterNameId);
            }


            foreach (var item in model.NewFilterValuesIdList) //Added new group element
            {
                if(!groupD.ContainsKey(item))
                {
                    var entity = new FilterNameGroupEntity
                    {
                        FilterNameId = model.FilterNameId,
                        FilterValueId = item,
                    };
                    _dbContext.Add(entity);

                    groupD.Add(item, model.FilterNameId);
                }

            }
  

            foreach (var item in model.RemoveFilterValuesIdList) // remove group element
            {
                if(groupD.ContainsKey(item))
                {
                    var element = groups.Where(g => g.FilterValueId == item).FirstOrDefault();
                    _dbContext.Remove(element);
                }
            }

            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}
