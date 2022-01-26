using System.Data;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace App.Infra
{
    public class ConnectionFactory
    {
        private IConfiguration _configuration;

        public ConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection GetConnection()
        {
            string connectionString = _configuration.GetConnectionString("Default");
            IDbConnection connection = new OracleConnection(connectionString);
            connection.Open();
            return connection;
        }

    }

}