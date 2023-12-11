using DAL.Data.Models.Product;
using FluentValidation;

namespace DAL.Validation.Product
{
    public class ValidatorProductUpdateViewModel : AbstractValidator<ProductUpdateViewModel>
    {
        public ValidatorProductUpdateViewModel()
        {
            RuleFor(r => r.Name)
                .MinimumLength(4).WithMessage("Назва занадто коротка!")
                .NotEmpty().WithMessage("Поле назва є обов'язковим!");

            RuleFor(r => r.Description)
                .MinimumLength(4).WithMessage("Опис занадто короткий!")
                .NotEmpty().WithMessage("Поле опис є обов'язковим!");

            RuleFor(r => r.CategoryId)
                .NotEmpty().WithMessage("Поле категорія є обов'язковим!");
        }
    }
}