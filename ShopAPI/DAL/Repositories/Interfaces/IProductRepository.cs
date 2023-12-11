using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Product;
using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IProductRepository : IGenericRepository<ProductEntity, int>
    {
        IQueryable<ProductEntity> Products { get; }
        Task<ExclusionResultVM> GetByPagination(ExclusionVM model);
       
        Task<bool> SetFavorite(int productId, string userEmail);
        IQueryable<ProductEntity> GetFavorites(string userEmail);
        public Task<List<ProductByQuery>> GetProductByQuery(string query);
        Task<ProductEntity[]> GetUniqueProducts();
        
        Task UpdateQuantityAsync(int itemProductId, int itemQuantity);
    }
}
