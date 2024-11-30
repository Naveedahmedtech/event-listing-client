'use client';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newOffset: number) => void;
    next: string | null;
    previous: string | null;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, next, previous }) => {
    const handlePrev = () => {
        if (previous) {
            const params = new URLSearchParams(new URL(previous).search);
            const newOffset = parseInt(params.get('offset') || '0', 10);
            onPageChange(newOffset);
        }
    };

    const handleNext = () => {
        if (next) {
            const params = new URLSearchParams(new URL(next).search);
            const newOffset = parseInt(params.get('offset') || '0', 10);
            onPageChange(newOffset);
        }
    };

    const handlePageClick = (page: number) => {
        const newOffset = (page - 1) * 12; // Assuming 12 results per page
        onPageChange(newOffset);
    };

    const renderPageNumbers = () => {
        let pages = [];
        if (totalPages <= 5) {
            // If there are 5 or fewer pages, show them all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show page numbers in ranges with ellipsis
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, '...'];
            } else if (currentPage > totalPages - 3) {
                pages = ['...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            <button
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none disabled:opacity-50"
                onClick={handlePrev}
                disabled={!previous}
                aria-label="Previous Page"
            >
                <FiChevronLeft />
            </button>

            <div className="flex space-x-2">
                {renderPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => (typeof page === 'number' ? handlePageClick(page) : null)}
                        className={`px-4 py-2 rounded-lg ${typeof page === 'number' ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'text-gray-400'} ${
                            page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'bg-transparent text-gray-600'
                        }`}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none disabled:opacity-50"
                onClick={handleNext}
                disabled={!next}
                aria-label="Next Page"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
