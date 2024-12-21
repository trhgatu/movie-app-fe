// src/pages/HomePage.jsx
import React from 'react';
import MovieSlider from '../HomePage/components/MovieSlider';
import MovieList from './components/MovieList';
import NowShowing from './components/NowShowing';
const HomePage = () => {
  return (
    <div className="pt-24">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-4">
        Chào Mừng Đến Với T-Movies
      </h1>
      <p className="text-lg text-center text-gray-700">
        Khám Phá Những Bộ Phim Mới Nhất Và Hay Nhất.
      </p>
      <MovieSlider />
      <MovieList/>
      <NowShowing/>
    </div>
  );
};

export default HomePage;