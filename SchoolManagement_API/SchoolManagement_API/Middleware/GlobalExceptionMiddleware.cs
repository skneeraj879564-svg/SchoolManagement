using System.Net;
using System.Text.Json;

namespace SchoolManagement_API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(
            RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(
            HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(
                    context,
                    ex);
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext context,
            Exception exception)
        {
            var statusCode = (int)HttpStatusCode.InternalServerError;
            var message = "An unexpected error occurred.";

            if (exception is KeyNotFoundException)
            {
                statusCode =
                    (int)HttpStatusCode.NotFound;

                message = exception.Message;
            }
            else if (exception is ArgumentException)
            {
                statusCode =
                    (int)HttpStatusCode.BadRequest;

                message = exception.Message;
            }
            else if (exception is UnauthorizedAccessException)
            {
                statusCode =
                    (int)HttpStatusCode.Unauthorized;

                message = exception.Message;
            }

            context.Response.StatusCode = statusCode;

            context.Response.ContentType =
                "application/json";

            var response = new
            {
                success = false,
                statusCode = statusCode,
                message = message
            };

            var json = JsonSerializer.Serialize(
                response);

            await context.Response.WriteAsync(json);
        }
    }
}