using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vidly_asp_api.Migrations
{
    /// <inheritdoc />
    public partial class populateGenresTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "name" },
                values: new object[] { 1, "Comedy" }
                );
            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "name" },
                values: new object[] { 2, "Action" }
                );
            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "name" },
                values: new object[] { 3, "Romance" }
                );
            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "name" },
                values: new object[] { 4, "Thriller" }
                );

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
