namespace vidly_asp_api.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string title { get; set; }
        public int genreId { get; set; }
        public Genre genre { get; set; }
        public int numberInStock { get; set; }
        public double dailyRentalRate { get; set; }
        public List<Favourites> likes { get; set; }
        public List<Rental> rentals { get; set; }
    }
}
