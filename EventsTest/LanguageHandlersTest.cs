using Events.Controllers;
using Events.Models;
using Events.Models.Queries;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EventsTest
{
    [TestClass]
    public class LanguageHandlersTest
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
            var logger = testConfig.GetLoggerFactory().CreateLogger<LanguageGetHandler>();

            LanguageGetHandler eventHandlers = new LanguageGetHandler(testConfig.GetDbContext(), logger);
            LanguagesQuery query = new LanguagesQuery();
            IList<Language> res = await eventHandlers.Handle(query, new CancellationToken());

            Assert.AreEqual(2, res.Count);

        }
    }
}
