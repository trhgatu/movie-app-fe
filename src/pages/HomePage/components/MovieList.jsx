import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchNewMovies } from '../../../services/movieService';
const MovieList = () => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['newMovies'],
    queryFn: () => fetchNewMovies(1),
  });

  const firstMovie = movies ? movies[0] : null;
  const otherMovies = movies ? movies.slice(1, 7) : [];

  if(isLoading) {
    return (
      <div className="flex justify-center items-center bg-black opacity-50">
        <span className="text-white text-2xl">Loading...</span>
      </div>
    );
  }

  if(error) {
    return <span className="text-white">Error loading movies</span>;
  }

  return (
    <div className="bg-black py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Phim mới cập nhật</h2>
      <div className='px-20'>
        <div className="flex justify-between gap-8">
          {firstMovie && (
            <a
              href={`/movie/${firstMovie.slug}`}
              className="relative w-1/2 block  shadow-lg rounded-md overflow-hidden h-[510px] group"
              style={{ backgroundImage: `url(${firstMovie.poster_url || '/path/to/placeholder-thumbnail.jpg'})` }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-6xl" />
              </div>
              <div className="absolute bottom-0 w-full text-white">
                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
                  <h3 className="text-2xl font-semibold line-clamp-2">{firstMovie.name}</h3>
                  <p className="text-sm">
                    {firstMovie.description ? firstMovie.description.slice(0, 80) : 'Không có mô tả...'}
                  </p>
                </div>
              </div>
            </a>
          )}
          <div className="w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMovies.map((movie) => (
                <a
                  key={movie.slug}
                  href={`/movie/${movie.slug}`}
                  className="relative block bg-cover bg-center shadow-lg rounded-md overflow-hidden h-60 group"
                  style={{ backgroundImage: `url(${movie.thumb_url || '/path/to/placeholder-thumbnail.jpg'})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500 transition-opacity">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                  <div className="absolute bottom-0 w-full text-white">
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-4 py-2">
                      <h3 className="font-semibold line-clamp-2">{movie.name}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 text-center py-4 mt-6">
        <Link to='/movies/new'
         className='px-8 uppercase py-4 bg-red-600 hover:bg-black hover:text-red-600 border-2 border-red-600 transition-all duration-300 text-white'>
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default MovieList;
