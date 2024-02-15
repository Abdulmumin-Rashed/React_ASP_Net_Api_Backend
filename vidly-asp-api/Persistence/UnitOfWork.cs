using vidly_asp_api.Application;
using vidly_asp_api.Application.IRepositories;
using vidly_asp_api.Persistence.Repository;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VidlyDbContext _context;

        public ICustomerRepository Customers { get; private set; }
        public IMovieRepository Movies { get; private set; }
        public IGenreRepository Genres { get; private set; }
        public IRentalRepository Rentals { get; private set; }

        public UnitOfWork( VidlyDbContext context )
        {
            _context = context;

            Movies = new MovieRepository(_context);
            Customers = new CustomerRepository(_context);
            Genres = new GenreRepository(_context);
            Rentals = new RentalRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        
    }
}
