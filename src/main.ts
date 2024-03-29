import { Hero } from "./sections/hero";
import { Top } from "./sections/top";
import { GetByGenre, MoviegenreIds } from "./sections/genres";
import { LowerSection, sortBy } from "./sections/lowerSection";
import "./styles/app.css";

// Used in hero
let hero = new Hero();
hero.getUpcomingMovies();

//used in genres sections(main)
let getByGenre = new GetByGenre();
const genreList: MoviegenreIds[] = [
  MoviegenreIds.Terror,
  MoviegenreIds.Comedia,
  MoviegenreIds.Acción,
];
genreList.map((genre) => {
  getByGenre.getMoviesByGenre(genre);
});

// Used in "top" section (asside)
let top = new Top();
top.getTrendingMoviesPreview();

// used in lower section
let lowerSection = new LowerSection();

lowerSection.addbutton("Últimas", 1, sortBy.release_date_desc);
lowerSection.addbutton("Mas votadas", 2, sortBy.vote_count_desc);
lowerSection.addbutton("Populares", 3, sortBy.popularity_desc);
lowerSection.addSkeleton();
lowerSection.getFilteredMovies(sortBy.release_date_desc);
