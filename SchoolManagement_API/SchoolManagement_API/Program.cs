using Microsoft.AspNetCore.Identity;
using SchoolManagement_API.Extensions;
using SchoolManagement_API.Filters;
using SchoolManagement_API.Middleware;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Application.Mapping;
using SchoolManagement_Application.Services;
using SchoolManagement_Domain.Identity;
using SchoolManagement_Infrastructure.Data;
using SchoolManagement_Infrastructure.DependencyInjection;
using Serilog;

var builder = WebApplication.CreateBuilder(args);


// ===============================
// Serilog
// ===============================

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Host.UseSerilog();


// ===============================
// Infrastructure Services
// ===============================

builder.Services.AddInfrastructureServices(
    builder.Configuration);


// ===============================
// JWT Authentication
// ===============================

builder.Services.AddJwtAuthentication(
    builder.Configuration);


// ===============================
// CORS
// ===============================

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// ===============================
// Application Services
// ===============================

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IClassSubjectService, ClassSubjectService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<IMarkService, MarkService>();
builder.Services.AddScoped<IFeeService, FeeService>();
builder.Services.AddScoped<INoticeService, NoticeService>();


// ===============================
// AutoMapper
// ===============================

builder.Services.AddAutoMapper(typeof(MappingProfile));


// ===============================
// Controllers + Validation
// ===============================

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
});


// ===============================
// Swagger
// ===============================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerConfiguration();


// ===============================
// Build Application
// ===============================

var app = builder.Build();


// ===============================
// Database Initializer
// ===============================

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context =
            services.GetRequiredService<ApplicationDbContext>();

        var roleManager =
            services.GetRequiredService<RoleManager<IdentityRole>>();

        var userManager =
            services.GetRequiredService<UserManager<ApplicationUser>>();

        await DbInitializer.InitializeAsync(
            context,
            roleManager,
            userManager);

        Log.Information(
            "Database initialized and roles checked successfully.");
    }
    catch (Exception ex)
    {
        Log.Error(
            ex,
            "Database initialization failed.");
    }
}


// ===============================
// Application Started
// ===============================

Log.Information(
    "School Management API started successfully.");


// ===============================
// Global Exception Middleware
// ===============================

app.UseMiddleware<GlobalExceptionMiddleware>();


// ===============================
// Swagger
// ===============================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// ===============================
// HTTPS
// ===============================

app.UseHttpsRedirection();


// ===============================
// CORS
// ===============================

app.UseCors("FrontendPolicy");


// ===============================
// Authentication
// ===============================

app.UseAuthentication();


// ===============================
// Authorization
// ===============================

app.UseAuthorization();


// ===============================
// Controllers
// ===============================

app.MapControllers();


// ===============================
// Run
// ===============================

app.Run();