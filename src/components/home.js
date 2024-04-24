import React from "react";
import MovieList from "./movieList";

function Home() {
  return (
    <div className="bg-gray-300">
      <div className="mx-auto container text-center">
        <h1 className="text-3xl font-bold">Welcome to the Movie Portal</h1>
        <MovieList />
      </div>
    </div>
  );
}

export default Home;
