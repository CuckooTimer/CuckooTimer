using FluentMigrator;

namespace CuckooTimer_Database.Migrations
{
    [Migration(2012010312)]
    public class CreateTasksTable : Migration{
        public override void Up()
        {
            Create.Table("Tasks")
                .WithIdColumn()
                .WithTimeStamps()
                .WithColumn("Name")
                .AsFixedLengthString(16)
                .WithColumn("Description").AsString(255);
        }

        public override void Down()
        {
            Delete.Table("Tasks");
        }
    }
}