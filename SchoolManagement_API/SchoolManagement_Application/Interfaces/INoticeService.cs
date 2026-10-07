using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Notices;

namespace SchoolManagement_Application.Interfaces
{
    public interface INoticeService
    {
        Task<PaginationResponse<NoticeDto>> GetAllAsync(
            PaginationRequest request);

        Task<NoticeDto?> GetByIdAsync(int id);

        Task<NoticeDto> CreateAsync(
            CreateNoticeDto dto);

        Task UpdateAsync(
            int id,
            UpdateNoticeDto dto);

        Task DeleteAsync(int id);
    }
}