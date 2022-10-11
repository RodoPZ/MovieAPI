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
exports.GetByGenre = exports.MoviegenreIds = exports.direction = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const lazyLoading_1 = require("../utils/lazyLoading");
var direction;
(function (direction) {
    direction[direction["right"] = window.innerWidth * 0.8] = "right";
    direction[direction["left"] = -window.innerWidth * 0.8] = "left";
})(direction = exports.direction || (exports.direction = {}));
var MoviegenreIds;
(function (MoviegenreIds) {
    MoviegenreIds[MoviegenreIds["Action"] = 28] = "Action";
    MoviegenreIds[MoviegenreIds["Adventure"] = 12] = "Adventure";
    MoviegenreIds[MoviegenreIds["Animation"] = 16] = "Animation";
    MoviegenreIds[MoviegenreIds["Comedy"] = 35] = "Comedy";
    MoviegenreIds[MoviegenreIds["Crime"] = 80] = "Crime";
    MoviegenreIds[MoviegenreIds["Documentary"] = 99] = "Documentary";
    MoviegenreIds[MoviegenreIds["Drama"] = 18] = "Drama";
    MoviegenreIds[MoviegenreIds["Family"] = 10751] = "Family";
    MoviegenreIds[MoviegenreIds["Fantasy"] = 14] = "Fantasy";
    MoviegenreIds[MoviegenreIds["History"] = 36] = "History";
    MoviegenreIds[MoviegenreIds["Horror"] = 27] = "Horror";
    MoviegenreIds[MoviegenreIds["Music"] = 10402] = "Music";
    MoviegenreIds[MoviegenreIds["Mystery"] = 9648] = "Mystery";
    MoviegenreIds[MoviegenreIds["Romance"] = 10749] = "Romance";
    MoviegenreIds[MoviegenreIds["Science_Fiction"] = 878] = "Science_Fiction";
    MoviegenreIds[MoviegenreIds["TV_Movie"] = 10770] = "TV_Movie";
    MoviegenreIds[MoviegenreIds["Thriller"] = 53] = "Thriller";
    MoviegenreIds[MoviegenreIds["War"] = 10752] = "War";
    MoviegenreIds[MoviegenreIds["Western"] = 37] = "Western";
})(MoviegenreIds = exports.MoviegenreIds || (exports.MoviegenreIds = {}));
class GetByGenre {
    getMoviesByGenre(genreId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSkeleton(genreId);
            const data = yield (0, fetchFromApi_1.api)('discover/movie', `with_genres=${genreId}`);
            const movies = data.results.filter((movie) => movie.backdrop_path);
            const CarouselContainers = document.querySelectorAll("#CarouselContainer" + genreId);
            const CarouselImages = document.querySelectorAll("#CarouselImage" + genreId);
            const CarouselTitles = document.querySelectorAll("#CarouselTitle" + genreId);
            CarouselContainers.forEach((container, index) => {
                if (movies[index]) {
                    CarouselImages[index].setAttribute("data-src", "https://image.tmdb.org/t/p/w780/" + movies[index].backdrop_path);
                    CarouselTitles[index].innerText = movies[index].title;
                    lazyLoading_1.lazyLoading.observe(CarouselImages[index]);
                    CarouselImages[index].onload = () => CarouselImages[index].setAttribute("class", "carousel_image");
                }
                else {
                    container.remove();
                }
            });
        });
    }
    addSkeleton(genreId) {
        const carouselSection = document.getElementById("carouselSection");
        const genreHtmlTemplate = `
            <article class="carousel">
                <H2 class="carousel__title">${MoviegenreIds[genreId]}</H2>
                <div class="carousel__image_group" id="${"imageGroup" + genreId}">
                    <div class="carousel__image_strip" id="carouselImageStrip${genreId}"></div>
                    <div class="Navigation_container__next" id="carouselNext${genreId}">
                        <svg  class="carousel__next" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                    <div class="Navigation_container__last" id="carouselLast${genreId}">
                        <svg  class="carousel__last" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                </div>
            </article>
        `;
        carouselSection.insertAdjacentHTML('beforeend', genreHtmlTemplate);
        const imageGroup = document.getElementById("carouselImageStrip" + genreId);
        for (let index = 0; index < 20; index++) {
            const imgTemplate = `
                <div class="carousel_image_container" id="CarouselContainer${genreId}">
                    <img class="carousel_image skeleton" id="CarouselImage${genreId}" >
                    <H6 class="carousel_image__title" id="CarouselTitle${genreId}">Productions</H6>
                </div>

            `;
            imageGroup.insertAdjacentHTML('beforeend', imgTemplate);
        }
        let arrowLast = document.getElementById("carouselLast" + genreId);
        arrowLast.addEventListener("click", () => this.NavigateGenre(genreId, direction.left));
        let arrowNext = document.getElementById("carouselNext" + genreId);
        arrowNext.addEventListener("click", () => this.NavigateGenre(genreId, direction.right));
    }
    NavigateGenre(genreId, dir) {
        const carouselImageGroup = document.getElementById("carouselImageStrip" + genreId);
        const limit = carouselImageGroup.scrollLeft + carouselImageGroup.offsetWidth * Math.sign(dir);
        scroll(genreId, dir);
        function scroll(genreId, dir) {
            carouselImageGroup.scrollBy(30 * Math.sign(dir), 0); // horizontal and vertical scroll increments
            if (direction[dir] == "right" && carouselImageGroup.scrollLeft <= limit && carouselImageGroup.scrollLeft < carouselImageGroup.scrollWidth - carouselImageGroup.offsetWidth) {
                setTimeout(() => scroll(genreId, dir), 5);
            }
            else if (direction[dir] == "left" && carouselImageGroup.scrollLeft >= limit && carouselImageGroup.scrollLeft != 0) {
                setTimeout(() => scroll(genreId, dir), 5);
            }
        }
    }
}
exports.GetByGenre = GetByGenre;
