using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class ClassSubjectRepository
        : Repository<ClassSubject>, IClassSubjectRepository
    {
        public ClassSubjectRepository(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}