namespace SchoolManagement_Application.DTOs.Auth
{
    public class ChangeAccountRequestDto
    {
        public string CurrentEmail { get; set; } = string.Empty;

        public string NewEmail { get; set; } = string.Empty;

        public string CurrentPassword { get; set; } = string.Empty;

        public string NewPassword { get; set; } = string.Empty;
        public string NewFullName { get; set; } = string.Empty;
    }
}