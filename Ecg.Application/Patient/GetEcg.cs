using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Ecg.Application.Patient
{
    public class GetEcg
    {
        private FirebaseClient _client;

        public GetEcg(FirebaseClient client)
        {
            _client = client;

        }
        public async Task<Measurement> Do(string measurementId)
        {
            var measurement = await _client
              .Child("Measurement")
              .OnceAsync<Domain.Models.Measurement>();

            var data = measurement.FirstOrDefault(x => x.Key == measurementId);

            return data.Object;
        }
    }
}
