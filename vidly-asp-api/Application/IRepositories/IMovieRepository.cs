using vidly_asp_api.Models;

namespace vidly_asp_api.Application.IRepositories
{
    public interface IMovieRepository : IBaseRepository<Movie>
    {
        IEnumerable<Movie> SpecialMethod();
    }
}
