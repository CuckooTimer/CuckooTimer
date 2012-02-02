using System.Collections.Generic;
using System.Configuration;
using CuckooTimer.Model.Dtos;
using Simple.Data;

namespace CuckooTimer.Repository
{
    public class UsersRepository
    {
        private Database _dbContext;
        public Database DBContext
        {
            get
            {
                if (_dbContext == null)
                {
                    _dbContext = Database.OpenConnection(ConfigurationManager.ConnectionStrings["Simple.Data.Properties.Settings.DefaultConnectionString"].ConnectionString);
                }
                return _dbContext;
            }
            set { _dbContext = value; }
        }

        public string GetTimmer()
        {
            var db =
                Database.OpenConnection(
                    ConfigurationManager.ConnectionStrings["Simple.Data.Properties.Settings.DefaultConnectionString"].ConnectionString);






            return string.Empty;
        }

        public IList<User> GetUsers()
        {
            var db = Database.OpenConnection("Data Source=localhost;Initial Catalog=CuckooTimer;User Id=BuildUser;Password=CuckooTimerBuild;");



            IList<User> users = db.Users.All().ToList<User>();
            return users;
        }
    }
}
