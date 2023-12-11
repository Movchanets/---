using System.Security.Claims;
using DAL.Data.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Interfaces;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IEmailService _emailService;

        public AccountController(IAccountService accountService, IEmailService emailService)
        {
            _accountService = accountService;
            _emailService = emailService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginViewModel model)
        {
            var result = await _accountService.LoginAsync(model);
            return SendResponse(result);
        }

        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> RegistrationAsync([FromBody] RegistrationViewModel model)
        {
            var result = await _accountService.RegistrationAsync(model);
            return SendResponse(result);
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UserEditAsync([FromForm] UserEditVM model)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            var result = await _accountService.UserEditAsync(model, userEmail);
            return SendResponse(result);
        }

        [HttpPut]
        [Route("changeName")]
        public async Task<IActionResult> ChangeUserNameAsync([FromBody] ChangeNameVM model)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _accountService.UserExistsAsync(userEmail);
            if (!user.IsSuccess)
            {
                return BadRequest(user);
            }
            var result = await _accountService.ChangeUserNameAsync(userEmail, model.Name, model.Surname);
            return SendResponse(result);
        }

        [HttpPut]
        [Route("changeNumber")]
        public async Task<IActionResult> ChangeNumberAsync([FromBody] string number)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _accountService.UserExistsAsync(userEmail);
            if (!user.IsSuccess)
            {
                return BadRequest(user);
            }
            var result = await _accountService.ChangeUserNumberAsync(userEmail, number);
            return SendResponse(result);
        }

        [HttpPut]
        [Route("changeUserName")]
        public async Task<IActionResult> ChangeUserNameAsync([FromBody] string userName)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _accountService.UserExistsAsync(userEmail);
            if (!user.IsSuccess)
            {
                return BadRequest(user);
            }
            var result = await _accountService.ChangeUserNameAsync(userEmail, userName);
            return SendResponse(result);
        }

        [HttpPut]
        [Route("changeUserImage")]
        public async Task<IActionResult> ChangeUserImageAsync([FromBody] string base64)
        {
            string userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _accountService.UserExistsAsync(userEmail);
            if (!user.IsSuccess)
            {
                return BadRequest(user);
            }
            var result = await _accountService.ChangeUserImageAsync(userEmail, base64);
            return SendResponse(result);
        }

        [HttpGet]
        [Route("userExists")]
        public async Task<IActionResult> UserExistsAsync([FromQuery] string email)
        {
            var result = await _accountService.UserExistsAsync(email);
            return SendResponse(result);
        }

        [HttpPost("externalLogin/google")]
        public async Task<IActionResult> GoogleExternalLoginAsync([FromBody] ExternalLoginViewModel model)
        {
            var result = await _accountService.GoogleExternalLoginAsync(model, false);
            return SendResponse(result);
        }

        [HttpPost("externalLogin/google/implicit")]
        public async Task<IActionResult> GoogleExternalLoginImplicitAsync([FromBody] ExternalLoginViewModel model)
        {
            var result = await _accountService.GoogleExternalLoginAsync(model, true);
            return SendResponse(result);
        }

        [HttpPost("forgetPassword")]
        public async Task<IActionResult> ForgetPasswordAsync([FromQuery] string email)
        {
            var result = await _accountService.ForgetPasswordAsync(email);
            return SendResponse(result);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ForgetPasswordAsync([FromBody] ResetPasswordViewModel model)
        {
            var result = await _accountService.ResetPasswordAsync(model);
            return SendResponse(result);
        }

        [HttpPost]
        [Route("send_email_confirmation")]
        public async Task<IActionResult> SendEmailConfirmationAsync(string email)
        {
            var result = await _accountService.SendEmailConfirmationAsync(email);
            return SendResponse(result);
        }

        [HttpPost]
        [Route("confirm_email")]
        public async Task<IActionResult> ConfirmEmailAsync([FromBody] VerifyEmailViewModel model)
        {
            var result = await _accountService.ConfirmEmailAsync(model.Email, model.Token);
            return SendResponse(result);
        }

        [HttpPost]
        [Route("send_email")]
        public async Task<IActionResult> SendEmailAsync(string email)
        {
            await _emailService.SendEmailAsync(email, "Відправка листа", "Вітаємо вас на нашому сайті");
            return Ok(new ServiceResponse { IsSuccess = true, Message = "Лист  відправлено" });
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
