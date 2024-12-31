import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { fetchActionMovies } from '../../../services/movieService';
import { ClipLoader } from 'react-spinners';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const MovieSlider = React.forwardRef((props, ref) => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['actionMovies'],
    queryFn: fetchActionMovies,
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );

  if (error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50">
        <span className="text-white text-2xl">Có lỗi xảy ra khi tải dữ liệu</span>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full px-4 md:px-20 py-5">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
        Phim mới
      </h2>
      <Swiper
        className="w-full h-full"
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
        spaceBetween={20}
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
            <Link to={`/movie/${movie.slug}`}>
              <div
                className="relative bg-center w-full h-80 bg-cover shadow-lg rounded-md overflow-hidden group"
                style={{
                  backgroundImage: `url(${movie.thumb_url || '/path/to/placeholder-thumbnail.jpg'})`,
                }}
              >
                {movie.language && (
                  <span className="absolute top-2 z-10 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {movie.language.toUpperCase()}
                  </span>
                )}
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 cursor-pointer transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full py-4 px-6 z-10">
                  <h2 className="text-xl line-clamp-1 font-semibold text-white group-hover:text-red-600 transition-colors duration-300">
                    {movie.name}
                  </h2>
                  <p className="text-sm text-gray-200 line-clamp-2">{movie.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default MovieSlider;
