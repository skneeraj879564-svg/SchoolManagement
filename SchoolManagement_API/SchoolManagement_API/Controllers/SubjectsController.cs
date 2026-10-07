using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Subjects;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectsController(
            ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        // GET: api/Subjects
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var subjects =
                await _subjectService.GetAllAsync(request);

            return Ok(subjects);
        }

        // GET: api/Subjects/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subject =
                await _subjectService.GetByIdAsync(id);

            if (subject == null)
                return NotFound("Subject not found.");

            return Ok(subject);
        }

        // POST: api/Subjects
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateSubjectDto request)
        {
            var subject =
                await _subjectService.CreateAsync(request);

            return Ok(subject);
        }

        // PUT: api/Subjects/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateSubjectDto request)
        {
            var result =
                await _subjectService.UpdateAsync(
                    id,
                    request);

            if (!result)
                return NotFound("Subject not found.");

            return Ok("Subject updated successfully.");
        }

        // DELETE: api/Subjects/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _subjectService.DeleteAsync(id);

            if (!result)
                return NotFound("Subject not found.");

            return Ok("Subject deleted successfully.");
        }
    }
}