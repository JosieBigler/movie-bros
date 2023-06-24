using Microsoft.AspNetCore.Mvc;
using M = Movie.Model;

namespace Movie.API.Controllers;

[ApiController]
[Route(Constants.API_CONTROLLER_TEMPLATE)]
public class MoviesController : ControllerBase
{
    private static readonly M.Movie[] Movies = new[]
    {
        new M.Movie{Id = 1, Title = "Test 2"}, new M.Movie{Id = 2, Title = "Gundam"}, new M.Movie{Id = 3, Title = "BLah Blah"},
    };

    private readonly ILogger<MoviesController> _logger;

    public MoviesController(ILogger<MoviesController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<M.Movie>> Get()
    {
        _logger.LogInformation("GET Movies");
        return Ok(Movies);
    }

    [HttpGet("{Id}")]
    public ActionResult<M.Movie> GetMovie(int id)
    {
        _logger.LogInformation("Attempting to GET movie id {id}", id);
        var movie = Movies.FirstOrDefault(x => x.Id == id);
        if (movie == null) return NotFound();

        return Ok(movie);
    }
}
