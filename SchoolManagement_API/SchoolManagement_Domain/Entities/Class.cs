using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Class : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Section { get; set; } = string.Empty;

        public string RoomNumber { get; set; } = string.Empty;

        public int Capacity { get; set; }

        public int? ClassTeacherId { get; set; }

        public Teacher? ClassTeacher { get; set; }

        public ICollection<Student> Students { get; set; }
            = new List<Student>();

        public ICollection<ClassSubject> ClassSubjects { get; set; }
            = new List<ClassSubject>();
    }
}