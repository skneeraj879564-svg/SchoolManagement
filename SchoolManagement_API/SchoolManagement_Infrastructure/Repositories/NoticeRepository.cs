using Microsoft.EntityFrameworkCore;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class NoticeRepository : INoticeRepository
    {
        private readonly ApplicationDbContext _context;

        public NoticeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notice>> GetAllAsync()
        {
            return await _context.Notices
                .ToListAsync();
        }

        public async Task<Notice?> GetByIdAsync(int id)
        {
            return await _context.Notices
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Notice> AddAsync(Notice notice)
        {
            await _context.Notices.AddAsync(notice);
            await _context.SaveChangesAsync();

            return notice;
        }

        public async Task UpdateAsync(Notice notice)
        {
            _context.Notices.Update(notice);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var notice = await _context.Notices
                .FirstOrDefaultAsync(x => x.Id == id);

            if (notice != null)
            {
                _context.Notices.Remove(notice);
                await _context.SaveChangesAsync();
            }
        }
    }
}                                                        