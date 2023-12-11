using System.Globalization;
using AutoMapper;
using DAL.Data.Models.Order;
using DAL.Entities;

namespace Services.AutoMapper;

public class AutoMapperDetailsProfile : Profile
{
    public AutoMapperDetailsProfile()
    {
        CreateMap<Detail, DetailEntity>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
        CreateMap<DetailEntity, Detail>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
            




    }
}