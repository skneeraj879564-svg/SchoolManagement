using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Teachers;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeachersController(
            ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        // GET: api/Teachers
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
     [FromQuery] PaginationRequest request)
        {
            var teachers =
                await _teacherService.GetAllAsync(request);

            return Ok(teachers);
        }

        // GET: api/Teachers/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var teacher =
                await _teacherService.GetByIdAsync(id);

            if (teacher == null)
                return NotFound("Teacher not found.");

            return Ok(teacher);
        }

        // POST: api/Teachers
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateTeacherDto request)
        {
            var teacher =
                await _teacherService.CreateAsync(request);

            return Ok(teacher);
        }

        // PUT: api/Teachers/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateTeacherDto request)
        {
            var result =
                await _teacherService.UpdateAsync(
                    id,
                    request);

            if (!result)
                return NotFound("Teacher not found.");

            return Ok("Teacher updated successfully.");
        }

        // DELETE: api/Teachers/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _teacherService.DeleteAsync(id);

            if (!result)
                return NotFound("Teacher not found.");

            return Ok("Teacher deleted successfully.");
        }
    }
}