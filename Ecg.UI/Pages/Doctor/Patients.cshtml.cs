using Firebase.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace Ecg.UI.Pages.Doctor
{
    [Authorize]
    public class PatientsModel : PageModel
    {
        public IActionResult OnGet()
        {
            return Page();
        }
    }
}