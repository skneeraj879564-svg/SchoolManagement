using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Students;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: api/Students
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] PaginationRequest request)
        {
            var students =
                await _studentService.GetAllAsync(request);

            return Ok(students);
        }

        // GET: api/Students/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student =
                await _studentService.GetByIdAsync(id);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            return Ok(student);
        }

        // POST: api/Students
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateStudentDto request)
        {
            var student =
                await _studentService.CreateAsync(request);

            return Ok(student);
        }

        // PUT: api/Students/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateStudentDto request)
        {
            var result =
                await _studentService.UpdateAsync(id, request);

            if (!result)
            {
                return NotFound("Student not found.");
            }

            return Ok("Student updated successfully.");
        }

        // DELETE: api/Students/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _studentService.DeleteAsync(id);

            if (!result)
            {
                return NotFound("Student not found.");
            }

            return Ok("Student deleted successfully.");
        }
    }
}