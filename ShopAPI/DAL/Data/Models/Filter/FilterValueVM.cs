
using DAL.Entities;
using System.ComponentModel;

namespace DAL.Data.Models.Filter
{
    public class CreateFilterValueVM
    {
        public IEnumerable<string> Names { get; set; }= new List<string>();
    }

    public class ShowFilterValueVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DefaultValue(false)]
        public bool IsDelete { get; set; }
    }

   public class UpdateFilterValueVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DefaultValue(false)]
        public bool IsDelete { get; set; }
    }

    public class FValueViewModel
    {
        public long Id { get; set; }
        public string Value { get; set; }
        public bool IsChecked { get; set; } = false;

    }
}
