using AutoMapper;
using DAL.Data.Models.User;
using DAL.Entities.Identity;

namespace Services.AutoMapper
{
    public class AutoMapperUserProfile:Profile
    {
        public AutoMapperUserProfile()
        {
            CreateMap<UserEntity, UserVM>()
                .ForMember(dest => dest.UserRoles , 
                opt => opt.MapFrom(src => src.UserRoles.Select(r=> r.Role.Name).ToList()));

            CreateMap<UserUpdateVM, UserEntity>()
                .ForMember(u => u.Image, opt => opt.Ignore())
                .ForMember(u => u.UserRoles, opt => opt.Ignore());

        }
    }
}
