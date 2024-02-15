using Microsoft.EntityFrameworkCore;
using vidly_asp_api.Models;
using vidly_asp_api.VidlyContext.ModelsConfig;

namespace vidly_asp_api.VidlyContext
{
    public class VidlyDbContext : DbContext
    {

        public VidlyDbContext( DbContextOptions options ) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<Favourites> Favourites { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new GenreConfiguration());
            modelBuilder.ApplyConfiguration(new MovieConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new RentalConfiguration());
            modelBuilder.ApplyConfiguration(new FavouriteConfiguration());
        }
        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            base.OnConfiguring(optionsBuilder);

        }

    }
}
