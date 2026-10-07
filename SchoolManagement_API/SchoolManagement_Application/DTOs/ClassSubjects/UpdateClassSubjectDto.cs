namespace SchoolManagement_Application.DTOs.ClassSubjects
{
    public class UpdateClassSubjectDto
    {
        public int ClassId { get; set; }

        public int SubjectId { get; set; }

        public int? TeacherId { get; set; }

        public bool IsActive { get; set; }
    }
}