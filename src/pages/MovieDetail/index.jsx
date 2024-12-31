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
    if (movie && movie.episodes && movie.episodes[0].items.length > 0) {
      const firstEpisode = movie.episodes[0].items[0];
      navigate(`/watch/${slug}/${firstEpisode.slug}`);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  if (error) {
    return <span className="text-white">Lỗi khi tải thông tin phim</span>;
  }

  return (
    <div className="min-h-screen text-white bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-96 object-cover"
              src={movie.poster_url}
              alt={movie.name}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleWatchClick}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
              >
                Xem Phim
              </button>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">{movie.name}</h2>
            <p className="text-lg">{movie.description}</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Thông Tin Phim</h3>
              <ul className="list-disc pl-6 mt-4 text-lg">
                <li><strong>Thời gian mỗi tập:</strong> {movie.time}</li>
                <li><strong>Chất lượng:</strong> {movie.quality}</li>
                <li><strong>Ngôn ngữ:</strong> {movie.language}</li>
                <li><strong>Đạo diễn:</strong> {movie.director}</li>
                <li><strong>Dàn diễn viên:</strong> {movie.casts}</li>
                <li><strong>Thể loại:</strong> {movie.category['2'].list.map(c => c.name).join(', ')}</li>
                <li><strong>Năm sản xuất:</strong> {movie.category['3'].list[0].name}</li>
                <li><strong>Quốc gia:</strong> {movie.category['4'].list[0].name}</li>
              </ul>
            </div>

            {/* Các tập phim */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Các Tập Phim</h3>
              <ul className="list-none pl-0 mt-4">
                {movie.episodes[0].items.map((episode) => (
                  <li key={episode.slug} className="py-2">
                    <button
                      onClick={() => navigate(`/watch/${slug}/${episode.slug}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Tập {episode.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
