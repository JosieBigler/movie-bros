import './App.css'
import { getMovies } from './data/dataService';
import { Movie } from './model/movie';
import { MoviesComponent } from './ui/Movies';

function App() {

  const movies : Movie[] = getMovies();
  return (
    <>
      <div>
           <div>
            Movies
           </div>
           <MoviesComponent movies={movies} ></MoviesComponent>
      </div>
    </>
  )
}

export default App
