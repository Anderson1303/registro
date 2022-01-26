using System;
using System.Linq;
using System.Threading.Tasks;
using App.Models;
using App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    [Route("/prestador")]
    [ApiController]
    [Authorize]
    public class PrestadorController : ControllerBase
    {
        private PrestadorService _prestadorService;

        public PrestadorController(PrestadorService prestadorService)
        {
            _prestadorService = prestadorService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetPrestador()
        {

            string cd_prestador = User.Claims.FirstOrDefault(x => x.Type == "cd_prestador")?.Value;
            string crm = User.Claims.FirstOrDefault(x => x.Type == "crm")?.Value;

            try
            {
                PrestadorModel prestador = await _prestadorService.GetPrestador(crm);
                return Ok(prestador);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("servicos")]
        public async Task<IActionResult> GetAtendimentosDoPrestador([FromQuery] int sizePerPage, int page, string sortField, string sortOrder, string val)
        {

            string cd_prestador = User.Claims.FirstOrDefault(x => x.Type == "cd_prestador")?.Value;

            try
            {
                var registerAll = await _prestadorService.CountRegister(cd_prestador, page, sizePerPage, sortField, sortOrder, val);
                Int64 countRegister = Int64.Parse(string.Join(System.Environment.NewLine, registerAll));
                var prestador = await _prestadorService.GetServicosDoPrestador(cd_prestador, page, sizePerPage, sortField, sortOrder, val);
                var resp = new {
                    prestador,
                    countRegister
                };
                return Ok(resp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

}