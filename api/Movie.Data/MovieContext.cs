using Microsoft.EntityFrameworkCore;
using MovieBros.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace MovieBros.Data
{
    public class MovieContext : DbContext
    {
        public DbSet<Movie> Movie { get; set; }
        public DbSet<Rating> Rating { get; set; }

        public MovieContext(DbContextOptions<MovieContext> options)
            : base(options)
        {
            
        }
    }
}
