using Ecg.Application.Authentication;
using Firebase.Auth;
using Firebase.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Ecg.UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            FirebaseClient client = new FirebaseClient(Configuration.GetConnectionString("Firebase"));
            FirebaseAuthProvider firebaseAuthProvider = new FirebaseAuthProvider(new FirebaseConfig(Configuration["FirebaseConfig:apiKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = Configuration["FirebaseConfig:tokenURL"];
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["FirebaseConfig:tokenURL"],
                        ValidateAudience = true,
                        ValidAudience = Configuration["FirebaseConfig:projectId"],
                        ValidateLifetime = false
                    };
                });

            services.AddScoped<IAuth, Auth>();
            services.AddSingleton(client);
            services.AddSingleton(firebaseAuthProvider);
            services.AddRazorPages().AddRazorRuntimeCompilation();

            // services.AddMvc.(options => options.EnableEndpointRouting = false);
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            //services.AddMvc(options =>options.EnableEndpointRouting = false).SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Latest);
            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAuth auth)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthController(auth);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(options => { options.MapRazorPages(); options.MapDefaultControllerRoute(); });
        }
    }
}

namespace Microsoft.AspNetCore.Builder
{
    public static class AuthExtension
    {
        public static IApplicationBuilder UseAuthController(this IApplicationBuilder app, IAuth _authService)
        {
            return app.Use(async (context, next) =>
            {
                if (context.Request.Cookies["access_token"] != null)
                {
                    var secs = DateTime.Now.Subtract(DateTime.Parse(context.Request.Cookies["created"])).TotalSeconds;
                    if (secs > 3400 && secs < 3600)
                    {
                        FirebaseAuth auth = new FirebaseAuth
                        {
                            Created = DateTime.Parse(context.Request.Cookies["created"]),
                            ExpiresIn = int.Parse(context.Request.Cookies["expiresIn"]),
                            FirebaseToken = context.Request.Cookies["access_token"],
                            RefreshToken = context.Request.Cookies["refresh_token"],
                            User = await _authService.GetUserAsync(context.Request.Cookies["access_token"])
                        };

                        var refresh = await _authService.RefreshLoginAsync(auth);
                        context.Response.Cookies.Delete("access_token");
                        context.Response.Cookies.Delete("refresh_token");
                        context.Response.Cookies.Delete("expiresIn");
                        context.Response.Cookies.Delete("created");
                        context.Response.Cookies.Delete("email");
                        context.Response.Cookies.Delete("id");

                        Microsoft.AspNetCore.Http.CookieOptions cookieOptions = new Microsoft.AspNetCore.Http.CookieOptions
                        {
                            Expires = DateTime.Now.AddSeconds(refresh.ExpiresIn + 300)
                        };
                        context.Response.Cookies.Append("access_token", refresh.FirebaseToken, new Microsoft.AspNetCore.Http.CookieOptions
                        {
                            Expires = DateTime.Now.AddSeconds(refresh.ExpiresIn)
                        });

                        context.Response.Cookies.Append("refresh_token", refresh.RefreshToken, cookieOptions);
                        context.Response.Cookies.Append("expiresIn", refresh.ExpiresIn.ToString(), cookieOptions);
                        context.Response.Cookies.Append("created", refresh.Created.ToString(), cookieOptions);
                        context.Response.Cookies.Append("email", refresh.User.Email, cookieOptions);
                        context.Response.Cookies.Append("id", refresh.User.LocalId, cookieOptions);
                    }
                    context.Request.Headers.Add("Authorization", "Bearer " + context.Request.Cookies["access_token"]);
                }
                else
                {
                    if (!context.Request.Path.ToString().ToLower().Equals("/auth/login")
                        && !context.Request.Path.ToString().ToLower().Equals("/authorization/authenticate"))
                    {
                        context.Response.Redirect("/auth/login");
                        return;
                    }
                }

                await next();
            });
        }
    }
}