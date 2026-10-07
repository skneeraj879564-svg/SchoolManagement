using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface IMarkRepository
    {
        Task<IEnumerable<Mark>> GetAllAsync();
        Task<Mark?> GetByIdAsync(int id);
        Task<Mark> AddAsync(Mark mark);
        Task UpdateAsync(Mark mark);
        Task DeleteAsync(int id);
    }
}