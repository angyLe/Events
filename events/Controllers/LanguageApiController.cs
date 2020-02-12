using Events.Controllers.Filters;
using Events.Models;
using Events.Models.Commands;
using Events.Models.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Events.Controllers
{
    [Produces("application/json")]
    [Route("api/language")]
    public class LanguageApiController : Controller
    {
        private readonly IMediator mediatr;

        public LanguageApiController(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }

        [HttpGet()]
        [Route("Get")]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Language> result = await mediatr.Send(new LanguagesQuery());
            return Json(result);
        }

    }
}
