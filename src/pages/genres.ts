import { Movie } from "../models/movie.model";
import { genreMovieList } from "../models/movielist.model";
import { api } from "./fetchFromApi";
import { lazyLoading } from "../utils/lazyLoading";

export enum direction {
  right = window.innerWidth * 0.8,
  left = -window.innerWidth * 0.8,
}

export enum MoviegenreIds {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  Science_Fiction = 878,
  TV_Movie = 10770,
  Thriller = 53,
  War = 10752,
  Western = 37,
}

export class GetByGenre {
  async getMoviesByGenre(genreId: MoviegenreIds) {
    this.addSkeleton(genreId);

    const data = await api("discover/movie", `with_genres=${genreId}`);
    const movies: Movie[] = data.results.filter(
      (movie: Movie) => movie.backdrop_path
    );

    const CarouselContainers: NodeListOf<HTMLImageElement> =
      document.querySelectorAll("#CarouselContainer" + genreId);
    const CarouselImages: NodeListOf<HTMLImageElement> =
      document.querySelectorAll("#CarouselImage" + genreId);
    const CarouselTitles: NodeListOf<HTMLImageElement> =
      document.querySelectorAll("#CarouselTitle" + genreId);

    CarouselContainers.forEach((container, index) => {
      if (movies[index]) {
        CarouselImages[index].setAttribute(
          "data-src",
          "https://image.tmdb.org/t/p/w780/" + movies[index].backdrop_path
        );
        CarouselTitles[index].innerText = movies[index].title;
        lazyLoading.observe(CarouselImages[index]);
        CarouselImages[index].onload = () =>
          CarouselImages[index].setAttribute("class", "carousel_image");
      } else {
        container.remove();
      }
    });
  }

  private addSkeleton(genreId: MoviegenreIds) {
    const carouselSection = document.getElementById("carouselSection")!;
    const genreHtmlTemplate = `
            <article class="carousel">
                <H2 class="carousel__title">${MoviegenreIds[genreId]}</H2>
                <div class="carousel__image_group" id="${
                  "imageGroup" + genreId
                }">
                    <div class="carousel__image_strip" id="carouselImageStrip${genreId}"></div>
                    <div class="Navigation_container__next" id="carouselNext${genreId}">
                        <svg  class="carousel__next" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                    <div class="Navigation_container__last" id="carouselLast${genreId}">
                        <svg  class="carousel__last" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z"/>
                        </svg>
                    </div>
                </div>
            </article>
        `;

    carouselSection.insertAdjacentHTML("beforeend", genreHtmlTemplate);
    const imageGroup = document.getElementById("carouselImageStrip" + genreId)!;
    for (let index = 0; index < 20; index++) {
      const imgTemplate = `
                <div class="carousel_image_container" id="CarouselContainer${genreId}">
                    <img class="carousel_image skeleton" id="CarouselImage${genreId}" >
                    <H6 class="carousel_image__title" id="CarouselTitle${genreId}">Productions</H6>
                </div>

            `;
      imageGroup.insertAdjacentHTML("beforeend", imgTemplate);
    }

    let arrowLast = document.getElementById("carouselLast" + genreId)!;
    arrowLast.addEventListener("click", () =>
      this.NavigateGenre(genreId, direction.left)
    );

    let arrowNext = document.getElementById("carouselNext" + genreId)!;
    arrowNext.addEventListener("click", () =>
      this.NavigateGenre(genreId, direction.right)
    );
  }

  public NavigateGenre(genreId: MoviegenreIds, dir: direction) {
    const carouselImageGroup = document.getElementById(
      "carouselImageStrip" + genreId
    )!;

    const limit =
      carouselImageGroup.scrollLeft +
      carouselImageGroup.offsetWidth * Math.sign(dir);
    scroll(genreId, dir);
    function scroll(genreId: MoviegenreIds, dir: direction) {
      carouselImageGroup.scrollBy(30 * Math.sign(dir), 0); // horizontal and vertical scroll increments
      if (
        direction[dir] == "right" &&
        carouselImageGroup.scrollLeft <= limit &&
        carouselImageGroup.scrollLeft <
          carouselImageGroup.scrollWidth - carouselImageGroup.offsetWidth
      ) {
        setTimeout(() => scroll(genreId, dir), 5);
      } else if (
        direction[dir] == "left" &&
        carouselImageGroup.scrollLeft >= limit &&
        carouselImageGroup.scrollLeft != 0
      ) {
        setTimeout(() => scroll(genreId, dir), 5);
      }
    }
  }
}
