using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecg.Application.Comment;
using Ecg.Application.Doctor;
using Ecg.Application.Patient;
using Ecg.Domain.Models;
using Firebase.Database;
using Firebase.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Ecg.UI.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class DoctorController : Controller
    {
        private readonly FirebaseClient _client;
        private readonly IMemoryCache _cache;
        //private readonly FirebaseStorage _storage;

        public DoctorController(FirebaseClient client/*, FirebaseStorage storage*/, IMemoryCache cache)
        {
            _client = client;
            _cache = cache;
            //    _storage = storage;
        }

        [HttpGet("[action]")]
        public IActionResult GetDoctor()
        {
            Doctor doctor;
            var doctorId = HttpContext.GetCurrentUser().Id;
            /*  if (!_cache.TryGetValue(doctorId, out doctor))
              {
                  var cacheExpOptions = new MemoryCacheEntryOptions
                  {
                      AbsoluteExpiration = DateTime.Now.AddMinutes(30)
                  };
                  */
            doctor = new GetDoctor(_client).Do(doctorId).Result;
            /*  _cache.Set(doctorId, doctor, cacheExpOptions);
          }*/
            return Ok(doctor);
        }

        [HttpPost("[action]")]
        public IActionResult UpdateDoctor([FromBody] Doctor doctor) => Ok(new UpdateDoctor(_client).Do(HttpContext.GetCurrentUser().Id, doctor).Result);


        [HttpGet("[action]")]
        public async Task<IActionResult> GetPatientsAsync() => Ok(await new GetPatients(_client/*, _storage*/).Do(""));


        [HttpGet("[action]")]
        public async Task<IActionResult> GetPatientsByDoctor()
        {
            var doctorId = HttpContext.GetCurrentUser().Id;
            return Ok(await new GetPatients(_client).Do(doctorId));
        }

        [HttpGet("[action]")]
        public IActionResult GetPatient(string id, string olcOrder) => Ok(new GetPatient(_client).Do(id, olcOrder, HttpContext.GetCurrentUser().Id));

        [HttpGet("[action]")]
        public IActionResult GetMeasurement(string id)
        {
            Measurement measurement;

            if (!_cache.TryGetValue(id, out measurement))
            {
                var cacheExpOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(30)
                };

                measurement = new GetEcg(_client).Do(id).Result;
                _cache.Set(id, measurement, cacheExpOptions);
            }
            return Ok(measurement);
        }

        [HttpPost("diagnoses")]
        public async Task<IActionResult> CreateDiagnose([FromBody]CreateDiagnose.Request request) => Ok((await new CreateDiagnose(_client).Do(request)));

        [HttpPut("diagnoses")]
        public async Task<IActionResult> UpdateDiagnose([FromBody]UpdateDiagnose.Request request) => Ok(await new UpdateDiagnose(_client).Do(request));



        [HttpPost("[action]")]
        public async Task<IActionResult> CreateComment([FromBody]CreateComment.Request request) => Ok(await new CreateComment(_client).Do(request));

        /*[HttpPut("comments")]
        public async Task<IActionResult> UpdateComment([FromBody]UpdateComment.Request request) => Ok(await new UpdateComment(_client).Do(request));*/


    }
}