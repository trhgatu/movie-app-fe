import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {
    fetchSeriesMovies,
    fetchSingleMovies,
    fetchNewMovies,
    fetchNowShowingMovies,
} from '../../services/movieService';
import { AiFillPlayCircle } from "react-icons/ai";
import Pagination from './components/Pagination';

const MoviesPage = () => {
    const { type } = useParams();
    const [page, setPage] = useState(1);

    const fetchMoviesByType = (type) => {
        switch(type) {
            case 'series':
                return fetchSeriesMovies;
            case 'single':
                return fetchSingleMovies;
            case 'new':
                return fetchNewMovies;
            case 'now-showing':
                return fetchNowShowingMovies;
            default:
                throw new Error('Unknown movie type');
        }
    };

    const { data: movies, isLoading, isError } = useQuery({
        queryKey: ['movies', type, page],
        queryFn: () => fetchMoviesByType(type)(page),
        keepPreviousData: true,
    });

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handlePageChange = (newPage) => setPage(newPage);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <ClipLoader size={50} color="#3498db" />
        </div>
    );
    if (isError) return <p>Có lỗi xảy ra khi tải danh sách phim.</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 pt-24">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    {type === 'series' && 'Danh Sách Phim Bộ'}
                    {type === 'single' && 'Danh Sách Phim Lẻ'}
                    {type === 'new' && 'Phim Mới Cập Nhật'}
                    {type === 'now-showing' && 'Phim Đang Chiếu'}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <Link to={`/movie/${movie.slug}`} className="group relative" key={movie.slug}>
                            <div
                                className="w-full h-72 shadow-lg bg-center bg-cover rounded-md overflow-hidden transform group-hover:scale-105 transition-all duration-300"
                                style={{
                                    backgroundImage: `url(${movie.thumb_url || '/path/to/placeholder-thumbnail.jpg'})`
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
                                    <AiFillPlayCircle size={50} className='hover:text-red-600 transition-all duration-300' />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Component */}
                <Pagination
                    currentPage={page}
                    onNext={handleNextPage}
                    onPrevious={handlePreviousPage}
                    totalPages={10} // Giả sử bạn có tổng cộng 10 trang
                    onPageChange={handlePageChange} // Truyền handlePageChange để cập nhật trang
                />
            </div>
        </div>
    );
};

export default MoviesPage;
