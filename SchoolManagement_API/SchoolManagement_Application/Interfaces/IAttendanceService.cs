using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Attendance;

namespace SchoolManagement_Application.Interfaces
{
    public interface IAttendanceService
    {
        Task<PaginationResponse<AttendanceDto>> GetAllAsync(
            PaginationRequest request);

        Task<AttendanceDto?> GetByIdAsync(int id);

        Task<AttendanceDto> CreateAsync(
            CreateAttendanceDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateAttendanceDto request);

        Task<bool> DeleteAsync(int id);
    }
}