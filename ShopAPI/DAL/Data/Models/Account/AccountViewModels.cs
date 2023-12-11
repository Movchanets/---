using Microsoft.AspNetCore.Http;

namespace DAL.Data.Models.Account
{
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class UserEditVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public IFormFile Image { get; set; } = null!;
    }

    public class ChangeNameVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }

    public class ExternalLoginViewModel
    {
        public string Provider { get; set; }
        public string Token { get; set; }
    }

    public class ResetPasswordViewModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class VerifyEmailViewModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
