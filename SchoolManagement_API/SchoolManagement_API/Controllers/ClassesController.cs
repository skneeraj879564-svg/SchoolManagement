using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Classes;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClassesController : ControllerBase
    {
        private readonly IClassService _classService;

        public ClassesController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var classes =
                await _classService.GetAllAsync(request);

            return Ok(classes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var classDto =
                await _classService.GetByIdAsync(id);

            if (classDto == null)
                return NotFound("Class not found.");

            return Ok(classDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateClassDto request)
        {
            var classDto =
                await _classService.CreateAsync(request);

            return Ok(classDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateClassDto request)
        {
            var result =
                await _classService.UpdateAsync(id, request);

            if (!result)
                return NotFound("Class not found.");

            return Ok("Class updated successfully.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _classService.DeleteAsync(id);

            if (!result)
                return NotFound("Class not found.");

            return Ok("Class deleted successfully.");
        }
    }
}