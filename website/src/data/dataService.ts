import { Movie } from "../model/movie";

export const getMovies = () : Movie[] => {
    return [
        {
            name: 'Gundam',
            id: '1',
            rating: 6.5,
            imageUrl: 'https://img.freepik.com/premium-vector/movie-theater-signboard-blue_34230-295.jpg',
        },
        {
            name: 'Test',
            id: '2',
            rating: 5,
            imageUrl: 'https://img.freepik.com/premium-vector/movie-theater-signboard-blue_34230-295.jpg',
        },
        {
            name: 'La La Land',
            id: '3',
            rating: 10,
            imageUrl: 'https://img.freepik.com/premium-vector/movie-theater-signboard-blue_34230-295.jpg',
        }
    ]
}