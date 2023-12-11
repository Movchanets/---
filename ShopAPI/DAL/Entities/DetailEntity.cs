namespace DAL.Entities;

public class DetailEntity : BaseEntity<int>
{
    
  
    public int ProductId { get; set; }
    public int OrderId { get; set; }
    public OrderEntity Order { get; set; }
    public int Quantity { get; set; }
  
    public ProductEntity Product { get; set; }
}   