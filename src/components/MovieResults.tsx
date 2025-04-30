import "./MovieResults.scss";

type MovieResultsProps = {
  movies: any[];
};

function MovieResults({ movies }: MovieResultsProps) {
  if (!movies.length) {
    return (
      <div className="no-results">
        <div>🤦‍♀️</div>
        <h2>Oops, no movie found</h2>
      </div>
    );
  }

  return (
    <div className="movie-results">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-card">
          <img src={movie.Poster} alt={movie.Title} />
          <h1>{movie.Title}</h1>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieResults;
