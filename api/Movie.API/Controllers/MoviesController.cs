using Microsoft.AspNetCore.Mvc;
using MovieBros.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieBros.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        public static List<Movie> Movies = new List<Movie>
        {
            new Movie { Title = "Gundam", Description = "Anime one wiht robots", Id = 1 },
            new Movie { Title = "Fortress", Description = "Early 90s scifi", Id = 2 },
            new Movie { Title = "Dark City", Description = "Weird space vampireds", Id = 3 },
        };

        // GET: api/<MoviesController>
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return Movies;
        }

        // GET api/<MoviesController>/5
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            return Movies.FirstOrDefault(x => x.Id == id);
        }

        // POST api/<MoviesController>
        [HttpPost]
        public void Post([FromBody] Movie movie)
        {
            Movies.Add(movie);
        }

        // PUT api/<MoviesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Movie movie)
        {
            var remove = Movies.Find(x => x.Id == id);
            Movies.Remove(remove);
            Movies.Add(movie);
        }

        // DELETE api/<MoviesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var remove = Movies.Find(x => x.Id == id);
            Movies.Remove(remove);
        }
    }
}
