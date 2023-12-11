using AutoMapper;
using DAL.Data.Models.Filter;
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces.Filter;

namespace Services.Classess.Filter
{
    public class FilterValueService : IFilterValueService
    {
        private readonly IFilterValueRepository _filterValueRepository;
        private readonly IMapper _mapper;
        public FilterValueService(IFilterValueRepository filterValuRepository, IMapper mapper)
        {
            _filterValueRepository = filterValuRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateFilterValueAsync(CreateFilterValueVM model)
        {
            //var entity = await _filterValueRepository.GetByNameAsync(model.Name);
            //if (entity != null) return new ServiceResponse { IsSuccess = false, Message = "Filter value with the same name is already exist" };

            foreach (var item in model.Names)
            {
                var entity = await _filterValueRepository.GetByNameAsync(item);
                if (entity != null)
                    continue;


                var fn = new FilterValueEntity
                {
                    DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    Name = item,
                };
                await _filterValueRepository.CreateAsync(fn);
            }
          
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = $"Filter values are created.",
                Payload = model.Names.Union(model.Names),
            };
        }

        public async Task<ServiceResponse> DeleteFilterValueAsync(int id)
        {
            var res = await _filterValueRepository.DeleteAsync(id);
            if (res) return new ServiceResponse { IsSuccess = true, Message = $"Filter value by ID: {id} deleted." };

            return new ServiceResponse { IsSuccess = false, Message = $"Filter value by ID: {id} not deleted." };
        }

        public async Task<ServiceResponse> GetAllFilterValueAsync()
        {
            var res = await _filterValueRepository.GetAll().ToListAsync();
            var fnVM = _mapper.Map<List<ShowFilterValueVM>>(res);

            return new ServiceResponse { IsSuccess = true, Message = "Filter values is loaded.", Payload = fnVM };
        }

        public async Task<ServiceResponse> GeteFilterValueByIdAsync(int id)
        {
            var res = await _filterValueRepository.GetByIdAsync(id);
            if (res == null) return new ServiceResponse() { IsSuccess = false, Message = "Filter value does`t found" };

            var fnVM = _mapper.Map<ShowFilterValueVM>(res);
            return new ServiceResponse { IsSuccess = true, Message = "Filter value is loaded.", Payload = fnVM };
        }

        public async Task<ServiceResponse> UpdateFilterValueAsync(UpdateFilterValueVM model)
        {
            var entity = await _filterValueRepository.GetByIdAsync(model.Id);
            if (entity == null) return new ServiceResponse { IsSuccess = false, Message = $"Filter value \"{model.Name}\" not found." };

            entity.Name = model.Name;
            entity.IsDelete = model.IsDelete;

            await _filterValueRepository.UpdateAsync(entity);
            var entityVM = _mapper.Map<ShowFilterValueVM>(entity);

            return new ServiceResponse { IsSuccess = true, Message = "Filter updated successfule.", Payload = entityVM };
        }
    }
}
