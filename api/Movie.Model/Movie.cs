using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieBros.Model
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int TMDBApiID { get; set; }
        public Guid UserIdThatPicked { get; set; }
        public DateTime Watched { get; set; }
        public string Mood { get; set; }
    }
}
