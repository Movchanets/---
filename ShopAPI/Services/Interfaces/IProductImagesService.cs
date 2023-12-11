using Microsoft.AspNetCore.Http;

namespace Services.Interfaces
{
    public interface IProductImagesService
    {
        public Task<bool> CreateImagesAsync(int productId, List<string> images);
        public Task<bool> CreateImagesAsync(int productId, List<IFormFile> images);
        public Task<bool> DeleteImagesByProductAsync(int productId);
    }
}
