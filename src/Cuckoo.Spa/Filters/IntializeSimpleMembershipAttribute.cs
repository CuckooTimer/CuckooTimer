using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading;
using WebMatrix.WebData;
using Cuckoo.Spa.Models;
using System.Web.Security;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Cuckoo.Spa.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class InitializeSimpleMembershipAttribute : ActionFilterAttribute
    {
        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            // Ensure ASP.NET Simple Membership is initialized only once per app start
            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
        }

        private class SimpleMembershipInitializer
        {
            public SimpleMembershipInitializer()
            {
                Database.SetInitializer<UsersContext>(null);

                try
                {
                    using (var context = new UsersContext())
                    {
                        if (!context.Database.Exists())
                        {
                            // Create the SimpleMembership database without Entity Framework migration schema
                            ((IObjectContextAdapter)context).ObjectContext.CreateDatabase();
                        }
                    }

                    WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "Id", "UserName", autoCreateTables: true);
                    var administratorUserName = "admin@cuckoo.com";
                    // Create Admin user
                    if (!WebSecurity.ConfirmAccount(administratorUserName))
                    {
                        //WebSecurity.CreateUserAndAccount("admin", "pass", new { email = "a@b.com" });
                        WebSecurity.CreateUserAndAccount(administratorUserName, "P@55word");
                    }

                    // Create admin role if not exist
                    if (!Roles.RoleExists("Administrator"))
                    {
                        Roles.CreateRole("Administrator");
                        Roles.AddUserToRole(administratorUserName, "Administrator");
                    }
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("The ASP.NET Simple Membership database could not be initialized. For more information, please see http://go.microsoft.com/fwlink/?LinkId=256588", ex);
                }
            }
        }
    }
}