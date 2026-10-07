using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SchoolManagement_Domain.Identity;

namespace SchoolManagement_Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            // Apply pending migrations
            await context.Database.MigrateAsync();

            // ===============================
            // Create Default Roles
            // ===============================

            string[] roles =
            {
                "Admin",
                "Teacher",
                "Student"
            };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    var roleResult =
                        await roleManager.CreateAsync(
                            new IdentityRole(role));

                    if (!roleResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            roleResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Role '{role}' creation failed: {errors}");
                    }
                }
            }

            // ===============================
            // Assign Student Role
            // to Existing Users
            // ===============================

            var users =
                await userManager.Users.ToListAsync();

            foreach (var user in users)
            {
                var userRoles =
                    await userManager.GetRolesAsync(user);

                if (!userRoles.Any())
                {
                    var roleResult =
                        await userManager.AddToRoleAsync(
                            user,
                            "Student");

                    if (!roleResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            roleResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Student role assignment failed for '{user.Email}': {errors}");
                    }
                }
            }

            // ===============================
            // Assign Teacher Role
            // to Test Teacher User
            // ===============================

            var teacherUser =
                await userManager.FindByEmailAsync(
                    "nishant@gmail.com");

            if (teacherUser != null)
            {
                var teacherRoles =
                    await userManager.GetRolesAsync(
                        teacherUser);

                // Remove Student role
                if (teacherRoles.Contains("Student"))
                {
                    var removeResult =
                        await userManager.RemoveFromRoleAsync(
                            teacherUser,
                            "Student");

                    if (!removeResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            removeResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Student role removal failed for '{teacherUser.Email}': {errors}");
                    }
                }

                // Add Teacher role
                if (!teacherRoles.Contains("Teacher"))
                {
                    var teacherResult =
                        await userManager.AddToRoleAsync(
                            teacherUser,
                            "Teacher");

                    if (!teacherResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            teacherResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Teacher role assignment failed for '{teacherUser.Email}': {errors}");
                    }
                }
            }

            // ===============================
            // Assign Admin Role
            // to Test Admin User
            // ===============================

            var adminUser =
                await userManager.FindByEmailAsync(
                    "skneeraj@gmail.com");

            if (adminUser != null)
            {
                var adminRoles =
                    await userManager.GetRolesAsync(
                        adminUser);

                // Remove Student role
                if (adminRoles.Contains("Student"))
                {
                    var removeResult =
                        await userManager.RemoveFromRoleAsync(
                            adminUser,
                            "Student");

                    if (!removeResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            removeResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Student role removal failed for '{adminUser.Email}': {errors}");
                    }
                }

                // Remove Teacher role
                if (adminRoles.Contains("Teacher"))
                {
                    var removeResult =
                        await userManager.RemoveFromRoleAsync(
                            adminUser,
                            "Teacher");

                    if (!removeResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            removeResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Teacher role removal failed for '{adminUser.Email}': {errors}");
                    }
                }

                // Add Admin role
                if (!adminRoles.Contains("Admin"))
                {
                    var adminResult =
                        await userManager.AddToRoleAsync(
                            adminUser,
                            "Admin");

                    if (!adminResult.Succeeded)
                    {
                        var errors = string.Join(
                            ", ",
                            adminResult.Errors.Select(
                                x => x.Description));

                        throw new Exception(
                            $"Admin role assignment failed for '{adminUser.Email}': {errors}");
                    }
                }
            }
        }
    }
}