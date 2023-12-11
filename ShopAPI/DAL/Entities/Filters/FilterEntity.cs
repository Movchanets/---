using System.ComponentModel.DataAnnotations.Schema;


namespace DAL.Entities.Filters
{
    [Table("tblFilters")]
    public class FilterEntity
    {
        [ForeignKey("FilterName")]
        public int FilterNameId { get; set; }

        [ForeignKey("FilterValue")]
        public int FilterValueId { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public virtual FilterNameEntity FilterName { get; set; }
        public virtual FilterValueEntity FilterValue { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
