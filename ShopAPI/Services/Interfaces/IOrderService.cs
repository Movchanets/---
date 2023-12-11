using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Order;

namespace Services.Interfaces;

public interface IOrderService
{
    public Task<ServiceResponse> CreateAsync(OrderCreateVM model, string userEmail = "");
    public Task<ServiceResponse> DeleteAsync(int id);
    public Task<ServiceResponse> GetAllAsync();
    public Task<ServiceResponse> GetByIdAsync(int id);
    public Task<ServiceResponse> GetByPaginationAsync(ExclusionVM model);
    public Task<ServiceResponse> UserOrdersGetByPaginationAsync(ExclusionVM model, string userEmail = "");
    
    public Task<ServiceResponse> GetUserOrdersStatus(string email);
}