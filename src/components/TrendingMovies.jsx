import React, { useEffect, useState } from "react";
import getTrendingMovies from "../appwrite";
import TrendingMovieCard from "./trendingMovieCard";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2 className="text-left">Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <TrendingMovieCard key={movie.$id} index={index} movie={movie} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default TrendingMovies;
