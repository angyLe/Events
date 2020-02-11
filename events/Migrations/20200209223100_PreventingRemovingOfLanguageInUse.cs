using Microsoft.EntityFrameworkCore.Migrations;

namespace Events.Migrations
{
    public partial class PreventingRemovingOfLanguageInUse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventTranslations_Languages_LanguageId",
                table: "EventTranslations");

            migrationBuilder.AddForeignKey(
                name: "FK_EventTranslations_Languages_LanguageId",
                table: "EventTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "LanguageId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventTranslations_Languages_LanguageId",
                table: "EventTranslations");

            migrationBuilder.AddForeignKey(
                name: "FK_EventTranslations_Languages_LanguageId",
                table: "EventTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "LanguageId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
