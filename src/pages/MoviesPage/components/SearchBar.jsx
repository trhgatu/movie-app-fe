import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchMovies } from '../../../services/movieService';

const SearchBar = ({ onSearchResults }) => {
    const [keyword, setKeyword] = useState('');
    const [searching, setSearching] = useState(false);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const movies = await fetchSearchMovies(keyword);
            onSearchResults(movies);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="mb-4 flex items-center">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nhập tên phim..."
                className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            <button
                onClick={handleSearch}
                disabled={!keyword.trim() || searching}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {searching ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
        </div>
    );
};

export default SearchBar;
