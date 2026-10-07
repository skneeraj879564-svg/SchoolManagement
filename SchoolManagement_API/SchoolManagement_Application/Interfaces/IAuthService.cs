using SchoolManagement_Application.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement_Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto> LoginAsync( LoginRequestDto request);
        Task<AuthResponseDto> ChangeAccountAsync( ChangeAccountRequestDto request);
    }
}
