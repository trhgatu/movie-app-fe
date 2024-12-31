import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const MobileHeader = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
}) => {
    return (
        <>
            <div className="lg:hidden container mx-auto flex justify-between items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-2xl text-white"
                >
                    {isMobileMenuOpen ? 'X' : '☰'}
                </button>
                <div className="text-2xl font-bold flex-1 text-center lg:flex-shrink-0 lg:text-left">
                    <Link to="/" className="text-white">
                        MovieS
                    </Link>
                </div>

                {/* Search Icon on the Right for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="text-white text-2xl"
                    >
                        <AiOutlineSearch />
                    </button>
                </div>
            </div>

            <nav
                className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} space-y-4 bg-black p-4`}
            >
                <Link to="/" className="text-white hover:text-red-500">
                    Home
                </Link>
                <Link to="/movies/new" className="text-white hover:text-red-500">
                    Phim mới
                </Link>
                <Link to="/movies/series" className="text-white hover:text-red-500">
                    Phim bộ
                </Link>
                <Link to="/movies/single" className="text-white hover:text-red-500">
                    Phim lẻ
                </Link>
                <Link to="/about" className="text-white hover:text-red-500">
                    About
                </Link>
            </nav>
            {isSearchOpen && (
                <form
                    onSubmit={handleSearch}
                    className="lg:hidden absolute top-16 left-0 right-0 bg-white p-4 shadow-lg"
                >
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="px-4 py-2 rounded-full border-2 border-gray-300 w-full"
                        placeholder="Tìm phim..."
                    />
                    <button
                        type="submit"
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full"
                    >
                        <AiOutlineSearch />
                    </button>
                </form>
            )}
        </>
    );
};

export default MobileHeader;
