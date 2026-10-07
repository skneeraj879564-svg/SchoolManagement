using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Exams;

namespace SchoolManagement_Application.Interfaces
{
    public interface IExamService
    {
        Task<PaginationResponse<ExamDto>> GetAllAsync(
            PaginationRequest request);

        Task<ExamDto?> GetByIdAsync(int id);

        Task<ExamDto> CreateAsync(
            CreateExamDto dto);

        Task UpdateAsync(
            int id,
            UpdateExamDto dto);

        Task DeleteAsync(int id);
    }
}