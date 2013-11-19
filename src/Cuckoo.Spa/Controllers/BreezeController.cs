using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;

using Breeze.WebApi;

using Cuckoo.Spa.Models;
using Cuckoo.Spa.Filters;

namespace Cuckoo.Spa.Controllers
{
    [BreezeController]
    [Authorize]
    [InitializeSimpleMembership]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<CuckooContext> _contextProvider =
            new EFContextProvider<CuckooContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Task> Tasks()
        {
            return _contextProvider.Context.Tasks;
        }
    }
}