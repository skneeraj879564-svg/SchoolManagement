using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<IEnumerable<Attendance>> GetAllAsync();

        Task<Attendance?> GetByIdAsync(int id);

        Task<Attendance> AddAsync(Attendance entity);

        Task UpdateAsync(Attendance entity);

        Task DeleteAsync(int id);
    }
}