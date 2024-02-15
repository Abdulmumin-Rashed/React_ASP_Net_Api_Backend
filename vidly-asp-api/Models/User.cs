namespace vidly_asp_api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public bool isAdmin { get; set; }
    }
}
