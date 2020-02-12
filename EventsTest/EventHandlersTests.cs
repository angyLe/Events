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
    [TestClass]
    public class EventHandlersTests
    {
        private static TestsConfig testConfig = new TestsConfig();

        [ClassInitialize]
        public static void ClassInitialize(TestContext context)
        {
            testConfig.CreateTestData();
        }

        [ClassCleanup]
        public static void ClassCleanup()
        {
            testConfig.Clean();
        }

        [TestMethod]
        public async Task Get()
        {
            var logger = testConfig.GetLoggerFactory().CreateLogger<EventGetHandler>();

            EventGetHandler eventHandlers = new EventGetHandler(testConfig.GetDbContext(), logger);
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
            var logger = testConfig.GetLoggerFactory().CreateLogger<EventTranslationHandlers>();

            EventTranslationHandlers eventHandlers = new EventTranslationHandlers(testConfig.GetDbContext(), logger);
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
            var logger = testConfig.GetLoggerFactory().CreateLogger<EventSaveHandler>();

            EventSaveHandler eventSaveHandler = new EventSaveHandler(testConfig.GetDbContext(), logger);

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

    }
}
