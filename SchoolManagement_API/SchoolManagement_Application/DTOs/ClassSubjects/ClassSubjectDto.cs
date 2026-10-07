namespace SchoolManagement_Application.DTOs.ClassSubjects
{
    public class ClassSubjectDto
    {
        public int Id { get; set; }

        public int ClassId { get; set; }

        public int SubjectId { get; set; }

        public int? TeacherId { get; set; }

        public bool IsActive { get; set; }
    }
}