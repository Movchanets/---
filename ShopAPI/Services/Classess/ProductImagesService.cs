using DAL.Data.Helpers;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Services.Classess
{
    public class ProductImagesService : IProductImagesService
    {
        private readonly IProductImageRepository _productImageRepository;

        public ProductImagesService(IProductImageRepository productImageRepository)
        {
            _productImageRepository = productImageRepository;
        }

        public async Task<bool> DeleteImagesByProductAsync(int productId)
        {
            var images = await _productImageRepository.GetAllByProductId(productId).ToListAsync();
            bool result = true;

            foreach (var image in images)
            {
                if (!await _productImageRepository.DeleteAsync(image.Id))
                {
                    result = false;
                }
            }

            return result;
        }

        public async Task<bool> CreateImagesAsync(int productId, List<IFormFile> images)
        {
            bool result = true;

            foreach (var image in images)
            {
                try
                {
                    string imageName = await ImageWorker.SaveImageFileWebP(image);
                    ProductImageEntity imageEntity = new ProductImageEntity()
                    {
                        Name = imageName,
                        ProductId = productId,
                        DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)
                    };

                    if (!await _productImageRepository.CreateAsync(imageEntity))
                        result = false;
                }
                catch (Exception ex)
                {
                    await Console.Out.WriteLineAsync("Error---> " + ex.Message);
                    result = false;
                }
            }

            return result;
        }

        public async Task<bool> CreateImagesAsync(int productId, List<string> images)
        {
            bool result = true;

            foreach (var image in images)
            {
                string imageName = ImageWorker.SaveImageWebP(image);
                ProductImageEntity imageEntity = new ProductImageEntity()
                {
                    Name = imageName,
                    ProductId = productId,
                    DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)
                };

                if (!await _productImageRepository.CreateAsync(imageEntity))
                    result = false;
            }

            return result;
        }
    }
}
