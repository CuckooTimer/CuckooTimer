using FluentMigrator.Builders.Create.Table;

namespace CuckooTimer_Database
{
    public static class Helpers
    {
        public static ICreateTableColumnOptionOrWithColumnSyntax WithIdColumn(this ICreateTableWithColumnSyntax tableWithColumnSyntax)
        {
            return tableWithColumnSyntax.WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity();
        }

        public static ICreateTableColumnOptionOrWithColumnSyntax WithTimeStamps(this ICreateTableWithColumnSyntax tableWithColumnSyntax)
        {
            return tableWithColumnSyntax.WithColumn("CreatedAt").AsDateTime().NotNullable().WithColumn("ModifiedAt").AsDateTime().NotNullable();
        }
    }
}