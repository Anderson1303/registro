using System;
using System.Threading.Tasks;
using App.Infra;
using App.Models;
using Dapper;
using Oracle.ManagedDataAccess.Client;

namespace App.Services
{
    public class BeneficiarioService
    {
        private ConnectionFactory _connectionFactory;

        public BeneficiarioService(ConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<BeneficiarioModel> GetDadosCateirinha(string carteirinha)
        {
            string sql = @"SELECT cd_matricula from user";

            using (var conn = _connectionFactory.GetConnection())
            {
                var param = new DynamicParameters();
                param.Add(":CARTEIRINHA", carteirinha);

                try
                {
                    return await conn.QueryFirstOrDefaultAsync<BeneficiarioModel>(sql, param);
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }

        }

        public async Task<BeneficiarioModel> GetDadosCPF(string cpf)
        {
            string sql = @"SELECT u.cd_matricula from user";

            using (var conn = _connectionFactory.GetConnection())
            {
                var param = new DynamicParameters();
                param.Add(":CPF", cpf);

                try
                {
                    return await conn.QueryFirstOrDefaultAsync<BeneficiarioModel>(sql, param);
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }

        }

        public async Task<int> RegistrarFalta(ServicosDoPrestadorModel falta)
        {
            string sql = @"INSERT INTO DBAPS.xap_ausentes_consultorio(
                            NM_USER,
                            NR_TST
                        ) VALUES (
                            :NM_USER,
                            :NR_TST
                        )";

            using (var conn = _connectionFactory.GetConnection())
            {

                OracleCommand cmd = (OracleCommand)conn.CreateCommand();
                cmd.CommandText = sql;
                var dt_nascimento = (falta.dt_nascimento == null) ? null : falta.dt_nascimento;
                cmd.Parameters.Add(":NM_USER", falta.cd_prestador);
                cmd.Parameters.Add(":NR_TST", falta.nm_prestador);

                try
                {
                    return await cmd.ExecuteNonQueryAsync();

                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }

        }
    }

}