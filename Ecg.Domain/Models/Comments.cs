using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Models
{
    public class Comments
    {
        public string DrID { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}
