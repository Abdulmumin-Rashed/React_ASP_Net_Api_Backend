using vidly_asp_api.Application.IRepositories;
using vidly_asp_api.Models;
using vidly_asp_api.Persistence.Repositories;
using vidly_asp_api.VidlyContext;

namespace vidly_asp_api.Persistence.Repository
{
    public class GenreRepository : BaseRepository<Genre>, IGenreRepository
    {
        private readonly VidlyDbContext _context;

        public GenreRepository( VidlyDbContext context ) : base(context)
        {
        }

        public IEnumerable<Genre> SpecialMethod()
        {
            throw new NotImplementedException();
        }
    }
}
