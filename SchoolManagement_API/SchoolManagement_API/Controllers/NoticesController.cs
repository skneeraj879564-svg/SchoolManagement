using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Notices;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NoticesController : ControllerBase
    {
        private readonly INoticeService _noticeService;

        public NoticesController(INoticeService noticeService)
        {
            _noticeService = noticeService;
        }

        // GET: api/Notices
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var notices =
                await _noticeService.GetAllAsync(request);

            return Ok(notices);
        }

        // GET: api/Notices/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var notice =
                await _noticeService.GetByIdAsync(id);

            if (notice == null)
                return NotFound("Notice not found.");

            return Ok(notice);
        }

        // POST: api/Notices
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateNoticeDto dto)
        {
            var notice =
                await _noticeService.CreateAsync(dto);

            return Ok(notice);
        }

        // PUT: api/Notices/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateNoticeDto dto)
        {
            await _noticeService.UpdateAsync(
                id,
                dto);

            return Ok("Notice updated successfully.");
        }

        // DELETE: api/Notices/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _noticeService.DeleteAsync(id);

            return Ok("Notice deleted successfully.");
        }
    }
}