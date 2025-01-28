import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Copy, Facebook, Share2, Calendar, ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselStyles = `
  .carousel .control-dots .dot {
    background: #22c55e !important;
    box-shadow: none !important;
    width: 10px !important;
    height: 10px !important;
  }
  .carousel .control-dots .dot.selected {
    background: #16a34a !important;
  }
`;

const NewsDetails = () => {
    const { title } = useParams();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextNews, setNextNews] = useState(null);
    const [prevNews, setPrevNews] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const fetchNewsDetails = async () => {
        try {
            const cachedNews = JSON.parse(localStorage.getItem('allNews') || '[]');

            // Find news by matching the slug with generated title slug
            const currentNews = cachedNews.find(news => {
                const newsSlug = news.title
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
                return newsSlug === title;
            });

            if (currentNews) {
                setNewsItem(currentNews);
                const currentIndex = cachedNews.indexOf(currentNews);

                if (currentIndex > 0) {
                    setPrevNews(cachedNews[currentIndex - 1]);
                }
                if (currentIndex < cachedNews.length - 1) {
                    setNextNews(cachedNews[currentIndex + 1]);
                }
            } else {
                // Fallback to API if not in cache
                const response = await axios.get('https://ditq.org/api/indexAPI');
                const allNews = response?.data?.newss || [];

                const foundNews = allNews.find(news => {
                    const newsSlug = news.title
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-');
                    return newsSlug === title;
                });

                if (foundNews) {
                    setNewsItem(foundNews);
                    localStorage.setItem('allNews', JSON.stringify(allNews));
                }
            }
        } catch (error) {
            setError("Error fetching news details");
        } finally {
            setLoading(false);
            setTimeout(() => setIsVisible(true), 100);
        }
    };

    useEffect(() => {
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: 'YOUR_FACEBOOK_APP_ID',
                    xfbml: true,
                    version: 'v18.0'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/ar_AR/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        const checkAndRedirect = async () => {
            if (/^\/\d+\/details$/.test(window.location.pathname)) {
                const id = window.location.pathname.split('/')[1];
                const cachedNews = JSON.parse(localStorage.getItem('allNews') || '[]');
                const newsItem = cachedNews.find(news => news.id.toString() === id);
                
                if (newsItem) {
                    const titleSlug = newsItem.title
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-');
                    navigate(`/news/${titleSlug}/details`, { replace: true });
                    return true;
                }
            }
            return false;
        };

        const init = async () => {
            loadFacebookSDK();
            const shouldRedirect = await checkAndRedirect();
            if (!shouldRedirect) {
                await fetchNewsDetails();
            }
        };

        init();
    }, [title, navigate]);

    const generateNewsUrl = (newsItem) => {
        const slug = newsItem.title
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        return `/news/${slug}/details`;
    };

    const copyShortLink = () => {
        if (newsItem) {
            const shortUrl = `${window.location.origin}/${newsItem.id}/details`;
            navigator.clipboard.writeText(shortUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-PS', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (!newsItem) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800">لم يتم العثور على الخبر</h2>
                    <p className="text-gray-600 mt-2">الرجاء التحقق من الرابط والمحاولة مرة أخرى</p>
                    <button
                        onClick={() => navigate('/news')}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        العودة للأخبار
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{newsItem.title}</title>
                <title>{newsItem.title}</title>
                <meta name="description" content={newsItem.object.substring(0, 160)} />
                <meta property="og:title" content={newsItem.title} />
                <meta property="og:description" content={newsItem.object.substring(0, 160)} />
                <meta property="og:image" content={newsItem.image} />
            </Helmet>
            <style>{carouselStyles}</style>
            <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-7xl mx-auto mb-6" dir='rtl'>
                    <nav className="flex items-center text-gray-600 text-sm">
                        <Link to="/" className="flex items-center hover:text-green-600">
                            <Home className="w-4 h-4 ml-1" />
                            الرئيسية
                        </Link>
                        <ChevronLeft className="w-4 h-4 mx-2" />
                        <Link to="/news" className="hover:text-green-600">
                            كافة الأخبار
                        </Link>
                        <ChevronLeft className="w-4 h-4 mx-2" />
                        <span className="text-green-600 truncate max-w-[300px]">
                            {newsItem.title}
                        </span>
                    </nav>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="sticky top-4">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-gray-900">آخر المنشورات</h2>
                                        <Facebook className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div
                                        className="fb-page"
                                        data-href="https://www.facebook.com/dar.etqan.gaza"
                                        data-tabs="timeline"
                                        data-width="450"
                                        data-height="500"
                                        data-small-header="true"
                                        data-adapt-container-width="true"
                                        data-hide-cover="false"
                                        data-show-facepile="false"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`lg:col-span-3 order-1 lg:order-2 transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6" dir='rtl'>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-5 h-5 ml-2" />
                                    <span className="text-lg">{formatDate(newsItem.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={copyShortLink}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 
                                            rounded-lg transition-colors text-gray-700"
                                    >
                                        <Copy className="w-4 h-4" />
                                        <span>{copySuccess ? ' تم النسخ 👍' : 'نسخ الرابط'}</span>
                                    </button>
                                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Share2 className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100" dir='rtl'>
                                <p className="text-3xl font-bold text-right text-gray-900 leading-tight">
                                    {newsItem.title}
                                </p>
                            </div>

                            <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={newsItem.image}
                                        alt={newsItem.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {newsItem.subphotos1 && (
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={`https://ditq.org/storage/${newsItem.subphotos1}`}
                                            alt="Additional content"
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                            </Carousel>

                            <div className="p-6">
                                <div className=" max-w-none font-sans !font-sans text-lg md:text-xl !text-lg">
                                    {newsItem.object.split('\r\n\r\n').map((paragraph, index) => (
                                        <pre
                                            key={index}
                                            className="block w-full overflow-auto whitespace-pre-line my-4 rtl font-sans !font-sans text-lg md:text-xl !text-lg"
                                        >
                                            <p
                                                dir="rtl"
                                                className="text-gray-800 leading-relaxed font-sans !font-san text-lg md:text-xl !text-lg"
                                            >
                                                {paragraph}
                                            </p>
                                        </pre>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="mt-8" dir='rtl'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {nextNews && (
                                    <Link
                                        to={generateNewsUrl(nextNews)}
                                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center group h-24"
                                    >
                                        <ChevronRight className="w-5 h-5 ml-2 text-green-600 transform group-hover:-translate-x-1 transition-transform" />
                                        <div>
                                            <p className="text-sm text-gray-500">الخبر السابق</p>
                                            <p className="text-gray-900 font-semibold">{nextNews.title}</p>
                                        </div>
                                    </Link>
                                )}

                                {prevNews && (
                                    <Link
                                        to={generateNewsUrl(prevNews)}
                                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-end group h-24"
                                    >
                                        <div className="text-left">
                                            <p className="text-sm text-gray-500">الخبر التالي</p>
                                            <p className="text-gray-900 font-semibold">{prevNews.title}</p>
                                        </div>
                                        <ChevronLeft className="w-5 h-5 mr-2 text-green-600 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsDetails;