import { Movie } from "../model/movie"

export const MoviesComponent : React.FC<{movies : Movie[]}> = ({movies})  => (
    <>
        <div className="grid grid-cols-3 gap-4">
                {
                    movies.map(x => {
                        return <MovieComponent key={x.id} movie={x}></MovieComponent>
                    })
                }
        </div>
    </>
);

export const MovieComponent : React.FC<{movie : Movie}> = ({movie}) => (
    <>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={movie.imageUrl} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.name}</h5>
                </a>
                <p className="mb-3 font-bold text-red-700 dark:text-gray-400">{movie.rating}</p>
            </div>
        </div>
    </>
)