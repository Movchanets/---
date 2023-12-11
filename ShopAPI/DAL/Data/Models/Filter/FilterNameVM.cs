
using DAL.Data.Models.PlaceCategory;
using DAL.Entities;
using System.ComponentModel;

namespace DAL.Data.Models.Filter
{
    public class CreateFilterNameVM
    {
        public string Name { get; set; }
        [DefaultValue(null)]
        public int? CategoryId { get; set; }
    }


    public class ShowFilterNameVM:BaseEntity<int>
    {
        public int? CategoryId { get; set; }
        public virtual CategoryEntity Category { get; set; }
        public virtual ICollection<ShowFilterValueVM> FilterValues { get; set; }
    }

    public class UpdateFilterNameVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DefaultValue(false)]
        public bool IsDelete { get; set; }
        [DefaultValue(null)]
        public int? CategoryId { get; set; }
    }

    public class FNameViewModel
    {
            public long Id { get; set; }
            public string Name { get; set; }
            public bool IsCollapsed { get; set; } = true;
            public List<FValueViewModel> Children { get; set; }
    }
}
