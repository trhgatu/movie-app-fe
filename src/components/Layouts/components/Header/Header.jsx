import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 z-10 ${
        isScrolled ? 'bg-black' : 'transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className={`${isScrolled ? 'text-white' : 'text-black'}`}>TMovies</Link>
        </div>

        {/* NavBar */}
        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            Movies
          </Link>
          <Link
            to="/about"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            About
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            className="px-4 py-2 rounded-full border-2 border-gray-300"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
