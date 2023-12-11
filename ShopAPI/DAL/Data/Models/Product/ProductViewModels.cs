
using DAL.Data.Models.ProductImage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAL.Data.Models.Product
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set;}
        public uint Quantity { get; set; }
        public string Category { get; set; }
        public int CategoryId { get; set; }
        public bool IsSaved { get; set; }

        public List<ProductImageViewModel> Images { get; set; }
    }

    public class ProductCreateViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set;}
        public uint Quantity { get; set; }
        public int CategoryId { get; set; }

        [BindProperty(Name = "images[]")]
        public List<IFormFile> Images { get; set; }
     
    }

    public class ProductUpdateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set;}
        public uint Quantity { get; set; }
        public int CategoryId { get; set; }

        [BindProperty(Name = "images[]")]
        public List<IFormFile> Images { get; set; } = null!;
        public List<string> RemoveImages { get; set; } = null!;
        
    }

    /// <summary>
    /// Search by filters
    /// </summary>
    public class ProductSearchVM
    {
        public int Page { get; set; }
        public int CountOnPage { get; set; }
        public string Search { get; set; }
        public string Sort { get; set; }
        public string CategoryName { get; set; }
        public List<long> Values { get; set; }
    }

    public class ProductByQuery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image{ get; set; }
    }
}
