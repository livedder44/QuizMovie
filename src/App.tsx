import './App.scss';
import List from "./components/List";
import ButtonContinue from "./components/Button";
import BackButton from "./components/BackButton";
import BurgerMenu from "./components/BurgerMenu";
import MovieSearch from "./components/InputMovie";
import MovieResults from "./components/MovieResults";
import ProgressBar from "./components/Progress-bar";

import { useState } from 'react';

const API_KEY = "384d4c8a";

function App() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [genre, setGenre] = useState<string>(''); 
  const [query, setQuery] = useState<string>(''); 
  const [movies, setMovies] = useState<any[]>([]);
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleValidationChange = (isValid: boolean) => {
    setInputValid(isValid);
  };

  const fetchMovies = async () => {
    if (!query.trim()) {
      setInputValid(false);
      return;
    }

    try {
      const searchRes = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const searchData = await searchRes.json();

      if (searchData.Response !== "True") {
        setMovies([]);
        setInputValid(false);
        setCurrentIndex(currentIndex + 1);
        return;
      }

      const detailedMovies = await Promise.all(
        searchData.Search.map(async (movie: any) => {
          const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
          return await detailRes.json();
        })
      );

      const filtered = detailedMovies.filter(
        (movie) =>
          movie.Response === "True" &&
          movie.Title.toLowerCase().includes(query.trim().toLowerCase()) &&
          movie.Genre.toLowerCase().includes(genre.toLowerCase())
      );

      setMovies(filtered);
      setInputValid(true);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      setMovies([]);
      setInputValid(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleContinue = () => {
    if (currentIndex === 0) {
      if (selectedOption) {
        setGenre(selectedOption);
        setCurrentIndex(currentIndex + 1);
      }
      return;
    }

    if (currentIndex === 1) {
      if (query.trim()) {
        fetchMovies();
      } else {
        setInputValid(false);
      }
      return;
    }

    if (currentIndex === 2) {
      setSelectedOption('');
      setGenre('');
      setQuery('');
      setMovies([]);
      setInputValid(false);
      setCurrentIndex(0);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = Math.round((currentIndex + 1) / 3 * 100);

  const isButtonDisabled =
    (currentIndex === 0 && selectedOption === '') ||
    (currentIndex === 1 && !inputValid);

  const components = [
    <List
      selectedOption={selectedOption}
      handleChange={(label) => setSelectedOption(prev => prev === label ? '' : label)}
    />,
    <MovieSearch
      query={query}
      setQuery={setQuery}
      onValidationChange={handleValidationChange}
      onSearch={fetchMovies}
    />,
    <MovieResults movies={movies} />,
  ];

  return (
    <>
      <div className='nav-bg'>
      <nav className="navigation">
        <div className="nav-container">
          <BackButton onClick={handleBack} />
          <div className="burger-container">
            <span>{progress}%</span>
            <BurgerMenu />
          </div>
        </div>
        <ProgressBar progress={progress} />
        </nav>
        </div>

      {components[currentIndex]}

      <div className="buttons-container">
        <ButtonContinue
          onClick={handleContinue}
          disabled={isButtonDisabled}
          label={currentIndex === 2 ? "Complete" : "Continue"}
        />
      </div>
    </>
  );
}

export default App;
