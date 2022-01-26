using System;
using System.Threading.Tasks;
using App.Models;
using App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    [Route("/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private PrestadorService _prestadorService;
        private TokenService _tokenService;

        public AuthController(PrestadorService prestadorService, TokenService tokenService)
        {
            _prestadorService = prestadorService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AuthModel _authModel)
        {
            try
            {
                PrestadorModel prestador = await _prestadorService.GetPrestador(_authModel.crm);
                if (prestador == null)
                {
                    return Forbid();
                }
                string token = _tokenService.GenerateToken(prestador);

                return Ok(new { prestador = prestador, token = token });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("check-token")]
        [Authorize]
        public IActionResult CheckToken()
        {
            return Ok(new { status = true });
        }
    }


}