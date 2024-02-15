﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using vidly_asp_api.VidlyContext;

#nullable disable

namespace vidly_asp_api.Migrations
{
    [DbContext(typeof(VidlyDbContext))]
    [Migration("20231015223802_alterRentalRateColumnsInMoviesAndRentalsTable")]
    partial class alterRentalRateColumnsInMoviesAndRentalsTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("vidly_asp_api.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("isGold")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("phone")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Favourites", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("customerId")
                        .HasColumnType("int");

                    b.Property<int>("movieId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("customerId");

                    b.HasIndex("movieId", "customerId")
                        .IsUnique();

                    b.ToTable("Favourites");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("dailyRentalRate")
                        .HasMaxLength(255)
                        .HasColumnType("float");

                    b.Property<int>("genreId")
                        .HasColumnType("int");

                    b.Property<int>("numberInStock")
                        .HasMaxLength(255)
                        .HasColumnType("int");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("genreId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Rental", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("customerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("dateOut")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<DateTime?>("dateReturned")
                        .HasColumnType("datetime2");

                    b.Property<int>("movieId")
                        .HasColumnType("int");

                    b.Property<double?>("rentalFee")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("customerId");

                    b.HasIndex("movieId");

                    b.ToTable("Rentals");
                });

            modelBuilder.Entity("vidly_asp_api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasMaxLength(1024)
                        .HasColumnType("nvarchar(1024)");

                    b.HasKey("Id");

                    b.HasIndex("email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Favourites", b =>
                {
                    b.HasOne("vidly_asp_api.Models.Customer", "customer")
                        .WithMany("likes")
                        .HasForeignKey("customerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("vidly_asp_api.Models.Movie", "movie")
                        .WithMany("likes")
                        .HasForeignKey("movieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customer");

                    b.Navigation("movie");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Movie", b =>
                {
                    b.HasOne("vidly_asp_api.Models.Genre", "genre")
                        .WithMany("movies")
                        .HasForeignKey("genreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("genre");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Rental", b =>
                {
                    b.HasOne("vidly_asp_api.Models.Customer", "customer")
                        .WithMany("rentals")
                        .HasForeignKey("customerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("vidly_asp_api.Models.Movie", "movie")
                        .WithMany("rentals")
                        .HasForeignKey("movieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("customer");

                    b.Navigation("movie");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Customer", b =>
                {
                    b.Navigation("likes");

                    b.Navigation("rentals");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Genre", b =>
                {
                    b.Navigation("movies");
                });

            modelBuilder.Entity("vidly_asp_api.Models.Movie", b =>
                {
                    b.Navigation("likes");

                    b.Navigation("rentals");
                });
#pragma warning restore 612, 618
        }
    }
}
