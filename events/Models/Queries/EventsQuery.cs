using MediatR;
using System.Collections.Generic;

namespace Events.Models.Queries
{
    public class EventsQuery : IRequest<IList<Event>> { 

        public int[] Ids { get; set; }
    }

}
