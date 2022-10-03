import {api} from "./pages/axios";
import { Movie } from "./models/movie.model";
import {Hero} from "./pages/hero";
import { Top } from "./pages/top";
import {GetByGenre, MoviegenreIds} from "./pages/genres";

// Used in hero
let hero = new Hero;
hero.getUpcomingMovies();

// Used in "top" section (asside)
let top = new Top;
top.getTrendingMoviesPreview();

//used in genres sections(main) 
let getByGenre = new GetByGenre;
const genreList: MoviegenreIds[] = [MoviegenreIds.Horror,MoviegenreIds.Comedy, MoviegenreIds.Action]
genreList.map((genre)=>{
    getByGenre.getMoviesByGenre(genre);
});


// used in lower section


let selected = "btn1"
async function getFilteredMovies(argument: string,id: string){
    const {data} = await api(`discover/movie?${argument}`);
    const movies: Movie[] = data.results;
    
    if(selected!=id){
        const lastSelected = document.getElementById(selected)!;
        const newSelected = document.getElementById(id)!;
        selected = id;
        lastSelected.className = "lower__button";
        newSelected.className = "lower__button--selected";
    }

    const lowerContent = document.getElementById("lowerContent")!;
    lowerContent.replaceChildren();
    
    movies.forEach(movie => {
        if(movie.poster_path != null){

            const lowerCard = document.createElement('div');
            lowerCard.classList.add("lower__card");
    
            const lowerImage = document.createElement('img');
            lowerImage.classList.add("lower__image");
            lowerImage.setAttribute('src','https://image.tmdb.org/t/p/w1280/'+movie.poster_path);
    
            const lowerTitle = document.createElement("H5");
            lowerTitle.classList.add("lower__title");
            lowerTitle.innerText = movie.title;
    
            lowerCard.appendChild(lowerImage);
            lowerCard.appendChild(lowerTitle);
            lowerContent.appendChild(lowerCard);
        }
    });
    return selected;
}



getFilteredMovies("sort_by=release_date.desc","btn1");
        
