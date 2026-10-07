using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Classes;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IMapper _mapper;

        public ClassService(
            IClassRepository classRepository,
            IMapper mapper)
        {
            _classRepository = classRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<ClassDto>> GetAllAsync(
            PaginationRequest request)
        {
            var classes =
                await _classRepository.GetAllAsync();

            var totalRecords = classes.Count();

            var pagedClasses = classes
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var classDtos =
                _mapper.Map<IEnumerable<ClassDto>>(
                    pagedClasses);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<ClassDto>
            {
                Data = classDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<ClassDto?> GetByIdAsync(int id)
        {
            var classEntity =
                await _classRepository.GetByIdAsync(id);

            if (classEntity == null)
                return null;

            return _mapper.Map<ClassDto>(classEntity);
        }

        public async Task<ClassDto> CreateAsync(
            CreateClassDto request)
        {
            var classEntity =
                _mapper.Map<Class>(request);

            

            var createdClass =
                await _classRepository.AddAsync(classEntity);

            return _mapper.Map<ClassDto>(createdClass);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateClassDto request)
        {
            var classEntity =
                await _classRepository.GetByIdAsync(id);

            if (classEntity == null)
                return false;

            _mapper.Map(request, classEntity);

            await _classRepository.UpdateAsync(classEntity);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var classEntity =
                await _classRepository.GetByIdAsync(id);

            if (classEntity == null)
                return false;

            await _classRepository.DeleteAsync(id);

            return true;
        }
    }
}