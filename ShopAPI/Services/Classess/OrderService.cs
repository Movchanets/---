using AutoMapper;
using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Order;
using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Repositories.Classes;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Services.Classess;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
  private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;
    private readonly UserManager<UserEntity> _userManager;
    
    public OrderService(IOrderRepository orderRepository, IMapper mapper,  UserManager<UserEntity> userManager, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
        _userManager = userManager;
        _productRepository = productRepository;
    }

    public async Task<ServiceResponse> CreateAsync(OrderCreateVM model, string userEmail = "")
    {
        var user = await _userManager.FindByEmailAsync(model.email);
      
        if (user == null)
        {
            return new ServiceResponse() { IsSuccess = false, Message = "User not found" };
        }

       

        var order = _mapper.Map<OrderEntity>(model);
        List<DetailEntity> details = new List<DetailEntity>();
       
        foreach (var item in model.Details)
        {
            DetailEntity detail = new DetailEntity();
            detail.ProductId = item.ProductId;
            detail.Quantity = item.Quantity;
            detail.OrderId = order.Id;
            detail.DateCreated = DateTime.Now.ToUniversalTime();
            details.Add(detail);
        }

        order.UserId = user.Id;
        var totalPrice = 0m;
        
        foreach (var item in details)
        {
            var product = await _productRepository.GetByIdAsync(item.ProductId);
            if (product.Quantity < item.Quantity)
            {
                return new ServiceResponse(){IsSuccess = false, Message = $"Not enough {product.Name} in stock "};
            }
            totalPrice += product.Price * item.Quantity;
        }
        order.Details = details;
        order.TotalPrice = totalPrice;
    var res = await _orderRepository.CreateAsync(order);
        if (res)
        {
            foreach (var item in details)
            {
                await _productRepository.UpdateQuantityAsync(item.ProductId, item.Quantity);
            }
            
            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "Order created",
                Payload = _mapper.Map<OrderVM>(order)
            };
        }

        return new ServiceResponse() { IsSuccess = false, Message = "Create error", Payload = null };
    }

    public async Task<ServiceResponse> DeleteAsync(int id)
    {
        var res = await _orderRepository.DeleteAsync(id);
        if (res)
        {
            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "Order deleted",
                Payload = null
            };
        }

        return new ServiceResponse() { IsSuccess = false, Message = "Delete error", Payload = null };
    }

    

    public async Task<ServiceResponse> GetAllAsync()
    {
        var res = _mapper.Map<List<OrderVM>>(_orderRepository.GetAll().Include(o => o.User).Include(o=>o.Details).ThenInclude(d => d.Product));
        return new ServiceResponse() { IsSuccess = true, Message = "All orders", Payload = res };
    }

    public async Task<ServiceResponse> GetByIdAsync(int id)
    {
        var res = _mapper.Map<OrderVM>(await _orderRepository.GetAll().Include(o => o.User).Include(o=>o.Details).ThenInclude(d => d.Product)
            .FirstOrDefaultAsync(o => o.Id == id));
        if (res == null)
        {
            return new ServiceResponse() { IsSuccess = false, Message = "Order not found", Payload = null };
        }

        return new ServiceResponse() { IsSuccess = true, Message = "Order", Payload = res };
    }

    public async Task<ServiceResponse> GetByPaginationAsync(ExclusionVM model)
    {
        var result = _orderRepository.GetByPagination(model);
        var payload = await ((IQueryable<OrderEntity>)result.Payload).Select(x => _mapper.Map<OrderVM>(x)).ToListAsync();

        var response = new ExclusionResultVM()
        {
            CurrentPage = result.CurrentPage,
            Pages = result.Pages,
            TotalElements = result.TotalElements,
            Payload = payload
        };

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Load success",
            Payload = response
        };
    }

    public async Task<ServiceResponse> UserOrdersGetByPaginationAsync(ExclusionVM model, string userEmail = "")
    {
        var result = _orderRepository.UserOrdersGetByPagination(model, userEmail);
        var payload = await ((IQueryable<OrderEntity>)result.Payload).Select(x => _mapper.Map<OrderVM>(x)).ToListAsync();

        var response = new ExclusionResultVM()
        {
            CurrentPage = result.CurrentPage,
            Pages = result.Pages,
            TotalElements = result.TotalElements,
            Payload = payload
        };

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Load success",
            Payload = response
        };
    }


    public async Task<ServiceResponse> GetUserOrdersStatus(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var res = _mapper.Map<List<OrderVM>>(_orderRepository.GetAll().Where(i => i.UserId == user.Id).Include(o => o.User));
        return new ServiceResponse() { IsSuccess = true, Message = "user orders", Payload = res };
    }
}