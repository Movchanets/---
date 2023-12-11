using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAL.Migrations
{
    public partial class adddetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccommodationTypeId",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "Adults",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "Children",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "DateFrom",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "DateTo",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsCanceled",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsFinished",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsNotStayer",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "IsTravelingForWork",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Order_tbl");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Order_tbl");

            migrationBuilder.CreateTable(
                name: "DetailEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    IsDelete = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailEntity_Order_tbl_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order_tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailEntity_Product_tbl_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product_tbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailEntity_OrderId",
                table: "DetailEntity",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailEntity_ProductId",
                table: "DetailEntity",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailEntity");

            migrationBuilder.AddColumn<int>(
                name: "AccommodationTypeId",
                table: "Order_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Adults",
                table: "Order_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Children",
                table: "Order_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Order_tbl",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateFrom",
                table: "Order_tbl",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTo",
                table: "Order_tbl",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Order_tbl",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Order_tbl",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCanceled",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFinished",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsNotStayer",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTravelingForWork",
                table: "Order_tbl",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Order_tbl",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Order_tbl",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
