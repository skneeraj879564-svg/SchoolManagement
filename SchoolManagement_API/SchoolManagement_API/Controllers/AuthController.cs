using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement_Application.DTOs.Auth;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterRequestDto request)
        {
            var result =
                await _authService.RegisterAsync(request);

            return Ok(result);
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequestDto request)
        {
            var result =
                await _authService.LoginAsync(request);

            return Ok(result);
        }

        [HttpPost("change-account")]
        public async Task<IActionResult> ChangeAccount( ChangeAccountRequestDto request)
        {
            var result =
                await _authService.ChangeAccountAsync(request);

            return Ok(result);
        }

        // PROTECTED API
        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok(new
            {
                message = "You are authorized.",
                userName = User.Identity?.Name,
                email = User.Claims
                    .FirstOrDefault(x =>
                        x.Type == System.Security.Claims.ClaimTypes.Email)
                    ?.Value
            });
        }
    }
}