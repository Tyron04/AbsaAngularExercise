using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Domain
{
  public class User
  {
    [BsonElement("_id")]
    public int Id { get; set; }

    public string Name { get; set; }

    public string Surname { get; set; }

    public string Country { get; set; }
  }
}