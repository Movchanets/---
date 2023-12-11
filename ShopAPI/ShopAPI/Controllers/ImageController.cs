using DAL.Data.Helpers;
using DAL.Data.Models.Image;
using Microsoft.AspNetCore.Mvc;

namespace BookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        [HttpPost]
        [Route("upload")]
        public IActionResult Upload([FromBody] ImageViewModel model)
        {
            try
            {
                var response = ImageWorker.SaveImage(model.ImageBase64);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("uploadFile")]
        public async Task<IActionResult> UploadFile([FromForm] ImageFileViewModel model)
        {
            try
            {
                var response = await ImageWorker.SaveImageFile(model.Image);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("uploadWebP")]
        public IActionResult UploadWebP([FromBody] ImageViewModel model)
        {
            try
            {
                var response = ImageWorker.SaveImageWebP(model.ImageBase64);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("uploadFileWebP")]
        public async Task<IActionResult> UploadFileWebP([FromForm] ImageFileViewModel model)
        {
            try
            {
                var response = await ImageWorker.SaveImageFileWebP(model.Image);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}