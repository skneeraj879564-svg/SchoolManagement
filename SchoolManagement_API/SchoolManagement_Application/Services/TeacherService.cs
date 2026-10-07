using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Teachers;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly IMapper _mapper;

        public TeacherService(
            ITeacherRepository teacherRepository,
            IMapper mapper)
        {
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<TeacherDto>> GetAllAsync(
            PaginationRequest request)
        {
            var teachers =
                await _teacherRepository.GetAllAsync();

            var totalRecords = teachers.Count();

            var pagedTeachers = teachers
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var teacherDtos =
                _mapper.Map<IEnumerable<TeacherDto>>(
                    pagedTeachers);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<TeacherDto>
            {
                Data = teacherDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<TeacherDto?> GetByIdAsync(int id)
        {
            var teacher =
                await _teacherRepository.GetByIdAsync(id);

            if (teacher == null)
                return null;

            return _mapper.Map<TeacherDto>(teacher);
        }

        public async Task<TeacherDto> CreateAsync(
            CreateTeacherDto request)
        {
            var teacher =
                _mapper.Map<Teacher>(request);

          

            var createdTeacher =
                await _teacherRepository.AddAsync(teacher);

            return _mapper.Map<TeacherDto>(
                createdTeacher);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateTeacherDto request)
        {
            var teacher =
                await _teacherRepository.GetByIdAsync(id);

            if (teacher == null)
                return false;

            _mapper.Map(request, teacher);

            await _teacherRepository.UpdateAsync(teacher);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var teacher =
                await _teacherRepository.GetByIdAsync(id);

            if (teacher == null)
                return false;

            await _teacherRepository.DeleteAsync(id);

            return true;
        }
    }
}