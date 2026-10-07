using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface INoticeRepository
    {
        Task<IEnumerable<Notice>> GetAllAsync();
        Task<Notice?> GetByIdAsync(int id);
        Task<Notice> AddAsync(Notice notice);
        Task UpdateAsync(Notice notice);
        Task DeleteAsync(int id);
    }
}