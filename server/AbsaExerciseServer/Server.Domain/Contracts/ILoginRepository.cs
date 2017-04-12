using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ILoginRepository
    {
        LoginDetails CreateLogin(string username, string password);

        LoginDetails UpdateLogin(int id, LoginDetails login);

        LoginDetails GetLogin(string username);
    }
}
