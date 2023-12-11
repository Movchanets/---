using AutoMapper;
using DAL.Data.Models.Exclusion;
using DAL.Data.Models.Product;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;

namespace Services.Classess
{
    public class ProductService : IProductService
    {
        private readonly IProductImagesService _productImagesService;
        private readonly IProductRepository _productRepository;
        private readonly IProductImageRepository _productImageRepository;
        private readonly ICategoryRepository _categoryRepository;

        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IProductImageRepository productImageRepository, IMapper mapper, IProductImagesService productImagesService, ICategoryRepository categoryRepository)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _productImageRepository = productImageRepository;
            _productImagesService = productImagesService;
            _categoryRepository = categoryRepository;

          
        }

        public async Task<ServiceResponse> GetAllAsync(string userEmail = "")
        {
            var result = await _productRepository.Products.ToListAsync();
            var response = _mapper.Map<List<ProductViewModel>>(result, opt => opt.Items.Add("UserEmail", userEmail));

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Load success",
                Payload = response
            };
        }

        public async Task<ServiceResponse> GetByPaginationAsync(ExclusionVM model, string userEmail = "")
        {
            var result = await _productRepository.GetByPagination(model);

            // result.Payload => List<ProductEntity>
            var productList = _mapper.Map<List<ProductViewModel>>(result.Payload, opt => opt.Items.Add("UserEmail", userEmail));

            var response = new ExclusionResultVM()
            {
                CurrentPage = result.CurrentPage,
                Pages = result.Pages,
                TotalElements = result.TotalElements,
                Payload = productList
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Load success",
                Payload = response
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(int id, string userEmail = "")
        {
            var response = await GetByIdHelperAsync(id, userEmail);
            if (response == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Load error",
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Load success",
                Payload = response
            };
        }

      

     

       
        public async Task<ServiceResponse> CreateAsync(ProductCreateViewModel model)
        {
            var category = await _categoryRepository.GetByIdAsync(model.CategoryId);
            if (category == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category doesn't exist",
                };
            }

            var entity = _mapper.Map<ProductEntity>(model);
           
            var result = await _productRepository.CreateAsync(entity);

            if (!result)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Create error",
                };
            }

            result = await _productImagesService.CreateImagesAsync(entity.Id, model.Images);

            if (!result)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Add images error",
                };
            }

            var payload = _mapper.Map<ProductViewModel>(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Product created",
                Payload = payload
            };
        }

        public async Task<ServiceResponse> DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Error id",
                    Payload = null
                };
            }

            await _productImagesService.DeleteImagesByProductAsync(product.Id);

            var result = await _productRepository.DeleteAsync(id);

            if (result)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Product deleted",
                    Payload = id
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Delete error",
            };
        }

        public async Task<ServiceResponse> UpdateAsync(ProductUpdateViewModel model)
        {
            var category = await _categoryRepository.GetByIdAsync(model.CategoryId);
            if (category == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category doesn't exist",
                };
            }

            var entity = await _productRepository.GetByIdAsync(model.Id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Update failed",
                };
            }
            entity.Name = model.Name;
            entity.Description = model.Description;
            entity.ShortDescription = model.ShortDescription;
            entity.CategoryId = model.CategoryId;
            entity.Price = model.Price;
            entity.Quantity = model.Quantity;

           
            if (!model.Images.IsNullOrEmpty())
                await _productImagesService.CreateImagesAsync(entity.Id, model.Images);

            if (!model.RemoveImages.IsNullOrEmpty())
            {
                foreach (var image in model.RemoveImages)
                {
                    var imageTMP = await _productImageRepository.GetByNameAsync(image);
                    await _productImageRepository.DeleteAsync(imageTMP.Id);
                }
            }

            var result = await _productRepository.UpdateAsync(entity);

            if (result)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "test",
                    Payload = await GetByIdHelperAsync(entity.Id)
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Update failed",
            };
        }

        public async Task<ServiceResponse> SetFavoriteAsync(int productId, string userEmail = "")
        {
            var result = await _productRepository.SetFavorite(productId, userEmail);

            return new ServiceResponse
            {
                IsSuccess = result,
                Message = result ? "Completed" : "Failed",
            };
        }

        public async Task<ServiceResponse> GetFavoriteAsync(string userEmail = "")
        {
            if (userEmail.IsNullOrEmpty())
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User find error",
                };

            }

            var result = await _productRepository.GetFavorites(userEmail).ToListAsync();

            var response = _mapper.Map<List<ProductViewModel>>(result);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Saved products",
                Payload = response
            };
        }

        private async Task<ProductViewModel> GetByIdHelperAsync(int id, string userEmail = "")
        {
            var result = await _productRepository.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (result == null) return null;

            var response = _mapper.Map<ProductViewModel>(result, opt => opt.Items.Add("UserEmail", userEmail));

            return response;
        }

        public async Task<ServiceResponse> GetByQueryAsync(string query)
        {
            if (String.IsNullOrEmpty(query))
            {
                return new ServiceResponse
                { IsSuccess = false, Message = $"Query is empty" };
            }

            var res = await _productRepository.GetProductByQuery(query);
            return new ServiceResponse()
            { IsSuccess = true, Message = $"Product by {query}", Payload = res };
        }

        public async Task<ServiceResponse> GetUniqueAsync()
        {
            return new ServiceResponse()
            { IsSuccess = true, Message = $"Unique products retrieved", Payload = _mapper.Map<List<ProductViewModel>>(await _productRepository.GetUniqueProducts()) };
        }
    }
}
