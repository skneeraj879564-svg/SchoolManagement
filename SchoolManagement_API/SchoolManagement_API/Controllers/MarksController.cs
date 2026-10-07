using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Marks;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MarksController : ControllerBase
    {
        private readonly IMarkService _markService;

        public MarksController(IMarkService markService)
        {
            _markService = markService;
        }

        // GET: api/Marks
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var marks =
                await _markService.GetAllAsync(request);

            return Ok(marks);
        }

        // GET: api/Marks/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var mark =
                await _markService.GetByIdAsync(id);

            if (mark == null)
                return NotFound("Mark not found.");

            return Ok(mark);
        }

        // POST: api/Marks
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateMarkDto dto)
        {
            var mark =
                await _markService.CreateAsync(dto);

            return Ok(mark);
        }

        // PUT: api/Marks/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateMarkDto dto)
        {
            await _markService.UpdateAsync(
                id,
                dto);

            return Ok("Mark updated successfully.");
        }

        // DELETE: api/Marks/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _markService.DeleteAsync(id);

            return Ok("Mark deleted successfully.");
        }
    }
}