using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vidly_asp_api.Dto;
using vidly_asp_api.Models;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class RentController : Controller
    {
        private readonly VidlyDbContext _context;
        private readonly IMapper _mapper;

        public RentController( VidlyDbContext context, IMapper mapper )
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet(Name = "GetRentals")]
        public IActionResult Get()
        {

            var movies = _context.Rentals
                .Include(r => r.movie).Include(r => r.customer)
                .Select(r => new { id = r.Id, movie = r.movie.title, customer = r.customer.name, dateOut = r.dateOut, dateReturned = r.dateReturned, rentalFee = r.rentalFee })
                .ToArray();
            return Ok(movies);
        }
        [HttpGet("{id}")]
        public IActionResult Get( int id )
        {

            var rent = _context.Rentals
                .Where(r => r.Id == id).Include(r=>r.customer).Include(r=>r.movie).FirstOrDefault();
            if (rent == null)
            {
                return StatusCode(404);
            }
            else
            {
                return Ok(rent);
            }
        }
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Put( int id )
        {

            if (!_context.Rentals.Any(r => r.Id == id))
                return NotFound();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rent = _context.Rentals.Where(r => r.Id == id).FirstOrDefault();
            var movie = _context.Movies.Where(m => m.Id == rent.movieId).FirstOrDefault();
            rent.dateReturned = DateOnly.FromDateTime(DateTime.Now.AddDays(3));
            rent.rentalFee = ( rent.dateReturned?.DayNumber - rent.dateOut.DayNumber ) * movie.dailyRentalRate;
            movie.numberInStock = movie.numberInStock + 1;
            _context.Movies.Update(movie);
            _context.Update(rent);
            try
            {
                var isRent = _context.SaveChanges();
                if (isRent == 0)
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                return Ok("Successfully Add");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Rentals' ");
                ModelState.AddModelError("", e.Message);
                return StatusCode(500, ModelState);
            }

        }
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post( [FromBody] RentalDto newRent)
        {
            var checkRents = _context.Rentals.Where(r => r.customerId == newRent.customerId && r.movieId == newRent.movieId).FirstOrDefault();
            if (checkRents != null)
            {
                if(checkRents.dateReturned== null)
                ModelState.AddModelError("", "customer Already rented that movie");
                return StatusCode(422, ModelState);
            }
            var movie = _context.Movies.Where(m => m.Id == newRent.movieId).FirstOrDefault();
            if (movie.numberInStock > 0)
            {
                //RentalDto newRent = new RentalDto();
                //newRent.customerId = customerId;
                //newRent.movieId = movieId;
                var rentalsMap = _mapper.Map<Rental>(newRent);
                rentalsMap.dateOut = DateOnly.FromDateTime(DateTime.Now);
                movie.numberInStock = movie.numberInStock - 1;
                _context.Movies.Update(movie);
                _context.Rentals.Add(rentalsMap);
                try
                {
                    var rent = _context.SaveChanges();
                    if (rent == 0)
                    {
                        ModelState.AddModelError("", "Something went wrong while saving");
                        return StatusCode(500, ModelState);
                    }
                    return Ok("Successfully Add");

                }
                catch (DbUpdateException)
                {
                    var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Rentals' ");
                    ModelState.AddModelError("", e.Message);
                    return StatusCode(500, ModelState);
                }
            }
            else
            {
                ModelState.AddModelError("", "this movie has on more copies in Stock");
                return StatusCode(500, ModelState);
            }
        }
    }
}
