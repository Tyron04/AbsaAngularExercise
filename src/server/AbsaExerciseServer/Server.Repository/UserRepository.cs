using Server.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Repository
{
  public class UserRepository : IUserRepository
  {
    private const string _tableName = "users";
    protected Mongo<User> _users;
    public Mongo<User> Users
    {
      get
      {
        if (_users == null)
        {
          _users = new Mongo<User>(_tableName);
        }
        return _users;
      }
    }

    public void DeleteUser(int id)
    {
      Users.Delete(x => x.Id, id);
    }

    public User GetUser(int id)
    {
      return Users.GetById(id);
    }

    public List<User> GetUsers()
    {
      return Users.GetAll();
    }

    public User InsertUser(User user)
    {
      user.Id = getNextId();
      Users.Add(user);
      return GetUser(user.Id);
    }

    public User UpdateUser(int id, User user)
    {
      Users.Update(x => x.Id, id, user);
      return GetUser(user.Id);
    }

    private int getNextId()
    {
      var allUsers = Users.GetAll();
      if (allUsers.Count != 0)
      {
        return allUsers.OrderBy(x => x.Id).Last().Id + 1;
      }
      return 1;
    }
  }
}
