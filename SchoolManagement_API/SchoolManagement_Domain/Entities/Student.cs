using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Student : BaseEntity
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [Required]
        public string AdmissionNumber { get; set; } = string.Empty;

        public int ClassId { get; set; }

        public Class? Class { get; set; }
    }
}