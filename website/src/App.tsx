import { getMovies } from './data/dataService';
import { Movie } from './model/movie';
import { MoviesComponent } from './ui/Movies';
import { Rate } from './pages/Rate'

function App() {

  const movies : Movie[] = getMovies();
  return (
    <>
      <div>
           {/* <MoviesComponent movies={movies} ></MoviesComponent> */}
           <Rate></Rate>
      </div>
    </>
  )
}

export default App
