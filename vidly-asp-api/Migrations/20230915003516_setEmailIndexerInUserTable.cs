using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vidly_asp_api.Migrations
{
    /// <inheritdoc />
    public partial class setEmailIndexerInUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_email",
                table: "Users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_email",
                table: "Users");
        }
    }
}
