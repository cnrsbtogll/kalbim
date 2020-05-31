using System;
using System.Collections.Generic;
using System.Text;

namespace Ecg.Domain.DTOs
{
    public class UserBasicInfo
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }
    }
}
