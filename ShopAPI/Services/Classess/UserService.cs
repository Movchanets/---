using AutoMapper;
using DAL.Data.Helpers;
using DAL.Data.Models.Exclusion;
using DAL.Data.Models.User;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;

namespace Services.Classess
{
    public class UserService :IUserService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IMapper  _mapper;
        public UserService(UserManager<UserEntity> userManager , IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> BlockUnblockUserAsync(string email)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user == null) return new ServiceResponse() { IsSuccess = false , Message = "Users not found" , Payload=false};

            user.IsBlocked = !user.IsBlocked;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return new ServiceResponse() { IsSuccess = true, Message = "User is blocked" };

            return new ServiceResponse() { IsSuccess = false, Message = "Error update user" };

        }

        public async Task<ServiceResponse> GetAllUsersAsync()
        {
            var users = await _userManager.Users
                                    .Include(x => x.UserRoles)
                                    .ThenInclude(x => x.Role)
                                    .OrderBy(x => x.Email)
                                    .Select(x => _mapper.Map<UserVM>(x))
                                    .ToListAsync();

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = users,
                Message = "Users list loaded"
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(long id)
        {
            var result = await _userManager.Users.Where(x => x.Id == id)
               .Include(x => x.UserRoles).ThenInclude(ur => ur.Role)
               .Select(x => _mapper.Map<UserVM>(x))
               .FirstOrDefaultAsync();


            if (result == null)
                return new ServiceResponse() { IsSuccess = false, Message = "Not found"};

            return new ServiceResponse() { IsSuccess = true, Message = "User loaded", Payload = result };
        }

        public async Task<ServiceResponse> GetUserByPageAsync(ExclusionVM model)
        {
            var query = _userManager.Users
                                   .Include(x => x.UserRoles)
                                   .ThenInclude(x => x.Role)
                                   .AsQueryable();


            if (!model.Search.IsNullOrEmpty()) // пошук поки одним параметом string 
                query = query.Where(x =>
                            (x.Email + x.FirstName + x.LastName)
                            .ToLower()
                            .Contains(model.Search.ToLower()));

            int tottalElements = query.Count();
            int pages = (int)Math.Ceiling(tottalElements / (double)model.CountOnPage);

            query = query.OrderBy(x => x.Email)
                       .Skip((model.Page - 1) * model.CountOnPage)
                       .Take(model.CountOnPage);

            var users = await query.Select(x => _mapper.Map<UserVM>(x)).ToListAsync();
            var resultVM = new ExclusionResultVM()
            {
                CurrentPage = model.Page,
                Pages = pages,
                TotalElements = tottalElements,
                Payload = users
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = resultVM,
                Message = $"Loaded users in page {model.Page}"
            };
        }

        public async Task<ServiceResponse> UpdateUserProfileAsync(UserUpdateVM model)
        {
            var userEntity = await _userManager.FindByIdAsync(model.Id.ToString());
            if(userEntity == null)
                return new ServiceResponse { 
                    IsSuccess = false,
                    Message = "User not found.", 
                    Payload = _mapper.Map<UserVM>(userEntity) 
                };

            //збереження нового фото
            if(!model.Image.IsNullOrEmpty())
            {
                //видалення старого фото
                if(!userEntity.Image.IsNullOrEmpty())
                    ImageWorker.RemoveImage(userEntity.Image);

                //збереження нового фото
                string photoName = ImageWorker.SaveImageWebP(model.Image);
                userEntity.Image = photoName;
            }

            //обновлення полів UserEntity
            userEntity.FirstName = model.FirstName;
            userEntity.LastName = model.LastName;
            userEntity.PhoneNumber = model.PhoneNumber;
            userEntity.UserName = model.UserName;

            var result = await _userManager.UpdateAsync(userEntity);
            var roles = await _userManager.GetRolesAsync(userEntity);

            var _vm = _mapper.Map<UserVM>(userEntity);
            //добавлення ролей у модель UserVM
            foreach (var role in roles)
                _vm.UserRoles.Add(role);

            return new ServiceResponse { IsSuccess = true, Message = "Update.", Payload = _vm };
        }
    }
}
