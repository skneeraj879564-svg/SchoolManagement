using Microsoft.EntityFrameworkCore;
using SchoolManagement_Application.Interfaces;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Infrastructure.Data;

namespace SchoolManagement_Infrastructure.Repositories
{
    public class FeeRepository : IFeeRepository
    {
        private readonly ApplicationDbContext _context;

        public FeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Fee>> GetAllAsync()
        {
            return await _context.Fees
                .ToListAsync();
        }

        public async Task<Fee?> GetByIdAsync(int id)
        {
            return await _context.Fees
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Fee> AddAsync(Fee fee)
        {
            await _context.Fees.AddAsync(fee);
            await _context.SaveChangesAsync();

            return fee;
        }

        public async Task UpdateAsync(Fee fee)
        {
            _context.Fees.Update(fee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var fee = await _context.Fees
                .FirstOrDefaultAsync(x => x.Id == id);

            if (fee != null)
            {
                _context.Fees.Remove(fee);
                await _context.SaveChangesAsync();
            }
        }
    }
}