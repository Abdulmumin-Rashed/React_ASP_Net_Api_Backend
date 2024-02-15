using vidly_asp_api.Application.IRepositories;

namespace vidly_asp_api.Application
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        IMovieRepository Movies { get; }
        IGenreRepository Genres { get; }
        IRentalRepository Rentals { get; }
        int Complete();
    }
}
