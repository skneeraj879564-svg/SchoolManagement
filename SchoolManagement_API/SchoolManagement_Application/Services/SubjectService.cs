using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Subjects;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly IMapper _mapper;

        public SubjectService(
            ISubjectRepository subjectRepository,
            IMapper mapper)
        {
            _subjectRepository = subjectRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<SubjectDto>> GetAllAsync(
            PaginationRequest request)
        {
            var subjects =
                await _subjectRepository.GetAllAsync();

            var totalRecords = subjects.Count();

            var pagedSubjects = subjects
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var subjectDtos =
                _mapper.Map<IEnumerable<SubjectDto>>(
                    pagedSubjects);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<SubjectDto>
            {
                Data = subjectDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<SubjectDto?> GetByIdAsync(int id)
        {
            var subject =
                await _subjectRepository.GetByIdAsync(id);

            if (subject == null)
                return null;

            return _mapper.Map<SubjectDto>(subject);
        }

        public async Task<SubjectDto> CreateAsync(
            CreateSubjectDto request)
        {
            var subject =
                _mapper.Map<Subject>(request);

          
            var createdSubject =
                await _subjectRepository.AddAsync(subject);

            return _mapper.Map<SubjectDto>(createdSubject);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateSubjectDto request)
        {
            var subject =
                await _subjectRepository.GetByIdAsync(id);

            if (subject == null)
                return false;

            _mapper.Map(request, subject);

            await _subjectRepository.UpdateAsync(subject);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var subject =
                await _subjectRepository.GetByIdAsync(id);

            if (subject == null)
                return false;

            await _subjectRepository.DeleteAsync(id);

            return true;
        }
    }
}