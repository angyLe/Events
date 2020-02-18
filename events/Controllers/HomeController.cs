using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Events.Models;
using Microsoft.AspNetCore.Diagnostics;
using Events.Models.AppError;

namespace Events.Controllers
{
    [Produces("application/json")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> logger;

        public HomeController(ILogger<HomeController> logger)
        {
            this.logger = logger;
        }

        public IActionResult HandleUnhandledExceptions()
        {
            var feature = this.HttpContext.Features.Get<IExceptionHandlerFeature>();
            Exception exception = feature.Error;

            AppError er = ExceptionHandler.ExceptionHandler.GetCode(exception);

            ErrorViewModel errorViewModel = new ErrorViewModel()
            {
                ErrorCode = 1
            };

            logger.LogError(exception.Message);
            logger.LogError(exception.StackTrace);

            return StatusCode(500, errorViewModel);
        }

        /* [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
         public IActionResult Error()
         {
             return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
         }
         */
    }
}
