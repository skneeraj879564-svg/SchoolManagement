using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Teachers;

namespace SchoolManagement_Application.Interfaces
{
    public interface ITeacherService
    {
        Task<PaginationResponse<TeacherDto>> GetAllAsync(
            PaginationRequest request);

        Task<TeacherDto?> GetByIdAsync(int id);

        Task<TeacherDto> CreateAsync(
            CreateTeacherDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateTeacherDto request);

        Task<bool> DeleteAsync(int id);
    }
}