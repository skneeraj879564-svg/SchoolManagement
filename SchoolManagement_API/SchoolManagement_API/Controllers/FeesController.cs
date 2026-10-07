using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Fees;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FeesController : ControllerBase
    {
        private readonly IFeeService _feeService;

        public FeesController(IFeeService feeService)
        {
            _feeService = feeService;
        }

        // GET: api/Fees
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var fees =
                await _feeService.GetAllAsync(request);

            return Ok(fees);
        }

        // GET: api/Fees/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var fee =
                await _feeService.GetByIdAsync(id);

            if (fee == null)
                return NotFound("Fee not found.");

            return Ok(fee);
        }

        // POST: api/Fees
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateFeeDto dto)
        {
            var fee =
                await _feeService.CreateAsync(dto);

            return Ok(fee);
        }

        // PUT: api/Fees/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateFeeDto dto)
        {
            await _feeService.UpdateAsync(
                id,
                dto);

            return Ok("Fee updated successfully.");
        }

        // DELETE: api/Fees/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _feeService.DeleteAsync(id);

            return Ok("Fee deleted successfully.");
        }
    }
}