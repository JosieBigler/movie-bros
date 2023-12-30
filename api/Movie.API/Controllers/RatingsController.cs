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

        public RatingsController(MovieContext movieContext, UserManager<IdentityUser> userManager)
        {
            _movieContext = movieContext;
            _userManager = userManager;
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
            _movieContext.SaveChanges();
            return new ApiResult();
        }
    }
}
