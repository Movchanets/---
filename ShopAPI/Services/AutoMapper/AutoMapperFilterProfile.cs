using AutoMapper;
using DAL.Data.Models.Filter;
using DAL.Entities.Filters;

namespace Services.AutoMapper
{
    public class AutoMapperFilterProfile:Profile
    {
        public AutoMapperFilterProfile()
        {
            //Filter Name
            CreateMap<FilterNameEntity, ShowFilterNameVM>()
                .ForMember(dest => dest.FilterValues,
                opt => opt.MapFrom(src => src.FilterNameGroups
                                                .Select(r => new ShowFilterValueVM() {
                                                    Id = r.FilterValue.Id ,
                                                    Name= r.FilterValue.Name,
                                                    IsDelete = r.FilterValue.IsDelete,
                                                })
                                                .ToList()));


            //Filter Value
            CreateMap<FilterValueEntity, ShowFilterValueVM>();

            //Filters
            CreateMap<FilterEntity, ShowFilterValueVM>();

        }
    }
}
