using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class TeacherRepository : Repository<Teacher>, ITeacherRepository
    {
        public TeacherRepository(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}