using System.ComponentModel.DataAnnotations;
using SchoolManagement_Domain.Common;

namespace SchoolManagement_Domain.Entities
{
    public class Notice : BaseEntity
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime PublishDate { get; set; }

        public DateTime? ExpiryDate { get; set; }
    }
}