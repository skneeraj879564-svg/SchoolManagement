using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.ClassSubjects;

namespace SchoolManagement_Application.Interfaces
{
    public interface IClassSubjectService
    {
        Task<PaginationResponse<ClassSubjectDto>> GetAllAsync(
            PaginationRequest request);

        Task<ClassSubjectDto?> GetByIdAsync(int id);

        Task<ClassSubjectDto> CreateAsync(
            CreateClassSubjectDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateClassSubjectDto request);

        Task<bool> DeleteAsync(int id);
    }
}