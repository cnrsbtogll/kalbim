using Ecg.Application.Doctor;
using Firebase.Auth;
using Firebase.Database;
using System;
using System.Threading.Tasks;

namespace Ecg.Application.Authentication
{
    public class Auth : IAuth
    {
        private readonly FirebaseAuthProvider _firebaseAuthProvider;
        private readonly FirebaseClient _client;

        public Auth(FirebaseAuthProvider firebaseAuthProvider, FirebaseClient client)
        {
            _firebaseAuthProvider = firebaseAuthProvider;
            _client = client;
        }

        public async Task<FirebaseAuthLink> LoginAsync(string email, string password)
        {

            var checkUser = await _firebaseAuthProvider.SignInWithEmailAndPasswordAsync(email, password);
            var isDoctor = new GetDoctor(_client).Do(checkUser.User.LocalId).Result.Email;

            if (!string.IsNullOrEmpty(isDoctor))
            {
                return checkUser;
            }

            throw new FirebaseAuthException("login", email + " " + password, "402", new Exception(), AuthErrorReason.InvalidIdentifier);


            //var a = await _firebaseAuthProvider.GetUserAsync(auth.FirebaseToken);
            /* _firebaseAuthProvider.Ref
             return new UserBasicInfo
             {
                 Id = auth.User.LocalId,
                 Email = auth.User.Email,
                 AccessToken = auth.FirebaseToken,
                 RefreshToken = auth.RefreshToken
             };*/
        }

        public async Task<FirebaseAuthLink> RefreshLoginAsync(FirebaseAuth firebaseAuth)
        {
            return await _firebaseAuthProvider.RefreshAuthAsync(firebaseAuth);
        }

        public async Task<User> GetUserAsync(string firebaseToken)
        {
            return await _firebaseAuthProvider.GetUserAsync(firebaseToken);
        }
    }
}
