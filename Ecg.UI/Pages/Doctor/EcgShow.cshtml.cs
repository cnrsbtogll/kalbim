using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ecg.UI.Pages.Doctor
{
    public class EcgShowModel : PageModel
    {
        public string patientId { get; set; }
        public string olcumId { get; set; }
        public string olcOrder { get; set; }
        public IActionResult OnGet(string uid, string olcid, string olcOrder)
        {
            patientId = uid;
            olcumId = olcid;
            this.olcOrder = olcOrder;

            return Page();
        }
    }
}
