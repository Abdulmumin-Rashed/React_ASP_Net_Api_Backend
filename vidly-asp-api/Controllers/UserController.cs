using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class UserController : Controller
    {
        private readonly IConfiguration _config;
        private readonly VidlyDbContext _context;
        private readonly IMapper _mapper;
        public UserController( IConfiguration config, VidlyDbContext context, IMapper mapper )
        {
            _config = config;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Register( [FromBody] UserDto newUser )
        {
            if (newUser == null)
            {
                return BadRequest(ModelState);
            }
            if (_context.Users.Any(m => m.email.Trim().ToUpper() == newUser.email.TrimEnd().ToUpper()))
            {
                ModelState.AddModelError("", "User Already exists");
                var error = ModelState.Values.ToArray();
                return StatusCode(400, error[0].Errors);
            }
            var userMap = _mapper.Map<User>(newUser);

            _context.Users.Add(userMap);
            try
            {
                var user = _context.SaveChanges();
                if (user == 0)
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                var loginUser = Authenticate(newUser);
                if (loginUser != null)
                {
                    var token = GenerateToken(loginUser);
                    return Ok(token);
                }

                return NotFound("user not found");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'User' ");
                ModelState.AddModelError("", e.Message);
                return StatusCode(500, ModelState);
            }

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
        // To generate token
        private string GenerateToken( User user )
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("id",user.Id.ToString()),
                new Claim("name",user.name),
                new Claim("email",user.email)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }
}
