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
exports.Hero = void 0;
const fetchFromApi_1 = require("./fetchFromApi");
const movieSize_model_1 = require("../models/movieSize.model");
const lazyLoading_1 = require("../utils/lazyLoading");
class Hero {
    constructor() {
        this.movieList = [];
    }
    addSkeleton(selected = 1) {
        const limitContainer = document.getElementById("limitContainer");
        for (let index = 0; index < 3; index++) {
            const heroTemplateSkeleton = `<img class="${index == selected ? "hero__image--center" : "hero__image"} skeleton"
                id="image${index}">`;
            limitContainer.insertAdjacentHTML("beforeend", heroTemplateSkeleton);
        }
    }
    getUpcomingMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSkeleton();
            this.movieList = [];
            const data = yield (0, fetchFromApi_1.api)(`movie/upcoming`);
            const movies = data.results.slice(0, 5).filter((movie) => movie.backdrop_path);
            movies.forEach((movie, index) => {
                this.movieList.push({
                    title: movie.title,
                    backdrop_path: movie.backdrop_path
                });
            });
            this.populateimg(0);
            return this.movieList;
        });
    }
    Navigatemovies(next) {
        this.populateimg(next);
    }
    populateimg(selected) {
        const limitContainer = document.getElementById("limitContainer");
        limitContainer.innerHTML = `
                <div class="dot-container" id="dotContainer">
                    ${this.movieList.map((movie, index) => {
            return `<div class="${index == selected ? "dot-container__dot--selected" : "dot-container__dot"}" id="${"dotss" + index}"></div>`;
        }).join('')}
                </div>
            `;
        for (let i = 0; i < this.movieList.length; i++) {
            const dot = document.getElementById("dotss" + i);
            dot === null || dot === void 0 ? void 0 : dot.addEventListener("click", () => {
                this.Navigatemovies(i);
            });
        }
        this.movieList.map((movie, index) => {
            return `<img class="${index == selected ? "hero__image--center" : "hero__image"}"
                        src="https://image.tmdb.org/t/p/${movieSize_model_1.backdropSize.w1280}/${this.movieList[index]["backdrop_path"]}" 
                        alt="${this.movieList[index]["title"]}" 
                        id="image${index}">`;
        }).join('');
        for (let i = selected - 1; i <= (selected + 1); i++) {
            const img = document.createElement("img");
            if (i == selected) {
                const dot = document.getElementById("dotss" + i);
                if (dot != null) {
                    dot.className = "dot-container__dot--selected";
                }
                img.classList.add("hero__image--center");
            }
            else {
                img.classList.add("hero__image");
            }
            if (i < 0) {
                img.setAttribute("data-src", 'https://image.tmdb.org/t/p/' + movieSize_model_1.backdropSize.w1280 + this.movieList[this.movieList.length + i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[this.movieList.length + i]["title"] + ' poster image');
                img.addEventListener("click", () => this.Navigatemovies(this.movieList.length + i), false);
            }
            else if (i == selected) {
                img.setAttribute("data-src", 'https://image.tmdb.org/t/p/' + movieSize_model_1.backdropSize.w1280 + this.movieList[i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i]["title"] + ' poster image');
            }
            else if (i > this.movieList.length - 1) {
                img.setAttribute("data-src", 'https://image.tmdb.org/t/p/' + movieSize_model_1.backdropSize.w1280 + this.movieList[i - this.movieList.length]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i - this.movieList.length]["title"] + ' poster image');
                img.addEventListener("click", () => this.Navigatemovies(i - this.movieList.length), false);
            }
            else {
                img.setAttribute("data-src", 'https://image.tmdb.org/t/p/' + movieSize_model_1.backdropSize.w1280 + this.movieList[i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i]["title"] + ' poster image');
                img.addEventListener("click", () => this.Navigatemovies(i), false);
            }
            lazyLoading_1.lazyLoading.observe(img);
            limitContainer.appendChild(img);
        }
    }
}
exports.Hero = Hero;
