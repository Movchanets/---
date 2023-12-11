
using DAL.Data.Models.Product;
using DAL.Data.Models.User;

public class OrderVM
{
    
 
    public UserVM User { get; set; }
    public IEnumerable<Detail> Details { get; set; }
    public string DateCreated { get; set; }
    public int TotalPrice { get; set; }

}
public class Detail
{
    
    public int ProductId { get; set; }
    public ProductViewModel Product { get; set; }
    public int Quantity { get; set; }
}