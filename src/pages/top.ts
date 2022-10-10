import {api} from "./fetchFromApi";
import { Movie } from "../models/movie.model";
import { posterSizes } from "../models/movieSize.model";
import { lazyLoading } from "../utils/lazyLoading";

export class Top{

    public async getTrendingMoviesPreview(){
        this.addSkeleton();

        const data = await api(`movie/top_rated`);
        const movies: Movie[] = data.results.slice(0,5).filter((movie: Movie)=>movie.backdrop_path)

        const cards: NodeListOf<HTMLImageElement> = document.querySelectorAll("#cardImg");
        const cardImg: NodeListOf<HTMLImageElement> = document.querySelectorAll("#cardImg");
        const cardTextContainer: NodeListOf<HTMLElement> = document.querySelectorAll("#cardTextContainer");

        cards.forEach((card,index)=>{
            cardImg[index].setAttribute("data-src",'https://image.tmdb.org/t/p/'+posterSizes.w342+movies[index].poster_path)
            cardImg[index].alt = movies[index].title + ' poster image'

            lazyLoading.observe(cardImg[index]);
            cardImg[index].onload = ()=> cardImg[index].parentElement!.removeAttribute("class");

            cardTextContainer[index].setAttribute("class","Card__text_container");
            cardTextContainer[index].innerHTML = `
                <H6 class="Card__title">${movies[index].title}</H6>
                <div class="Card__subtitle_container">
                    <p class="font-style-subtitle-1">${movies[index].vote_average + "/10"}</p>
                    <p class="font-style-subtitle-1">${movies[index].release_date.slice(0,4)}</p>
                </div>
                `;

        });

    }

    private addSkeleton(){
        const cardContainer = document.querySelector("#cardContainer");
        for (let index = 0; index < 5; index++) {
            const CardTemplate =`
                <div class="Card" >
                    <div class="skeleton" id="cardImgContainer${index}">
                        <img class="Card__img" id="cardImg">
                    </div>
                    <div class="Card__text_container card__text_container_skeleton skeleton" id="cardTextContainer">
                    </div>
                </div>
            `
            cardContainer?.insertAdjacentHTML('beforeend',CardTemplate); 
        }
    } 

}
