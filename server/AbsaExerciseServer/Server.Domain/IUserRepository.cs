using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Domain
{
  public interface IUserRepository
  {
    List<User> GetUsers();

    User GetUser(int id);

    User UpdateUser(int id, User user);

    User InsertUser(User user);

    void DeleteUser(int id);

  }
}
