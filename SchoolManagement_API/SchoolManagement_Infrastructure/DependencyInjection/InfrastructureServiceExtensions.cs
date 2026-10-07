using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Identity;
using SchoolManagement_Infrastructure.Cache;
using SchoolManagement_Infrastructure.Data;
using SchoolManagement_Infrastructure.Identity;
using SchoolManagement_Infrastructure.Repositories;

namespace SchoolManagement_Infrastructure.DependencyInjection
{
    public static class InfrastructureServiceExtensions
    {
        public static IServiceCollection AddInfrastructureServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // Database
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("SMSystem")));

            // Identity
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Identity Service
            services.AddScoped<IIdentityService, IdentityService>();

            // Student
            services.AddScoped<IStudentRepository, StudentRepository>();

            // Teacher
            services.AddScoped<ITeacherRepository, TeacherRepository>();

            // Class
            services.AddScoped<IClassRepository, ClassRepository>();

            // Subject
            services.AddScoped<ISubjectRepository, SubjectRepository>();

            // ClassSubject
            services.AddScoped<IClassSubjectRepository, ClassSubjectRepository>();

            // Attendance
            services.AddScoped<IAttendanceRepository, AttendanceRepository>();

            // Exam
            services.AddScoped<IExamRepository, ExamRepository>();

            // Mark
            services.AddScoped<IMarkRepository, MarkRepository>();

            // Fee
            services.AddScoped<IFeeRepository, FeeRepository>();

            // Notice
            services.AddScoped<INoticeRepository, NoticeRepository>();

            // Cache
            services.AddMemoryCache();
            services.AddSingleton<ICacheService, CacheService>();

            return services;
        }
    }
}