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
    public class GetDoctor
    {
        private FirebaseClient _client;

     

        public GetDoctor(FirebaseClient client)
        {
            _client = client;

        }
        public async Task<Domain.Models.Doctor> Do(string uid)
        {

            var dr = await _client
              .Child("Doctor")
              .OnceAsync<Domain.Models.Doctor>();
            var doctor = dr.FirstOrDefault(x => x.Key == uid);

            return doctor != null ? doctor.Object : new Domain.Models.Doctor();
        }
    }
}
