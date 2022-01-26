using System;
using System.Net.Http;
using System.Threading.Tasks;
using Flurl.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    [Route("/enviar-sms")]
    [ApiController]
    [Authorize]
    public class EnviarSms : ControllerBase
    {

        static HttpClient client = new HttpClient();

        [HttpPost("paciente-faltante")]
        public async Task<IActionResult> EnviarMensagem([FromHeader] string telefone)
        {

            const string uri = "https://api-rest.zenvia.com/services/send-sms";
            Guid guid = Guid.NewGuid();
            string id = guid.ToString();

            try
            {
                var ans = await uri.WithHeaders(new
                {
                    Accept = "application/json",
                    ContentType = "application/json",
                    Authorization = "Basic dW5pbWVkLmNoYXBlY286ZktBNXN1ak9uaQ=="
                })
                .WithHeader("Authorization", "Basic dW5pbWVkLmNoYXBlY286ZktBNXN1ak9uaQ==")
                .PostJsonAsync(new
                {
                    sendSmsRequest = new
                    {
                        from = "Unimed Chapecó",
                        to = telefone,
                        msg = "Sempre que não puder comparecer a consulta avise com antecedência, pois outra pessoa poderá precisar",
                        callbackOption = "NONE",
                        id = id,
                        aggregateId = "88320",
                        flashSms = true
                    }
                }).ReceiveJson();

                return Ok(new { resposta = ans.sendSmsResponse.statusDescription == "Error" ? false : true });
            }
            catch (System.Exception)
            {
                return BadRequest(new { resposta = false });
            }
        }
    }
}