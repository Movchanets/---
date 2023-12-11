using DAL.Data.Models.Product;
using FluentValidation;

namespace DAL.Validation.Product
{
    public class ValidatorProductCreateViewModel : AbstractValidator<ProductCreateViewModel>
    {
        public ValidatorProductCreateViewModel()
        {
            RuleFor(r => r.Name)
                .MinimumLength(3).WithMessage("Назва занадто коротка!")
                .NotEmpty().WithMessage("Поле назва є обов'язковим!");

            RuleFor(r => r.Description)
                .MinimumLength(4).WithMessage("Опис занадто короткий!")
                .NotEmpty().WithMessage("Поле опис є обов'язковим!");

            RuleFor(r => r.Images)
                .NotEmpty().WithMessage("Поле фото є обов'язковим!");

            RuleFor(r => r.CategoryId)
                .NotEmpty().WithMessage("Поле категорія є обов'язковим!");
        }
    }
}
