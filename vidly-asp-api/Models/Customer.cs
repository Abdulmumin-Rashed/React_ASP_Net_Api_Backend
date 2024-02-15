namespace vidly_asp_api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string name { get; set; }
        public bool isGold { get; set; }
        public string phone { get; set; }
        public List<Favourites> likes { get; set; }
        public List<Rental> rentals { get; set; }
    }
}
