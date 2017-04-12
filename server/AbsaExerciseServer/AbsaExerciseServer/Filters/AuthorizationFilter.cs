using Server.Domain;
using Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace AbsaExerciseServer.Filters
{
    public class AuthorizationFilter: AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization != null && actionContext.Request.Headers.Authorization.Scheme == "Bearer" && !string.IsNullOrEmpty(actionContext.Request.Headers.Authorization.Parameter))
            {
                var decoded = actionContext.Request.Headers.Authorization.Parameter.DecodeBase64();
                var split = decoded.Split('|');
                if (split.Length > 2)
                {
                    var username = split[0];
                    var token = split[1];
                    var tokenExpiry = split[2];
                    var _loginRepository = new LoginRepository();
                    var login = _loginRepository.GetLogin(username);
                    if (login != null && login.AuthToken == token && !login.TokenIsExpired)
                    {
                        return true;
                    }
                }

            }
            Challenge(actionContext);
            return false;
        }

        void Challenge(HttpActionContext actionContext)
        {
            var host = actionContext.Request.RequestUri.DnsSafeHost;
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            actionContext.Response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", host));
        }
    }
}