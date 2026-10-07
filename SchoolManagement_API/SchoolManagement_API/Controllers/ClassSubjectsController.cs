using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.ClassSubjects;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClassSubjectsController : ControllerBase
    {
        private readonly IClassSubjectService _classSubjectService;

        public ClassSubjectsController(
            IClassSubjectService classSubjectService)
        {
            _classSubjectService = classSubjectService;
        }

        // GET: api/ClassSubjects
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var classSubjects =
                await _classSubjectService.GetAllAsync(request);

            return Ok(classSubjects);
        }

        // GET: api/ClassSubjects/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var classSubject =
                await _classSubjectService.GetByIdAsync(id);

            if (classSubject == null)
                return NotFound("ClassSubject not found.");

            return Ok(classSubject);
        }

        // POST: api/ClassSubjects
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateClassSubjectDto request)
        {
            var classSubject =
                await _classSubjectService.CreateAsync(request);

            return Ok(classSubject);
        }

        // PUT: api/ClassSubjects/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateClassSubjectDto request)
        {
            var result =
                await _classSubjectService.UpdateAsync(
                    id,
                    request);

            if (!result)
                return NotFound("ClassSubject not found.");

            return Ok("ClassSubject updated successfully.");
        }

        // DELETE: api/ClassSubjects/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _classSubjectService.DeleteAsync(id);

            if (!result)
                return NotFound("ClassSubject not found.");

            return Ok("ClassSubject deleted successfully.");
        }
    }
}