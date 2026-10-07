namespace SchoolManagement_Application.DTOs.ClassSubjects
{
    public class CreateClassSubjectDto
    {
        public int ClassId { get; set; }

        public int SubjectId { get; set; }

        public int? TeacherId { get; set; }
    }
}