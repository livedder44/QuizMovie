import { useState } from "react";
import "./InputMovie.scss";

type MovieSearchProps = {
  query: string;
  setQuery: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
  onSearch: () => void;
};

function MovieSearch({ query, setQuery, onValidationChange, onSearch }: MovieSearchProps) {
  const [showError, setShowError] = useState(false);

  const hasLetters = (value: string) => /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "" || !hasLetters(value)) {
      setShowError(false); 
      onValidationChange(false);
    } else {
      setShowError(false);
      onValidationChange(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim() === "" || !hasLetters(query)) {
        setShowError(true); 
        onValidationChange(false); 
        return;
      }
      setShowError(false);
      onValidationChange(true);
      onSearch();
    }
  };

  return (
    <div className="movie-search">
      <h2>Enter movie title</h2>
      <input
        className={`movie-search-input ${showError ? "error" : ""}`}
        type="text"
        placeholder="Movie title here"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
        <p className={`error-text ${showError ? 'visible' : ''}`}>
          Error text
        </p>

    </div>
  );
}

export default MovieSearch;
