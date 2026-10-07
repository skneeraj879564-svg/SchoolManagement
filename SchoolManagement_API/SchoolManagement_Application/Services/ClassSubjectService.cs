using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.ClassSubjects;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class ClassSubjectService : IClassSubjectService
    {
        private readonly IClassSubjectRepository _classSubjectRepository;
        private readonly IMapper _mapper;

        public ClassSubjectService(
            IClassSubjectRepository classSubjectRepository,
            IMapper mapper)
        {
            _classSubjectRepository = classSubjectRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<ClassSubjectDto>> GetAllAsync(
            PaginationRequest request)
        {
            var classSubjects =
                await _classSubjectRepository.GetAllAsync();

            var totalRecords = classSubjects.Count();

            var pagedClassSubjects = classSubjects
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var classSubjectDtos =
                _mapper.Map<IEnumerable<ClassSubjectDto>>(
                    pagedClassSubjects);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<ClassSubjectDto>
            {
                Data = classSubjectDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<ClassSubjectDto?> GetByIdAsync(int id)
        {
            var classSubject =
                await _classSubjectRepository.GetByIdAsync(id);

            if (classSubject == null)
                return null;

            return _mapper.Map<ClassSubjectDto>(classSubject);
        }

        public async Task<ClassSubjectDto> CreateAsync(
            CreateClassSubjectDto request)
        {
            var classSubject =
                _mapper.Map<ClassSubject>(request);

          
            var createdClassSubject =
                await _classSubjectRepository.AddAsync(
                    classSubject);

            return _mapper.Map<ClassSubjectDto>(
                createdClassSubject);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateClassSubjectDto request)
        {
            var classSubject =
                await _classSubjectRepository.GetByIdAsync(id);

            if (classSubject == null)
                return false;

            _mapper.Map(request, classSubject);

            await _classSubjectRepository.UpdateAsync(
                classSubject);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var classSubject =
                await _classSubjectRepository.GetByIdAsync(id);

            if (classSubject == null)
                return false;

            await _classSubjectRepository.DeleteAsync(id);

            return true;
        }
    }
}