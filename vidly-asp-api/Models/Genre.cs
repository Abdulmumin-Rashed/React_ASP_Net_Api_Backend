namespace vidly_asp_api.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string name { get; set; }
        public List<Movie> movies { get; set; }
    }
}
