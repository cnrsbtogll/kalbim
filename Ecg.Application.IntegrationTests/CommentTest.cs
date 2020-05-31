using Ecg.Application.Comment;
using Ecg.Application.Patient;
using Firebase.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace Ecg.Application.IntegrationTests
{
    [TestClass]
    public class CommentTest
    {
        private FirebaseClient client;

        [TestInitialize]
        public void Setup()
        {
            this.client = new FirebaseClient("https://kalbim-532f8.firebaseio.com/");
        }

      
        [TestMethod]
        public void CreateComment()
        {
            CreateComment comment = new CreateComment(client);
            GetPatient patient = new GetPatient(client);

            var patientRes = patient.Do("28uCNailpIRtYGQqLpd1fp1dUh92", "0", "MWBywMkevROEsmY4ubha7yXBZms1").Result;
            var commentsCount = patientRes.Diagnoses.ElementAt(0).Comments.Count;


            var resp = comment.Do(new CreateComment.Request { PatientID = "28uCNailpIRtYGQqLpd1fp1dUh92", MeasurementResultID = "0", commentId = (commentsCount ).ToString(), Comment = new Domain.Models.Comments { Comment = "CommentTest", DrID = "Jd86rEhrJ5Xf4kGkFUtmgNqQU923" } });

            Assert.AreEqual(DateTime.Today.ToString("d"), resp.Result.Comment.Date);

            var newPatientRes = patient.Do("28uCNailpIRtYGQqLpd1fp1dUh92", "0", "MWBywMkevROEsmY4ubha7yXBZms1").Result;
            var newCommentsCount = newPatientRes.Diagnoses.ElementAt(0).Comments.Count;

            Assert.AreEqual(commentsCount + 1, newCommentsCount);
        }

    }
}
