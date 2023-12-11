using DAL.Data.Models.PlaceCategory;

namespace Services.Interfaces
{
    public interface ICategoryService
    {
        public Task<ServiceResponse> CreateAsync(CategoryCreateViewModel model);
        public Task<ServiceResponse> DeleteAsync(int id);
        public Task<ServiceResponse> GetByIdAsync(int id);
        public Task<ServiceResponse> GetTopChildrensByNameAsync(string name);
        public Task<ServiceResponse> UpdateAsync(CategoryUpdateViewModel model);
        public Task<ServiceResponse> GetAllAsync();

    }
}
