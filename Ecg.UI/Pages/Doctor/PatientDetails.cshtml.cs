using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ecg.UI.Pages.Doctor
{
    public class PatientDetailsModel : PageModel
    {
        [BindProperty]
        public string patientId { get; set; }

        public IActionResult OnGet(string uid)
        {
            patientId = uid;
            return Page();
        }
    }
}
