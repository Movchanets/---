
using DAL.Data.Models.Filter;

namespace Services.Interfaces.Filter
{
    public interface IFilterGroupService
    {
        Task<ServiceResponse> UpgradeGroupAsync(CreateFilterGroupVM model);
    }
}
