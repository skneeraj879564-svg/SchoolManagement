using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class ClassRepository : Repository<Class>, IClassRepository
    {
        public ClassRepository(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}