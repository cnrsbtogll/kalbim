using Ecg.Application.Patient;
using Firebase.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace Ecg.Application.IntegrationTests
{
    [TestClass]
    public class PatientTest
    {
        private FirebaseClient client;

        [TestInitialize]
        public void Setup()
        {
            this.client = new FirebaseClient("https://kalbim-532f8.firebaseio.com/");
        }


        [TestMethod]
        public void GetPatient()
        {

            GetPatient patient = new GetPatient(client);

            var patientRes = patient.Do("28uCNailpIRtYGQqLpd1fp1dUh92", "0", "MWBywMkevROEsmY4ubha7yXBZms1").Result;
            var diagnose = patientRes.Diagnoses.FirstOrDefault();

            Assert.AreEqual("Enes", patientRes.Name);
            Assert.AreEqual("Yapmaz", patientRes.LastName);
            Assert.AreEqual("MWBywMkevROEsmY4ubha7yXBZms1", patientRes.CurrentDoctor);
            Assert.AreEqual("fthyldz.1497@gmail.com", diagnose.Doctor);
            Assert.IsFalse(diagnose.Emergancy);
            Assert.AreEqual("true", diagnose.IsMe);
            Assert.AreEqual("00001", diagnose.MeasurementId);

        }
        [TestMethod]
        public void GetPatients()
        {
            GetPatients patients = new GetPatients(client);

            var patientsRes = patients.Do("").Result;

            Assert.AreEqual(6, patientsRes.Count());
        }

        [TestMethod]
        public void GetPatientsByDoctor()
        {
            GetPatients patients = new GetPatients(client);

            var patientsRes = patients.Do("MWBywMkevROEsmY4ubha7yXBZms1").Result;

            Assert.AreEqual(6, patientsRes.Count());
        }

        [TestMethod]
        public void GetEcg()
        {
            GetEcg ecg = new GetEcg(client);

            var ecgRes = ecg.Do("00001").Result;

            Assert.AreEqual("36.5", ecgRes.Ates);
            Assert.AreEqual(501, ecgRes.Avf.Count);
            Assert.AreEqual(501, ecgRes.Avl.Count);
            Assert.AreEqual(501, ecgRes.Avr.Count);
        }
        
       
    }
}
