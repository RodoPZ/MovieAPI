"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hero_1 = require("./pages/hero");
const top_1 = require("./pages/top");
const genres_1 = require("./pages/genres");
const lowerSection_1 = require("./pages/lowerSection");
// Used in hero
let hero = new hero_1.Hero;
hero.getUpcomingMovies();
//used in genres sections(main) 
let getByGenre = new genres_1.GetByGenre;
const genreList = [genres_1.MoviegenreIds.Horror, genres_1.MoviegenreIds.Comedy, genres_1.MoviegenreIds.Action];
genreList.map((genre) => {
    getByGenre.getMoviesByGenre(genre);
});
// Used in "top" section (asside)
let top = new top_1.Top;
top.getTrendingMoviesPreview();
// used in lower section
let lowerSection = new lowerSection_1.LowerSection;
lowerSection.addbutton("Últimas", 1, lowerSection_1.sortBy.release_date_desc);
lowerSection.addbutton("Mas votadas", 2, lowerSection_1.sortBy.vote_count_desc);
lowerSection.addbutton("Populares", 3, lowerSection_1.sortBy.popularity_desc);
lowerSection.addSkeleton();
lowerSection.getFilteredMovies(lowerSection_1.sortBy.release_date_desc);
