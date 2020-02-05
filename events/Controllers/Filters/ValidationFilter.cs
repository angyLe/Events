using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;

namespace Events.Controllers.Filters
{
    public class ValidationFilter : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(new
                {
                    ValidationErrors = from e in context.ModelState
                                  where e.Value.Errors.Count > 0
                                  select new
                                  {
                                      Name = e.Key,
                                      Errors = e.Value.Errors.Select(x => x.ErrorMessage)
                                        .Concat(e.Value.Errors.Where(x => x.Exception != null)
                                        .Select(x => x.Exception.Message))
                                  }
                });
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
