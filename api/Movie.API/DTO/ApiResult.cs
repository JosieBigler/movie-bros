namespace MovieBro.API.DTO
{
    public class ApiResult<T> : ApiResult
    {
        public T? Data { get; set; }
    }

    public class ApiResult
    {
        public bool Success { get; set; }
        public string? Message { get; set; }

    }

}
