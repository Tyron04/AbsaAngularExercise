using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Server.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Server.Repository
{
    public class Mongo<T> where T : class
    {
        private readonly MongoCollection<T> _collection;
        public Mongo(string tableName)
        {
            var conn = Environment.GetEnvironmentVariable("MONGO_PORT_27017_TCP_ADDR");
            var connectionString = ConfigurationManager.AppSettings["mongoConnectionString"];
            if (!string.IsNullOrWhiteSpace(conn))
            {
                connectionString = connectionString.Replace("localhost", conn);
            }
            var databaseName = ConfigurationManager.AppSettings["mongoDatabaseName"];
            var client = new MongoClient(connectionString);
            var server = client.GetServer();
            var db = server.GetDatabase(databaseName);
            _collection = db.GetCollection<T>(tableName);
        }

        public List<T> GetAll()
        {
            return _collection.FindAll().ToList();
        }

        public T GetById(int id)
        {
            return _collection.FindOneById(id);
        }

        public T GetByQuery(Expression<Func<T, string>> queryExpression, string id)
        {
            var query = Query<T>.EQ(queryExpression, id);
            return _collection.FindOne(query);
        }

        public void Add(T entity)
        {
            _collection.Insert(entity);
        }

        public void Update(Expression<Func<T, int>> queryExpression, int id, T entity)
        {
            var query = Query<T>.EQ(queryExpression, id);
            _collection.Update(query, Update<T>.Replace(entity));
        }

        public void Update(Expression<Func<T, string>> queryExpression, string id, T entity)
        {
            var query = Query<T>.EQ(queryExpression, id);
            _collection.Update(query, Update<T>.Replace(entity));
        }

        public void Delete(Expression<Func<T, int>> queryExpression, int id)
        {
            var query = Query<T>.EQ(queryExpression, id);
            _collection.Remove(query);
        }
    }
}
