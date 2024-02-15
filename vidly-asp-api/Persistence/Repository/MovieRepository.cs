using vidly_asp_api.Application.IRepositories;
using vidly_asp_api.Models;
using vidly_asp_api.Persistence.Repositories;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Persistence.Repository
{
    public class MovieRepository : BaseRepository<Movie>, IMovieRepository
    {
        private readonly VidlyDbContext _context;

        public MovieRepository( VidlyDbContext context ) : base(context)
        {
        }

        public IEnumerable<Movie> SpecialMethod()
        {
            throw new NotImplementedException();
        }
    }
}
