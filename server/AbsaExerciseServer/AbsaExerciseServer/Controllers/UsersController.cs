using AbsaExerciseServer.Filters;
using Server.Domain;
using Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AbsaExerciseServer.Controllers
{
    [RoutePrefix("api/Users")]
    [AuthorizationFilter]
    public class UsersController : ApiController
    {

        private IUserRepository _userRepository;
        public UsersController()
        {
            _userRepository = new UserRepository();
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userRepository.GetUsers();
        }

        [HttpGet]
        [Route("{id}")]
        public User Get(int id)
        {
            return _userRepository.GetUser(id);
        }

        [HttpPost]
        public User Post(User user)
        {
            return _userRepository.InsertUser(user);
        }

        [HttpPut]
        [Route("{id}")]
        public User Put(int id, User user)
        {
            return _userRepository.UpdateUser(id, user);
        }

        [HttpDelete]
        [Route("{id}")]
        public void Delete(int id)
        {
            _userRepository.DeleteUser(id);
        }
    }
}
