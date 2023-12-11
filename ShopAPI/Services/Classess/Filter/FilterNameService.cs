
using AutoMapper;
using DAL.Data.Models.Filter;
using DAL.Entities.Filters;
using DAL.Repositories.Interfaces.Filter;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces.Filter;

namespace Services.Classess.Filter
{
    public class FilterNameService : IFilterNameService
    {
        private readonly IFilterNameRepository _filterNameRepository;
        private readonly IMapper _mapper;
        public FilterNameService(IFilterNameRepository filterNameRepository , IMapper mapper)
        {
            _filterNameRepository = filterNameRepository;      
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateFilterNameAsync(CreateFilterNameVM model)
        {
            var entity = await _filterNameRepository.GetByNameAsync(model.Name);
            if (entity != null) return new ServiceResponse { IsSuccess = false, Message = "Filter with the same name is already exist" };

            var fn = new FilterNameEntity
            {
                CategoryId = model.CategoryId <= 0? null : model.CategoryId,
                DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                Name = model.Name,
            };

            await _filterNameRepository.CreateAsync(fn);
            var entityVM = _mapper.Map<ShowFilterNameVM>(fn);
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = $"Filter \"{fn.Name}\" is created.",
                Payload = entityVM,
            };
        }

        public async Task<ServiceResponse> DeleteFilterNameAsync(int id)
        {
           var res = await _filterNameRepository.DeleteAsync(id);
            if (res) return new ServiceResponse { IsSuccess = true, Message = $"Filter by id: {id} deleted." };

            return new ServiceResponse { IsSuccess = false, Message = $"Filter by id: {id} not deleted." };
        }

        public async Task<ServiceResponse> GetAllFilterNameAsync()
        {
            var res = await _filterNameRepository.GetAll().Include(fn=>fn.FilterNameGroups).ThenInclude(fg=>fg.FilterValue).ToListAsync();
            var listEntityVM = _mapper.Map<List<ShowFilterNameVM>>(res);

            return new ServiceResponse {  IsSuccess = true , Message = "FilterNames is loaded.", Payload = listEntityVM };
        }

        public async Task<ServiceResponse> GetFilterNameByIdAsync(int id)
        {
            var entity = await _filterNameRepository.GetByIdAsync(id);
            if (entity == null) return new ServiceResponse { IsSuccess = false, Message = $"Filter  not found." };
            var entityVM = _mapper.Map<ShowFilterNameVM>(entity);

            return new ServiceResponse() { IsSuccess = true, Message="Filter name found and loaded." , Payload = entityVM };
        }

        public async Task<ServiceResponse> UpdateFilterNameAsync(UpdateFilterNameVM model)
        {
            var entity = await _filterNameRepository.GetByIdAsync(model.Id);
            if (entity == null) return new ServiceResponse { IsSuccess = false, Message = $"Filter \"{model.Name}\" not found." };

            entity.Name = model.Name;
            entity.CategoryId = model.CategoryId;
            entity.IsDelete = model.IsDelete;

            await _filterNameRepository.UpdateAsync(entity);
            var entityVM = _mapper.Map<ShowFilterNameVM>(entity);

            return new ServiceResponse { IsSuccess = true, Message = "Filter updated successfule.", Payload = entityVM };
        }
    }
}
