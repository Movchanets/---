using DAL.Data.Constants;
using DAL.Data.Helpers;
using DAL.Data.Models.Account;
using DAL.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using System.Text;
using AutoMapper;

namespace Services.Classess
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public AccountService(UserManager<UserEntity> userManager, IJwtTokenService jwtTokenService, IEmailService emailService, IMapper mapper)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _emailService = emailService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> LoginAsync(LoginViewModel model)
        {
            UserEntity user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "No user is associated with this email",
                };
            }

            bool checkPassword = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!checkPassword)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Password incorrect",
                };
            }

            string token = await _jwtTokenService.CreateTokenAsync(user);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Login success",
                Payload = token
            };
        }

        public async Task<ServiceResponse> RegistrationAsync(RegistrationViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Passwords don't match",
                };
            }

            UserEntity user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Email has already used",
                };
            }

            user = new UserEntity
            {
                Email = model.Email,
                UserName = model.Email,
            };

            var userCreate = await _userManager.CreateAsync(user, model.Password);

            if (!userCreate.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Registration failed",
                };
            }

            await _userManager.AddToRoleAsync(user, Roles.User);

            string token = await _jwtTokenService.CreateTokenAsync(user);

            await SendEmailConfirmationAsync(user.Email);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Registration success",
                Payload = token
            };
        }

        public async Task<ServiceResponse> GoogleExternalLoginAsync(ExternalLoginViewModel model, bool isImplicitToken)
        {
            GoogleJsonWebSignature.Payload payload = null;

            if (isImplicitToken) payload = await _jwtTokenService.VerifyGoogleTokenImplicit(model.Token);

            else payload = await _jwtTokenService.VerifyGoogleToken(model.Token);

            if (payload == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Something went wrong"
                };
            };

            var info = new UserLoginInfo(model.Provider, payload.Subject, model.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if (user != null)
            {
                string tokenLogin = await _jwtTokenService.CreateTokenAsync(user);

                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Login success",
                    Payload = tokenLogin,
                };
            }

            user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                string userPicture = String.Empty;

                if (!payload.Picture.IsNullOrEmpty())
                {
                    try
                    {
                        userPicture = await ImageWorker.SaveGoogleUserPicture(payload.Picture);
                    }
                    catch (Exception ex)
                    {
                        await Console.Out.WriteLineAsync("Error---> " + ex.Message);
                    }
                }

                user = new UserEntity
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    FirstName = payload.GivenName,
                    Image = userPicture,
                    EmailConfirmed = true
                };

                var userCreate = await _userManager.CreateAsync(user);

                if (!userCreate.Succeeded)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        Message = "Registration failed",
                    };
                }

                await _userManager.AddToRoleAsync(user, Roles.User);
            }

            var resultLogin = await _userManager.AddLoginAsync(user, info);

            if (!resultLogin.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Login failed"
                };
            }

            string tokenRegister = await _jwtTokenService.CreateTokenAsync(user);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Registration success",
                Payload = tokenRegister
            };
        }

        public async Task<ServiceResponse> UserEditAsync(UserEditVM model, string email = "")
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User does not exist",
                };
            }

            user.FirstName = model.Name;
            user.LastName = model.Surname;
            user.Email = email;

            if (model.Image != null)
            {
                try
                {
                    ImageWorker.RemoveImage(user.Image);

                    var imageName = await ImageWorker.SaveImageFileWebP(model.Image);
                    user.Image = imageName;
                }
                catch (Exception ex)
                {
                    await Console.Out.WriteLineAsync("Error---> " + ex.Message);
                }
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Updating details error",
                };
            }

            var token = await _jwtTokenService.CreateTokenAsync(user);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Updated user details",
                Payload = token
            };
        }

        public async Task<ServiceResponse> UserExistsAsync(string email)
        {

            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "User does not exist",
                    Payload = false
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User exists",
                Payload = true
            };
        }

        public async Task<ServiceResponse> ForgetPasswordAsync(string email)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "No user is associated with this email",
                };
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            var emailBody = EmailTemplates.GetForgotPasswordEmailTemplate(email, validToken);

            await _emailService.SendEmailAsync(email, "Forgot password?", emailBody);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = $"Email successfully sent to {email}",
            };
        }

        public async Task<ServiceResponse> ResetPasswordAsync(ResetPasswordViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Passwords don't match",
                };
            }

            UserEntity user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "No user is associated with this email",
                };
            }

            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            var normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, normalToken, model.Password);

            if (!result.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Something went wrong",
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Password has been reset successfully!",
            };
        }

        public async Task<ServiceResponse> SendEmailConfirmationAsync(string email)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                };
            }

            if (user.EmailConfirmed)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Email is already confirmed",
                };
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            var emailBody = EmailTemplates.GetConfirmEmailTemplate(email, validToken);

            await _emailService.SendEmailAsync(email, "Confirm email", emailBody);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = $"Email successfully sent to {email}",
            };
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(string email, string token)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                };
            }

            if (user.EmailConfirmed)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Email is already confirmed",
                };
            }

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            var normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ConfirmEmailAsync(user, normalToken);

            if (!result.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Something went wrong",
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Email has been confirmed successfully!",
            };
        }

        public async Task<ServiceResponse> ChangeUserNameAsync(string email, string name, string surname)
        {
            var user = await _userManager.FindByEmailAsync(email);
            user.FirstName = name;
            user.LastName = surname;
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "User name changed",
                    Payload = await _jwtTokenService.CreateTokenAsync(user)
                };
            }

            return new ServiceResponse()
            {
                IsSuccess = false,
                Message = "User name not changed",
            };

        }

        public async Task<ServiceResponse> ChangeUserNumberAsync(string userEmail, string number)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            user.PhoneNumber = number;
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "User number changed",
                    Payload = await _jwtTokenService.CreateTokenAsync(user)
                };
            }
            return new ServiceResponse() { IsSuccess = false, Message = "User number not changed" };
        }

        public async Task<ServiceResponse> ChangeUserNameAsync(string userEmail, string userName)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            user.UserName = userName;
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "User number changed",
                    Payload = await _jwtTokenService.CreateTokenAsync(user)
                };
            }
            return new ServiceResponse() { IsSuccess = false, Message = "User number not changed" };
        }

        public async Task<ServiceResponse> ChangeUserImageAsync(string userEmail, string base64)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            var newImage = ImageWorker.SaveImageWebP(base64);
            ImageWorker.RemoveImage(user.Image);
            user.Image = newImage;
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "User image changed",
                    Payload = await _jwtTokenService.CreateTokenAsync(user)
                };
            }
            return new ServiceResponse() { IsSuccess = false, Message = "User image  change error" };
        }
    }
}
