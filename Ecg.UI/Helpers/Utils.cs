using Ecg.Domain.DTOs;


namespace Microsoft.AspNetCore.Http
{
    public static class Utils
    {
        public static UserBasicInfo GetCurrentUser(this HttpContext context)
        {
            var accessToken = context.Request.Cookies["access_token"];
            var refreshToken = context.Request.Cookies["refresh_token"];
            var email = context.Request.Cookies["email"];
            var id = context.Request.Cookies["id"];

            return new UserBasicInfo
            {
                AccessToken = accessToken,
                Email = email,
                Id = id,
                RefreshToken = refreshToken
            };
        }
    }
}
