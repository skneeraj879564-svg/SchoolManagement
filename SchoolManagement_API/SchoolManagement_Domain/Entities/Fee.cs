using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Fee : BaseEntity
    {
        public int StudentId { get; set; }

        public decimal Amount { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime? PaidDate { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;

        public string Remarks { get; set; } = string.Empty;
    }
}