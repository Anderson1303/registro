using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using App.Infra;
using App.Models;
using Dapper;

namespace App.Services
{
    public class PrestadorService
    {
        private ConnectionFactory _connectionFactory;

        public PrestadorService(ConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<PrestadorModel> GetPrestador(string crm)
        {
            string sql = @"SELECT * from log_med";
            
            Console.Write(sql);

            using (var conn = _connectionFactory.GetConnection())
            {
                var param = new DynamicParameters();
                param.Add(":NR_CRM", crm);

                try
                {
                    return await conn.QueryFirstOrDefaultAsync<PrestadorModel>(sql, param);
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }

        }

        public async Task<IEnumerable<ServicosDoPrestadorModel>> GetServicosDoPrestador(string cd_prestador, int page, int sizePerPage, string sortField, string sortOrder, string val)
        {
            if (sortField == "undefined")
                sortField = "id";
            if (sortOrder == "undefined")
                sortOrder = "desc";

            string infoOrderBy = sortField + " " + sortOrder;

            string sql = @"SELECT id, carteira, cpf from info_log
                        OFFSET :pagesBefore ROWS FETCH NEXT :sizePerPage ROWS ONLY";



            using (var conn = _connectionFactory.GetConnection())
            {
                var param = new DynamicParameters();
                param.Add(":cd_prestador", cd_prestador);
                param.Add(":pagesBefore", (page - 1) * sizePerPage);
                param.Add(":sizePerPage", sizePerPage);
                param.Add(":queryName", $"%{val}%");

                try
                {
                    var ans = await conn.QueryAsync<ServicosDoPrestadorModel>(sql, param);
                    return ans;
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }

        }

        public async Task<IEnumerable<int>> CountRegister(string cd_prestador, int page, int sizePerPage, string sortField, string sortOrder, string val){

            if (sortField == "undefined")
                sortField = "id";
            if (sortOrder == "undefined")
                sortOrder = "desc";

            string infoOrderBy = sortField + " " + sortOrder;

            string sqlCountRegister = @"SELECT count(*) as tam FROM ausentes";
        
            using (var conn = _connectionFactory.GetConnection())
            {
                var param = new DynamicParameters();
                param.Add(":cd_prestador", cd_prestador);
                param.Add(":queryName", $"%{val}%");

                try
                {
                    var countRegister = await conn.QueryAsync<int>(sqlCountRegister,param);
                    return countRegister;
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }
        }

        public async Task<BeneficiarioModel> GetDadosCateirinha(string carteirinha)
        {
            string sql = @"SELECT u.cd_matricula from user";

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
            string sql = @"SELECT cd_matricula from user";

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
    }

}