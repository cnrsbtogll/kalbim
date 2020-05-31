using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class Patient
    {
        public PatientDetails PatientDetails { get; set; }
        public string UID { get; set; }
        public List<MeasurementResults> MeasurementResults { get; set; }
    }
}
