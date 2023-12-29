﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieBros.Model
{
    public class Movie
    {
        public int Id { get; set; }
        public string WhoPickedIt { get; set; }
        public DateTime Watched { get; set; }
        public string Mood { get; set; }
    }
}
