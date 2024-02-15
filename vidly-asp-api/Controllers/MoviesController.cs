using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vidly_asp_api.Application;
using vidly_asp_api.Dto;
using vidly_asp_api.Models;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class MoviesController : Controller
    {
        private readonly VidlyDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MoviesController( VidlyDbContext context, IUnitOfWork unitOfWork, IMapper mapper )
        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet(Name = "GetMovies")]
        public IActionResult Get()
        {

            //var movies= _unitOfWork.Movies.GetAll(new[] { "genre" })
            //    .Select(m => new { id = m.Id, title = m.title, genre = m.genre, numberInStock = m.numberInStock, dailyRentalRate = m.dailyRentalRate });
            var movies = _context.Movies
                .Include(m => m.genre)
                .Select(m => new { id = m.Id, title = m.title, genre = m.genre, numberInStock = m.numberInStock, dailyRentalRate = m.dailyRentalRate })
                .ToArray();
            return Ok(movies);
        }
        [HttpGet("{id}")]
        public IActionResult Get( int id )
        {

            var movie =_mapper.Map<MovieDto>( _context.Movies
                .Where(m => m.Id == id).FirstOrDefault());
            if (movie == null)
            {
                return StatusCode(404);
            }
            else
            {
                return Ok(movie);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete( int id )
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Id == id);
            if (movie == null)
            {
                return StatusCode(404);
            }
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();

        }
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Put( int id,MovieDto updateMovie)
        {
            if (updateMovie == null)
                return BadRequest(ModelState);
            if (updateMovie.Id != id)
                return BadRequest(ModelState);
            if ( !_context.Movies.Any(m=>m.Id==id))
                return StatusCode(404);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movieMap = _mapper.Map<Movie>(updateMovie);
            _context.Update(movieMap);
            try
            {
                var movie = _context.SaveChanges();
                if (movie == 0)
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                return Ok("Successfully Add");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Movies' ");
                ModelState.AddModelError("", e.Message);
                return StatusCode(500, ModelState);
            }

        }
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] MovieDto newMovie)
        {
            if(newMovie == null) { 
                return BadRequest(ModelState); 
            }
            if(_context.Movies.Any(m=>m.title.Trim().ToUpper()== newMovie.title.TrimEnd().ToUpper()))
            {
                ModelState.AddModelError("", "Movie Already exists");
                return StatusCode(422,ModelState);
            }
            var movieMap = _mapper.Map<Movie>(newMovie);
            if(!_context.Genres.Any(g=>g.Id== newMovie.genreId))
            {
                ModelState.AddModelError("", "No such Genre");
                return StatusCode(404,ModelState);
            }
            
            _context.Movies.Add(movieMap);
            try
            {
            var movie = _context.SaveChanges();
            if(movie == 0)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully Add");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Movies' ");
                ModelState.AddModelError("",e.Message);
                return StatusCode(500,ModelState);
            }
        }

    }
}
