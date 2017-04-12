using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Configuration;

namespace Server.Domain
{
    public class LoginDetails
    {
        [BsonElement("_id")]
        public int Id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public string AuthToken { get; set; }

        public DateTime TokenExpiry { get; set; }

        public bool TokenIsExpired
        {
            get
            {
                return DateTime.Now.ToUniversalTime() >= TokenExpiry;
            }
        }

        public string BearerToken
        {
            get
            {
                return (Username + "|" + AuthToken + "|" + TokenExpiry.ToString(_dateFormat)).EncodeBase64();
            }
        }

        private const string _dateFormat = "yyyy/MM/dd HH:mm:ss";

        public static string HashPassword(string password)
        {
            byte[] data = Encoding.ASCII.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
            return Encoding.ASCII.GetString(data);
        }

        public void RefreshToken()
        {
            int _tokenExpiryTimeoutInSeconds = int.Parse(ConfigurationManager.AppSettings["TokenTimeoutInSeconds"]);
            this.AuthToken = Guid.NewGuid().ToString();
            this.TokenExpiry = DateTime.Now.AddSeconds(_tokenExpiryTimeoutInSeconds);
        }

    }
}