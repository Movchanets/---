
namespace DAL.Data.Models.Exclusion
{
    public class ExclusionResultVM
    {
        public int CurrentPage { get; set; }
        public int TotalElements { get; set; }
        public int Pages { get; set; }
        public object Payload { get; set; }
    }
}
