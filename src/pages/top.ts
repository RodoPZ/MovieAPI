import {api} from "./fetchFromApi";
import { Movie } from "../models/movie.model";
import { posterSizes } from "../models/movieSize.model";

export class Top{
    public async getTrendingMoviesPreview(){
        const assideTop = document.getElementById("aside_top")!;
        assideTop.innerHTML = `
        <h3 class="top__title">Top</h3>
        <div class="card_container" id="cardContainer"></div>
        `
        const cardContainer = document.querySelector("#cardContainer");

        const CardTemplate =`
            <div class="Card" >
                <div class="skeleton" id="cardImgContainer">
                    <img class="Card__img" id="cardImg">
                </div>
                <div class="Card__text_container card__text_container_skeleton skeleton" id="cardTextContainer">
                </div>
            </div>
        `
        for (let index = 0; index < 5; index++) {
            cardContainer?.insertAdjacentHTML('beforeend',CardTemplate); 
        }
        const data = await api(`movie/top_rated`);

        const movies: Movie[] = data.results.slice(0,5).filter((movie: Movie)=>movie.backdrop_path)

        const cardImg: NodeListOf<HTMLImageElement> = document.querySelectorAll("#cardImg");
        cardImg.forEach((img,index) => {
            img.src = 'https://image.tmdb.org/t/p/'+posterSizes.w342+movies[index].poster_path
            img.alt = movies[index].title + ' poster image'
        });
        const cardImgContainer = document.querySelectorAll("#cardImgContainer");
        cardImgContainer.forEach(element => {
            element?.removeAttribute("class");
        });
        
        const cardTextContainer: NodeListOf<HTMLElement> = document.querySelectorAll("#cardTextContainer");

        cardTextContainer.forEach((Text,index) => {
            Text.setAttribute("class","Card__text_container");
            const cardTextTemplate = `
            <H6 class="Card__title">${movies[index].title}</H6>
            <div class="Card__subtitle_container">
                <p class="font-style-subtitle-1">${movies[index].vote_average + "/10"}</p>
                <p class="font-style-subtitle-1">${movies[index].release_date.slice(0,4)}</p>
            </div>

            `;
            Text.innerHTML = cardTextTemplate;
        });

    }
}
