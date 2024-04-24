import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    try {
      let params = {
        api_key: "134b6d4d024a1c4f9222afd5226ec420",
        language: "en-US",
        include_adult: false,
        include_video: false,
        page: currentPage,
        with_genres: selectedGenre,
        query: searchQuery,
        with_genres: selectedGenre,
      };

      if (searchQuery) {
        const searchResponse = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              ...params,
              query: searchQuery,
            },
          }
        );
        setMovies(searchResponse.data.results);
      } else {
        const discoverResponse = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: params,
          }
        );
        setMovies(discoverResponse.data.results);
        setTotalPages(discoverResponse.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [searchQuery, selectedGenre, currentPage]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearchClick = () => {
    fetchMovies();
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-lg container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
      <div className="mb-4">
        <label htmlFor="search">Search by title: </label>
        <input
          className="border border-gray-300 rounded px-2 py-1"
          type="text"
          placeholder="Search by title..."
          id="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="" onClick={handleSearchClick}>
          &nbsp;Search
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="genre">Filter by genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            className="mb-4 flex items-center w-max-[200] h-max-[100]"
            key={movie.id}
          >
            <Link
              className="flex flex-col items-center space-y-2 border border-gray-300 py-10 px-2 mx-8 my-8  rounded hover:border-red-400 hover:shadow-md bg-gray-800"
              to={`/movie/${movie.id}`}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-h-[100] max-w-[200] rounded-lg"
                />
              )}
              <div className="text-center text-white px-10">
                <span className="line-clamp-2">{movie.title},</span>
                <span className="text-white text-sm line-clamp-2">
                  ({movie.release_date.split("-")[0]})
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        {currentPage > 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => goToPage(currentPage + 1)}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
