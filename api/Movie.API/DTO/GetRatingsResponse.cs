namespace MovieBro.API.DTO
{
    public class RatingsApiResult : ApiResult<IEnumerable<GetRatingsResponse>>
    {
        public bool HaveRated { get; set; } 
    }

    public class GetRatingsResponse
    {
        public string UserName { get; set; } = string.Empty;
        public float Rating { get; set; }
        public Guid MovieId { get; set; }
    }
}
