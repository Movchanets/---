using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Product;

namespace Services.Interfaces
{
    public interface IProductService
    {
        public Task<ServiceResponse> CreateAsync(ProductCreateViewModel model);
        public Task<ServiceResponse> DeleteAsync(int id);
        public Task<ServiceResponse> UpdateAsync(ProductUpdateViewModel model);
        public Task<ServiceResponse> GetAllAsync(string userEmail = "");
        public Task<ServiceResponse> GetByIdAsync(int id, string userEmail = "");
        public Task<ServiceResponse> GetByPaginationAsync(ExclusionVM model, string userEmail = "");
      
        public Task<ServiceResponse> SetFavoriteAsync(int productId, string userEmail = "");
        public Task<ServiceResponse> GetByQueryAsync(string query);
        public Task<ServiceResponse> GetFavoriteAsync(string userEmail = "");
        public Task<ServiceResponse> GetUniqueAsync();
    }
}
