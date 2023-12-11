using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class producttypechange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "IsNew",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "LocationRating",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "Reviewed",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "Stars",
                table: "Product_tbl");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Product_tbl",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "Quantity",
                table: "Product_tbl",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Product_tbl");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Product_tbl");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Product_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsNew",
                table: "Product_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "LocationRating",
                table: "Product_tbl",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Product_tbl",
                type: "real",
                maxLength: 255,
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Reviewed",
                table: "Product_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Stars",
                table: "Product_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
