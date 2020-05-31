using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class PatientDetails
    {
       
        public string FirstName { get; set; } ="";
        public string LastName { get; set; } ="";
        public string Tel { get; set; } ="";
        public string Email { get; set; } ="";
        public string Password { get; set; } ="";
        public string Address { get; set; } ="";
        public string Gender { get; set; } ="";
        public string BirthDay { get; set; } ="";
        public string Weight { get; set; } ="";
        public string Height { get; set; } ="";
    }
}
