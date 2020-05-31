using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class Diognasis
    {
        public List<Comments> Comments { get; set; }
        public string DoctorID { get; set; }
        public string Emergancy { get; set; }
        public string Content { get; set; }
        public string Status { get; set; }
        public string DecisionDate { get; set; } = DateTime.Today.ToString("d");
        public string DecisionTime { get; set; } = DateTime.Now.ToShortTimeString();
    }
}
