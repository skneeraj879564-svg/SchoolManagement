using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Marks;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class MarkService : IMarkService
    {
        private readonly IMarkRepository _markRepository;
        private readonly IMapper _mapper;

        public MarkService(
            IMarkRepository markRepository,
            IMapper mapper)
        {
            _markRepository = markRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<MarkDto>> GetAllAsync(
            PaginationRequest request)
        {
            var marks =
                await _markRepository.GetAllAsync();

            var totalRecords = marks.Count();

            var pagedMarks = marks
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var markDtos =
                _mapper.Map<IEnumerable<MarkDto>>(
                    pagedMarks);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<MarkDto>
            {
                Data = markDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<MarkDto?> GetByIdAsync(int id)
        {
            var mark =
                await _markRepository.GetByIdAsync(id);

            if (mark == null)
                return null;

            return _mapper.Map<MarkDto>(mark);
        }

        public async Task<MarkDto> CreateAsync(
            CreateMarkDto dto)
        {
            var mark =
                _mapper.Map<Mark>(dto);

            var createdMark =
                await _markRepository.AddAsync(mark);

            return _mapper.Map<MarkDto>(
                createdMark);
        }

        public async Task UpdateAsync(
            int id,
            UpdateMarkDto dto)
        {
            var mark =
                await _markRepository.GetByIdAsync(id);

            if (mark == null)
                throw new KeyNotFoundException(
                    "Mark not found.");

            _mapper.Map(dto, mark);

            await _markRepository.UpdateAsync(mark);
        }

        public async Task DeleteAsync(int id)
        {
            var mark =
                await _markRepository.GetByIdAsync(id);

            if (mark == null)
                throw new KeyNotFoundException(
                    "Mark not found.");

            await _markRepository.DeleteAsync(id);
        }
    }
}