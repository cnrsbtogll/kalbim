using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class Measurement
    {
        public string Id { get; set; }
        public Dictionary<string, string> Avr { get; set; }
        public Dictionary<string, string> Avl { get; set; }
        public Dictionary<string, string> Avf { get; set; }
        public long Rr { get; set; }
        public long Pr { get; set; }
        public long Qt { get; set; }
        public long Qrs { get; set; }
        public long Jtpeak { get; set; }
        public long Tpeaktend { get; set; }
        public string Tpeaktpeakp { get; set; }
        public string Ates { get; set; }
        public long BuyukTansiyon { get; set; }
        public long KucukTansiyon { get; set; }
        public string Oksijen { get; set; }
    }
}
