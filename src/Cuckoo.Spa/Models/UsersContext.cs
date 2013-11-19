using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;

namespace Cuckoo.Spa.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext() 
            : base ("DefaultConnection")
        { }

        public DbSet<User> Users { get; set; }

    }
}