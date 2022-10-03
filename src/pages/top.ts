import {api} from "./axios";
import { Movie } from "../models/movie.model";

export class Top{
    public async getTrendingMoviesPreview(){
        const {data} = await api(`movie/top_rated`);
        const movies: Movie[] = data.results.slice(0,5);

        const assideTop = document.getElementById("aside_top")!;
        assideTop.innerHTML = `
        <h3 class="top__title">Top</h3>
        <div class="card_container">
            ${
                movies.map((movie)=>{
                    return `
                    <div class="Card">
                        <img class="Card__img" src="${'https://image.tmdb.org/t/p/w300/'+movie.poster_path}" alt="${movie.title + ' poster image'}">
                        <div class="Card__text_container">
                            <H6 class="Card__title">${movie.title}</H6>
                            <div class="Card__subtitle_container">
                                <p class="font-style-subtitle-1">${movie.vote_average + "/10"}</p>
                                <p class="font-style-subtitle-1">${movie.release_date.slice(0,4)}</p>
                            </div>
                        </div>
                    </div>
                    `
                }).join('')
            }
        </div>
        `

    }
}