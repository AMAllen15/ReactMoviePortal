import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  console.log("Movie ID:", id);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "134b6d4d024a1c4f9222afd5226ec420",
              language: "en-US",
              append_to_response: "credits", // Include credits data
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-400 min-h-screen text-center">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">
          {movie.title} ({movie.release_date.split("-")[0]})
        </h2>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            className="mx-auto mb-4 items-center"
          />
        )}
        <p className="mb-4">{movie.overview}</p>
        <h3 className="text-xl font-bold mb-2">Cast:</h3>
        <ul className="mb-4">
          {movie.credits.cast.slice(0, 5).map((cast) => (
            <li key={cast.id}>{cast.name}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-2">Average Rating:</h3>
        <p>{movie.vote_average}</p>
        <Link
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          to="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
