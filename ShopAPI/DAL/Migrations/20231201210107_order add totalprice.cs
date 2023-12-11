using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class orderaddtotalprice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "DetailEntity");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Order_tbl",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Order_tbl");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "DetailEntity",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
