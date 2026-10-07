using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Interfaces
{
    public interface IFeeRepository
    {
        Task<IEnumerable<Fee>> GetAllAsync();
        Task<Fee?> GetByIdAsync(int id);
        Task<Fee> AddAsync(Fee fee);
        Task UpdateAsync(Fee fee);
        Task DeleteAsync(int id);
    }
}