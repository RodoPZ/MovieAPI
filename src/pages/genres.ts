import { Movie } from "../models/movie.model";
import { genreMovieList } from "../models/movielist.model";
import { api } from "./axios";

export enum direction{
    right = 330,
    left = -330
}

export enum MoviegenreIds{
    Action=28,
    Adventure=12,
    Animation=16,
    Comedy=35,
    Crime=80,
    Documentary=99,
    Drama=18,
    Family=10751,
    Fantasy=14,
    History=36,
    Horror=27,
    Music=10402,
    Mystery=9648,
    Romance=10749,
    Science_Fiction=878,
    TV_Movie=10770,
    Thriller=53,
    War=10752,
    Western=37,
}

export class GetByGenre{

    private genreList: Array<genreMovieList[]> = [];

    public NavigateGenre(genreId:MoviegenreIds, dir:direction){
        const carouselImageGroup = document.getElementById("carouselImageStrip"+genreId)!;
        carouselImageGroup.scrollLeft += dir;
    }

    async getMoviesByGenre(genreId: MoviegenreIds){
        const {data} = await api(`discover/movie?with_genres=${genreId}`);
        const movies: Movie[] = data.results.slice(0,10);
        let genreMovieList: genreMovieList[] = [];
        
        movies.forEach(movie => {
            genreMovieList.push({
                backdrop_path: movie.backdrop_path 
            })
        });
    
        this.genreList[genreId] = genreMovieList;

        const genreHtmlTemplate = 
        `
            <article class="carousel">
                <H2 class="carousel__title">${MoviegenreIds[genreId]}</H2>
                <div class="carousel__image_group" id="${"imageGroup" + genreId}">
                    <div class="carousel__image_strip" id="carouselImageStrip${genreId}"></div>
                    <div class="Navigation_container__next">
                        <svg id="carouselNext${genreId}" class="carousel__next" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                    <div class="Navigation_container__last">
                        <svg id="carouselLast${genreId}" class="carousel__last" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                </div>
            </article>
        `
        const carouselSection = document.getElementById("carouselSection")!;
        carouselSection.insertAdjacentHTML('beforeend',genreHtmlTemplate);

        const imageGroup = document.getElementById("carouselImageStrip" + genreId)!;

        this.genreList[genreId].forEach((item) =>{
            const imgTemplate = `
                <img class="carousel_image" src="https://image.tmdb.org/t/p/w1280/${item.backdrop_path}">
            `
            imageGroup.insertAdjacentHTML('beforeend',imgTemplate);
        });

        let arrowLast = document.getElementById("carouselLast"+genreId)!;
        arrowLast.addEventListener("click",()=>this.NavigateGenre(genreId,direction.left));

        let arrowNext = document.getElementById("carouselNext"+genreId)!;
        arrowNext.addEventListener("click",()=>this.NavigateGenre(genreId,direction.right));
        
        return this.genreList;
    }

    
    
}



