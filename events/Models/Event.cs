using Events.Models.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Events.Models
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateTimeFrom { get; set; }

        public DateTime? DateTimeTo { get; set; }

        public string Website { get; set; }

        public string Phone { get; set; }

        [Required]
        public string Address { get; set; }

        public double Price { get; set; } = 0;

        public int? ImageId { get; set; }

        [ForeignKey("ImageId")]
        public Image Image { get; set; }

        public IList<EventTranslation> EventTranslations { get; set; }

        public Event()
        {
            EventTranslations = new List<EventTranslation>();
        }

    }

    public static class EventDataHandler
    {
        public static void SetData(Event ev, SaveEventCommand cmd)
        {

            if (ev == null)
                return;

            ev.Name = !string.IsNullOrWhiteSpace(cmd.Name) ? cmd.Name.Trim() : ev.Name;
            ev.DateTimeFrom = cmd.DateTimeFrom;
            ev.DateTimeTo = cmd.DateTimeTo != null ? cmd.DateTimeTo : ev.DateTimeTo;
            ev.Website = !string.IsNullOrWhiteSpace(cmd.Website) ? cmd.Website.Trim() : ev.Website;
            ev.Address = !string.IsNullOrWhiteSpace(cmd.Address) ? cmd.Address.Trim() : ev.Address;
            ev.ImageId = cmd.ImageId != null ? cmd.ImageId : ev.ImageId;

            if (cmd.Price != null)
            {
                double priceParced = Double.Parse(cmd.Price.Replace(',', '.'), CultureInfo.InvariantCulture);
                ev.Price = Math.Round(priceParced, 2);
            }
            else
            {
                ev.Price = 0;
            }
            
        }
    }
}
