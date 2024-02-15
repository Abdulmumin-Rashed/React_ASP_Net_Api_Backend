namespace vidly_asp_api.Models
{
    public class Favourites
    {
        public int Id { get; set; }
        public int customerId { get; set; }
        public Customer customer { get; set; }
        public int movieId { get; set; }
        public Movie movie { get; set; }
    }
}
