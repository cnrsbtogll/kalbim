using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Ecg.Application.Authentication;
using Ecg.Domain.Contracts.Request;
using Firebase.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Ecg.UI.Controllers
{
    [Route("[controller]")]
    public class AuthorizationController : Controller
    {
        private readonly IAuth _authService;
        public AuthorizationController(IAuth authService)
        {
            _authService = authService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Login([FromBody]UserLogin login)
        {
            //https://www.red-gate.com/simple-talk/dotnet/net-development/using-auth-cookies-in-asp-net-core/
            try
            {
                //var auth = await _authService.LoginAsync("fthyldz.1497@gmail.com", "123456");
                var auth = await _authService.LoginAsync(login.Email, login.Password);
                Microsoft.AspNetCore.Http.CookieOptions cookieOptions = new Microsoft.AspNetCore.Http.CookieOptions
                {
                    Expires = DateTime.Now.AddSeconds(auth.ExpiresIn + 300)
                };
                HttpContext.Response.Cookies.Append("access_token", auth.FirebaseToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    Expires = DateTime.Now.AddSeconds(auth.ExpiresIn)
                });
                HttpContext.Response.Cookies.Append("refresh_token", auth.RefreshToken, cookieOptions);
                HttpContext.Response.Cookies.Append("expiresIn", auth.ExpiresIn.ToString(), cookieOptions);
                HttpContext.Response.Cookies.Append("created", auth.Created.ToString(), cookieOptions);
                HttpContext.Response.Cookies.Append("email", auth.User.Email, cookieOptions);
                HttpContext.Response.Cookies.Append("id", auth.User.LocalId, cookieOptions);

                return Ok(new { url = "/doctor/patients" });
            }
            catch (FirebaseAuthException e)
            {
                var rgx = new Regex("\\d+");
                var statusCode = int.Parse(rgx.Match(e.ResponseData).Value);

                if (statusCode == 400 || statusCode == 402)
                {
                    return BadRequest(new { url = "/Auth/Login", email = login.Email });
                }
                return Ok(e.ResponseData);
            }
        }
        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("access_token");
            HttpContext.Response.Cookies.Delete("refresh_token");
            HttpContext.Response.Cookies.Delete("expiresIn");
            HttpContext.Response.Cookies.Delete("created");
            HttpContext.Response.Cookies.Delete("email");
            HttpContext.Response.Cookies.Delete("id");

            return Ok(new { url = "/Auth/login" });
        }
    }
}