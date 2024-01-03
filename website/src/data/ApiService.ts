import { ApiResponse } from "./ApiResponseDTO";
import { RatingApiResponseDTO } from "./RatingApiResponseDTO";

const url = 'https://localhost:7097';

const apiService = {
    

    //post a rating
    //a660d18a-fc15-4de0-8ab9-9871f63506a8
    getMovieRatings: async (movieId: string) : Promise<RatingApiResponseDTO> => {
        let response = await fetch(url + '/api/Ratings/' + movieId, {
            method: 'GET',
            credentials: 'include'
            });
        return response.json();
    },

    //get ratings
    rateMovie: async (movieId: string, rating: number) => {
        let response = await fetch(url + '/api/Ratings', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ movieId, value: rating})
        })
        return response.json();
    },

    //get identity

    //get movies?
    getMovies: async () : Promise<any> => {
        let response = await fetch(url + '/api/Movies', {
            method: 'GET',
            credentials: 'include'
            });
        return response.json();
    },

    getIdentity: async () : Promise<ApiResponse> => {
        let response = await fetch(url + '/api/Identity', {
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    }
}

export default apiService;