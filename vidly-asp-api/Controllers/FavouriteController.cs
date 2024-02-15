using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vidly_asp_api.Dto;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class FavouriteController : Controller
    {
        private readonly VidlyDbContext _context;
        private readonly IMapper _mapper;

        public FavouriteController( IMapper mapper, VidlyDbContext context )
        {
            _mapper = mapper;
            _context = context;
        }
        [HttpGet(Name = "GetFavorites")]
        public IActionResult Get()
        {

            var movies = _context.Favourites
                .Include(f => f.movie).Include(f=>f.customer)
                .Select(f => new { id = f.Id, customer = f.customer.name, movie = f.movie.title})
                .ToArray();
            return Ok(movies);
        }

        //[HttpGet("{id}")]
        //public IActionResult Get( int id )
        //{

        //    var movie = _context.Favourites
        //        .Where(m => m.movieId == id).Count();
        //        return Ok(movie);
        //}

    }
}
