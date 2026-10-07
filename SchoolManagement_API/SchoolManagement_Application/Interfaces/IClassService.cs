using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Classes;

namespace SchoolManagement_Application.Interfaces
{
    public interface IClassService
    {
        Task<PaginationResponse<ClassDto>> GetAllAsync(
            PaginationRequest request);

        Task<ClassDto?> GetByIdAsync(int id);

        Task<ClassDto> CreateAsync(
            CreateClassDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateClassDto request);

        Task<bool> DeleteAsync(int id);
    }
}