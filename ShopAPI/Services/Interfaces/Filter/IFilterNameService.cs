
using DAL.Data.Models.Filter;

namespace Services.Interfaces.Filter
{
    public interface IFilterNameService
    {
        public Task<ServiceResponse> CreateFilterNameAsync(CreateFilterNameVM model);
        public Task<ServiceResponse> GetAllFilterNameAsync();
        public Task<ServiceResponse> GetFilterNameByIdAsync(int id);
        public Task<ServiceResponse> DeleteFilterNameAsync(int id);
        public Task<ServiceResponse> UpdateFilterNameAsync(UpdateFilterNameVM model);
    }
}
