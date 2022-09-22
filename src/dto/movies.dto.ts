import { Movie } from "../models/movie.model";

export interface heroMovieListDto extends Pick<Movie,"title" | "backdrop_path" >{};

export interface genreMovieListDto extends Pick<Movie,"backdrop_path" >{};
