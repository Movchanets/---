using DAL.Data.Models.Account;
using DAL.Entities.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace DAL.Validation.Account
{
    public class ValidatorRegistrationViewModel : AbstractValidator<RegistrationViewModel>
    {
        private readonly UserManager<UserEntity> _userManager;
        public ValidatorRegistrationViewModel(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;

            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Поле пошта є обов'язковим!")
               .EmailAddress().WithMessage("Пошта є не коректною!")
               .DependentRules(() =>
               {
                   RuleFor(x => x.Email).Must(BeUniqueEmail)

                    .WithMessage("Дана пошта уже зареєстрована!");
               });

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Поле пароль є обов'язковим!")
                .MinimumLength(6).WithMessage("Поле пароль має містити міннімум 6 символів!")
                .Matches("[a-z]").WithMessage("Поле пароль має містити міннімум 1 малу літеру!")
                .Matches("[A-Z]").WithMessage("Поле пароль має містити міннімум 1 велику літеру!")
                .Matches("\\d+").WithMessage("Поле пароль має містити міннімум 1 цифру!");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty().WithMessage("Поле є обов'язковим!")
                .Equal(x => x.Password).WithMessage("Паролі не співпадають!");
        }
        private bool BeUniqueEmail(string email)
        {
            return _userManager.FindByEmailAsync(email).Result == null;
        }
    }
}
