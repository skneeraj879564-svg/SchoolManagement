namespace SchoolManagement_Application.DTOs.Marks
{
    public class CreateMarkDto
    {
        public int StudentId { get; set; }
        public int ExamId { get; set; }
        public int SubjectId { get; set; }
        public decimal MarksObtained { get; set; }
        public decimal MaxMarks { get; set; }
        public string Grade { get; set; } = string.Empty;
    }
}