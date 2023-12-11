using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities.Filters
{
    [Table("tblFilterNames")]
    public class FilterNameEntity : BaseEntity<int>
    {
        [ForeignKey("Category")]
        public int? CategoryId { get; set; }
        public virtual CategoryEntity Category { get; set; }
        public virtual ICollection<FilterNameGroupEntity> FilterNameGroups { get; set; }
    }
}