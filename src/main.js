const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key':APIKEY
    },
});

// Used in hero
let movieList = [];
async function Navigatemovies(id){
    const nextid = parseInt(id.slice(5,6));
    populateimg(nextid);
}

async function getUpcomingMovies(selection){
    // Selection == 1 desktop
    // Selection == 2 tablet    
    // Selection == 3 mobile
    movieList = [];
    const {data} = await api(`movie/upcoming`);
    const movies = data.results.slice(0,5);
    
    const dotContainer = document.getElementById("dotContainer");
    movies.forEach((movie,index) => {
        if(movie.poster_path != null){
            movieList.push([movie.title,movie.backdrop_path]);
        }
    });
    populateimg(0,selection);

    return movieList;
}

function populateimg(middle){
    const limitContainer = document.getElementById("limitContainer");
    limitContainer.innerHTML = "";
    const dotContainer = document.createElement("div");
    dotContainer.classList.add("dot-container");
    dotContainer.setAttribute("id","dotContainer");
    limitContainer.appendChild(dotContainer);
    for(let i = 0;i<movieList.length;i++){
        const dot = document.createElement("div");
        dot.classList.add("dot-container__dot");
        dot.setAttribute("id","dotss"+i);
        dot.setAttribute("onclick",`Navigatemovies(this.id)`)
        dotContainer.appendChild(dot);
    }

    for(let i = middle-1;i<=(middle+1);i++){
        const img = document.createElement("img");
        if(i==middle){
            const dot = document.getElementById("dotss"+i);
            dot.className = "dot-container__dot--selected"

            img.classList.add("hero__image--center");

        }else{
            img.classList.add("hero__image");
        }
        if(i<0){
            img.setAttribute("src",'https://image.tmdb.org/t/p/original/'+movieList[movieList.length + i][1]);
            img.setAttribute("alt", movieList[movieList.length + i][0] + ' poster image');
            img.setAttribute("id", "image" + (movieList.length + i));
            img.setAttribute("onclick","Navigatemovies(this.id)")
        }else if(i==middle){
            img.setAttribute("src",'https://image.tmdb.org/t/p/original/'+movieList[i][1]);
            img.setAttribute("alt", movieList[i][0] + ' poster image');
            img.setAttribute("id", "image" + (i));
        }else if(i>movieList.length-1){
            img.setAttribute("src",'https://image.tmdb.org/t/p/original/'+movieList[i-movieList.length][1]);
            img.setAttribute("alt", movieList[i-movieList.length][0] + ' poster image');
            img.setAttribute("id", "image" + (i-movieList.length));
            img.setAttribute("onclick","Navigatemovies(this.id)")
        }else{
            img.setAttribute("src",'https://image.tmdb.org/t/p/original/'+movieList[i][1]);
            img.setAttribute("alt", movieList[i][0] + ' poster image');
            img.setAttribute("id", "image" + (i));
            img.setAttribute("onclick","Navigatemovies(this.id)")
        }
        limitContainer.appendChild(img);
    }
}

// Used in "top" section (asside)
async function getTrendingMoviesPreview(){
    const {data} = await api(`movie/top_rated`);
    const movies = data.results.slice(0,5);
    const assideTop = document.getElementById("aside_top");
    assideTop.innerHTML = "";

    const topTitle = document.createElement('H3');
    topTitle.classList.add('top__title');
    topTitle.innerText = "Top";

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card_container');

    movies.forEach(movie => {

        const Card = document.createElement('div');
        Card.classList.add('Card')

        const img= document.createElement('img');
        img.classList.add('Card__img');
        img.setAttribute('alt',movie.title + ' poster image');
        img.setAttribute('src','https://image.tmdb.org/t/p/w300/'+movie.poster_path);

        const cardTextContainer =  document.createElement('div');
        cardTextContainer.classList.add('Card__text_container');

        const H6 =  document.createElement('H6');
        H6.classList.add('Card__title');
        H6.innerText = movie.title;

        const cardSubtitleContainer =  document.createElement('div');
        cardSubtitleContainer.classList.add('Card__subtitle_container');

        const text1=  document.createElement('p');
        text1.classList.add("font-style-subtitle-1");
        text1.innerText = movie.vote_average + "/10";

        const text3=  document.createElement('p');
        text3.classList.add("font-style-subtitle-1");
        text3.innerText = movie.release_date.slice(0,4);


        cardSubtitleContainer.appendChild(text1);
        cardSubtitleContainer.appendChild(text3);
        cardTextContainer.appendChild(cardSubtitleContainer);
        cardTextContainer.appendChild(H6);
        Card.appendChild(img);
        Card.appendChild(cardTextContainer);
        cardContainer.appendChild(Card);
        // assideTop.appendChild(Card);
    });
    assideTop.appendChild(cardContainer);
    assideTop.prepend(topTitle);
}

