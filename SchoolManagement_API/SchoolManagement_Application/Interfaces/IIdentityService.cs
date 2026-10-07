using SchoolManagement_Domain.Identity;

namespace SchoolManagement_Application.Interfaces
{
    public interface IIdentityService
    {
        string GenerateToken(
            ApplicationUser user,
            IList<string> roles);
    }
}