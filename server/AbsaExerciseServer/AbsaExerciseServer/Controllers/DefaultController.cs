using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AbsaExerciseServer.Controllers
{
    public class DefaultController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Index()
        {
            var response = new HttpResponseMessage();
            response.Content = new StringContent("<html><body>Hello World</body></html>");
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response;
        }
    }
}
