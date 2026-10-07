using Microsoft.EntityFrameworkCore;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class MarkRepository : IMarkRepository
    {
        private readonly ApplicationDbContext _context;

        public MarkRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Mark>> GetAllAsync()
        {
            return await _context.Marks
                .ToListAsync();
        }

        public async Task<Mark?> GetByIdAsync(int id)
        {
            return await _context.Marks
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Mark> AddAsync(Mark mark)
        {
            await _context.Marks.AddAsync(mark);
            await _context.SaveChangesAsync();

            return mark;
        }

        public async Task UpdateAsync(Mark mark)
        {
            _context.Marks.Update(mark);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var mark = await _context.Marks
                .FirstOrDefaultAsync(x => x.Id == id);

            if (mark != null)
            {
                _context.Marks.Remove(mark);
                await _context.SaveChangesAsync();
            }
        }
    }
}