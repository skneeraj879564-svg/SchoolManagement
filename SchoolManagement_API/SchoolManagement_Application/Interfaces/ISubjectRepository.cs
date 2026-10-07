using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<Subject>> GetAllAsync();
        Task<Subject?> GetByIdAsync(int id);
        Task<Subject> AddAsync(Subject entity);
        Task UpdateAsync(Subject entity);
        Task DeleteAsync(int id);
    }
}