namespace SchoolManagement_Application.DTOs.Classes
{
    public class CreateClassDto
    {
        public string Name { get; set; } = string.Empty;

        public string Section { get; set; } = string.Empty;

        public string RoomNumber { get; set; } = string.Empty;

        public int Capacity { get; set; }

        public int? ClassTeacherId { get; set; }
    }
}