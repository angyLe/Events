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
    public class EventGetHandler : IRequestHandler<EventsQuery, IList<Event>>
    {
        private readonly ApplicationContext db;
        private readonly ILogger logger;

        public EventGetHandler(ApplicationContext db, ILogger<EventGetHandler> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<IList<Event>> Handle(EventsQuery query, CancellationToken cancellationToken)
        {
            IQueryable<Event> result = db.Events.Include(e => e.EventTranslations);

            if (query.Ids != null && query.Ids.Length > 0)
            {
                result = result.Where(item => query.Ids.Contains(item.EventId));
            }

            IList<Event> events = await result.ToListAsync();

            return events;
        }
    }

    public class EventSaveHandler : IRequestHandler<SaveEventCommand, Tuple<Event, ErrorViewModel>>
    {
        private readonly ApplicationContext db;
        private readonly ILogger logger;

        public EventSaveHandler(ApplicationContext db, ILogger<EventSaveHandler> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<Tuple<Event, ErrorViewModel>> Handle(SaveEventCommand cmd, CancellationToken cancellationToken)
        {
            Tuple<Event, ErrorViewModel> result = null;
            Event resultEvent = null;
            EventTranslation resultEventTranslation = null;

            if (!cmd.EventId.HasValue)
            {
                resultEvent = new Event();
                EventDataHandler.SetData(resultEvent, cmd);
                db.Events.Add(resultEvent);

                resultEventTranslation = new EventTranslation();   
                EventTranslationDataHandler.SetData(resultEventTranslation, cmd);
                resultEventTranslation.Event = resultEvent;
                db.EventTranslations.Add(resultEventTranslation);

            }
            else
            {
                resultEvent = db.Events.Where(e => e.EventId == cmd.EventId).FirstOrDefault();

                if (resultEvent == null)
                {
                    logger.LogError("Existing event was not found when tried to update it. EventId: " + cmd.EventId);
                    result = new Tuple<Event, ErrorViewModel>(null, new ErrorViewModel() { ErrorCode = (int)AppError.DbRecordNotFound });
                    return result;
                }

                EventDataHandler.SetData(resultEvent, cmd);
                db.Events.Update(resultEvent);

                if (!cmd.EventTranslationId.HasValue)
                {
                    resultEventTranslation = new EventTranslation();
                    EventTranslationDataHandler.SetData(resultEventTranslation, cmd);
                    resultEventTranslation.Event = resultEvent;
                    db.EventTranslations.Add(resultEventTranslation);
                }
                else
                {
                    resultEventTranslation = db.EventTranslations.Where(x => x.EventTranslationId == cmd.EventTranslationId).FirstOrDefault();
                    
                    if (resultEventTranslation == null)
                    {
                        logger.LogError("Existing event translation was not found when trying to udpate it. EventTranslationId: " + cmd.EventTranslationId);
                        result = new Tuple<Event, ErrorViewModel>(null, new ErrorViewModel() { ErrorCode = (int)AppError.DbRecordNotFound });
                        return null;
                    }

                    EventTranslationDataHandler.SetData(resultEventTranslation, cmd);
                    db.EventTranslations.Update(resultEventTranslation);
                }
            }

            await db.SaveChangesAsync();

            result = new Tuple<Event, ErrorViewModel>(resultEvent, null);
            return result;
        }
    }
}