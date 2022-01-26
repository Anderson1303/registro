using System;

namespace App.Models
{
    public class BeneficiarioModel
    {
        public string cd_matricula { get; set; }
        public string cd_mat_alternativa { get; set; }
        public DateTime dt_nascimento { get; set; }
        public string nr_cpf { get; set; }
        public string ds_email { get; set; }
        public string nr_telefone { get; set; }
        public string nm_segurado { get; set; }
    }
}