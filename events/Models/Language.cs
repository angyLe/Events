using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models
{
    public class Language
    {
        [Key]
        public int LanguageId;
        
        [Required]
        public string IsoCode;

    }
}
