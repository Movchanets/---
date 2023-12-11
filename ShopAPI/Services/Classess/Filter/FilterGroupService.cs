
using DAL.Data.Models.Filter;
using DAL.Repositories.Interfaces.Filter;
using Services.Interfaces.Filter;

namespace Services.Classess.Filter
{
    public class FilterGroupService: IFilterGroupService
    {
        private readonly IFilterGroupRepository _repository;
        public FilterGroupService(IFilterGroupRepository repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResponse> UpgradeGroupAsync(CreateFilterGroupVM model)
        {
            var groups = _repository.FilterGroups.Where(g => g.FilterNameId == model.FilterNameId);

            if (groups.Count() == 0)
            {
                var resCre = await _repository.CreateAsync(model);
                if (resCre) return new ServiceResponse() { IsSuccess = true , Message="Filter group is created." };
                return new ServiceResponse() { IsSuccess = false, Message = "Filter group is not created." };
            }


            var resUpd = await _repository.UpdateAsync(model);
            if (resUpd) return new ServiceResponse() { IsSuccess = true, Message = "Filter group is updated." };
            return new ServiceResponse() { IsSuccess = false, Message = "Filter group is not updated." };
        }
    }
}
