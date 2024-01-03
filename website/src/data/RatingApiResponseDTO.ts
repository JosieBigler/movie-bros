import { ApiResponse } from "./ApiResponseDTO";

export interface RatingApiResponseDTO extends ApiResponse
{
    haveRated : boolean,
    data: RatingResponseDTO[]
}

export interface RatingResponseDTO
{
    userName : string,
    rating : number,
    movieId : string
}