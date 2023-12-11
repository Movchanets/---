
using DAL.Data.Models.Filter;

namespace Services.Interfaces.Filter
{
    public interface IFilterValueService
    {
        public Task<ServiceResponse> CreateFilterValueAsync(CreateFilterValueVM model);
        public Task<ServiceResponse> GetAllFilterValueAsync();
        public Task<ServiceResponse> GeteFilterValueByIdAsync(int id);
        public Task<ServiceResponse> DeleteFilterValueAsync(int id);
        public Task<ServiceResponse> UpdateFilterValueAsync(UpdateFilterValueVM model);
    }
}
