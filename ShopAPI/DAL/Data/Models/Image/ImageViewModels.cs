using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data.Models.Image
{
    public class ImageViewModel
    {
        public string ImageBase64 { get; set; }
    }
    public class ImageFileViewModel
    {
        public IFormFile Image { get; set; }
    }
}
