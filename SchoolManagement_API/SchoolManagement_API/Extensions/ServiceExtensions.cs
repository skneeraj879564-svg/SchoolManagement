using SchoolManagement_Application.Interfaces;
using SchoolManagement_Application.Services;

namespace SchoolManagement_API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services)
        {
            // Authentication
            services.AddScoped<IAuthService, AuthService>();

            // Student
            services.AddScoped<IStudentService, StudentService>();

            // Teacher
            services.AddScoped<ITeacherService, TeacherService>();

            // Class
            services.AddScoped<IClassService, ClassService>();

            // Subject
            services.AddScoped<ISubjectService, SubjectService>();

            // ClassSubject
            services.AddScoped<IClassSubjectService, ClassSubjectService>();

            // Attendance
            services.AddScoped<IAttendanceService, AttendanceService>();

            // Exam
            services.AddScoped<IExamService, ExamService>();

            // Mark
            services.AddScoped<IMarkService, MarkService>();

            // Fee
            services.AddScoped<IFeeService, FeeService>();

            // Notice
            services.AddScoped<INoticeService, NoticeService>();

            return services;
        }
    }
}