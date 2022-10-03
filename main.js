"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("./pages/axios");
const hero_1 = require("./pages/hero");
const top_1 = require("./pages/top");
const genres_1 = require("./pages/genres");
// Used in hero
let hero = new hero_1.Hero;
hero.getUpcomingMovies();
// Used in "top" section (asside)
let top = new top_1.Top;
top.getTrendingMoviesPreview();
//used in genres sections(main) 
let getByGenre = new genres_1.GetByGenre;
const genreList = [genres_1.MoviegenreIds.Horror, genres_1.MoviegenreIds.Comedy, genres_1.MoviegenreIds.Action];
genreList.map((genre) => {
    getByGenre.getMoviesByGenre(genre);
});
// used in lower section
let selected = "btn1";
function getFilteredMovies(argument, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield (0, axios_1.api)(`discover/movie?${argument}`);
        const movies = data.results;
        if (selected != id) {
            const lastSelected = document.getElementById(selected);
            const newSelected = document.getElementById(id);
            selected = id;
            lastSelected.className = "lower__button";
            newSelected.className = "lower__button--selected";
        }
        const lowerContent = document.getElementById("lowerContent");
        lowerContent.replaceChildren();
        movies.forEach(movie => {
            if (movie.poster_path != null) {
                const lowerCard = document.createElement('div');
                lowerCard.classList.add("lower__card");
                const lowerImage = document.createElement('img');
                lowerImage.classList.add("lower__image");
                lowerImage.setAttribute('src', 'https://image.tmdb.org/t/p/w1280/' + movie.poster_path);
                const lowerTitle = document.createElement("H5");
                lowerTitle.classList.add("lower__title");
                lowerTitle.innerText = movie.title;
                lowerCard.appendChild(lowerImage);
                lowerCard.appendChild(lowerTitle);
                lowerContent.appendChild(lowerCard);
            }
        });
        return selected;
    });
}
getFilteredMovies("sort_by=release_date.desc", "btn1");
