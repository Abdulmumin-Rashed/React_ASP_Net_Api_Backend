using vidly_asp_api.Application.IRepositories;
using vidly_asp_api.Models;
using vidly_asp_api.Persistence.Repositories;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Persistence.Repository
{
    public class RentalRepository : BaseRepository<Rental>, IRentalRepository
    {
        private readonly VidlyDbContext _context;

        public RentalRepository( VidlyDbContext context ) : base(context)
        {
        }

        public IEnumerable<Rental> SpecialMethod()
        {
            throw new NotImplementedException();
        }
    }
}
