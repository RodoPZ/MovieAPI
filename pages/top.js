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
const axios_1 = require("./axios");
class Top {
    getTrendingMoviesPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield (0, axios_1.api)(`movie/top_rated`);
            const movies = data.results.slice(0, 5);
            const assideTop = document.getElementById("aside_top");
            assideTop.innerHTML = `
        <h3 class="top__title">Top</h3>
        <div class="card_container">
            ${movies.map((movie) => {
                return `
                    <div class="Card">
                        <img class="Card__img" src="${'https://image.tmdb.org/t/p/w300/' + movie.poster_path}" alt="${movie.title + ' poster image'}">
                        <div class="Card__text_container">
                            <H6 class="Card__title">${movie.title}</H6>
                            <div class="Card__subtitle_container">
                                <p class="font-style-subtitle-1">${movie.vote_average + "/10"}</p>
                                <p class="font-style-subtitle-1">${movie.release_date.slice(0, 4)}</p>
                            </div>
                        </div>
                    </div>
                    `;
            }).join('')}
        </div>
        `;
        });
    }
}
exports.Top = Top;
