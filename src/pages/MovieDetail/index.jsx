import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../../services/movieService';
import { ClipLoader } from 'react-spinners';

const MovieDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movieDetail', slug],
    queryFn: () => fetchMovieDetail(slug),
    enabled: !!slug,
  });

  const handleWatchClick = () => {
    navigate(`/watch/${slug}`);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  if (error) {
    return <span className="text-white">Error loading movie details</span>;
  }

  return (
    <div className="min-h-screen text-white py-24">
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Movie Poster */}
          <div className="relative">
            <img
              className="w-full h-96 object-cover"
              src={movie.poster_url}
              alt={movie.name}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            {/* Move the Watch button inside the thumbnail (overlay) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleWatchClick}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
              >
                Xem Phim
              </button>
            </div>
          </div>

          {/* Movie Description */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Mô Tả</h2>
            <p className="mt-4 text-lg">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
