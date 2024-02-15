using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using vidly_asp_api.Dto;
using vidly_asp_api.Models;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;
        private readonly VidlyDbContext _context;
        private readonly IMapper _mapper;

        public AuthController( IConfiguration config, VidlyDbContext context, IMapper mapper )
        {
            _config = config;
            _context = context;
            _mapper = mapper;
        }

        
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Login( [FromBody] UserDto userLogin )
        {
            //var userLogin = new UserDto();
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }
        [HttpGet]
        [Route("Admins")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminEndPoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hi you are an Admin");
        }
        // To generate token
        private string GenerateToken( User user )
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("id",user.Id.ToString()),
                new Claim("name",user.name),
                new Claim("isAdmin",user.isAdmin.ToString()),
                new Claim("email",user.email)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        //To authenticate user
        private User Authenticate( UserDto userLogin )
        {
            var currentUser = _context.Users.FirstOrDefault(x => x.email.ToLower() ==
                userLogin.email.ToLower() && x.password == userLogin.password);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }
        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    email = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                    isAdmin = userClaims.Any(x => x.Type == ClaimTypes.Role),
                };
            }
            return null;
        }
    }
}
