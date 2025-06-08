import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../appwrite";

const apiKey = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const API_BASE_URL = "https://api.themoviedb.org/3";

const MovieList = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");

  useDebounce(() => setDebouncedValue(searchTerm), 200, [searchTerm]);
  const fetchMovies = (query = "") => {
    setIsLoading(true);
    const debounce = setTimeout(async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };

        const endPoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        const res = await fetch(endPoint, options);

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        if (data.res === "false") {
          setErrorMessage(data.Error || "Failed to fetch movies");
          setMovies([]);

          return;
        }

        setMovies(data.results || []);
        if (query && data.results.length > 0)
          await updateSearchCount(query, data.results[0]);
      } catch (err) {
        console.log(err);
        setErrorMessage(
          data.Error || "Errorfetching movies. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    // cleanUp function
    return () => clearTimeout(debounce);
  };

  useEffect(() => {
    fetchMovies(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div className="flex flex-wrap gap-9">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieList;
