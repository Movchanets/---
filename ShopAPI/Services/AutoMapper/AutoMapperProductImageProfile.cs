using AutoMapper;
using DAL.Data.Models.ProductImage;
using DAL.Entities;

namespace Services.AutoMapper
{
    public class AutoMapperProductImageProfile : Profile
    {
        public AutoMapperProductImageProfile()
        {
            CreateMap<ProductImageEntity, ProductImageViewModel>();
        }
    }
}
