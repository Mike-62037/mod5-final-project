const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const resultsInfo = document.querySelector("#resultsInfo");
const sortSelect = document.querySelector("#sortSelect");
const moviesGrid = document.querySelector("#moviesGrid");

let currentMovies = [];

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});

async function fetchMovies(search) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=c360917&s=${search}`);
  const data = await res.json();

  if (data.Response === 'True') {
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

function displayMovies(movies) {
  const movieResults = movies.map((movie) => {

      return `<div class="movie-card">
          <img
            class="movie-card__img"
            src="${movie.Poster}"
            alt="${movie.Title}"
          />
          <h2 class="movie-card__title">${movie.Title}</h2>
          <p class="movie-card__year">${movie.Year}</p>
        </div>`;
    })
    .join("");

    moviesGrid.innerHTML = movieResults;
}

sortSelect.addEventListener('change', (e) => {
  sortMovies(e.target.value);
})

function sortMovies(sort) {
  let sortedMovies = [...currentMovies];

  if (sort === 'a-z') {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  }
  else if (sort === 'z-a') {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  else if (sort === 'newest') {
    sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
  }
  else if (sort === 'oldest') {
    sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
  }

  displayMovies(sortedMovies)
}
