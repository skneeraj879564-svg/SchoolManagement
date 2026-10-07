using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.Common.Pagination;
using SchoolManagement_Application.DTOs.Attendance;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(
            IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        // GET: api/Attendance
        // Admin + Teacher + Student
        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] PaginationRequest request)
        {
            var attendance =
                await _attendanceService.GetAllAsync(request);

            return Ok(attendance);
        }

        // GET: api/Attendance/1
        // Admin + Teacher + Student
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var attendance =
                await _attendanceService.GetByIdAsync(id);

            if (attendance == null)
                return NotFound("Attendance not found.");

            return Ok(attendance);
        }

        // POST: api/Attendance
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateAttendanceDto request)
        {
            var attendance =
                await _attendanceService.CreateAsync(request);

            return Ok(attendance);
        }

        // PUT: api/Attendance/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateAttendanceDto request)
        {
            var result =
                await _attendanceService.UpdateAsync(
                    id,
                    request);

            if (!result)
                return NotFound("Attendance not found.");

            return Ok("Attendance updated successfully.");
        }

        // DELETE: api/Attendance/1
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result =
                await _attendanceService.DeleteAsync(id);

            if (!result)
                return NotFound("Attendance not found.");

            return Ok("Attendance deleted successfully.");
        }
    }
}