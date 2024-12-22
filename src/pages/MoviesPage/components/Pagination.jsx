import React from 'react';

const Pagination = ({ currentPage, onNext, onPrevious, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center mt-6">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 mr-4"
            >
                Trang Trước
            </button>

            {/* Display Page Numbers */}
            <div className="flex space-x-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)} // Cập nhật số trang khi nhấn vào
                        className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
            >
                Trang Tiếp
            </button>
        </div>
    );
};

export default Pagination;
