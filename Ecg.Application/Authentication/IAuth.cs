using Firebase.Auth;
using System.Threading.Tasks;

namespace Ecg.Application.Authentication
{
    public interface IAuth
    {
        Task<FirebaseAuthLink> LoginAsync(string email, string password);

        Task<FirebaseAuthLink> RefreshLoginAsync(FirebaseAuth firebaseAuth);

        Task<User> GetUserAsync(string firebaseToken);
    }
}
