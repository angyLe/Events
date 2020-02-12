using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models.Commands
{
    public class SaveEventCommand : IRequest<Tuple<Event, ErrorViewModel>>
    {

        public int? EventId { get; set; }

        public int? EventTranslationId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        [Required(ErrorMessage = "Text is required")]
        public string Text { get; set; }

        [Range(0, double.MaxValue)]
        public string Price { get; set; }

        public string PriceDetails { get; set; }

        public int? ImageId { get; set; }

        [Required]
        public DateTime DateTimeFrom { get; set; }

        public DateTime DateTimeTo { get; set; }

        [Url]
        public string Website { get; set; }

        [Required]
        public string Address { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Required]
        public int LanguageId { get; set; }

    }
}
