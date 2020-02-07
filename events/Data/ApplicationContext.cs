using Microsoft.EntityFrameworkCore;



namespace Events.Data
{
    public class ApplicationContext : DbContext
    {
        //public DbSet<Event> Events { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();  
        }
    }
}
