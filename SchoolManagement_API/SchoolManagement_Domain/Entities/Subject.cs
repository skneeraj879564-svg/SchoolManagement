using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Subject : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Code { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<ClassSubject> ClassSubjects { get; set; }
            = new List<ClassSubject>();
    }
}