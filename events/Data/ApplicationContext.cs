using Events.Models;
using Microsoft.EntityFrameworkCore;

namespace Events.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Event> Events { get; set; }
        public DbSet<EventTranslation> EventTranslation { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Image> Images { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();  
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventTranslation>().HasAlternateKey(e => new { e.Event, e.LanguageId });
        }
    }
}
