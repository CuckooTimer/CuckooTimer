
namespace Cuckoo.Spa.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string[] Tags { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    }
}