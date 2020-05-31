using Firebase.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Cache;
using System.Text;
using System.Threading.Tasks;
using Firebase.Auth;
using Firebase.Database.Query;
using Ecg.Domain.Models;

namespace Ecg.Application.Doctor
{
    public class CreateDiagnose
    {
        private FirebaseClient _client;

        public CreateDiagnose(FirebaseClient client)
        {
            _client = client;
        }

        public async Task<Response> Do(Request request)
        {
            /*var diagnose = await _client
                       .Child("Patient")
                       .Child(request.PatientID)
                       .Child("MeasurementResult")
                       .Child(request.MeasurementResultID)
                       .OnceAsync<Domain.Models.MeasurementResults>();*/

            GetDoctor dr = new GetDoctor(_client);

            await _client
            .Child("Patient")
            .Child(request.UID)
            .Child("MeasurementResults")
            .Child(request.olcOrder)
            .Child("Diognasis").PutAsync(new Diognasis
            {
                Comments = new List<Comments>(),
                Content = request.Content,
                DoctorID = request.Doctor,
                Emergancy = request.Emergancy,
                Status = request.Status,
                DecisionDate = request.DecisionDate,
                DecisionTime = request.DecisionTime,
            });


            return new Response { Doctor = dr.Do(request.Doctor).Result.Email, IsMe = "true" };
        }
        public class Request
        {
            public string olcOrder { get; set; }
            public string UID { get; set; }
            public string Doctor { get; set; }
            public string Emergancy { get; set; } = "false";
            public string Content { get; set; }
            public string Status { get; set; }
            public string DecisionDate { get; set; } = DateTime.Today.ToString("d");
            public string DecisionTime { get; set; } = DateTime.Now.ToShortTimeString();
        }

        public class Response
        {
            public string IsMe { get; set; } = "true";
            public string Doctor { get; set; }
        }

    }
}
