using vidly_asp_api.Application.IRepositories;
using vidly_asp_api.Models;
using vidly_asp_api.Persistence.Repositories;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Persistence.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        private readonly VidlyDbContext _context;

        public CustomerRepository( VidlyDbContext context ) : base(context)
        {
        }

        public IEnumerable<Customer> SpecialMethod()
        {
            throw new NotImplementedException();
        }
    }
}
