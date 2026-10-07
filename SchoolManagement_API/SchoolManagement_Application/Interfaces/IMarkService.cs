using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Marks;

namespace SchoolManagement_Application.Interfaces
{
    public interface IMarkService
    {
        Task<PaginationResponse<MarkDto>> GetAllAsync(
            PaginationRequest request);

        Task<MarkDto?> GetByIdAsync(int id);

        Task<MarkDto> CreateAsync(
            CreateMarkDto dto);

        Task UpdateAsync(
            int id,
            UpdateMarkDto dto);

        Task DeleteAsync(int id);
    }
}