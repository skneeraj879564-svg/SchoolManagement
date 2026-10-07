
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Fees;

namespace SchoolManagement_Application.Interfaces
{
    public interface IFeeService
    {
        Task<PaginationResponse<FeeDto>> GetAllAsync(
            PaginationRequest request);

        Task<FeeDto?> GetByIdAsync(int id);

        Task<FeeDto> CreateAsync(
            CreateFeeDto dto);

        Task UpdateAsync(
            int id,
            UpdateFeeDto dto);

        Task DeleteAsync(int id);
    }
}
//using SchoolManagement_Application.DTOs.Fees;

//namespace SchoolManagement_Application.Interfaces
//{
//    public interface IFeeService
//    {
//        Task<IEnumerable<FeeDto>> GetAllAsync();
//        Task<FeeDto?> GetByIdAsync(int id);
//        Task<FeeDto> CreateAsync(CreateFeeDto dto);
//        Task UpdateAsync(int id, UpdateFeeDto dto);
//        Task DeleteAsync(int id);
//    }
//}