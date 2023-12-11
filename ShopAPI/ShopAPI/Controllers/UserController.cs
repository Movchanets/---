using DAL.Data.Models.Exclusion;
using DAL.Data.Models.User;
using Google.Apis.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Services.Interfaces;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> getAllUsers()
        {
            var result = await _userService.GetAllUsersAsync();

            if(result.IsSuccess)return Ok(result);

            return BadRequest(result);
        }

        [HttpGet]
        [Route("listByPage")]
        public async Task<IActionResult> getUserByPageAsync([FromQuery] ExclusionVM model)
        {
            var result = await _userService.GetUserByPageAsync(model);

            if (result.IsSuccess) return Ok(result);

            return BadRequest(result);
        }


        [HttpGet]
        [Route("getById")]
        public async Task<IActionResult> getByIdAsync(long id)
        {
           var result = await _userService.GetByIdAsync(id);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPut]
        [Route("blockUnblock")]
        public async Task<IActionResult> blockUnblockUser(string email)
        {
           var result = await _userService.BlockUnblockUserAsync(email);
            if(result.IsSuccess)
            return Ok(result);

            return BadRequest(result);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateProfileUser( UserUpdateVM model)
        {
            var result = await _userService.UpdateUserProfileAsync(model);
            return Ok(result);
        }

    }
}
