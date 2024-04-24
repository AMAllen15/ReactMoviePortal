import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MovieDetails from "./components/movieDetails";
import MovieList from "./components/movieList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movies" element={<MovieList />} />
      </Routes>
    </Router>
  );
}

export default App;
