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
exports.LowerSection = exports.sortBy = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
var sortBy;
(function (sortBy) {
    sortBy["popularity_asc"] = "popularity.asc";
    sortBy["popularity_desc"] = "popularity.desc";
    sortBy["release_date_asc"] = "release_date.asc";
    sortBy["release_date_desc"] = "release_date.desc";
    sortBy["revenue_asc"] = "revenue.asc";
    sortBy["revenue_desc"] = "revenue.desc";
    sortBy["primary_release_date_asc"] = "primary_release_date.asc";
    sortBy["primary_release_date_desc"] = "primary_release_date.desc";
    sortBy["original_title_asc"] = "original_title.asc";
    sortBy["original_title_desc"] = "original_title.desc";
    sortBy["vote_average_asc"] = "vote_average.asc";
    sortBy["vote_average_desc"] = "vote_average.desc";
    sortBy["vote_count_asc"] = "vote_count.asc";
    sortBy["vote_count_desc"] = "vote_count.desc";
})(sortBy = exports.sortBy || (exports.sortBy = {}));
class LowerSection {
    constructor() {
        this._selected = "btn1";
        this.currentPage = 2;
    }
    addbutton(title, idNumber, sortby) {
        const id = "btn" + idNumber;
        const LowerButtonContainer = document.querySelector("#lowerButtonContainer");
        const btn = `
            <button id="${id}" class="lower__button" type="button">
                <H4 class="lower__button_title"> ${title} </H4>
            </button>
        `;
        LowerButtonContainer === null || LowerButtonContainer === void 0 ? void 0 : LowerButtonContainer.insertAdjacentHTML("beforeend", btn);
        const button = document.getElementById(id);
        button === null || button === void 0 ? void 0 : button.addEventListener("click", () => this.getFilteredMovies(sortby, id));
    }
    addSkeleton() {
        const lowerContent = document.getElementById("lowerContent");
        lowerContent.innerHTML = "";
        for (let index = 0; index < 20; index++) {
            const lowerCard = `
                <div class="lower__card  lower__image skeleton" id="lowerCard" >
                </div>
            `;
            lowerContent.insertAdjacentHTML("beforeend", lowerCard);
        }
    }
    getFilteredMovies(sortby, id = this._selected) {
        return __awaiter(this, void 0, void 0, function* () {
            const selected = document.getElementById(this._selected);
            if (this._selected != id) {
                const newSelected = document.getElementById(id);
                this._selected = id;
                selected.className = "lower__button";
                newSelected.className = "lower__button--selected";
            }
            else {
                selected.className = "lower__button--selected";
            }
            const data = yield (0, fetchFromApi_1.api)(`discover/movie`, `sort_by=${sortby}`);
            const movies = data.results.filter((movie) => movie.poster_path);
            const lowerCard = document.querySelectorAll("#lowerCard");
            lowerCard.forEach((card, index) => {
                if (movies[index]) {
                    card.innerHTML =
                        `
                    <img id="cardImg${index}" class="lower__image" data-src="${'https://image.tmdb.org/t/p/' + movieSize_model_1.posterSizes.w342 + movies[index].poster_path}" alt="${movies[index].title + ' poster image'}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                `;
                    const cardimg = document.getElementById("cardImg" + index);
                    lazyLoading_1.lazyLoading.observe(cardimg);
                    cardimg.onload = () => card.setAttribute("class", "lower__card");
                }
                else {
                    card.remove();
                }
            });
            const lowerLoadMore = document.getElementById("lowerLoadMore");
            lowerLoadMore === null || lowerLoadMore === void 0 ? void 0 : lowerLoadMore.addEventListener("click", () => { this.getMoreMovies(sortby); });
        });
    }
    getMoreMovies(sortby) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, fetchFromApi_1.api)(`discover/movie`, `sort_by=${sortby}&page=${this.currentPage}`);
            const movies = data.results.filter((movie) => movie.poster_path);
            const lowerContent = document.getElementById("lowerContent");
            movies.forEach((movie, index) => {
                const card = `
                <div class="lower__card" id="lowerCard" >
                    <img class="lower__image" src="${'https://image.tmdb.org/t/p/' + movieSize_model_1.posterSizes.w342 + movies[index].poster_path}" alt="${movies[index].title + ' poster image'}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                </div>
            `;
                lowerContent === null || lowerContent === void 0 ? void 0 : lowerContent.insertAdjacentHTML("beforeend", card);
            });
            this.currentPage += 1;
        });
    }
}
exports.LowerSection = LowerSection;
