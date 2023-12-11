using Microsoft.AspNetCore.Identity;

namespace DAL.Entities.Identity
{
    public class RoleEntity : IdentityRole<long>
    {
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
