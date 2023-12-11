using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("ProductImage_tbl")]
    public class ProductImageEntity : BaseEntity<int>
    {
        public int ProductId { get; set; }
        public ProductEntity Product { get; set; } = null;
    }
}
