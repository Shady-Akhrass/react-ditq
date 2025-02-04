import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { lowQualityCompress } from '../hooks/CompressImage';

// Memoized news card component
const NewsCard = memo(({ newsItem, generateDetailsUrl, compressedImage }) => (
    <motion.a
        href={generateDetailsUrl(newsItem.title)}
        className="block bg-white rounded-lg shadow-md overflow-hidden aspect-[3/4] flex flex-col text-center"
        whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.2 }}
    >
        <div className="relative h-1/2 overflow-hidden bg-gray-200">
            <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={compressedImage || newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="300"
                    height="225"
                    style={{ aspectRatio: '4/3' }}
                />
            </motion.div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-3">{newsItem.title}</h3>
            <p className="text-gray-600 text-sm">{newsItem.created_at.slice(0, 10)}</p>
            <motion.button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full mt-auto"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
            >
                عرض التفاصيل
            </motion.button>
        </div>
    </motion.a>
));

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [compressedImages, setCompressedImages] = useState({});

    const compressAndCacheImage = async (imageUrl, id) => {
        try {
            // Convert absolute URLs to relative ones for proxy
            const url = imageUrl.replace('https://api.ditq.org', '');
            const response = await fetch(url, {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Accept': 'image/*',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const compressedBlob = await lowQualityCompress(blob);
            const compressedUrl = URL.createObjectURL(compressedBlob);
            setCompressedImages(prev => ({ ...prev, [id]: compressedUrl }));
            return compressedUrl;
        } catch (error) {
            console.error("Image compression failed:", error);
            // Return the relative URL as fallback
            const fallbackUrl = imageUrl.replace('https://api.ditq.org', '');
            setCompressedImages(prev => ({ ...prev, [id]: fallbackUrl }));
            return fallbackUrl;
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/home/API', {
                    signal: abortController.signal,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const latestNews = response?.data?.newss?.slice(-4).reverse() || [];
                setNews(latestNews);

                // Process images sequentially to avoid overwhelming the server
                for (const item of latestNews) {
                    if (item.image) {
                        await compressAndCacheImage(item.image, item.id);
                    }
                }

                // Cache the news data
                localStorage.setItem('latestNews', JSON.stringify(latestNews));
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error("Error fetching news:", error);
                    setError("Error fetching news");
                    // Try to load from localStorage as fallback
                    const cachedNews = localStorage.getItem('latestNews');
                    if (cachedNews) {
                        const parsedNews = JSON.parse(cachedNews);
                        setNews(parsedNews);
                        setError(null);
                        // Load cached images
                        parsedNews.forEach(item => {
                            if (item.image) {
                                compressAndCacheImage(item.image, item.id);
                            }
                        });
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        return () => {
            abortController.abort();
            // Cleanup compressed image URLs
            Object.values(compressedImages).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const generateDetailsUrl = (title) => {
        return `/news/${encodeURIComponent(title.replace(/\s+/g, '-'))}/details`;
    };

    if (loading) {
        return (
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                <div style={{ aspectRatio: '4/3' }} className="bg-gray-200" />
                                <div className="p-4">
                                    <Skeleton count={2} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <section className="py-8 content-visibility-auto contain-intrinsic-size-[500px]">
            <Helmet>
                <title>الأخبار - دار الإتقان</title>
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
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">أخبار الدار</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {news.map((item) => (
                        <NewsCard
                            key={item.id}
                            newsItem={item}
                            generateDetailsUrl={generateDetailsUrl}
                            compressedImage={compressedImages[item.id]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(NewsSection);
