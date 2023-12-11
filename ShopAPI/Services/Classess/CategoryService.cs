using AutoMapper;
using DAL.Data.Helpers;
using DAL.Data.Models.PlaceCategory;
using DAL.Entities;
using DAL.Helpers;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;

namespace Services.Classess
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository ctegoryRepository, IMapper mapper)
        {
            _categoryRepository = ctegoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateAsync(CategoryCreateViewModel model)
        {
            var cat = await _categoryRepository.GetByNameAsync(model.Name);
            if (cat != null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category with this name is already exist",
                    Payload = null,
                };
            }

            var entity = _mapper.Map<CategoryEntity>(model);
            entity.Image = ImageWorker.SaveImageWebP(model.Image);

            if (model.ParentID > 0)
            {
                var parent = await _categoryRepository.GetByIdAsync(model.ParentID);
                entity.ParentId = parent?.Id;
            }

            var result = await _categoryRepository.CreateAsync(entity);

            if (result)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Category created",
                    Payload = _mapper.Map<CategoryViewModel>(entity)
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Create error",
                Payload = null
            };
        }

        public async Task<ServiceResponse> DeleteAsync(int id)
        {
            var result = await _categoryRepository.DeleteAsync(id);

            if (result)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Category deleted",
                    Payload = id
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Delete error",
                Payload = null
            };
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var res = await _categoryRepository.Categories().Include(c => c.Childrens).ToListAsync();
            if (res.Count == 0){
                return new ServiceResponse { IsSuccess = false, Message = "Categories not found", Payload = null };}
            var resVM = _mapper.Map<List<CategoryListViewModel>>(res);
    if (resVM == null)
                return new ServiceResponse { IsSuccess = false, Message = "Categories not found", Payload = null };
            var list = resVM.BuildTree()?? null;

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = list,
                Message = "Categories loaded"
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(int id)
        {
            var entity = await _categoryRepository.GetByIdAsync(id);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = $"Category not found by id {id}", Payload = null };

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Category is found",
                Payload = _mapper.Map<CategoryViewModel>(entity)
            };

        }

        public async Task<ServiceResponse> GetTopChildrensByNameAsync(string name)
        {
            var parent = await _categoryRepository.GetByNameAsync(name);
            var res = await _categoryRepository.Categories().Where(x => x.ParentId == parent.Id).ToListAsync();
            var resVM = _mapper.Map<List<CategoryViewModel>>(res);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Category is found",
                Payload = resVM
            };
        }

        public async Task<ServiceResponse> UpdateAsync(CategoryUpdateViewModel model)
        {
            var entity = await _categoryRepository.GetByIdAsync(model.Id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Update error",
                    Payload = null
                };

            }

            entity.ParentId = (model.ParentId < 0 || model.ParentId == entity.Id) ? null : model.ParentId;


            if (!model.Image.IsNullOrEmpty())
            {
                string oldImageName = entity.Image;
                var newImageName = ImageWorker.SaveImageWebP(model.Image);
                entity.Image = newImageName;

                ImageWorker.RemoveImage(oldImageName);
            }


            var result = await _categoryRepository.UpdateAsync(entity);
            var updateRntity = _mapper.Map<CategoryViewModel>(entity);

            if (result)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Category updated",
                    Payload = updateRntity
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Update error",
                Payload = null
            };
        }
    }
}
