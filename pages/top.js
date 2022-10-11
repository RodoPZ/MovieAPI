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
exports.Top = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
class Top {
    getTrendingMoviesPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSkeleton();
            const data = yield (0, fetchFromApi_1.api)(`movie/top_rated`);
            const movies = data.results.slice(0, 5).filter((movie) => movie.backdrop_path);
            const cards = document.querySelectorAll("#cardImg");
            const cardImg = document.querySelectorAll("#cardImg");
            const cardTextContainer = document.querySelectorAll("#cardTextContainer");
            cards.forEach((card, index) => {
                cardImg[index].setAttribute("data-src", 'https://image.tmdb.org/t/p/' + movieSize_model_1.posterSizes.w342 + movies[index].poster_path);
                cardImg[index].alt = movies[index].title + ' poster image';
                lazyLoading_1.lazyLoading.observe(cardImg[index]);
                cardImg[index].onload = () => cardImg[index].parentElement.removeAttribute("class");
                cardTextContainer[index].setAttribute("class", "Card__text_container");
                cardTextContainer[index].innerHTML = `
                <H6 class="Card__title">${movies[index].title}</H6>
                <div class="Card__subtitle_container">
                    <p class="font-style-subtitle-1">${movies[index].vote_average + "/10"}</p>
                    <p class="font-style-subtitle-1">${movies[index].release_date.slice(0, 4)}</p>
                </div>
                `;
            });
        });
    }
    addSkeleton() {
        const cardContainer = document.querySelector("#cardContainer");
        for (let index = 0; index < 5; index++) {
            const CardTemplate = `
                <div class="Card" >
                    <div class="skeleton" id="cardImgContainer${index}">
                        <img class="Card__img" id="cardImg">
                    </div>
                    <div class="Card__text_container card__text_container_skeleton skeleton" id="cardTextContainer">
                    </div>
                </div>
            `;
            cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.insertAdjacentHTML('beforeend', CardTemplate);
        }
    }
}
exports.Top = Top;
