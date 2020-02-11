using MediatR;
using System.Collections.Generic;


namespace Events.Models.Queries
{
    public class EventTranslationQuery : IRequest<IList<EventTranslation>>
    {
        public int? LanguageId { get; set; }

        public int? EventId { get; set; }
    }
}
