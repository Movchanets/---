using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Filters
{
    [Table("tblFilterNameGroups")]
    public class FilterNameGroupEntity
    {
        [ForeignKey("FilterName")]
        public int FilterNameId { get; set; }
        [ForeignKey("FilterValue")]
        public int FilterValueId { get; set; }

        public virtual FilterNameEntity FilterName { get; set; }
        public virtual FilterValueEntity FilterValue { get; set; }
    }
}