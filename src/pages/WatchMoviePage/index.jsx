import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../../services/movieService';

const WatchMoviePage = () => {
  const { slug } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetail', slug],
    queryFn: () => fetchMovieDetail(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (movie && movie.episodes && movie.episodes[0].items.length > 0) {
      setCurrentEpisode(movie.episodes[0].items[0]);
    }
  }, [movie]);

  const handleWatchClick = (episode) => {
    setCurrentEpisode(episode);
  };

  if (isLoading) return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#3498db" />
      </div>
    );

  if (isError) return <div className="text-center text-lg text-red-600">{error.message || 'Có lỗi xảy ra khi tải dữ liệu'}</div>;

  return (
    <div className="min-h-screen text-white py-24">
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {currentEpisode && (
            <div className="mt-6 bg-black p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-white">Đang xem: Tập {currentEpisode.name}</h2>
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="500"
                  src={currentEpisode.embed}
                  frameBorder="0"
                  allowFullScreen
                  title={`Tập ${currentEpisode.name}`}
                ></iframe>
              </div>
            </div>
          )}

          {/* Episodes List */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Các tập phim</h3>
            <ul className="mt-4 space-y-2">
              {movie.episodes[0].items.map((episode) => (
                <li
                  key={episode.slug}
                  className={`flex justify-between items-center ${currentEpisode && currentEpisode.slug === episode.slug
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-500'
                  }`}
                >
                  <button
                    onClick={() => handleWatchClick(episode)}
                    className="text-lg hover:underline"
                  >
                    Tập {episode.name}
                  </button>
                  <span className="text-sm text-gray-400">{movie.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMoviePage;
