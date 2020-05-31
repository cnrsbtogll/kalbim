using Ecg.Application.Doctor;
using Ecg.Application.Patient;
using Firebase.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace Ecg.Application.IntegrationTests
{
    [TestClass]
    public class DoctorTest
    {
        private FirebaseClient client;

        [TestInitialize]
        public void Setup()
        {
            this.client = new FirebaseClient("https://kalbim-532f8.firebaseio.com/");
        }


        [TestMethod]
        public void CreateDiagnose()
        {
            CreateDiagnose diagnose = new CreateDiagnose(client);

            var diagnoseRes = diagnose.Do(new CreateDiagnose.Request
            {
                Content = "TestContent",
                Emergancy = "false",
                Status = "TestStatus",
                Doctor = "MWBywMkevROEsmY4ubha7yXBZms1",
                UID = "28uCNailpIRtYGQqLpd1fp1dUh92",
                olcOrder = "2"
            });

            Assert.AreEqual("fthyldz.1497@gmail.com", diagnoseRes.Result.Doctor);
            Assert.AreEqual("true", diagnoseRes.Result.IsMe);

        }
        [TestMethod]
        public void GetDoctor()
        {
            GetDoctor doctor = new GetDoctor(client);

            var dr = doctor.Do("MWBywMkevROEsmY4ubha7yXBZms1").Result;

            Assert.AreEqual("fthyldz.1497@gmail.com", dr.Email);
        }

        [TestMethod]
        public void UpdateDoctor()
        {
            GetDoctor doctor = new GetDoctor(client);
            UpdateDoctor updateDoctor = new UpdateDoctor(client);

            var dr = doctor.Do("MWBywMkevROEsmY4ubha7yXBZms1").Result;

            updateDoctor.Do("MWBywMkevROEsmY4ubha7yXBZms1", new Domain.Models.Doctor
            {
                FirstName = "Fatih1",
                LastName = "Yýldýz1",
                Email = "fthyldz.1497@gmail.com",
                Phone = 55606582,
                Degree = "DRdegreeTest"
            }).Result.ToString();

            var drUpdated = doctor.Do("MWBywMkevROEsmY4ubha7yXBZms1").Result;

            Assert.AreEqual(dr.Email, drUpdated.Email);
            Assert.AreNotEqual(dr.Degree, drUpdated.Degree);
            Assert.AreEqual(dr.FirstName, drUpdated.FirstName);
            Assert.AreEqual(dr.LastName, drUpdated.LastName);
            Assert.AreEqual(dr.Phone, drUpdated.Phone);
        }

        [TestMethod]
        public void UpdateDiagnose()
        {
            UpdateDiagnose diagnose = new UpdateDiagnose(client);

            var diagnoseRes = diagnose.Do(new UpdateDiagnose.Request
            {
                Content = "TestContentUpdate",
                Emergancy = "true",
                Status = "TestStatusUpdate",
                Doctor = "MWBywMkevROEsmY4ubha7yXBZms1",
                UID = "28uCNailpIRtYGQqLpd1fp1dUh92",
                olcOrder = "2"
            });

            Assert.AreEqual("fthyldz.1497@gmail.com", diagnoseRes.Result.Doctor);
            Assert.AreEqual("true", diagnoseRes.Result.IsMe);

        }
    }
}
