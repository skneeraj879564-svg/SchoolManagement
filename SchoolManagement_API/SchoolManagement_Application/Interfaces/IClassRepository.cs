using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface IClassRepository
    {
        Task<IEnumerable<Class>> GetAllAsync();

        Task<Class?> GetByIdAsync(int id);

        Task<Class> AddAsync(Class entity);

        Task UpdateAsync(Class entity);

        Task DeleteAsync(int id);
    }
}