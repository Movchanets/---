using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp.Formats.Webp;

namespace DAL.Data.Helpers
{
    public static class ImageProcessingHelper
    {
        public static byte[] ResizeImage(IFormFile formFile, int width, int height)
        {
            using (var image = Image.Load(formFile.OpenReadStream()))
            {
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Size = new Size(width, height),
                    Mode = ResizeMode.Max
                }));

                using (var memoryStream = new MemoryStream())
                {
                    image.Save(memoryStream, new WebpEncoder());
                    return memoryStream.ToArray();
                }
            }
        }

        public static byte[] ResizeImage(string base64, int width, int height)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64);
            using (var image = Image.Load(byteBuffer))
            {
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Size = new Size(width, height),
                    Mode = ResizeMode.Max
                }));

                using (var memoryStream = new MemoryStream())
                {
                    image.Save(memoryStream, new WebpEncoder());
                    return memoryStream.ToArray();
                }
            }
        }
    }
}
