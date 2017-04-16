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
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        private readonly ILoginRepository _loginRepository;

        public AuthController()
        {
            _loginRepository = new LoginRepository();
        }

        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login()
        {
            try
            {
                if (Request.Headers.Authorization != null && Request.Headers.Authorization.Scheme == "Basic" && !string.IsNullOrEmpty(Request.Headers.Authorization.Parameter))
                {
                    var decoded = Request.Headers.Authorization.Parameter.DecodeBase64();
                    var split = decoded.Split(':');
                    if (split.Length > 1)
                    {
                        var username = split[0];
                        var password = split[1];
                        LoginDetails login = null;

                        login = _loginRepository.GetLogin(username);

                        if (login != null && login.Password == LoginDetails.HashPassword(password))
                        {
                            var token = login.BearerToken;
                            if (login.TokenIsExpired)
                            {
                                login.RefreshToken();
                                var newLogin = _loginRepository.UpdateLogin(login.Id, login);
                                token = newLogin.BearerToken;
                            }
                            return Ok(token);
                        }
                    }
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                var conn = Environment.GetEnvironmentVariable("MONGO_PORT_27017_TCP_ADDR");
                var message = "Error: " + ex.Message + " ConnectionString: ";
                if (conn != null)
                {
                    message += conn;
                }
                Exception e = new Exception(message);
                return InternalServerError(e);
            }
        }

        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Create()
        {
            _loginRepository.CreateLogin("Admin", "Admin");
            return Ok();
        }

    }
}
