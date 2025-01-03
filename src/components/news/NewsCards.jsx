import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllNewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://ditq.org/api/indexAPI');
                const allNews = response?.data?.newss || [];
                setNews(allNews.reverse()); // Reverse to show the latest news first
            } catch (error) {
                setError("Error fetching news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const generateDetailsUrl = (title) => {
        return `/itqan/news/${encodeURIComponent(title.replace(/\s+/g, '-'))}/details`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return (
            <section className="py-8 pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton height={40} width={300} className="mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Skeleton height={500} />
                        <Skeleton height={500} />
                        <Skeleton height={500} />
                        <Skeleton height={500} />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <section className=" py-8 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">جميع الأخبار</h2>
                {/* Grid layout for news cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedNews.map((item) => (
                        <NewsCard key={item.id} newsItem={item} generateDetailsUrl={generateDetailsUrl} />
                    ))}
                </div>
                {/* Enhanced Pagination controls */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                    >
                        <IoChevronBackOutline className="w-5 h-5" />
                    </button>
                    {Array.from({ length: Math.ceil(news.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage === index + 1
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(Math.min(Math.ceil(news.length / itemsPerPage), currentPage + 1))}
                        disabled={currentPage === Math.ceil(news.length / itemsPerPage)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                    >
                        <IoChevronForwardOutline className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// News Card as a separate component
const NewsCard = ({ newsItem, generateDetailsUrl }) => {
    return (
        <a
            href={generateDetailsUrl(newsItem.title)}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden h-[500px] flex flex-col"
        >
            <div className="h-[50%]">
                <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col h-[50%]">
                <h3 className="text-lg font-bold text-gray-900 mb-2 h-[50%] overflow-hidden text-center">{newsItem.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{newsItem.created_at.slice(0, 10)}</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full transition-all duration-300 ease-in-out mt-auto">
                    عرض التفاصيل
                </button>
            </div>
        </a>
    );
};

export default AllNewsPage;