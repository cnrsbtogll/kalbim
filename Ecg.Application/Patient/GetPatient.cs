using Ecg.Application.Doctor;
using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Database.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Ecg.Application.Patient
{
    public class GetPatient
    {
        private FirebaseClient _client;

        public GetPatient(FirebaseClient client)
        {
            _client = client;

        }

        public async Task<PatientViewModel> Do(string uid, string olcOrder, string drId)
        {
            var patients = await _client
              .Child("Patient")
              .OnceAsync<Domain.Models.Patient>();


            var patient = patients.FirstOrDefault(x => x.Key == uid).Object;
            List<Diagnosis> diagnoses = new List<Diagnosis>();

            GetDoctor dr = new GetDoctor(_client);

            if (!String.IsNullOrEmpty(olcOrder))
            {
                var measurement = patient.MeasurementResults[int.Parse(olcOrder)];
                patient.MeasurementResults = new List<MeasurementResults>();
                patient.MeasurementResults.Add(measurement);
            }
            int i = 0;
            foreach (var item in patient.MeasurementResults)
            {
                bool emergancy = false;
                bool.TryParse(item.Diognasis.Emergancy, out emergancy);

                diagnoses.Add(new Diagnosis
                {
                    DiognasisDate = item.Date,
                    DiognasisTime = item.Time,
                    MeasurementId = item.OlcID,
                    Status = item.Diognasis.Status,
                    Doctor = dr.Do(item.Diognasis.DoctorID).Result.Email,
                    olcOrder = String.IsNullOrEmpty(olcOrder) ? i.ToString() : olcOrder,
                    Emergancy = emergancy,
                    Comments = !string.IsNullOrEmpty(olcOrder) ? item.Diognasis.Comments : new List<Comments>(),
                    IsMe = item.Diognasis.DoctorID == drId ? "true" : "false",
                    Content = item.Diognasis.Content
                });
                i++;
            }

            foreach (var diagnosis in diagnoses)
            {
                if (diagnosis.Comments != null)
                {
                    foreach (var item in diagnosis.Comments)
                    {
                        item.DrID = dr.Do(item.DrID).Result.Email;
                    }
                }

            }

            return new PatientViewModel
            {
                BirthDay = patient.PatientDetails.BirthDay,
                Name = patient.PatientDetails.FirstName,
                LastName = patient.PatientDetails.LastName,
                UID = uid,
                Weight = patient.PatientDetails.Weight,
                Diagnoses = diagnoses,
                Gender = patient.PatientDetails.Gender,
                CurrentDoctor = drId
            };
        }

    }
    public class PatientViewModel
    {
        public string CurrentDoctor { get; set; }
        public string UID { get; set; } = "";
        public string Name { get; set; }
        public string LastName { get; set; }
        public string BirthDay { get; set; }
        public string Gender { get; set; }
        public string Weight { get; set; }
        public List<Diagnosis> Diagnoses { get; set; }

    }

    public class Diagnosis
    {
        public string olcOrder { get; set; }
        public string MeasurementId { get; set; }
        public string Status { get; set; } = "";
        public string Content { get; set; } = "";
        public string Doctor { get; set; } = "";
        public string IsMe { get; set; } = "false";
        public string DiognasisDate { get; set; } = "";
        public string DiognasisTime { get; set; } = "";
        public bool Emergancy { get; set; } = false;
        public List<Comments> Comments { get; set; } = new List<Comments>();
    }
}
