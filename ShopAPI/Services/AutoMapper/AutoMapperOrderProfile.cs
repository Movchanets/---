using System.Globalization;
using AutoMapper;
using DAL.Data.Models.Order;
using DAL.Entities;

namespace Services.AutoMapper;

public class AutoMapperOrderProfile : Profile
{
    public AutoMapperOrderProfile()
    {
        CreateMap<OrderCreateVM, OrderEntity>()
            .ForMember(h => h.Id, opt => opt.Ignore())
            .ForMember(h => h.UserId, opt => opt.Ignore())
            .ForMember(h => h.Details, opt => opt.Ignore());
            



        CreateMap<OrderEntity, OrderVM>()
            .ForMember(o => o.DateCreated, opt => opt.MapFrom(o => o.DateCreated.ToString("dd.MM.yy")))
            .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Details))
             .ForMember(o => o.TotalPrice, opt => opt.MapFrom(o => o.TotalPrice));
            
        CreateMap<OrderVM, OrderEntity>()

            .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Details))
            .ForMember(o => o.TotalPrice, opt => opt.Ignore())
            .ForMember(o => o.DateCreated,
                opt => opt.MapFrom(o =>
                    DateTime.ParseExact(o.DateCreated, "dd.MM.yyyy", CultureInfo.InvariantCulture).ToUniversalTime()));
    }
}