using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieBro.API.DTO;

namespace MovieBro.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public IdentityController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApiResult<string>> IndexAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return new ApiResult<string> { Success = false, Message = "Not logged in", Data = "" };
            return new ApiResult<string> { Data = user.UserName, Success = true, Message = "Logged in" };
        }
    }
}
