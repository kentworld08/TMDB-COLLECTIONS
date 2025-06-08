import { useState } from "react";
import searchIcon from "/movie-app/src/assets/search.svg";
import MovieList from "./MovieList";
import TrendingMovies from "./TrendingMovies";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="search">
        <div>
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            className="input"
            value={searchTerm}
            name="search"
            placeholder="Search through thousands of movies"
            autoFocus
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm ? (
            <div
              className="h-5 w-5 text-gray-200 rounded-full cursor-pointer bg-transparent"
              onClick={() => setSearchTerm("")}
            >
              X
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-4" />
      <TrendingMovies />
      <div className="mt-4" />
      <section className="all-movies">
        <h2 className="text-left">All Movies</h2>
        <MovieList searchTerm={searchTerm} />
      </section>
    </>
  );
};

export default Search;
