namespace SchoolManagement_Application.DTOs.Exams
{
    public class UpdateExamDto
    {
        public string Name { get; set; } = string.Empty;
        public int ClassId { get; set; }
        public DateTime ExamDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}