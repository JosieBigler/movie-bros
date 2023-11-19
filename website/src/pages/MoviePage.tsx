import { FC } from "react";
import { Movie } from "../model/movie";

export const MoviePage : FC<{movie: Movie}> = ({movie}) => (
    <>
        Information about the movie here. 

        Probably the ratings of the movie by person. 
        Date on when the ratings happened. 

        Maybe a summary of the movie.

        I'm thinking the big poster image on one side, and detailed information on the other. 
    </>
)