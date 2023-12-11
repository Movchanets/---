using DAL.Data.Models.Exclusion;
using DAL.Entities;

namespace DAL.Repositories.Interfaces;

public interface IOrderRepository : IGenericRepository<OrderEntity, int>
{
    public IQueryable<OrderEntity> Orders();


    ExclusionResultVM GetByPagination(ExclusionVM model);
    ExclusionResultVM UserOrdersGetByPagination(ExclusionVM model, string userEmail = "");
}