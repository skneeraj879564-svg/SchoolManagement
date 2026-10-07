using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Students;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement_Application.Interfaces
{
    public interface IStudentService
    {
        Task<PaginationResponse<StudentDto>> GetAllAsync(
            PaginationRequest request);

        Task<StudentDto?> GetByIdAsync(int id);

        Task<StudentDto> CreateAsync(CreateStudentDto request);

        Task<bool> UpdateAsync(
            int id,
            UpdateStudentDto request);

        Task<bool> DeleteAsync(int id);
    }
}
