using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class MeasurementResults
    {
        public string OlcID { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public Diognasis Diognasis { get; set; }
    }
}
