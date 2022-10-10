import { heroMovieList } from "../models/movielist.model";
import {api} from "./fetchFromApi";
import { Movie } from "../models/movie.model";
import { backdropSize } from "../models/movieSize.model";
import { lazyLoading } from "../utils/lazyLoading";

export class Hero{
    private movieList: Array<heroMovieList> = [];

    private addSkeleton(selected: number = 1){
        const limitContainer = document.getElementById("limitContainer")!;

        for (let index = 0; index < 3; index++) {
            const heroTemplateSkeleton = `<img class="${index==selected?"hero__image--center":"hero__image"} skeleton"
                id="image${index}">`;
            limitContainer.insertAdjacentHTML("beforeend", heroTemplateSkeleton) 
        }
    }

    public async getUpcomingMovies(){
        this.addSkeleton();

        this.movieList = [];

        const data = await api(`movie/upcoming`);
        const movies: Movie[] = data.results.slice(0,5).filter((movie: Movie) =>movie.backdrop_path);

        movies.forEach((movie:Movie , index: number) => {
            this.movieList.push(
                {
                    title: movie.title,
                    backdrop_path: movie.backdrop_path
                });
        });
        
        this.populateimg(0);
    
        return this.movieList;
    }

    private Navigatemovies(next: number){
        this.populateimg(next);
    }

    private populateimg(selected: number){
        const limitContainer = document.getElementById("limitContainer")!;

        limitContainer.innerHTML = `
                <div class="dot-container" id="dotContainer">
                    ${this.movieList.map((movie,index)=>{
                        return `<div class="${index==selected?"dot-container__dot--selected":"dot-container__dot"}" id="${"dotss"+index}"></div>`
                    }).join('')}
                </div>
            `;

        for(let i = 0;i<this.movieList.length;i++){
            const dot = document.getElementById("dotss"+i);
            dot?.addEventListener("click",()=>{
                this.Navigatemovies(i);
            });
        }

        this.movieList.map((movie,index)=>{
            return `<img class="${index==selected?"hero__image--center":"hero__image"}"
                        src="https://image.tmdb.org/t/p/${backdropSize.w1280}/${this.movieList[index]["backdrop_path"]}" 
                        alt="${this.movieList[index]["title"]}" 
                        id="image${index}">`
        }).join('');

        for(let i = selected-1;i<=(selected+1);i++){
            const img = document.createElement("img");
            if(i==selected){
                const dot = document.getElementById("dotss"+i);
                if(dot!=null){
                    dot.className = "dot-container__dot--selected"
                }
                img.classList.add("hero__image--center");
            }else{
                img.classList.add("hero__image");
            }
            if(i<0){
                img.setAttribute("data-src",'https://image.tmdb.org/t/p/'+backdropSize.w1280+this.movieList[this.movieList.length + i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[this.movieList.length + i]["title"] + ' poster image');
                img.addEventListener("click",()=>this.Navigatemovies(this.movieList.length + i), false)
                
            }else if(i==selected){
                img.setAttribute("data-src",'https://image.tmdb.org/t/p/'+backdropSize.w1280+this.movieList[i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i]["title"] + ' poster image');
            }else if(i>this.movieList.length-1){
                img.setAttribute("data-src",'https://image.tmdb.org/t/p/'+backdropSize.w1280+this.movieList[i-this.movieList.length]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i-this.movieList.length]["title"] + ' poster image');
                img.addEventListener("click",()=>this.Navigatemovies(i-this.movieList.length), false)
            }else{
                img.setAttribute("data-src",'https://image.tmdb.org/t/p/'+backdropSize.w1280+this.movieList[i]["backdrop_path"]);
                img.setAttribute("alt", this.movieList[i]["title"] + ' poster image');
                img.addEventListener("click",()=>this.Navigatemovies(i), false)
            }
            lazyLoading.observe(img)
            limitContainer.appendChild(img);
        }
    }

}