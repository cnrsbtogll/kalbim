using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.Contracts.Request
{
    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
