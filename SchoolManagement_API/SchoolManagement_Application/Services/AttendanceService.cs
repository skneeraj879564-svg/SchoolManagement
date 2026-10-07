using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Attendance;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IMapper _mapper;

        public AttendanceService(
            IAttendanceRepository attendanceRepository,
            IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<AttendanceDto>> GetAllAsync(
            PaginationRequest request)
        {
            var attendance =
                await _attendanceRepository.GetAllAsync();

            var totalRecords = attendance.Count();

            var pagedAttendance = attendance
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var attendanceDtos =
                _mapper.Map<IEnumerable<AttendanceDto>>(
                    pagedAttendance);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<AttendanceDto>
            {
                Data = attendanceDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<AttendanceDto?> GetByIdAsync(int id)
        {
            var attendance =
                await _attendanceRepository.GetByIdAsync(id);

            if (attendance == null)
                return null;

            return _mapper.Map<AttendanceDto>(attendance);
        }

        public async Task<AttendanceDto> CreateAsync(
            CreateAttendanceDto request)
        {
            var attendance =
                _mapper.Map<Attendance>(request);

            var createdAttendance =
                await _attendanceRepository.AddAsync(attendance);

            return _mapper.Map<AttendanceDto>(
                createdAttendance);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateAttendanceDto request)
        {
            var attendance =
                await _attendanceRepository.GetByIdAsync(id);

            if (attendance == null)
                return false;

            _mapper.Map(request, attendance);

            await _attendanceRepository.UpdateAsync(
                attendance);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var attendance =
                await _attendanceRepository.GetByIdAsync(id);

            if (attendance == null)
                return false;

            await _attendanceRepository.DeleteAsync(id);

            return true;
        }
    }
}