using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Attendance : BaseEntity
    {
        public int StudentId { get; set; }

        public DateTime AttendanceDate { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;

        public string Remarks { get; set; } = string.Empty;
    }
}