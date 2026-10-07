namespace SchoolManagement_Application.DTOs.Attendance
{
    public class CreateAttendanceDto
    {
        public int StudentId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
    }
}