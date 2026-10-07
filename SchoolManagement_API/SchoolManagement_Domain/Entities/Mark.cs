using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Mark : BaseEntity
    {
        public int StudentId { get; set; }

        public int ExamId { get; set; }

        public int SubjectId { get; set; }

        public decimal MarksObtained { get; set; }

        public decimal MaxMarks { get; set; }

        public string Grade { get; set; } = string.Empty;
    }
}