using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class GenresController : Controller
    {
        private readonly VidlyDbContext _context;
        public GenresController( VidlyDbContext context )
        {
            _context = context;
        }
        [HttpGet(Name = "GetGenres")]
        public IEnumerable<object> Get()
        {
            return _context.Genres.Select(g => new { id = g.Id, name = g.name })
            .ToArray();
        }
    }
}
