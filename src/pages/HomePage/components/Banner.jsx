import React, { useEffect, useState } from "react";
import { fetchNewMovies } from "@/services/movieService";
import Marquee from "@/components/ui/marquee";
import PulsatingButton from "@/components/ui/pulsating-button";


const Banner = ({ movieSliderRef }) => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const loadBannerMovie = async () => {
      try {
        const movies = await fetchNewMovies();
        setMoviesList(movies);
      } catch(error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    loadBannerMovie();
  }, []);

  const handleExploreClick = () => {
    movieSliderRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if(!moviesList.length) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative h-auto dark:bg-[#121212] sm:h-[90vh] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-6 sm:py-0">
      <div className="relative z-10 w-full sm:w-1/2 mb-6 sm:mb-0 sm:p-6 max-w-lg sm:max-w-4xl">
        <h1 className="text-3xl sm:text-5xl dark:text-white font-bold mb-4 sm:mb-6 text-center sm:text-left">
          Chào mừng đến với Movie Station!
        </h1>
        <p className="text-lg dark:text-white mb-4 sm:mb-8 text-center sm:text-left">
          Khám phá bộ sưu tập phim đa dạng với các thể loại hấp dẫn. Trải nghiệm ngay những bộ phim hot nhất và mới nhất tại đây.
        </p>
        <div className="relative justify-center">
          <PulsatingButton onClick={handleExploreClick} className="mx-auto sm:mx-0">
            Khám phá ngay
          </PulsatingButton>
        </div>
      </div>

      <div className="relative z-10 w-full sm:w-1/2 overflow-hidden">
        <Marquee speed={20} direction="left" className="space-x-4">
          {moviesList.map((movie, index) => (
            <img
              key={index}
              src={movie.thumb_url}
              alt={movie.name}
              className="mx-auto object-cover cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
              style={{
                width: "120px",
                height: "180px",
              }}
            />
          ))}
        </Marquee>
        <Marquee speed={20} reverse className="space-x-4">
          {moviesList.map((movie, index) => (
            <img
              key={index}
              src={movie.thumb_url}
              alt={movie.name}
              className="mx-auto object-cover cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
              style={{
                width: "120px",
                height: "180px",
              }}
            />
          ))}
        </Marquee>

      </div>
    </div>
  );
};

export default Banner;
