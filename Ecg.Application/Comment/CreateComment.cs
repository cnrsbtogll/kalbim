using Ecg.Application.Doctor;
using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecg.Application.Comment
{
    public class CreateComment
    {
        private FirebaseClient _client;

        public CreateComment(FirebaseClient client)
        {
            _client = client;
        }

        public async Task<Response> Do(Request request)
        {
            GetDoctor dr = new GetDoctor(_client);

            request.Comment.Date = DateTime.Today.ToString("d");
            request.Comment.Time = DateTime.Now.ToShortTimeString();

            await _client
            .Child("Patient")
            .Child(request.PatientID)
            .Child("MeasurementResults")
            .Child(request.MeasurementResultID)
            .Child("Diognasis").Child("Comments").Child(string.IsNullOrEmpty(request.commentId) ? "0" : request.commentId).PutAsync(request.Comment);
            request.Comment.DrID = dr.Do(request.Comment.DrID).Result.Email;

            return new Response
            {
                Comment = request.Comment
            };
        }
        public class Request
        {
            public string MeasurementResultID { get; set; }
            public string PatientID { get; set; }
            public Comments Comment { get; set; }
            public string commentId { get; set; }
        }
        public class Response
        {
            public Comments Comment { get; set; }
        }
    }
}

