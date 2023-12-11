
namespace DAL.Data.Models.Filter
{
    public class FilterVM
    {
        public int FilterNameId { get; set; }
        public int FilterValueId { get; set; }
    }

    public class ConnectionFilterVM {

        public int ProductId { get; set; }
        public List<FilterVM> ConnectionFilters { get; set; }
        public List<FilterVM> RemoveConnectionFilters { get; set; }
        
    }

}
