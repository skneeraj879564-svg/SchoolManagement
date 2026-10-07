using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Exams;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class ExamService : IExamService
    {
        private readonly IExamRepository _examRepository;
        private readonly IMapper _mapper;

        public ExamService(
            IExamRepository examRepository,
            IMapper mapper)
        {
            _examRepository = examRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<ExamDto>> GetAllAsync(
            PaginationRequest request)
        {
            var exams =
                await _examRepository.GetAllAsync();

            var totalRecords = exams.Count();

            var pagedExams = exams
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var examDtos =
                _mapper.Map<IEnumerable<ExamDto>>(
                    pagedExams);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<ExamDto>
            {
                Data = examDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<ExamDto?> GetByIdAsync(int id)
        {
            var exam =
                await _examRepository.GetByIdAsync(id);

            if (exam == null)
                return null;

            return _mapper.Map<ExamDto>(exam);
        }

        public async Task<ExamDto> CreateAsync(
            CreateExamDto dto)
        {
            var exam =
                _mapper.Map<Exam>(dto);

            var createdExam =
                await _examRepository.AddAsync(exam);

            return _mapper.Map<ExamDto>(
                createdExam);
        }

        public async Task UpdateAsync(
            int id,
            UpdateExamDto dto)
        {
            var exam =
                await _examRepository.GetByIdAsync(id);

            if (exam == null)
                throw new KeyNotFoundException(
                    "Exam not found.");

            _mapper.Map(dto, exam);

            await _examRepository.UpdateAsync(exam);
        }

        public async Task DeleteAsync(int id)
        {
            var exam =
                await _examRepository.GetByIdAsync(id);

            if (exam == null)
                throw new KeyNotFoundException(
                    "Exam not found.");

            await _examRepository.DeleteAsync(id);
        }
    }
}