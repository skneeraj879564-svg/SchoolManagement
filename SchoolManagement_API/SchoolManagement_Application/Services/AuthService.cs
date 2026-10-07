using Microsoft.AspNetCore.Identity;
using SchoolManagement_Application.DTOs.Auth;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Identity;

namespace SchoolManagement_Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IIdentityService _identityService;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            IIdentityService identityService)
        {
            _userManager = userManager;
            _identityService = identityService;
        }

        // REGISTER
        public async Task<AuthResponseDto> RegisterAsync(
            RegisterRequestDto request)
        {
            var existingUser =
                await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                throw new Exception("Email already exists.");
            }

            var user = new ApplicationUser
            {
                FullName = request.FullName,
                Email = request.Email,
                UserName = request.Email,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(
                user,
                request.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(
                    ", ",
                    result.Errors.Select(x => x.Description));

                throw new Exception(errors);
            }

            // Default role for newly registered users
            var roleResult = await _userManager.AddToRoleAsync(
                user,
                "Student");

            if (!roleResult.Succeeded)
            {
                var errors = string.Join(
                    ", ",
                    roleResult.Errors.Select(x => x.Description));

                throw new Exception(errors);
            }

            return new AuthResponseDto
            {
                Message = "User registered successfully.",
                UserId = user.Id,
                Email = user.Email!,
                FullName = user.FullName,
                Token = string.Empty
            };
        }

        // LOGIN
        public async Task<AuthResponseDto> LoginAsync(
            LoginRequestDto request)
        {
            var user =
                await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new Exception(
                    "Invalid email or password.");
            }

            if (!user.IsActive)
            {
                throw new Exception(
                    "User account is inactive.");
            }

            var passwordValid =
                await _userManager.CheckPasswordAsync(
                    user,
                    request.Password);

            if (!passwordValid)
            {
                throw new Exception(
                    "Invalid email or password.");
            }

            // Get user roles
            var roles =
                await _userManager.GetRolesAsync(user);

            // Generate JWT Token with roles
            var token =
                _identityService.GenerateToken(
                    user,
                    roles);

            return new AuthResponseDto
            {
                Message = "Login successful.",
                UserId = user.Id,
                Email = user.Email!,
                FullName = user.FullName,
                Token = token
            };
        }

        // CHANGE EMAIL, PASSWORD AND FULL NAME
        public async Task<AuthResponseDto> ChangeAccountAsync(
            ChangeAccountRequestDto request)
        {
            var user =
                await _userManager.FindByEmailAsync(
                    request.CurrentEmail);

            if (user == null)
            {
                throw new Exception(
                    "Current email is incorrect.");
            }

            var passwordValid =
                await _userManager.CheckPasswordAsync(
                    user,
                    request.CurrentPassword);

            if (!passwordValid)
            {
                throw new Exception(
                    "Current password is incorrect.");
            }

            // Check new email
            if (request.CurrentEmail != request.NewEmail)
            {
                var existingUser =
                    await _userManager.FindByEmailAsync(
                        request.NewEmail);

                if (existingUser != null)
                {
                    throw new Exception(
                        "New email already exists.");
                }

                user.Email = request.NewEmail;
                user.UserName = request.NewEmail;
            }

            // Change full name
            user.FullName = request.NewFullName;

            // Change password
            if (request.CurrentPassword != request.NewPassword)
            {
                var passwordResult =
                    await _userManager.ChangePasswordAsync(
                        user,
                        request.CurrentPassword,
                        request.NewPassword);

                if (!passwordResult.Succeeded)
                {
                    var errors = string.Join(
                        ", ",
                        passwordResult.Errors.Select(
                            x => x.Description));

                    throw new Exception(errors);
                }
            }

            // Update user
            var updateResult =
                await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
            {
                var errors = string.Join(
                    ", ",
                    updateResult.Errors.Select(
                        x => x.Description));

                throw new Exception(errors);
            }

            return new AuthResponseDto
            {
                Message =
                    "Account details changed successfully.",

                UserId = user.Id,
                Email = user.Email!,
                FullName = user.FullName,
                Token = string.Empty
            };
        }
    }
}