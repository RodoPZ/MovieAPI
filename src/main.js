async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + APIKEY);
    const data = await res.json();
    const movies = data.results.slice(0,5);
    movies.forEach(movie => {
        const assideTop = document.getElementById("aside_top");
        
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
        assideTop.appendChild(Card);
    });
}
async function getMoviesByGenre(genreId,limit,elementId){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${APIKEY}`);
    const data = await res.json();
    const movies = data.results.slice(0,limit);
    movies.forEach(movie => {
        const imageGroup = document.getElementById(elementId);
        const img = document.createElement('img');
        img.classList.add('carousel_image');
        img.setAttribute('src','https://image.tmdb.org/t/p/w1280/'+movie.backdrop_path);

        imageGroup.prepend(img);

/* <img class="carousel_image" src="./images/img/poster_backdrops.png" alt="movie backdrop"> */
    });
}

getTrendingMoviesPreview();
getMoviesByGenre(27,4,"imageGroup1");
getMoviesByGenre(35,4,"imageGroup2");
getMoviesByGenre(28,4,"imageGroup3");


getComedicMovies();
getActionMovies();