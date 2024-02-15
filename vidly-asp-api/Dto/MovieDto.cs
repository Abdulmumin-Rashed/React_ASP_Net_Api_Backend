using vidly_asp_api.Models;

namespace vidly_asp_api.Dto
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string title { get; set; }
        public int genreId { get; set; }
        public int numberInStock { get; set; }
        public int dailyRentalRate { get; set; }
    }
}
