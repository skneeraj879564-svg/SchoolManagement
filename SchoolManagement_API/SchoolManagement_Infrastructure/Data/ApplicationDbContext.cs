using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolManagement_Domain.Common;
using SchoolManagement_Domain.Entities;
using SchoolManagement_Domain.Identity;

namespace SchoolManagement_Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Class> Classes { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<ClassSubject> ClassSubjects { get; set; }

        public DbSet<Attendance> Attendances { get; set; }

        public DbSet<Exam> Exams { get; set; }

        public DbSet<Mark> Marks { get; set; }

        public DbSet<Fee> Fees { get; set; }

        public DbSet<Notice> Notices { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fee decimal precision
            modelBuilder.Entity<Fee>()
                .Property(x => x.Amount)
                .HasPrecision(18, 2);

            // Mark decimal precision
            modelBuilder.Entity<Mark>()
                .Property(x => x.MarksObtained)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Mark>()
                .Property(x => x.MaxMarks)
                .HasPrecision(18, 2);

            // Student -> Class
            modelBuilder.Entity<Student>()
                .HasOne(x => x.Class)
                .WithMany(x => x.Students)
                .HasForeignKey(x => x.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Class -> Teacher
            modelBuilder.Entity<Class>()
                .HasOne(x => x.ClassTeacher)
                .WithMany(x => x.Classes)
                .HasForeignKey(x => x.ClassTeacherId)
                .OnDelete(DeleteBehavior.SetNull);

            // ClassSubject -> Class
            modelBuilder.Entity<ClassSubject>()
                .HasOne(x => x.Class)
                .WithMany(x => x.ClassSubjects)
                .HasForeignKey(x => x.ClassId)
                .OnDelete(DeleteBehavior.Cascade);

            // ClassSubject -> Subject
            modelBuilder.Entity<ClassSubject>()
                .HasOne(x => x.Subject)
                .WithMany(x => x.ClassSubjects)
                .HasForeignKey(x => x.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            // ClassSubject -> Teacher
            modelBuilder.Entity<ClassSubject>()
                .HasOne(x => x.Teacher)
                .WithMany(x => x.ClassSubjects)
                .HasForeignKey(x => x.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            ApplyAuditFields();

            return await base.SaveChangesAsync(
                cancellationToken);
        }

        public override int SaveChanges()
        {
            ApplyAuditFields();

            return base.SaveChanges();
        }

        private void ApplyAuditFields()
        {
            var entries = ChangeTracker
                .Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;

                    entry.Entity.IsActive = true;

                    entry.Entity.UpdatedAt = null;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }
        }
    }
}