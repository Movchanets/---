using DAL.Entities.Filters;
using DAL.Entities.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Product_tbl")]
    public class ProductEntity : BaseEntity<int>
    {
        public string Description { get; set; }

        [MaxLength(500)]
        public string ShortDescription { get; set; }
        public ICollection<ProductImageEntity> Images { get; } = new List<ProductImageEntity>();
        public decimal Price { get; set; }
        public uint Quantity { get; set; }
        public int CategoryId { get; set; }
        public CategoryEntity Category { get; set; }
        
        public virtual ICollection<FilterEntity> Filters { get; set; }
        public virtual ICollection<UserEntity> UsersFavorite { get; set; }
    }
}
