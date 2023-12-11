

using DAL.Data.Models.Filter;
using DAL.Data.Models.Product;

namespace Services.Interfaces.Filter
{
    public interface IFiltersService
    {
        /// <summary>
        /// Шукає продукти по фіьтрам і пошуку
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public Task<ServiceResponse> SearchAsync(ProductSearchVM model, string userEmail = "");
        public Task<ServiceResponse> CreateAsync(ConnectionFilterVM model);
        public Task<ServiceResponse> GetFiltersIdListByProductIdAsync(int id);
    }
}
