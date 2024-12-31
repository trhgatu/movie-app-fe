import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { fetchNowShowingMovies } from '../../../services/movieService';

import { ClipLoader } from 'react-spinners';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NowShowing = () => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['nowShowingMovies'],
    queryFn: () => fetchNowShowingMovies(1),
  });

  if (error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50">
        <span className="text-white text-2xl">Có lỗi xảy ra khi tải dữ liệu</span>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 sm:px-8 md:px-16 lg:px-20 py-5">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
        Phim đang chiếu
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center mb-6">
          <ClipLoader size={50} color="#3498db" />
        </div>
      )}

      {!isLoading && (
        <Swiper
          className="w-full h-full"
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.slug}>
              <Link to={`/movie/${movie.slug}`} className="group relative">
                <div
                  className="w-full h-72 sm:h-80 md:h-96 lg:h-72 shadow-lg bg-center bg-cover rounded-md overflow-hidden transform group-hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${movie.thumb_url || '/path/to/placeholder-thumbnail.jpg'})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-semibold line-clamp-1">{movie.name}</h3>
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
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiFillPlayCircle size={50} className="hover:text-red-600 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default NowShowing;
