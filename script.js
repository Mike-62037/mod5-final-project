const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const resultsInfo = document.querySelector("#resultsInfo");
const sortSelect = document.querySelector("#sortSelect");
const moviesGrid = document.querySelector("#moviesGrid");

let currentMovies = [];

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  if (search) {
    fetchMovies(search);
  }
});

async function fetchMovies(search) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=c360917&s=${search}`);
  const data = await res.json();

  if (data.Repsonse === "True") {
    currentMovies = data.Search;
    resultsInfo.textContent = `Showing: ${search}`;
    sortSelect.value = 'default';
    displayMovies(currentMovies);
  }
  else {
    resultsInfo.textContent = `Showing: ${search}`;
    moviesGrid.innerHTML = '<p>No Movies Found.</p>';
    currentMovies = [];
  }
}

function displayMovie(movies) {
  const movieResults = movies.map((movie) => {

      return `<div class="movie-card">
          <img
            class="movie-card__img"
            src="${movie.poster}"
            alt="${movie.Title}"
          />
          <h2 class="movie-card__title">${movie.title}</h2>
          <p class="movie-card__year">${movie.year}</p>
        </div>`;
    })
    .join("");

    moviesGrid.innerHTML = movieResults;
}
