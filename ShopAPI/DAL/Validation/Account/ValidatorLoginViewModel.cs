using DAL.Data.Models.Account;
using FluentValidation;

namespace DAL.Validation.Account
{
    public class ValidatorLoginViewModel : AbstractValidator<LoginViewModel>
    {
        public ValidatorLoginViewModel()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Поле пошта є обов'язковим!")
                .EmailAddress().WithMessage("Пошта є не коректною!");

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Поле є обов'язковим!");
        }
    }
}
