using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Movie.Data;

namespace Movie.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IdentityContext _identityContext { get; set; }
        public UserManager<IdentityUser> _userManager { get; set; }
        public UsersController(IdentityContext identityContext, UserManager<IdentityUser> userManager)
        {
            _identityContext = identityContext;
            _userManager = userManager;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var user = new IdentityUser()
            {
                Email = "test@demo.com",
                UserName = "test@demo.com"

            };

            var password = _userManager.AddPasswordAsync(user, "shawn123!@#");
            return Ok();
        }
    }
}
