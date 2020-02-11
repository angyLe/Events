using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Events.Controllers.Filters;
using Events.Data;
using Events.Models;
using Events.Models.Commands;
using Events.Models.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Events.Controllers
{
    [Produces("application/json")]
    [Route("api/event")]
    public class EventApiController : Controller
    {
        private readonly IMediator mediatr;

        public EventApiController(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }

        [HttpGet()]
        [Route("Get")]
        public async Task<IActionResult> Get([FromQuery] EventsQuery query)
        {
            IEnumerable<Event> result = await mediatr.Send(query);
            return Json(result);
        }

        [HttpGet()]
        [Route("GetTranslations")]
        public async Task<IActionResult> GetTranslations(EventTranslationQuery query)
        {
            IEnumerable<EventTranslation> result = await mediatr.Send(query);
            return Json(result);
        }

        [HttpPost()]
        [Route("Save")]
        [ValidationFilter]
        public async Task<IActionResult> Save([FromBody] SaveEventCommand cmd)
        {

            Tuple<Event, ErrorViewModel> result = await mediatr.Send(cmd);
            if (result.Item2 != null)
            {
                return StatusCode(500, result.Item2);
            }

            return Json(result.Item1);
        }

    }
}
