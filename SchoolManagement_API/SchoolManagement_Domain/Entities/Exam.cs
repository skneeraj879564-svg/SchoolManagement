using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Exam : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public int ClassId { get; set; }

        public DateTime ExamDate { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}