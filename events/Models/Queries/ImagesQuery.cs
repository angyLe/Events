using MediatR;
using System.Collections.Generic;

namespace Events.Models.Queries
{
    public class ImagesQuery : IRequest<IList<Image>>
    {
        public int[] Ids { get; set; }
    }
}
