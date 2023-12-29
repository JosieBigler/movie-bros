using Microsoft.AspNetCore.Mvc;

namespace MovieBro.API.Controllers
{
    public class RatingsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
