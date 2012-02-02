using FluentMigrator;

namespace CuckooTimer_Database.Migrations
{
    //Migration Format YYYYMMDDHH 

    [Migration(2011122712)]
    public class CreateUsersTable : Migration
    {
        public override void Up()
        {
            Create.Table("Users").WithIdColumn().WithTimeStamps().WithColumn("Name").AsFixedLengthString(16);
        }

        public override void Down()
        {
            Delete.Table("Users");
        }
    }
}
