using Events.Data;
using Events.Models;
using Events.Models.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Events.Controllers
{
    public class EventTranslationHandlers: IRequestHandler<EventTranslationQuery, IList<EventTranslation>>
    {
        private readonly ApplicationContext db;
        private readonly ILogger logger;

        public EventTranslationHandlers(ApplicationContext db, ILogger<EventTranslationHandlers> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<IList<EventTranslation>> Handle(EventTranslationQuery query, CancellationToken cancellationToken)
        {
            IQueryable<EventTranslation> result = db.EventTranslations.Include(et => et.Event).ThenInclude(e=>e.Image);

            if (query.LanguageId.HasValue && query.EventId.HasValue)
            {
                result = result.Where(e => e.EventId == query.EventId && e.LanguageId == query.LanguageId);
            }
            else if (query.LanguageId.HasValue)
            {
                result = result.Where(e => e.LanguageId == query.LanguageId);
            }
            else if (query.EventId.HasValue)
            {
                result = result.Where(e => e.EventId == query.EventId);
            }

            IList<EventTranslation> ets = await result.ToListAsync();

            return ets;
        }
    }
}
