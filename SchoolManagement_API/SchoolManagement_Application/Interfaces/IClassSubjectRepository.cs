using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface IClassSubjectRepository
    {
        Task<IEnumerable<ClassSubject>> GetAllAsync();

        Task<ClassSubject?> GetByIdAsync(int id);

        Task<ClassSubject> AddAsync(ClassSubject entity);

        Task UpdateAsync(ClassSubject entity);

        Task DeleteAsync(int id);
    }
}