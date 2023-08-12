export interface MoviesList {
    title: string
}

export const Movies = (props : MoviesList[] ) => {
    return (
        
    <div>
        {
        props.movies.map((movie, i) => {
            return (<div>{movie.title}</div>)
        })}
    </div>
    )
}