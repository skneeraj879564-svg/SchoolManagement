using AutoMapper;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Fees;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;

namespace SchoolManagement_Application.Services
{
    public class FeeService : IFeeService
    {
        private readonly IFeeRepository _feeRepository;
        private readonly IMapper _mapper;

        public FeeService(
            IFeeRepository feeRepository,
            IMapper mapper)
        {
            _feeRepository = feeRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResponse<FeeDto>> GetAllAsync(
            PaginationRequest request)
        {
            var fees =
                await _feeRepository.GetAllAsync();

            var totalRecords = fees.Count();

            var pagedFees = fees
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var feeDtos =
                _mapper.Map<IEnumerable<FeeDto>>(pagedFees);

            var totalPages = (int)Math.Ceiling(
                (double)totalRecords / request.PageSize);

            return new PaginationResponse<FeeDto>
            {
                Data = feeDtos,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }

        public async Task<FeeDto?> GetByIdAsync(int id)
        {
            var fee =
                await _feeRepository.GetByIdAsync(id);

            if (fee == null)
                return null;

            return _mapper.Map<FeeDto>(fee);
        }

        public async Task<FeeDto> CreateAsync(
            CreateFeeDto dto)
        {
            var fee =
                _mapper.Map<Fee>(dto);

            var createdFee =
                await _feeRepository.AddAsync(fee);

            return _mapper.Map<FeeDto>(
                createdFee);
        }

        public async Task UpdateAsync(
            int id,
            UpdateFeeDto dto)
        {
            var fee =
                await _feeRepository.GetByIdAsync(id);

            if (fee == null)
                throw new KeyNotFoundException(
                    "Fee not found.");

            _mapper.Map(dto, fee);

            await _feeRepository.UpdateAsync(fee);
        }

        public async Task DeleteAsync(int id)
        {
            var fee =
                await _feeRepository.GetByIdAsync(id);

            if (fee == null)
                throw new KeyNotFoundException(
                    "Fee not found.");

            await _feeRepository.DeleteAsync(id);
        }
    }
}