using Events.Models.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models
{
    public class EventTranslation
    {
        [Key]
        public int EventTranslationId { get; set; }

        [Required]
        public int LanguageId { get; set; }
        [ForeignKey("LanguageId")]
        public Language Language { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        public string PriceDetails { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }

    }

    public static class EventTranslationDataHandler
    {
        public static void SetData(EventTranslation ev, SaveEventCommand cmd)
        {

            if (ev == null)
                return;

            ev.LanguageId = cmd.LanguageId;
            ev.Title = !string.IsNullOrWhiteSpace(cmd.Title) ? cmd.Title.Trim() : ev.Title;
            ev.ShortDescription = !string.IsNullOrWhiteSpace(cmd.ShortDescription) ? cmd.ShortDescription.Trim() : ev.ShortDescription;
            ev.Text = !string.IsNullOrWhiteSpace(cmd.Text) ? cmd.Text.Trim() : ev.Text;
            ev.PriceDetails = cmd.PriceDetails != null ? cmd.PriceDetails : ev.PriceDetails;
        }
    }
}
