using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieBros.Model
{
    public class Rating
    {
        public Guid Id { get; set; }
        public Guid MovieId { get; set; }
        public Guid UserId { get; set; }
        public float Value { get; set; }
        public DateTime DateRated { get; set; }
    }
}
