using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IProductImageRepository: IGenericRepository<ProductImageEntity, int>
    {
        IQueryable<ProductImageEntity> GetAllByProductId(int productId);
    }
}
