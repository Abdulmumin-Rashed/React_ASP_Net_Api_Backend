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
    public class CustomerController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CustomerController( IMapper mapper, IUnitOfWork unitOfWork )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet(Name = "GetCustomers")]
        public IActionResult Get()
        {

            var customers = _unitOfWork.Customers.GetAll().Select(c => new { id = c.Id, name = c.name, isGold = c.isGold, phone = c.phone });
            //var customers = _context.Customers
            //    .Select(c => new { id = c.Id, name = c.name,isGold = c.isGold, phone = c.phone })
            //    .ToArray();
            return Ok(customers);
        }
        [HttpGet("{id}")]
        public IActionResult Get( int id )
        {


            var customer = _mapper.Map<CustomerDto>(_unitOfWork.Customers
                .GetById(id));
            if (customer == null)
            {
                return StatusCode(404);
            }
            else
            {
                return Ok(customer);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete( int id )
        {
            var customer = _unitOfWork.Customers.GetById(id);
            if (customer == null)
            {
                return StatusCode(404);
            }
            _unitOfWork.Customers.Delete(customer);
            _unitOfWork.Complete();
            return Ok();

        }
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Put( int id, CustomerDto updateCustomer )
        {
            if (updateCustomer == null)
                return BadRequest(ModelState);
            if (updateCustomer.Id != id)
                return BadRequest(ModelState);
            if (!_unitOfWork.Customers.HasAny(m => m.Id == id))
                return NotFound();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerMap = _mapper.Map<Customer>(updateCustomer);
            _unitOfWork.Customers.Update(customerMap);
            try
            {
                var customer = _unitOfWork.Complete();
                if (customer == 0)
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                return Ok("Successfully Add");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Customers' ");
                ModelState.AddModelError("", e.Message);
                return StatusCode(500, ModelState);
            }

        }
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post( [FromBody] CustomerDto newCustomer )
        {
            if (newCustomer == null)
            {
                return BadRequest(ModelState);
            }
            if (_unitOfWork.Customers.HasAny(c => c.name.Trim().ToUpper() == newCustomer.name.TrimEnd().ToUpper()))
            {
                ModelState.AddModelError("", "Movie Already exists");
                return StatusCode(422, ModelState);
            }
            var customerMap = _mapper.Map<Customer>(newCustomer);

            _unitOfWork.Customers.Add(customerMap);
            try
            {
                var customer = _unitOfWork.Complete();
                if (customer == 0)
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return StatusCode(500, ModelState);
                }
                return Ok("Successfully Add");

            }
            catch (DbUpdateException)
            {
                var e = new DbUpdateException("Cannot insert explicit value for identity column in table 'Customers' ");
                ModelState.AddModelError("", e.Message);
                return StatusCode(500, ModelState);
            }
        }
    }
}
