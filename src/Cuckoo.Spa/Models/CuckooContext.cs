using System.Data.Entity;

namespace Cuckoo.Spa.Models
{
    public class CuckooContext : DbContext
    {
        public CuckooContext()
            : base("name=DefaultConnection")
        {
            Database.SetInitializer(new CuckooDatabaseInitializer());
        }
        public DbSet<Task> Tasks { get; set; }
    }
}