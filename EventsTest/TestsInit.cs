using Events.Controllers;
using Events.Data;
using Events.Models;
using Events.Models.AppError;
using Events.Models.Commands;
using Events.Models.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EventsTest
{
    class TestsConfig
    {
        private readonly ApplicationContext dbContext;
        private readonly ILoggerFactory loggerFactory;
        private readonly IServiceProvider serviceProvider;

        public TestsConfig()
        {
            // The test framework will call this method once -BEFORE- each test run.
            var services = new ServiceCollection();

            services.AddLogging();

            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ApplicationContext>(opt => opt.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()));

            serviceProvider = services.BuildServiceProvider();
            loggerFactory = serviceProvider.GetService<ILoggerFactory>();
            dbContext = serviceProvider.GetRequiredService<ApplicationContext>();

        }

        public ILoggerFactory GetLoggerFactory()
        {
            return loggerFactory;
        }

        public ApplicationContext GetDbContext()
        {
            return dbContext;
        }

        public void CreateTestData()
        {
            dbContext.Languages.Add(new Language() { IsoCode = "en", LanguageId = 1 });
            dbContext.Languages.Add(new Language() { IsoCode = "ru", LanguageId = 2 });

            dbContext.Events.Add(new Event()
            {
                EventId = 1,
                Address = "Some adress",
                Name = "Name",
                DateTimeFrom = DateTime.UtcNow
            });
            dbContext.Events.Add(new Event()
            {
                EventId = 2,
                Address = "Some adress2",
                Name = "Name2",
                DateTimeFrom = DateTime.UtcNow
            });

            dbContext.Events.Add(new Event()
            {
                EventId = 3,
                Address = "Some adress3",
                Name = "Name3",
                DateTimeFrom = DateTime.UtcNow
            });

            dbContext.EventTranslations.Add(new EventTranslation()
            {
                EventId = 1,
                Title = "Title en",
                LanguageId = 1
            });
            dbContext.EventTranslations.Add(new EventTranslation()
            {
                EventId = 1,
                Title = "Заголовок",
                LanguageId = 2
            });

            dbContext.EventTranslations.Add(new EventTranslation()
            {
                EventId = 2,
                Title = "Title2",
                LanguageId = 1
            });

            dbContext.SaveChanges();
        }

        public void Clean()
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Dispose();
        }
    }
}