//used in genres sections(main) 


let genreList = {};

function NavigateGenre(genreId,dir){
    if(dir=="right"){
        const carouselImageGroup = document.getElementById("carouselImageStrip"+genreId);
        carouselImageGroup.scrollLeft += 330;
    }else{
        const carouselImageGroup = document.getElementById("carouselImageStrip"+genreId);
        carouselImageGroup.scrollLeft -= 330;
    }
}

async function getMoviesByGenre(genreId,elementId){
    const {data} = await api(`discover/movie?with_genres=${genreId}`);
    const movies = data.results.slice(0,10);
    let list = [];
    movies.forEach(movie => {
        list.push(movie.backdrop_path)
    });
    genreList[genreId] = list;

    const imageGroup = document.getElementById(elementId);
    const div = document.createElement("div");
    div.classList.add("carousel__image_strip");
    
    genreList[genreId].forEach((item) =>{
        div.setAttribute("id","carouselImageStrip"+genreId);
        const img = document.createElement('img');
        img.classList.add('carousel_image');
        img.setAttribute('src','https://image.tmdb.org/t/p/w1280/'+item);
        div.appendChild(img);
    });
    
    imageGroup.prepend(div);
    return genreList;
}

// used in lower section

let selected = "btn1"
async function getFilteredMovies(argument,id){
    const {data} = await api(`discover/movie?${argument}`);
    const movies = data.results;
    
    if(selected!=id){
        const lastSelected = document.getElementById(selected);
        const newSelected = document.getElementById(id);
        selected = id;
        lastSelected.className = "lower__button";
        newSelected.className = "lower__button--selected";
    }

    const lowerContent = document.getElementById("lowerContent");
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

var desktop = window.matchMedia("(min-width: 1150px)")
var tablet = window.matchMedia("(min-width: 768px)")
var mobile =  window.matchMedia("(min-width: 375px)")

function listener() {
    if (desktop.matches) { // If media query matches
        console.log("desktop");
        getUpcomingMovies();
        getTrendingMoviesPreview();
        getMoviesByGenre(27,"imageGroup1");
        getMoviesByGenre(35,"imageGroup2");
        getMoviesByGenre(28,"imageGroup3");
        getFilteredMovies("sort_by=release_date.desc","btn1");
    } else if (tablet.matches){
        console.log("tablet");
        getUpcomingMovies();
        getTrendingMoviesPreview();
        getMoviesByGenre(27,"imageGroup1");
        getMoviesByGenre(35,"imageGroup2");
        getMoviesByGenre(28,"imageGroup3");
        getFilteredMovies("sort_by=release_date.desc","btn1");
    } else if(mobile.matches){
        console.log("mobile");
        getUpcomingMovies();
        getMoviesByGenre(27,"imageGroup1");
        getMoviesByGenre(35,"imageGroup2");
        getMoviesByGenre(28,"imageGroup3");
        getFilteredMovies("sort_by=release_date.desc","btn1");
    }
  }
listener() // Call listener function at run time
desktop.addEventListener("change",()=>{
    listener();
});
tablet.addEventListener("change",()=>{
    listener();
});

