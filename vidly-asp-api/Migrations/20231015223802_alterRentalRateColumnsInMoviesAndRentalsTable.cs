using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vidly_asp_api.Migrations
{
    /// <inheritdoc />
    public partial class alterRentalRateColumnsInMoviesAndRentalsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "rentalFee",
                table: "Rentals",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "dailyRentalRate",
                table: "Movies",
                type: "float",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 255);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "rentalFee",
                table: "Rentals",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "dailyRentalRate",
                table: "Movies",
                type: "int",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float",
                oldMaxLength: 255);
        }
    }
}
