using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using vidly_asp_api.Models;

namespace vidly_asp_api.VidlyContext.ModelsConfig
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure( EntityTypeBuilder<User> builder )
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(u=>u.email)
                .IsUnique();
            builder.Property(u => u.name)
                .HasColumnType("nvarchar(50)")
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(u => u.email)
                .HasColumnType("nvarchar(255)")
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(u => u.password)
                .HasColumnType("nvarchar(1024)")
                .IsRequired()
                .HasMaxLength(1024);
        }
    }
    public class GenreConfiguration : IEntityTypeConfiguration<Genre>
    {
        public void Configure( EntityTypeBuilder<Genre> builder )
        {
            builder.HasKey(x => x.Id);
            builder.Property(u => u.name)
                .HasColumnType("nvarchar(50)")
                .IsRequired()
                .HasMaxLength(50);
        }
    }

    public class FavouriteConfiguration : IEntityTypeConfiguration<Favourites>
    {
        public void Configure( EntityTypeBuilder<Favourites> builder )
        {
            builder.HasIndex(f => new {f.movieId,f.customerId})
                .IsUnique();
            builder.HasKey(x => x.Id);
            builder.HasOne(r => r.movie)
                .WithMany(m => m.likes)
                .HasForeignKey(r => r.movieId);
            builder.HasOne(r => r.customer)
                .WithMany(c => c.likes)
                .HasForeignKey(r => r.customerId);
        }
    }

    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure( EntityTypeBuilder<Movie> builder )
        {
            builder.HasKey(x => x.Id);
            builder.Property(u => u.title)
                .HasColumnType("nvarchar(255)")
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(m => m.numberInStock)
                .IsRequired()
                .HasColumnType("int")
                .HasMaxLength(255);
            builder.Property(m => m.dailyRentalRate)
                .IsRequired()
                .HasColumnType("float")
                .HasMaxLength(255);
            builder.HasOne(m => m.genre)
                .WithMany(g => g.movies)
                .HasForeignKey(m => m.genreId);
        }
    }
    public class SeedingMovieTable
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using (var db = new VidlyDbContext(serviceProvider.GetRequiredService<DbContextOptions<VidlyDbContext>>()) )
            {
                db.Database.EnsureCreated();
                var movie = db.Movies.FirstOrDefault(m => m.title == "Airplane");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 2.1, numberInStock = 5, title = "Airplane", genreId = 1 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "The Hangover");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 2.6, numberInStock = 10, title = "The Hangover", genreId = 1 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Wedding Crashers");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 2.16, numberInStock = 15, title = "Wedding Crashers", genreId = 1 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Die Hard");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 2.9, numberInStock = 5, title = "Die Hard", genreId = 2 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Terminator");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 3.5, numberInStock = 10, title = "Terminator", genreId = 2 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Wedding Crashers");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 4.2, numberInStock = 15, title = "The Avengers", genreId = 2 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "The Notebook");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 1.5, numberInStock = 5, title = "The Notebook", genreId = 3 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "When Harry Met Sally");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 3.25, numberInStock = 10, title = "When Harry Met Sally", genreId = 3 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Pretty Woman");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 5.12, numberInStock = 15, title = "Pretty Woman", genreId = 3 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "The Sixth Sense");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 7.0, numberInStock = 5, title = "The Sixth Sense", genreId = 4 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "Gone Girl");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 1.64, numberInStock = 10, title = "Gone Girl", genreId = 4 }
                    );
                movie = db.Movies.FirstOrDefault(m => m.title == "The Others");
                if (movie == null)
                    db.Movies.Add(
                        new Movie { dailyRentalRate = 2.98, numberInStock = 15, title = "The Others", genreId = 4 }
                    );
                db.SaveChanges();
            }
        }
    }
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure( EntityTypeBuilder<Customer> builder )
        {
            builder.HasKey(x => x.Id);
            builder.Property(u => u.name)
                .HasColumnType("nvarchar(50)")
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(m => m.phone)
                .IsRequired()
                .HasColumnType("nvarchar(50)")
                .HasMaxLength(50);
        }
    }
    public class SeedingCustomerTable
    {
        public static void Seed( IServiceProvider serviceProvider )
        {
            using (var db = new VidlyDbContext(serviceProvider.GetRequiredService<DbContextOptions<VidlyDbContext>>()))
            {
                db.Database.EnsureCreated();
                var customer = db.Customers.FirstOrDefault(m => m.name == "Abood");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225233", name = "Abood"}
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Qadoor");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225234", name = "Qadoor"}
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Abdul Qader");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225235", name = "Abdul Qader"}
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Mohammed");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225236", name = "Mohammed" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Khalid");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225237", name = "Khalid" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Ali");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225238", name = "Ali" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Ahmed");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225239", name = "Ahmed" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Nasr");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225230", name = "Nasr" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Mojahed");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225231", name = "Mojahed" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Mummin");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225232", name = "Mummin" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "Joe");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = true, phone = "773225243", name = "Joe" }
                    );
                customer = db.Customers.FirstOrDefault(m => m.name == "John");
                if (customer == null)
                    db.Customers.Add(
                        new Customer { isGold = false, phone = "773225244", name = "John" }
                    );
                db.SaveChanges();
            }
        }
    }
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public void Configure( EntityTypeBuilder<Rental> builder )
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.dateOut)
                .HasConversion<DateOnlyConverter, DateOnlyComparer>()
                .HasDefaultValueSql("getdate()")
                .IsRequired();
            builder.Property(r => r.dateReturned)
                .HasConversion<DateOnlyConverter, DateOnlyComparer>()
                .ValueGeneratedNever();
            builder.Property(r => r.rentalFee)
                .HasColumnType("float");
            builder.HasOne(r => r.movie)
                .WithMany(m => m.rentals)
                .HasForeignKey(r => r.movieId);
            builder.HasOne(r => r.customer)
                .WithMany(c => c.rentals)
                .HasForeignKey(r => r.customerId);
        }
    }
    public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
    {
        public DateOnlyConverter() : base(
            dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
        {

        }
    }
    public class DateOnlyComparer : ValueComparer<DateOnly>
    {
        public DateOnlyComparer() : base(
            ( d1, d2 ) => d1.DayNumber == d2.DayNumber,
            d => d.GetHashCode())
        {

        }
    }
}
