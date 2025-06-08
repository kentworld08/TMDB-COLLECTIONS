const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : `/no-movie.png`
          }
          className="w-[300px] h-full"
        />
        <div className="mt-4" />
        <h3 className=" text-wrap max-w-[200px] text-left">{movie.title} </h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="./src/assets/star.svg" alt="Star Icon" />
          <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <span>.</span>
        <p className="lang">{movie.original_language}</p>
        <span>.</span>
        <p className="year">{movie.release_date?.split("-")[0] || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
