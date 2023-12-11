using DAL.Data.Models.Exclusion;
using DAL.Data.Models.User;

namespace Services.Interfaces
{
    public interface IUserService
    {
        public Task<ServiceResponse> GetAllUsersAsync();
        public Task<ServiceResponse> GetUserByPageAsync(ExclusionVM model);
        public Task<ServiceResponse> GetByIdAsync(long id);
        public Task<ServiceResponse> BlockUnblockUserAsync(string email);
        public Task<ServiceResponse> UpdateUserProfileAsync(UserUpdateVM model);
    }
}
