import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 z-10 ${
        isScrolled ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className={`${isScrolled ? 'text-white' : 'text-black'}`}>
            MovieS
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-2xl text-black"
        >
          {isMobileMenuOpen ? 'X' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav
          className={`lg:flex space-x-4 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          <Link
            to="/"
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } hover:text-red-500`}
          >
            Home
          </Link>
          <Link
            to="/movies/new"
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } hover:text-red-500`}
          >
            Phim mới
          </Link>
          <Link
            to="/movies/series"
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } hover:text-red-500`}
          >
            Phim bộ
          </Link>
          <Link
            to="/movies/single"
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } hover:text-red-500`}
          >
            Phim lẻ
          </Link>
          <Link
            to="/about"
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } hover:text-red-500`}
          >
            About
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="relative hidden lg:block">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-gray-300"
            placeholder="Search movies..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full"
          >
            Go
          </button>
        </form>
      </div>

      {/* Mobile Search Form */}
      <form
        onSubmit={handleSearch}
        className={`lg:hidden absolute top-16 left-0 right-0 bg-white p-4 shadow-lg ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="px-4 py-2 rounded-full border-2 border-gray-300 w-full"
          placeholder="Search movies..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full"
        >
          Go
        </button>
      </form>
    </header>
  );
};

export default Header;
