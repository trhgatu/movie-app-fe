
import React from 'react';
import MovieSlider from '../HomePage/components/MovieSlider';
import NowShowing from './components/NowShowing';
const HomePage = () => {
  return (
    <div className='pt-10'>
      <h1 className="text-4xl font-bold text-center text-red-600 mb-4">
        Chào Mừng Đến Với Movie-App
      </h1>
      <p className="text-lg text-center text-gray-700">
        Khám phá những bộ phim mới nhất và hay nhất !
      </p>
      <MovieSlider />
      <NowShowing/>
    </div>
  );
};

export default HomePage;
