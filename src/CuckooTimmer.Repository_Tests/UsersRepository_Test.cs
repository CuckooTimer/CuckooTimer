using System.Linq;
using CuckooTimer.Repository;
using NUnit.Framework;

namespace CuckooTimmer.Repository_Tests
{
    public class UsersRepository_Test
    {
        [Test]
        public void Gets_Users_Test()
        {
            var target = new UsersRepository();

            var actual = target.GetUsers();
            Assert.IsTrue(actual.Any());
        }
    }
}
