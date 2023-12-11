using AutoMapper;
using DAL.Data.Models.Product;
using DAL.Entities;

namespace Services.AutoMapper
{
    public class AutoMapperProductProfile : Profile
    {
        public AutoMapperProductProfile()
        {
            CreateMap<ProductEntity, ProductViewModel>()
                .ForMember(dest => dest.IsSaved, opt => opt.MapFrom((src, dest, destMember, context) =>
                {
                    string userEmail = "";
                    try
                    {
                        userEmail = (string)context.Items.GetValueOrDefault("UserEmail");
                    }
                    catch (Exception)
                    {
                        return false;
                    }

                    return src.UsersFavorite.Any(u => u.Email == userEmail);
                }))
                .ForMember(dest=> dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest=> dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest=> dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest=> dest.ShortDescription, opt => opt.MapFrom(src => src.ShortDescription))
                
                
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));

            CreateMap<ProductCreateViewModel, ProductEntity>()
                .ForMember(dest => dest.Images, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ShortDescription, opt => opt.MapFrom(src => src.ShortDescription))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                
                .ForMember(dest => dest.DateCreated,
                    opt => opt.MapFrom(src => DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)));

        }
    }
}