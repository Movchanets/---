
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Filters
{
    [Table("tblFilterValues")]
    public class FilterValueEntity : BaseEntity<int>
    {
        public virtual ICollection<FilterNameGroupEntity> FilterNameGroups { get; set; }
    }
}
