import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../../services/movieService';
import NextEpisodeButton from './components/NextEspisodeButton';

const WatchMoviePage = () => {
  const { slug, episodeSlug } = useParams();
  const navigate = useNavigate();
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetail', slug],
    queryFn: () => fetchMovieDetail(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if(movie && movie.episodes && movie.episodes[0].items.length > 0) {
      const episodeToPlay = episodeSlug
        ? movie.episodes[0].items.find((ep) => ep.slug === episodeSlug)
        : movie.episodes[0].items[0];
      setCurrentEpisode(episodeToPlay);
    }
  }, [movie, episodeSlug]);

  const handleWatchClick = (episode) => {
    setCurrentEpisode(episode);
    navigate(`/watch/${slug}/${episode.slug}`);
  };

  const handleNextEpisode = () => {
    if(movie && currentEpisode) {
      const currentIndex = movie.episodes[0].items.findIndex(
        (episode) => episode.slug === currentEpisode.slug
      );
      const nextEpisode = movie.episodes[0].items[currentIndex + 1];
      if(nextEpisode) {
        setCurrentEpisode(nextEpisode);
        navigate(`/watch/${slug}/${nextEpisode.slug}`);
      } else {
        alert('Đây là tập cuối.');
      }
    }
  };

  if(isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  if(isError) return <div className="text-center text-lg text-red-600">{error.message || 'Có lỗi xảy ra khi tải dữ liệu'}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">

          {/* Video Player Section */}
          {currentEpisode && (
            <div className="mt-6 bg-black p-4 rounded-lg shadow-xl">
              <h2 className="text-3xl font-semibold text-white mb-4">Đang xem: Tập {currentEpisode.name}</h2>
              <div className="mt-4 relative">
                <iframe
                  width="100%"
                  height="500"
                  src={currentEpisode.embed}
                  frameBorder="0"
                  allowFullScreen
                  title={`Tập ${currentEpisode.name}`}
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          )}

          {/* Episode List */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">Các Tập Phim</h3>
            <ul className="flex flex-wrap gap-4">
              {movie.episodes[0].items.map((episode) => (
                <li
                  key={episode.slug}
                  className={`p-4 border-2 border-transparent rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-500 ${
                    currentEpisode && currentEpisode.slug === episode.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => handleWatchClick(episode)}
                >
                  Tập {episode.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Episode Button */}
          <NextEpisodeButton onNext={handleNextEpisode} />
        </div>
      </div>
    </div>
  );
};

export default WatchMoviePage;
