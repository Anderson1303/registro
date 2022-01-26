using System;
using System.Linq;
using System.Threading.Tasks;
using App.Models;
using App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    [Route("/beneficiario")]
    [ApiController]
    [Authorize]
    public class BeneficiarioController : ControllerBase
    {
        private BeneficiarioService _beneficiariorService;

        public BeneficiarioController(BeneficiarioService prestadorService)
        {
            _beneficiariorService = prestadorService;
        }


        [HttpPost("carteirinha")]
        public async Task<IActionResult> GetUsuarioCarteirinha([FromBody] BeneficiarioModel beneficiario)
        {
            try
            {
                var prestadorInfo = await _beneficiariorService.GetDadosCateirinha(beneficiario.cd_mat_alternativa);
                return Ok(new { resposta = prestadorInfo });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("cpf")]
        public async Task<IActionResult> GetUsuarioCPF([FromBody] BeneficiarioModel beneficiario)
        {

            try
            {
                var prestadorInfo = await _beneficiariorService.GetDadosCPF(beneficiario.nr_cpf);
                return Ok(new { resposta = prestadorInfo });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("registrar-falta")]
        public async Task<IActionResult> RegistrarFalta([FromBody] ServicosDoPrestadorModel beneficiario)
        {

            try
            {
                var prestadorInfo = await _beneficiariorService.RegistrarFalta(beneficiario);
                return Ok(new { resposta = prestadorInfo });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}