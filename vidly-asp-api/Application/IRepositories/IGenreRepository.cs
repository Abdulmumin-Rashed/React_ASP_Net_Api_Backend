using vidly_asp_api.Models;

namespace vidly_asp_api.Application.IRepositories
{
    public interface IGenreRepository : IBaseRepository<Genre>
    {
        IEnumerable<Genre> SpecialMethod();
    }
}
