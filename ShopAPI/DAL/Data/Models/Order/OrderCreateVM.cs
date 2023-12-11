using DAL.Data.Models.User;

namespace DAL.Data.Models.Order;

public class OrderCreateVM
{
    public string email { get; set; }
    public IEnumerable<Detail> Details { get; set; }
   
}