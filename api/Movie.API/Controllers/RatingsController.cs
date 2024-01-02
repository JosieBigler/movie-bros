using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MovieBro.API.DTO;
using MovieBros.Data;
using MovieBros.Model;

namespace MovieBro.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        public readonly MovieContext _movieContext;
        public readonly UserManager<IdentityUser> _userManager;
        public readonly IdentityContext _identityContext;

        public RatingsController(MovieContext movieContext, UserManager<IdentityUser> userManager, IdentityContext identityContext)
        {
            _movieContext = movieContext;
            _userManager = userManager;
            _identityContext = identityContext;
        }

        [HttpPost]
        public async Task<ApiResult> IndexAsync(RatingDTO dto)
        {
            var userId = _userManager.GetUserId(HttpContext.User);
            if (userId is null) return new ApiResult { Success = false, Message = "User not found" };

            var rating = new Rating
            {
                DateRated = DateTime.UtcNow,
                MovieId = dto.MovieId,
                Value = dto.Value,
                UserId = Guid.Parse(userId)
            };

            _movieContext.Rating.Add(rating);
            await _movieContext.SaveChangesAsync();
            return new ApiResult();
        }

        [HttpGet]
        [Route("{movieId}")]
        public async Task<RatingsApiResult> Ratings(Guid movieId)
        {
            var ratings = _movieContext.Rating.Where(x => x.MovieId == movieId).Distinct().ToList();
            var userIds = ratings.Select(x => x.UserId.ToString()).Distinct().ToList();
            var users = _identityContext.Users.Where( x => userIds.Contains(x.Id) ).ToList();
            var user = await _userManager.GetUserAsync(HttpContext.User);

            var results = new List<GetRatingsResponse>();
            foreach ( var rating in ratings )
            {
                results.Add(new GetRatingsResponse()
                {
                    MovieId= rating.MovieId,
                    Rating = rating.Value,
                    UserName = users.FirstOrDefault(x => x.Id == rating.UserId.ToString())?.UserName ?? "User Name not found"
                });
            }

            var response = new RatingsApiResult
            {
                Data = results,
                HaveRated = ratings.Any(x => x.UserId.ToString() == user?.Id),
                Message = "",
                Success = true
            };

            return response;

        }
    }
}
