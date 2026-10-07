using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Subjects;

namespace SchoolManagement_Application.Interfaces
{
    public interface ISubjectService
    {
        Task<PaginationResponse<SubjectDto>> GetAllAsync(
            PaginationRequest request);

        Task<SubjectDto?> GetByIdAsync(int id);

        Task<SubjectDto> CreateAsync(
            CreateSubjectDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateSubjectDto request);

        Task<bool> DeleteAsync(int id);
    }
}