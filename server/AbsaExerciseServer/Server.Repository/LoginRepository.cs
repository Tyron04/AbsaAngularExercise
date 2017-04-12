using Server.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Repository
{
    public class LoginRepository : ILoginRepository
    {

        private const string _TableName = "login-details";

        protected Mongo<LoginDetails> _loginDetail;

        public Mongo<LoginDetails> LoginDetail
        {
            get
            {
                if (_loginDetail == null)
                {
                    _loginDetail = new Mongo<LoginDetails>(_TableName);
                }
                return _loginDetail;
            }
        }

        public LoginDetails CreateLogin(string username, string password)
        {
            LoginDetails result = new LoginDetails()
            {
                Id = getNextId(),
                Username = username,
                Password = LoginDetails.HashPassword(password),
            };
            result.RefreshToken();
            LoginDetail.Add(result);
            return result;
        }

        public LoginDetails UpdateLogin(int id, LoginDetails login)
        {
            LoginDetail.Update(x => x.Id, id, login);
            return GetLogin(login.Username);
        }


        public LoginDetails GetLogin(string username)
        {
            return LoginDetail.GetByQuery(x => x.Username, username);
        }

        private int getNextId()
        {
            var allLogins = LoginDetail.GetAll();
            if (allLogins.Count != 0)
            {
                return allLogins.OrderBy(x => x.Id).Last().Id + 1;
            }
            return 1;
        }
    }
}
