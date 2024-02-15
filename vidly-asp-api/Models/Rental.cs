namespace vidly_asp_api.Models
{
    public class Rental
    {
        public int Id { get; set; }
        public int customerId { get; set; }
        public Customer customer { get; set; }
        public int movieId { get; set; }
        public Movie movie { get; set; }
        public DateOnly dateOut { get; set; }
        public DateOnly? dateReturned { get; set; }
        public double? rentalFee { get; set; }
    }
}
