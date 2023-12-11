using DAL.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities;

[Table("Order_tbl")]
public class OrderEntity : BaseEntity<int>
{
    public long UserId { get; set; }
    public UserEntity User { get; set; }
    public virtual ICollection<DetailEntity> Details { get; set; }
    public decimal TotalPrice { get; set; }

}