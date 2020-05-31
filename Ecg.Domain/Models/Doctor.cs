using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class Doctor
    {
        public string Degree { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long Phone { get; set; }
        public string Email { get; set; }
    }
}
