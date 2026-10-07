using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Teacher : BaseEntity
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public DateTime DateOfJoining { get; set; }

        public ICollection<Class> Classes { get; set; }
            = new List<Class>();

        public ICollection<ClassSubject> ClassSubjects { get; set; }
            = new List<ClassSubject>();
    }
}