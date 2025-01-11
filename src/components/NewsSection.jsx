import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://ditq.org/api/indexAPI');
                const latestNews = response?.data?.newss?.slice(-4).reverse() || [];
                setNews(latestNews);
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

    if (loading) {
        return (
            <section className="py-8">
                <Helmet>
                    <title>News - Your Website</title>
                    <meta name="description" content="Description of your website's news section." />
                    <meta property="og:title" content="News - Your Website" />
                    <meta property="og:description" content="Description of your website's news section." />
                    <meta property="og:image" content="URL_to_image" />
                    <meta property="og:url" content="URL_to_page" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="News - Your Website" />
                    <meta name="twitter:description" content="Description of your website's news section." />
                    <meta name="twitter:image" content="URL_to_image" />
                </Helmet>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton height={40} width={300} className="mb-16" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section className="py-8">
            <Helmet>
                <title>News - Your Website</title>
                <meta name="description" content="Description of your website's news section." />
                <meta property="og:title" content="News - Your Website" />
                <meta property="og:description" content="Description of your website's news section." />
                <meta property="og:image" content="URL_to_image" />
                <meta property="og:url" content="URL_to_page" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="News - Your Website" />
                <meta name="twitter:description" content="Description of your website's news section." />
                <meta name="twitter:image" content="URL_to_image" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">أخبار الدار</h2>
                {/* Grid layout for news cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {news.map((item) => (
                        <NewsCard key={item.id} newsItem={item} generateDetailsUrl={generateDetailsUrl} />
                    ))}
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
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden h-[500px] flex flex-col text-center"
        >
            <div className="h-[50%]">
                <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col h-[50%]">
                <h3 className="text-lg font-bold text-gray-900 mb-2 h-[60%] overflow-hidden">{newsItem.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{newsItem.created_at.slice(0, 10)}</p>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full transition-all duration-300 ease-in-out mt-auto">
                    عرض التفاصيل
                </button>
            </div>
        </a>
    );
};

export default NewsSection;
