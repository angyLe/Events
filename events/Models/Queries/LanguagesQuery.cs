using MediatR;
using System.Collections.Generic;

namespace Events.Models.Queries
{
    public class LanguagesQuery : IRequest<IList<Language>> { }
}
