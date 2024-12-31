import React, { useRef } from 'react';
import MovieSlider from '../HomePage/components/MovieSlider';
import NowShowing from './components/NowShowing';
import Banner from './components/Banner';
import { cn } from '@/lib/utils';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
const HomePage = () => {
  const movieSliderRef = useRef(null);

  return (
    <div>
      <Banner movieSliderRef={movieSliderRef} />
      <MovieSlider ref={movieSliderRef} />
      <NowShowing />
      <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.6}
          duration={8}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
    </div>
  );
};

export default HomePage;
