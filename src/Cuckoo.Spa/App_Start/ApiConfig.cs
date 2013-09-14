using System.Web.Http;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(Cuckoo.Spa.App_Start.ApiConfig), "RegisterApiPreStart", Order = 1)]

namespace Cuckoo.Spa.App_Start
{
    public static class ApiConfig
    {
        public static void RegisterApiPreStart()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
               name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}