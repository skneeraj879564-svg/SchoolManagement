using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Notices;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class NoticeService : INoticeService
    {
        private readonly INoticeRepository _noticeRepository;
        private readonly IMapper _mapper;

        public NoticeService(
            INoticeRepository noticeRepository,
            IMapper mapper)
        {
            _noticeRepository = noticeRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<NoticeDto>> GetAllAsync(
            PaginationRequest request)
        {
            var notices =
                await _noticeRepository.GetAllAsync();

            var totalRecords = notices.Count();

            var pagedNotices = notices
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var noticeDtos =
                _mapper.Map<IEnumerable<NoticeDto>>(
                    pagedNotices);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<NoticeDto>
            {
                Data = noticeDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<NoticeDto?> GetByIdAsync(int id)
        {
            var notice =
                await _noticeRepository.GetByIdAsync(id);

            if (notice == null)
                return null;

            return _mapper.Map<NoticeDto>(notice);
        }

        public async Task<NoticeDto> CreateAsync(
            CreateNoticeDto dto)
        {
            var notice =
                _mapper.Map<Notice>(dto);

            var createdNotice =
                await _noticeRepository.AddAsync(notice);

            return _mapper.Map<NoticeDto>(
                createdNotice);
        }

        public async Task UpdateAsync(
            int id,
            UpdateNoticeDto dto)
        {
            var notice =
                await _noticeRepository.GetByIdAsync(id);

            if (notice == null)
                throw new KeyNotFoundException(
                    "Notice not found.");

            _mapper.Map(dto, notice);

            await _noticeRepository.UpdateAsync(notice);
        }

        public async Task DeleteAsync(int id)
        {
            var notice =
                await _noticeRepository.GetByIdAsync(id);

            if (notice == null)
                throw new KeyNotFoundException(
                    "Notice not found.");

            await _noticeRepository.DeleteAsync(id);
        }
    }
}