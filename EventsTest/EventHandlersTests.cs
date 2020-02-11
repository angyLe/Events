using Events.Controllers;
using Events.Data;
using Events.Models;
using Events.Models.AppError;
using Events.Models.Commands;
using Events.Models.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EventsTest
{
    [TestClass]
    public class EventHandlersTests
    {
        private readonly ApplicationContext dbContext;
        private readonly ILoggerFactory loggerFactory;
        private readonly IServiceProvider serviceProvider;

        public EventHandlersTests()
        {
            var services = new ServiceCollection();

            services.AddLogging();

            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ApplicationContext>(opt => opt.UseInMemoryDatabase(databaseName: "dbname"));

            this.serviceProvider = services.BuildServiceProvider();

            this.loggerFactory = serviceProvider.GetService<ILoggerFactory>();

            this.dbContext = serviceProvider.GetRequiredService<ApplicationContext>();

            CreateTestData(dbContext);
        }

        [TestMethod]
        public async Task Get()
        {
            var logger = loggerFactory.CreateLogger<EventGetHandler>();

            EventGetHandler eventHandlers = new EventGetHandler(dbContext, logger);
            EventsQuery query = new EventsQuery();
            IList<Event> res = await eventHandlers.Handle(query, new CancellationToken());

            Assert.AreEqual(3, res.Count);

            EventsQuery queryWithId = new EventsQuery() { Ids = new int[] { 1 } };
            IList<Event> resWithId = await eventHandlers.Handle(queryWithId, new CancellationToken());

            Assert.AreEqual(1, resWithId.Count);
            Assert.AreEqual("Name", resWithId.First().Name);
            Assert.AreEqual(2, resWithId.First().EventTranslations.Count);


            EventsQuery queryWithIds = new EventsQuery() { Ids = new int[] { 1, 3 } };
            IList<Event> resWithIds = await eventHandlers.Handle(queryWithIds, new CancellationToken());

            Assert.AreEqual(2, resWithIds.Count);

            EventsQuery queryWithNotExistId = new EventsQuery() { Ids = new int[] { 1, 4 } };
            IList<Event> resWithNotExistId = await eventHandlers.Handle(queryWithNotExistId, new CancellationToken());

            Assert.AreEqual(1, resWithNotExistId.Count);

        }

        [TestMethod]
        public async Task GetTranslations()
        {
            var logger = loggerFactory.CreateLogger<EventTranslationHandlers>();

            EventTranslationHandlers eventHandlers = new EventTranslationHandlers(dbContext, logger);
            EventTranslationQuery query = new EventTranslationQuery();
            IList<EventTranslation> res = await eventHandlers.Handle(query, new CancellationToken());

            Assert.AreEqual(3, res.Count);

            EventTranslationQuery queryWithLanguageEvent = new EventTranslationQuery() { LanguageId = 1, EventId = 1 };
            IList<EventTranslation> resWithLanguageEvent = await eventHandlers.Handle(queryWithLanguageEvent, new CancellationToken());

            Assert.AreEqual(1, resWithLanguageEvent.Count);
            Assert.AreEqual("Title en", resWithLanguageEvent.FirstOrDefault().Title);
            Assert.AreEqual("Name", resWithLanguageEvent.FirstOrDefault().Event.Name);

            EventTranslationQuery queryWithLanguage = new EventTranslationQuery() { LanguageId = 1 };
            IList<EventTranslation> resWithLanguage = await eventHandlers.Handle(queryWithLanguage, new CancellationToken());

            Assert.AreEqual(2, resWithLanguage.Count);
        }

        [TestMethod]
        public async Task Save()
        {
            var logger = loggerFactory.CreateLogger<EventSaveHandler>();

            EventSaveHandler eventSaveHandler = new EventSaveHandler(dbContext, logger);

            SaveEventCommand newEventcmd = new SaveEventCommand()
            {
                EventId = null,
                EventTranslationId = null,
                Name = "New event",
                DateTimeFrom = DateTime.UtcNow,
                Website = "www",
                Address = "address",
                Price = "100.0",
                Title = "New title",
                Text = "Text",
                ShortDescription = "New short descr",
                LanguageId = 1
            };

            Tuple<Event, ErrorViewModel> addNewEventResult = await eventSaveHandler.Handle(newEventcmd, new CancellationToken());

            Assert.AreEqual("New event", addNewEventResult.Item1.Name);
            Assert.AreEqual(100, addNewEventResult.Item1.Price);
            Assert.AreEqual("New title", addNewEventResult.Item1.EventTranslations.First().Title);

            SaveEventCommand updateEventNewTranslationcmd = new SaveEventCommand()
            {
                EventId = 3,
                EventTranslationId = null,
                Name = "Update event",
                DateTimeFrom = DateTime.UtcNow,
                Website = "www",
                Address = "address",
                Price = "200,5",
                LanguageId = 1,
                Title = "New title",
                Text = "Text",
                ShortDescription = "New short descr"
            };

            Tuple<Event, ErrorViewModel> updateEventNewTranslationResult = await eventSaveHandler.Handle(updateEventNewTranslationcmd, new CancellationToken());

            Assert.AreEqual("Update event", updateEventNewTranslationResult.Item1.Name);
            Assert.AreEqual(200.5, updateEventNewTranslationResult.Item1.Price);
            Assert.AreEqual("New title", updateEventNewTranslationResult.Item1.EventTranslations.First().Title);
            Assert.AreEqual(1, updateEventNewTranslationResult.Item1.EventTranslations.Count);

            SaveEventCommand updateEventWithExistingTranslationCmd = new SaveEventCommand()
            {
                EventId = 3,
                EventTranslationId = updateEventNewTranslationResult.Item1.EventTranslations.First().EventTranslationId,
                Name = "Update event",
                DateTimeFrom = DateTime.UtcNow,
                Website = "www",
                Address = "address",
                Price = "200,65",
                LanguageId = 1,
                Title = "Update title",
                Text = "Update Text",
                ShortDescription = "New short descr"
            };

            Tuple<Event, ErrorViewModel> updateEventWithExistingTranslationResult = await eventSaveHandler.Handle(updateEventWithExistingTranslationCmd, new CancellationToken());

            Assert.AreEqual("Update event", updateEventWithExistingTranslationResult.Item1.Name);
            Assert.AreEqual(200.65, updateEventWithExistingTranslationResult.Item1.Price);
            Assert.AreEqual("Update title", updateEventWithExistingTranslationResult.Item1.EventTranslations.First().Title);
            Assert.AreEqual(1, updateEventWithExistingTranslationResult.Item1.EventTranslations.Count);

            SaveEventCommand updateNotExistingEventCmd = new SaveEventCommand()
            {
                EventId = 100,
                Name = "Update event",
                DateTimeFrom = DateTime.UtcNow,
                Address = "address",
                Price = "200",
                LanguageId = 1,
                Title = "Update title",
                Text = "Update Text",
                ShortDescription = "New short descr"
            };

            Tuple<Event, ErrorViewModel> updateNotExistingEventResult = await eventSaveHandler.Handle(updateNotExistingEventCmd, new CancellationToken());

            Assert.AreEqual((int)AppError.DbRecordNotFound, updateNotExistingEventResult.Item2.ErrorCode);       

        }


        private void CreateTestData(ApplicationContext dbContext)
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

    }
}
