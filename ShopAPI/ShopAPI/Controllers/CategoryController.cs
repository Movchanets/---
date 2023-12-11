
using DAL.Data.Models.PlaceCategory;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _placeCategoryService;

        public CategoryController(ICategoryService placeCategoryService)
        {
            _placeCategoryService = placeCategoryService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> getAllAsync()
        {
            var res = await _placeCategoryService.GetAllAsync();
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [RequestSizeLimit(int.MaxValue)]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> createAsync([FromBody] CategoryCreateViewModel model)
        {

            var res = await _placeCategoryService.CreateAsync(model);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [RequestSizeLimit(int.MaxValue)]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> updateAsync([FromBody] CategoryUpdateViewModel model)
        {
            var res = await _placeCategoryService.UpdateAsync(model);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            var res = await _placeCategoryService.DeleteAsync(id);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> getByIdAsync(int id)
        {
            var res = await _placeCategoryService.GetByIdAsync(id);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet]
        [Route("getChildrenByName/{name}")]
        public async Task<IActionResult> getByIdAsync(string name)
        {
            var res = await _placeCategoryService.GetTopChildrensByNameAsync(name);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}
