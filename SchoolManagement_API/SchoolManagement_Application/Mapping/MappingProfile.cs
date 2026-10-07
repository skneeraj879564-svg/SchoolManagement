using AutoMapper;
using SchoolManagement_Application.DTOs.Attendance;
using SchoolManagement_Application.DTOs.Classes;
using SchoolManagement_Application.DTOs.ClassSubjects;
using SchoolManagement_Application.DTOs.Exams;
using SchoolManagement_Application.DTOs.Fees;
using SchoolManagement_Application.DTOs.Marks;
using SchoolManagement_Application.DTOs.Notices;
using SchoolManagement_Application.DTOs.Students;
using SchoolManagement_Application.DTOs.Subjects;
using SchoolManagement_Application.DTOs.Teachers;
using SchoolManagement_Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement_Application.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Student mappings

            CreateMap<Student, StudentDto>();

            CreateMap<CreateStudentDto, Student>();

            CreateMap<UpdateStudentDto, Student>();
            // Teacher mappings
            CreateMap<Teacher, TeacherDto>();
            CreateMap<CreateTeacherDto, Teacher>();
            CreateMap<UpdateTeacherDto, Teacher>();
            // Class mappings
            CreateMap<Class, ClassDto>();
            CreateMap<CreateClassDto, Class>();
            CreateMap<UpdateClassDto, Class>();
            // Subject
            CreateMap<Subject, SubjectDto>();
            CreateMap<CreateSubjectDto, Subject>();
            CreateMap<UpdateSubjectDto, Subject>();
            // ClassSubject
            CreateMap<ClassSubject, ClassSubjectDto>();
            CreateMap<CreateClassSubjectDto, ClassSubject>();
            CreateMap<UpdateClassSubjectDto, ClassSubject>();
            // Attendance
            CreateMap<Attendance, AttendanceDto>();
            CreateMap<CreateAttendanceDto, Attendance>();
            CreateMap<UpdateAttendanceDto, Attendance>();
            // Exam
            CreateMap<Exam, ExamDto>();
            CreateMap<CreateExamDto, Exam>();
            CreateMap<UpdateExamDto, Exam>();
            // Mark
            CreateMap<Mark, MarkDto>();
            CreateMap<CreateMarkDto, Mark>();
            CreateMap<UpdateMarkDto, Mark>();
            // Fee
            CreateMap<Fee, FeeDto>();
            CreateMap<CreateFeeDto, Fee>();
            CreateMap<UpdateFeeDto, Fee>();
            // Notice
            CreateMap<Notice, NoticeDto>();
            CreateMap<CreateNoticeDto, Notice>();
            CreateMap<UpdateNoticeDto, Notice>();
        }

    }
}
