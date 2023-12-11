using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Interfaces;
using System.Security.Claims;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> getAllAsync()
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _productService.GetAllAsync(userEmail);
            return SendResponse(result);
        }

        [HttpGet]
        [Route("list/pagination")]
        public async Task<IActionResult> getByPaginationAsync([FromQuery] ExclusionVM model)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _productService.GetByPaginationAsync(model, userEmail);
            return SendResponse(result);
        }

       

        [HttpGet]
        [Route("byId/{id}")]
        public async Task<IActionResult> getByIdAsync(int id)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _productService.GetByIdAsync(id, userEmail);
            return SendResponse(result);
        }

        [RequestSizeLimit(int.MaxValue)]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createAsync([FromForm] ProductCreateViewModel model)
        {
            var result = await _productService.CreateAsync(model);
            return SendResponse(result);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            var result = await _productService.DeleteAsync(id);
            return SendResponse(result);
        }

        [RequestSizeLimit(int.MaxValue)]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> updateAsync([FromForm] ProductUpdateViewModel model)
        {
            var result = await _productService.UpdateAsync(model);
            return SendResponse(result);
        }

        [Authorize]
        [HttpPut]
        [Route("SetFavorite")]
        public async Task<IActionResult> SetFavoriteAsync([FromQuery] int productId)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _productService.SetFavoriteAsync(productId, userEmail);
            return SendResponse(result);
        }

        [Authorize]
        [HttpGet]
        [Route("getFavorites")]
        public async Task<IActionResult> GetFavoriteAsync()
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _productService.GetFavoriteAsync(userEmail);
            return SendResponse(result);
        }

        [HttpGet]
        [Route("get_by_query/{query}")]
        public async Task<IActionResult> GetProductByQueryAsync(string query)
        {
            var res = await _productService.GetByQueryAsync(query);
            return Ok(res);
        }

        [HttpGet]
        [Route("get_unique_properties")]
        public async Task<IActionResult> GetUniqueAsync()
        {
            var res = await _productService.GetUniqueAsync();
            return Ok(res);
        }

        private IActionResult SendResponse(ServiceResponse response)
        {
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
