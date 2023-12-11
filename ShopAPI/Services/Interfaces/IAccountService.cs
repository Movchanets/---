using DAL.Data.Models.Account;
using Newtonsoft.Json.Linq;

namespace Services.Interfaces
{
    public interface IAccountService
    {
        public Task<ServiceResponse> LoginAsync(LoginViewModel model);
        public Task<ServiceResponse> RegistrationAsync(RegistrationViewModel model);
        public Task<ServiceResponse> GoogleExternalLoginAsync(ExternalLoginViewModel model, bool isImplicitToken);
        public Task<ServiceResponse> UserExistsAsync(string email);
        public Task<ServiceResponse> UserEditAsync(UserEditVM model, string email = "");
        public Task<ServiceResponse> ForgetPasswordAsync(string email);
        public Task<ServiceResponse> ResetPasswordAsync(ResetPasswordViewModel model);
        public Task<ServiceResponse> SendEmailConfirmationAsync(string email);
        public Task<ServiceResponse> ConfirmEmailAsync(string email, string token);
        public Task<ServiceResponse> ChangeUserNameAsync(string email, string name, string surname);
        public Task<ServiceResponse> ChangeUserNumberAsync(string userEmail, string number);
        public Task<ServiceResponse> ChangeUserNameAsync(string userEmail, string userName);
        public Task<ServiceResponse> ChangeUserImageAsync(string userEmail, string base64);
    }
}
