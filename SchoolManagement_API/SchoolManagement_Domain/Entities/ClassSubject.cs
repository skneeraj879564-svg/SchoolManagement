using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class ClassSubject : BaseEntity
    {
        public int ClassId { get; set; }

        public int SubjectId { get; set; }

        public int? TeacherId { get; set; }

        public Class? Class { get; set; }

        public Subject? Subject { get; set; }

        public Teacher? Teacher { get; set; }
    }
}