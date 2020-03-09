using Events.Data;
using Events.Models;
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
    public class ImageHandlers : IRequestHandler<ImagesQuery, IList<Image>>
    {
        private readonly ApplicationContext db;
        private readonly ILogger logger;

        public ImageHandlers(ApplicationContext db, ILogger<ImageHandlers> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<IList<Image>> Handle(ImagesQuery query, CancellationToken cancellationToken)
        {
            IQueryable<Image> result = db.Images;

            if (query.Ids != null && query.Ids.Length > 0)
            {
                result = result.Where(item => query.Ids.Contains(item.ImageId));
            }

            IList<Image> images = await result.ToListAsync();

            return images;
        }
    }
}

