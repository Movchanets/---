
namespace DAL.Data.Models.Filter
{
    public class CreateFilterGroupVM
    {
        public int FilterNameId { get;set; }
        public IEnumerable<int> NewFilterValuesIdList { get;set; } = new List<int>();
        public IEnumerable<int> RemoveFilterValuesIdList { get;set; } = new List<int>();
    }

    public class FiltegGroupVM
    {
        public string FilterName { get;set; }
        public IEnumerable<ShowFilterValueVM> FilterValuesList { get; set; } = new List<ShowFilterValueVM>();

    }
}
