using Events.Data;
using Events.Models;
using Events.Models.AppError;
using Events.Models.Commands;
using Events.Models.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Events.Controllers
{
    public class LanguageGetHandler : IRequestHandler<LanguagesQuery, IList<Language>>
    {
        private readonly ApplicationContext db;
        private readonly ILogger logger;

        public LanguageGetHandler(ApplicationContext db, ILogger<LanguageGetHandler> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<IList<Language>> Handle(LanguagesQuery query, CancellationToken cancellationToken)
        {
            IList<Language> result = await db.Languages.ToListAsync();
            return result;
        }
    }

}
