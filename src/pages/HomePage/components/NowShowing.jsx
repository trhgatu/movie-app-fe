import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { fetchNowShowingMovies } from '../../../services/movieService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const NowShowing = () => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['nowShowingMovies'],
    queryFn: () => fetchNowShowingMovies(1),
  });

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50">
        <span className="text-white text-2xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50">
        <span className="text-white text-2xl">Có lỗi xảy ra khi tải dữ liệu</span>
      </div>
    );
  }

  return (
    <div className="relative w-full px-20 py-20">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
        Phim Đang Chiếu
      </h2>
      <Swiper
        className="w-full h-full"
        navigation
        loop={true}
        autoplay={{
          delay: 3000
        }}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={5}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.slug}>
            <Link to={`/movie/${movie.slug}`} className="group relative">
              <div
                className="w-full h-72 shadow-lg bg-center bg-cover rounded-md overflow-hidden transform group-hover:scale-105 transition-all duration-300"
                style={{
                  backgroundImage: `url(${movie.thumb_url || '/path/to/placeholder-thumbnail.jpg'})`
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                  {/* Tiêu đề phim */}
                  <h3 className="text-white text-xl font-semibold line-clamp-1">{movie.name}</h3>
                  {/* Thông tin */}
                  <div className="flex items-center mt-2">
                    <span className="text-white text-sm bg-red-600 px-2 py-1 rounded-full">
                      {movie.language}
                    </span>
                    <span className="text-white text-sm ml-2">
                      {movie.quality}
                    </span>
                  </div>
                  {movie.total_episodes && movie.current_episode && (
                    <div className="text-white text-sm mt-2">
                      {movie.current_episode}/{movie.total_episodes}
                    </div>
                  )}
                </div>
                {/* Biểu tượng Play */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <AiFillPlayCircle size={50} className='hover:text-red-600 transition-all duration-300' />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NowShowing;
