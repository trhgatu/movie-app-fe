import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword(''); // Reset thanh tìm kiếm sau khi tìm
    }
  };

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
            to="/movies/new"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            Phim mới
          </Link>
          <Link
            to="/movies/series"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            Phim bộ
          </Link>
          <Link
            to="/movies/single"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            Phim lẻ
          </Link>
          <Link
            to="/about"
            className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-black'}`}
          >
            About
          </Link>
        </nav>
        <form onSubmit={handleSearch} className="relative">
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
    </header>
  );
};

export default Header;
