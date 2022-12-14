import { api } from "./fetchFromApi";
import { Movie } from "../models/movie.model";
import { posterSizes } from "../models/movieSize.model";
import { lazyLoading } from "../utils/lazyLoading";

export enum sortBy{
    popularity_asc = "popularity.asc",
    popularity_desc = "popularity.desc",
    release_date_asc = "release_date.asc",
    release_date_desc = "release_date.desc", 
    revenue_asc = "revenue.asc",
    revenue_desc =  "revenue.desc", 
    primary_release_date_asc = "primary_release_date.asc", 
    primary_release_date_desc = "primary_release_date.desc", 
    original_title_asc = "original_title.asc", 
    original_title_desc = "original_title.desc", 
    vote_average_asc = "vote_average.asc", 
    vote_average_desc = "vote_average.desc", 
    vote_count_asc = "vote_count.asc", 
    vote_count_desc = "vote_count.desc"
}

export class LowerSection{
    private _selected: string = "btn1";
    private currentPage: number =  2;

    public addbutton(title: string,idNumber:number, sortby: sortBy){
        const id: string = "btn" + idNumber;
        const LowerButtonContainer = document.querySelector("#lowerButtonContainer");
        const btn = `
            <button id="${id}" class="lower__button" type="button">
                <H4 class="lower__button_title"> ${title} </H4>
            </button>
        `
        LowerButtonContainer?.insertAdjacentHTML("beforeend",btn);
        const button = document.getElementById(id);
        button?.addEventListener("click",()=>this.getFilteredMovies(sortby,id));       
    }

    public addSkeleton(){
        const lowerContent = document.getElementById("lowerContent")!;
        lowerContent.innerHTML = "";
        for (let index = 0; index < 20; index++) {
            const lowerCard = `
                <div class="lower__card  lower__image skeleton" id="lowerCard" >
                </div>
            `
            lowerContent.insertAdjacentHTML("beforeend",lowerCard);
        }

    }
    
    public async getFilteredMovies(sortby: sortBy,id: string = this._selected){  
        const selected = document.getElementById(this._selected)!;      
        if(this._selected!=id){
            const newSelected = document.getElementById(id)!;
            this._selected = id;
            selected.className = "lower__button";
            newSelected.className = "lower__button--selected";
        }else{
            selected.className = "lower__button--selected";
        }

        const data = await api(`discover/movie`,`sort_by=${sortby}`);
        const movies: Movie[] = data.results.filter((movie:Movie)=>movie.poster_path)
        
        const lowerCard: NodeListOf<HTMLElement> = document.querySelectorAll("#lowerCard")
        lowerCard.forEach((card,index)=>{
            if( movies[index]) {
                card.innerHTML = 
                `
                    <img id="cardImg${index}" class="lower__image" data-src="${'https://image.tmdb.org/t/p/'+posterSizes.w342+movies[index].poster_path}" alt="${movies[index].title + ' poster image'}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                `
                const cardimg = document.getElementById("cardImg"+index)!;
                lazyLoading.observe(cardimg);
                cardimg.onload = ()=>card.setAttribute("class","lower__card");

            }else{
                card.remove();
            }
            
        });
        const lowerLoadMore = document.getElementById("lowerLoadMore");
        lowerLoadMore?.addEventListener("click",()=>{this.getMoreMovies(sortby)});

    }
    
    public async getMoreMovies(sortby: sortBy){

        const data = await api(`discover/movie`,`sort_by=${sortby}&page=${this.currentPage}`);
        const movies: Movie[] = data.results.filter((movie:Movie)=>movie.poster_path)


        const lowerContent = document.getElementById("lowerContent");
        movies.forEach((movie,index)=>{
            const card = `
                <div class="lower__card" id="lowerCard" >
                    <img class="lower__image" src="${'https://image.tmdb.org/t/p/'+posterSizes.w342+movies[index].poster_path}" alt="${movies[index].title + ' poster image'}">
                    <h5 class="lower__title">${movies[index].title}</h5>
                </div>
            `
            lowerContent?.insertAdjacentHTML("beforeend",card);
        })
        this.currentPage+=1;

    }
}