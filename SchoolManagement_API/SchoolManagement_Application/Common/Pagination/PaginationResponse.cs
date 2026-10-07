namespace SchoolManagement_Application.Common.Pagination
{
    public class PaginationResponse<T>
    {
        public IEnumerable<T> Data { get; set; } = new List<T>();

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int TotalRecords { get; set; }

        public int TotalPages { get; set; }
    }
}