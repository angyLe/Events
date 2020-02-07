using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
}
