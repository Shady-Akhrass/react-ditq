import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

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
        return `/news/${encodeURIComponent(title.replace(/\s+/g, '-'))}/details`;
    };

    if (loading) {
        return (
            <section className="py-8 ">
                <Helmet>
                    <title>أخبار الدار - دار الإتقان</title>
                    <meta name="description" content={news.length > 0 ? news[0].title : "تابع آخر الأخبار من دار الإتقان"} />
                    <meta property="og:title" content="أخبار الدار - دار الإتقان" />
                    <meta property="og:description" content={news.length > 0 ? news[0].title : "تابع آخر الأخبار من دار الإتقان"} />
                    <meta property="og:image" content={news.length > 0 ? news[0].image : "URL_to_default_image"} />
                    <meta property="og:url" content="https://yourwebsite.com/news" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="أخبار الدار - دار الإتقان" />
                    <meta name="twitter:description" content={news.length > 0 ? news[0].title : "تابع آخر الأخبار من دار الإتقان"} />
                    <meta name="twitter:image" content={news.length > 0 ? news[0].image : "URL_to_default_image"} />
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
                {/* <title>News - Your Website</title> */}
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
        <motion.a
            href={generateDetailsUrl(newsItem.title)}
            className="block bg-white rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col text-center"
            whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="h-[50%]"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>
            <div className="p-4 flex flex-col h-[50%]">
                <h3 className="text-lg font-bold text-gray-900 mb-2 h-[60%] overflow-hidden">{newsItem.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{newsItem.created_at.slice(0, 10)}</p>
                <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full mt-auto"
                    whileHover={{
                        scale: 1.03
                    }}
                    transition={{ duration: 0.2 }}
                >
                    عرض التفاصيل
                </motion.button>
            </div>
        </motion.a>
    );
};

export default NewsSection;
