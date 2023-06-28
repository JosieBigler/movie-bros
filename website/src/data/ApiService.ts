import { Movie } from "./Movies";

export interface IApi {
    getMovies(): Promise<Movie[]>
    getmovie(id: number): Promise<Movie>
}

export class ApiService implements IApi {
    /**
     *
     */
    private _apiUrl: string;
    private _headers: Headers;
    constructor(apiUrl: string) {
        this._apiUrl = apiUrl + "/api/movies";
        this._headers = new Headers();
        this._headers.append("Content-Type", "application/json");
    }

    public setToken(token: string) {
        this._headers.set("Authorization", `Bearer: ${token}`);
    }

    public async getMovies(): Promise<Movie[]> {
        const response = await fetch(this._apiUrl, { headers: this._headers });
        const movies = await response.json();
        return movies;
    }

    public async getmovie(id: number): Promise<Movie> {
        const response = await fetch(`${this._apiUrl}/${id}`, { headers: this._headers });
        const movie = await response.json();
        return movie;
    }
}