using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Security.Claims;

namespace BookingAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : Controller
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAllAsync()
    {
        var result = await _orderService.GetAllAsync();
        return Ok(result);
    }

   
    [HttpGet]
    [Route("get_by_id/{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var result = await _orderService.GetByIdAsync(id);
        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateAsync([FromBody] OrderCreateVM model)
    {
        string userEmail = User.FindFirstValue(ClaimTypes.Email);

        var result = await _orderService.CreateAsync(model, userEmail);
        return Ok(result);
    }
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await _orderService.DeleteAsync(id);
        return Ok(result);
    }

    [HttpGet]
    [Route("list/pagination")]
    public async Task<IActionResult> getByPaginationAsync([FromQuery] ExclusionVM model)
    {
        var result = await _orderService.GetByPaginationAsync(model);
        return Ok(result);
    }
    [HttpGet]
    [Route("list/paginationUser")]
    public async Task<IActionResult> UserOrdersGetByPaginationAsync([FromQuery] ExclusionVM model)
    {
        string userEmail = User.FindFirstValue(ClaimTypes.Email);
        var result = await _orderService.UserOrdersGetByPaginationAsync(model, userEmail);
        return Ok(result);
    }
    [HttpGet]
    [Route("list/user")]
    public async Task<IActionResult> getByUserIdAsync()
    {
        string userEmail = User.FindFirstValue(ClaimTypes.Email);

        var result = await _orderService.GetUserOrdersStatus(userEmail);
        return Ok(result);
    }
}