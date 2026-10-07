using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Students;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;
        private readonly ICacheService _cacheService;

        public StudentService(
            IStudentRepository studentRepository,
            IMapper mapper,
            ICacheService cacheService)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        public async Task<PaginationResponse<StudentDto>> GetAllAsync(
            PaginationRequest request)
        {
            string cacheKey =
                $"students_page_{request.PageNumber}_{request.PageSize}";

            var cachedResult =
                _cacheService.Get<PaginationResponse<StudentDto>>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var students =
                await _studentRepository.GetAllAsync();

            var totalRecords =
                students.Count();

            var pagedStudents = students
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var studentDtos =
                _mapper.Map<IEnumerable<StudentDto>>(
                    pagedStudents);

            var totalPages =
                (int)Math.Ceiling(
                    (double)totalRecords /
                    request.PageSize);

            var response =
                new PaginationResponse<StudentDto>
                {
                    Data = studentDtos,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize,
                    TotalRecords = totalRecords,
                    TotalPages = totalPages
                };

            _cacheService.Set(
                cacheKey,
                response,
                10);

            return response;
        }

        public async Task<StudentDto?> GetByIdAsync(int id)
        {
            var student =
                await _studentRepository.GetByIdAsync(id);

            if (student == null)
                return null;

            return _mapper.Map<StudentDto>(student);
        }

        public async Task<StudentDto> CreateAsync(
            CreateStudentDto request)
        {
            var student =
                _mapper.Map<Student>(request);

            var createdStudent =
                await _studentRepository.AddAsync(student);

            // Clear all student pagination cache
            _cacheService.RemoveByPrefix(
                "students_page_");

            return _mapper.Map<StudentDto>(
                createdStudent);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateStudentDto request)
        {
            var student =
                await _studentRepository.GetByIdAsync(id);

            if (student == null)
                return false;

            _mapper.Map(request, student);

            await _studentRepository.UpdateAsync(student);

            // Clear all student pagination cache
            _cacheService.RemoveByPrefix(
                "students_page_");

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var student =
                await _studentRepository.GetByIdAsync(id);

            if (student == null)
                return false;

            await _studentRepository.DeleteAsync(id);

            // Clear all student pagination cache
            _cacheService.RemoveByPrefix(
                "students_page_");

            return true;
        }
    }
}