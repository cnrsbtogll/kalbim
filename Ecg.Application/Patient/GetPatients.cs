using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecg.Application.Doctor;
using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Database.Query;
using Firebase.Storage;

namespace Ecg.Application.Patient
{
    public class GetPatients
    {
        private FirebaseClient _client;
        private readonly FirebaseStorage _storage;

        public GetPatients(FirebaseClient client/*, FirebaseStorage storage*/)
        {
            _client = client;
          //  _storage = storage;

        }
        public async Task<IEnumerable<PatientViewModel>> Do(string doctorId)
        {
            //_storage.Options.
            GetDoctor dr = new GetDoctor(_client);

            List<PatientViewModel> patientsRes = new List<PatientViewModel>();

            var patients = await _client
              .Child("Patient")
              //.OrderByKey()
              .OnceAsync<Domain.Models.Patient>();




            if (!string.IsNullOrEmpty(doctorId))
            {//Doktora ait hastalar
                foreach (var patient in patients)
                {
                    foreach (var item2 in patient.Object.MeasurementResults)
                    {
                        if (item2.Diognasis.DoctorID == doctorId)
                        {
                            var measurementResult = patient.Object.MeasurementResults.LastOrDefault();
                            patientsRes.Add(new PatientViewModel
                            {
                                UID = patient.Key,
                                PatientDetails = patient.Object.PatientDetails,
                                Diognasis = measurementResult.Diognasis.Status,
                                DiognasisDate = measurementResult.Date,
                                DiognasisTime = measurementResult.Time//,
                                //Doctor = String.IsNullOrEmpty(measurementResult.Diognasis.DoctorID) != false ? dr.Do(measurementResult.Diognasis.DoctorID).Result.Email : ""
                            });
                            break;
                        }
                    }
                }
                return patientsRes.AsEnumerable();
            }
            //Tüm hastalar
            foreach (var patient in patients)
            {
                var measurementResult = patient.Object.MeasurementResults.LastOrDefault();
                patientsRes.Add(new PatientViewModel
                {
                    UID = patient.Key,
                    PatientDetails = patient.Object.PatientDetails,
                    Diognasis = measurementResult.Diognasis.Status,
                    DiognasisDate = measurementResult.Date,
                    DiognasisTime = measurementResult.Time,
                    Doctor = !String.IsNullOrEmpty(measurementResult.Diognasis.DoctorID) ? dr.Do(measurementResult.Diognasis.DoctorID).Result.Email : ""
                });
            }
            return patientsRes.AsEnumerable();
        }

        public class PatientViewModel
        {
            public string UID { get; set; } = "";
            public PatientDetails PatientDetails { get; set; }
            public string Name { get; set; }
            public string Diognasis { get; set; } = "";
            public string Doctor { get; set; } = "";
            public string DiognasisDate { get; set; } = "";
            public string DiognasisTime { get; set; } = "";
        }

    }

}

