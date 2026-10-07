using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Exams;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExamsController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamsController(IExamService examService)
        {
            _examService = examService;
        }

        // GET: api/Exams
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var exams =
                await _examService.GetAllAsync(request);

            return Ok(exams);
        }

        // GET: api/Exams/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var exam =
                await _examService.GetByIdAsync(id);

            if (exam == null)
                return NotFound("Exam not found.");

            return Ok(exam);
        }

        // POST: api/Exams
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateExamDto dto)
        {
            var exam =
                await _examService.CreateAsync(dto);

            return Ok(exam);
        }

        // PUT: api/Exams/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateExamDto dto)
        {
            await _examService.UpdateAsync(
                id,
                dto);

            return Ok("Exam updated successfully.");
        }

        // DELETE: api/Exams/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _examService.DeleteAsync(id);

            return Ok("Exam deleted successfully.");
        }
    }
}