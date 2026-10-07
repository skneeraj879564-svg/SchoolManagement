namespace SchoolManagement_Application.DTOs.Teachers
{
    public class CreateTeacherDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public DateTime DateOfJoining { get; set; }
    }
}