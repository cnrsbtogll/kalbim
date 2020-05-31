using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecg.Application.Doctor
{
    public class UpdateDiagnose
    {
        private FirebaseClient _client;

        public UpdateDiagnose(FirebaseClient client)
        {
            _client = client;
        }

        public async Task<Response> Do(Request request)
        {
            GetDoctor dr = new GetDoctor(_client);

            var diognasisUser = _client
             .Child("Patient").OnceAsync<Domain.Models.Patient>().Result.FirstOrDefault(x => x.Key == request.UID).Object.MeasurementResults[int.Parse(request.olcOrder)].Diognasis;

            List<Comments> comments = new List<Comments>();
            if (diognasisUser.Comments != null)
            {
                comments = diognasisUser.Comments;
            }

            List<Comments> commentsList = new List<Comments>();

            for (int i = 0; i < comments.Count; i++)
            {
                commentsList.Add(comments[i]);
            }

            var diognasis = new Diognasis
            {
                Comments = commentsList,
                Content = request.Content,
                DoctorID = request.Doctor,
                Emergancy = request.Emergancy,
                Status = request.Status
            };

            await _client
              .Child("Patient")
              .Child(request.UID)
              .Child("MeasurementResults")
              .Child(request.olcOrder)
              .Child("Diognasis").PutAsync(diognasis);

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
