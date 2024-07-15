// import express from "express";
// import axios from "axios";
// import bodyParser from "body-parser";

// const app = express();
// const port = 3000;
const api_key = "0e4a5f9c3b67e4da0c08f721ad5ec173";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = " ";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movie_element = document.createElement("div");
    movie_element.classList.add("movie");
    movie_element.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getVoteColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;
    main.appendChild(movie_element);
  });
}

function getVoteColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm != " ") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(API_URL);
//     const result = response.data.results;
//     console.log(result);
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Error fetching data" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
