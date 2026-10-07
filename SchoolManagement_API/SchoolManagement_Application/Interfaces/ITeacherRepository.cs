using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface ITeacherRepository
    {
        Task<IEnumerable<Teacher>> GetAllAsync();

        Task<Teacher?> GetByIdAsync(int id);

        Task<Teacher> AddAsync(Teacher entity);

        Task UpdateAsync(Teacher entity);

        Task DeleteAsync(int id);
    }
}