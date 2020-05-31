using Ecg.Domain.Models;
using Firebase.Auth;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecg.Application.Doctor
{
    public class UpdateDoctor
    {
        private FirebaseClient _client;

        public UpdateDoctor(FirebaseClient client)
        {
            _client = client;

        }
        public async Task<bool> Do(string uid, Domain.Models.Doctor doctor)
        {
            await _client
              .Child("Doctor").Child(uid)
             .PutAsync(doctor);

            return true;
        }
    }
}
