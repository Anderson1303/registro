using System;

namespace App.Models
{
    public class ServicosDoPrestadorModel
    {
        public int id { get; set; }
        public int cd_prestador { get; set; }
        public string nm_prestador { get; set; }
        public string ds_especialidade { get; set; }
        public string cpf_beneficiario { get; set; }
        public string carteirinha { get; set; }
        public string nm_beneficiario { get; set; }
        public DateTime? dt_nascimento { get; set; }
        public string telefone { get; set; }
        public string email { get; set; }
        public DateTime dt_agenda { get; set; }
        public string hr_agenda { get; set; }
        public string tp_agenda { get; set; }
        public DateTime dh_registro { get; set; }
    }
}

/*
    ID,
    CD_PRESTADOR,
    NM_PRESTADOR,
    DS_ESPECIALIDADE,
    CPF_BENEFICIARIO,
    CARTEIRINHA,
    NM_BENEFICIARIO,
    DT_NASCIMENTO,
    TELEFONE,
    EMAIL,
    DT_AGENDA,
    HR_AGENDA,
    TP_AGENDA,
    DH_REGISTRO
*/
