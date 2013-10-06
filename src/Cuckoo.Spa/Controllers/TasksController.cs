using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cuckoo.Spa.Controllers
{
    public class TasksController : ApiController
    {
        // GET api/tasks
        public object[] Get()
        {
            // simulate server load
            System.Threading.Thread.Sleep(1000);
            return new object[] { new { Id = 1, Name = "Email, planning, and time tracking", Status="Stopped", Tags=new string[]{}, Description="This is the description.", Active=false},
                                  new { Id = 2,Name = "Sales support", Status="New", Tags=new string[]{}, Description="What good is a reward if you ain't around to use it? Besides, attacking that battle station ain't my idea of courage. It's more like…suicide. All right.", Active=false},
                                  new { Id = 3,Name = "Training and skills improvement", Status="In Progress", Tags=new string[]{"Administrative","Training"}, Description="Hokey religions and ancient weapons are no match for a good blaster at your side, kid. What good is a reward if you ain't around to use it?", Active=false},
                                  new { Id = 4,Name = "AthleticHost: Modify image upload to better handle images with unexpected size ratios", Status="Complete", Tags=new string[]{"AthleticHost"}, Description="I don't know what you're talking about. I am a member of the Imperial Senate on a diplomatic mission to Alderaan-- Don't be too proud of this technological terror you've constructed. The ability to destroy a planet is insignificant next to the power of the Force. I'm surprised you had the courage to take the responsibility yourself.", Active=false},
                                  new { Id = 5,Name = "AthleticHost: Integrate the event calendar with the iCal feed from highschoolsports.net", Status="Complete", Tags=new string[]{"AthleticHost"}, Description="Your eyes can deceive you. Don't trust them.", Active=false}  
            };
        }

        // GET api/tasks/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/tasks
        public void Post([FromBody]string value)
        {
        }

        // PUT api/tasks/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/tasks/5
        public void Delete(int id)
        {
        }
    }
}
