using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DAL.Data.Models.Account;
using Google.Apis.Auth;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Services
{
    public interface IJwtTokenService
    {
        Task<string> CreateTokenAsync(UserEntity user);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string token);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenImplicit(string access_token);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<UserEntity> _userManager;

        private static readonly HttpClient client = new HttpClient();
        private static readonly string userInfoURL = $"https://www.googleapis.com/oauth2/v3/userinfo";


        public JwtTokenService(IConfiguration configuration, UserManager<UserEntity> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> CreateTokenAsync(UserEntity user)
        {
            IEnumerable<string> roles = await _userManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("userName", user.UserName),
                new Claim("email", user.Email),
                new Claim("firstName", user.FirstName ?? ""),
                new Claim("lastName", user.LastName ?? ""),
                new Claim("image", user.Image ?? ""),
                new Claim("phone", user.PhoneNumber ?? "")
               
            };
            foreach (string role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            SymmetricSecurityKey signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            SigningCredentials signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                issuer: "BookingClon_Server",//Константа ISSUER представляет издателя токена. Здесь можно определить любое название.
                audience: "BookingClone_Client",//Константа AUDIENCE представляет потребителя токена - опять же может быть любая строка, обычно это сайт, на котором применяется токен.
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(10),
                claims: claims
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string token)
        {
            string clientID = _configuration["GoogleAuthSettings:ClientId"];

            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { clientID }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(token, settings);

            return payload;
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenImplicit(string access_token)
        {
            try
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
                using HttpResponseMessage response = await client.GetAsync(userInfoURL);

                response.EnsureSuccessStatusCode();
                string reponseBody = await response.Content.ReadAsStringAsync();

                var myDeserializedClass = JsonConvert.DeserializeObject<GoogleJsonWebSignature.Payload>(reponseBody);

                return myDeserializedClass;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }
    }
}

