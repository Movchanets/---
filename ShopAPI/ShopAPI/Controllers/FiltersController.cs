using AutoMapper;
using DAL.Data.Models.Filter;
using DAL.Data.Models.PlaceCategory;
using DAL.Data.Models.Product;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces.Filter;
using System.Security.Claims;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersController : ControllerBase
    {
        private readonly IFiltersService _filtersService;
        private readonly IFilterNameService _filterNameService;
        private readonly IFilterValueService _filterValueService;
        private readonly IFilterGroupService _filterGroupService;


        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public FiltersController(IFilterNameService filterNameService, IFilterValueService filterValueService, IFilterGroupService filterGroupService, IFiltersService filtersService, ICategoryRepository categoryRepository, IMapper mapper)
        {
            _filterNameService = filterNameService;
            _filterValueService = filterValueService;
            _filterGroupService = filterGroupService;
            _filtersService = filtersService;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }


        //FilterNames

        [HttpPost]
        [Route("create_filter_name")]
        public async Task<IActionResult> CreateFilterNameAsync([FromBody] CreateFilterNameVM model)
        {
            var res = await _filterNameService.CreateFilterNameAsync(model);

            return Ok(res);
        }

        [HttpGet]
        [Route("get_filter_names")]
        public async Task<IActionResult> GetFilterNames()
        {
            var res = await _filterNameService.GetAllFilterNameAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("get_filter_name_by_id/{id}")]
        public async Task<IActionResult> GetFilterNameByIdAsync(int id)
        {
            var res = await _filterNameService.GetFilterNameByIdAsync(id);
            return Ok(res);
        }

        [HttpPut]
        [Route("update_filter_name")]
        public async Task<IActionResult> UpdateFilterNames([FromBody] UpdateFilterNameVM model)
        {
            var res = await _filterNameService.UpdateFilterNameAsync(model);
            return Ok(res);
        }

        [HttpDelete]
        [Route("delete_filter_name/{id}")]
        public async Task<IActionResult> DeleteFilterName(int id)
        {
            var res = await _filterNameService.DeleteFilterNameAsync(id);
            return Ok(res);
        }

        //FilterValues

        [HttpPost]
        [Route("create_filter_value")]
        public async Task<IActionResult> CreateFilterValueAsync([FromBody] CreateFilterValueVM model)
        {
            var res = await _filterValueService.CreateFilterValueAsync(model);
            return Ok(res);
        }

        [HttpGet]
        [Route("get_filter_values")]
        public async Task<IActionResult> GetFilterValues()
        {
            var res = await _filterValueService.GetAllFilterValueAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("get_filter_value_by_id/{id}")]
        public async Task<IActionResult> GetFilterValueById(int id)
        {
            var res = await _filterValueService.GeteFilterValueByIdAsync(id);
            return Ok(res);
        }

        [HttpDelete]
        [Route("delete_filter_value/{id}")]
        public async Task<IActionResult> DeleteFilterValue(int id)
        {
            var res = await _filterValueService.DeleteFilterValueAsync(id);
            return Ok(res);
        }

        [HttpPut]
        [Route("update_filter_value")]
        public async Task<IActionResult> GetFilterValues([FromBody] UpdateFilterValueVM model)
        {
            var res = await _filterValueService.UpdateFilterValueAsync(model);
            return Ok(res);
        }


        //FilterGroupName
        [HttpPost]
        [Route("upgrade_filter_group")]
        public async Task<IActionResult> UpgradeGroupAsync([FromBody] CreateFilterGroupVM model)
        {
            var res = await _filterGroupService.UpgradeGroupAsync(model);
            return Ok(res);
        }

        // Filter
        [HttpPost]
        [Route("create_update_filter")]
        public async Task<IActionResult> CreateNewFilter(ConnectionFilterVM model)
        {
            var res = await _filtersService.CreateAsync(model);
            return Ok(res);
        }

        [HttpGet]
        [Route("get_filters_value_id_by_product_id")]
        public async Task<IActionResult> GetFiltersIdListByProductIdAsync(int id)
        {
            var res = await _filtersService.GetFiltersIdListByProductIdAsync(id);
            return Ok(res);
        }


        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] ProductSearchVM search)
        {
            string userEmail = "admin@gmail.com"; User.FindFirstValue(ClaimTypes.Email);

            var res = await _filtersService.SearchAsync(search, userEmail);
            return Ok(res);
        }

    }
}
