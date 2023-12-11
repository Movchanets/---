using DAL.Entities.Filters;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Category_tbl")]
    public class CategoryEntity : BaseEntity<int>
    {
        [MaxLength(255)]
        public string Image { get; set; }
        [ForeignKey("Parent")]
        public int? ParentId { get; set; }
        public CategoryEntity Parent { get; set; }
        virtual public ICollection<CategoryEntity> Childrens { get; set;}
        virtual public ICollection<ProductEntity> Products { get; set; }
        public virtual ICollection<FilterNameEntity> FilterNames { get; set; }
    }
}