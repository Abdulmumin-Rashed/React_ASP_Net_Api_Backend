using AutoMapper;
using vidly_asp_api.Dto;
using vidly_asp_api.Models;

namespace vidly_asp_api.Helper
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Movie, MovieDto>();
            CreateMap<Rental, RentalDto>();
            CreateMap<Genre, GenreDto>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<Favourites, FavouriteDto>();
            CreateMap<UserDto, User>();
            CreateMap<MovieDto, Movie>();
            CreateMap<RentalDto, Rental>();
            CreateMap<GenreDto, Genre>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<FavouriteDto, Favourites>();
        }
    }
}
