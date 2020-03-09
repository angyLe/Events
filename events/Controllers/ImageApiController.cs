using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Events.Models;
using Events.Models.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Events.Controllers
{
    [Produces("application/json")]
    [Route("api/image")]
    public class ImageApiController : Controller
    {
        private readonly IMediator mediatr;

        public ImageApiController(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }

        [HttpGet()]
        [Route("Get")]
        public async Task<IActionResult> Get([FromQuery] ImagesQuery query)
        {
            IEnumerable<Image> result = await mediatr.Send(query);
            return Json(result);
        }
    }
}