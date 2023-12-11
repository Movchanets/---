
namespace DAL.Data.Models.Exclusion
{
    public class ExclusionVM
    {
        public int Page { get; set; }
        public int CountOnPage { get; set; }
        public string? Search { get; set; }
        public string? Sort { get; set; }
        public string? CategoryName { get; set; }
    }
}
