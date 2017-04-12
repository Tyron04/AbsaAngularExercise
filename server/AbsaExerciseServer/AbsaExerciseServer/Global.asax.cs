using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace AbsaExerciseServer
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_Error()
        {
            string dir = "C:\\Logs";
            string filePath = dir + "\\logfile.txt";
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            string[] error = new string[2];
            error[0] = DateTime.Now.ToString("[yyyy/MM/dd HH:mm:ss]") + " An error occurred while accessing " + Context.Request.Url;
            error[1] = "Error:" + Server.GetLastError();
            File.AppendAllLines(filePath, error);
        }
    }
}
