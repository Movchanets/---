using AutoMapper;
using DAL.Data.Models.PlaceCategory;
using DAL.Entities;

namespace Services.AutoMapper
{
    public class AutoMapperCategoryProfile : Profile
    {
        public AutoMapperCategoryProfile()
        {
            CreateMap<CategoryEntity, CategoryViewModel>()
                .ForMember(c => c.ProductCount, opt => opt.MapFrom(c => c.Products.Count));

            CreateMap<CategoryEntity, CategoryCreateViewModel>();
            CreateMap<CategoryCreateViewModel, CategoryEntity>()
                .ForMember(c => c.Image, opt => opt.Ignore())
                .ForMember(c => c.Childrens, opt => opt.Ignore())
                .ForMember(c => c.ParentId, opt => opt.Ignore())
                .ForMember(c => c.Parent, opt => opt.Ignore());

            CreateMap<CategoryUpdateViewModel, CategoryEntity>()
                .ForMember(c => c.Image, opt => opt.MapFrom(dst=> dst.Image));
            CreateMap<CategoryEntity, CategoryUpdateViewModel>(); 

            CreateMap<CategoryEntity, CategoryGroupViewModel>();

            CreateMap<CategoryEntity, CategoryListViewModel>()
                .ForMember(c => c.Data, opt => opt.MapFrom(c => c))
                .ForMember(c => c.Label, opt => opt.MapFrom(c => c.Name))
                .ForMember(c => c.Children, opt => opt.MapFrom(c => c.Childrens))
                .ForMember(c => c.Key, opt => opt.MapFrom(c => c.Id));
        }
    }
}
