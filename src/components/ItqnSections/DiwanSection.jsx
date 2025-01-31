import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Facebook, Home, ChevronLeft } from 'lucide-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Helmet } from 'react-helmet';

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
  .carousel .slide {
    transition: opacity 0.5s ease-in-out !important;
  }
`;

const DiwanSection = () => {
    const [diwans, setDiwans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api.ditq.org/api/diwan/API')
            .then(response => {
                const diwanData = Array.isArray(response.data) ? response.data : [response.data];
                setDiwans(diwanData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the diwan!', error);
                setError('Failed to load diwan');
                setLoading(false);
            });
    }, []);

    const getMetaDescription = () => {
        if (diwans?.length > 0 && diwans[0].diwans[0]) {
            return diwans[0].diwans[0].about.substring(0, 160) + '...';
        }
        return "قسم ديوان الحفاظ في دار الإتقان - برنامج متميز لتخريج حفظة القرآن الكريم";
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!diwans?.length) return <div>No diwan found</div>;

    const metaDescription = getMetaDescription();

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>قسم ديوان الحفاظ - دار الإتقان</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`دار الإتقان, ديوان الحفاظ, حفظة القرآن, تخريج الحفاظ${diwans.length > 0 ? `, ${diwans[0].diwans[0]?.title || ''}` : ''}`} />
                <meta property="og:title" content="قسم ديوان الحفاظ - دار الإتقان" />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                {diwans.length > 0 && diwans[0].diwan_images && diwans[0].diwan_images.length > 0 && (
                    <meta property="og:image" content={`https://api.ditq.org/storage/${diwans[0].diwan_images[0].image}`} />
                )}
            </Helmet>
            <style>{carouselStyles}</style>

            {/* Navigation Path */}
            <div className="max-w-7xl mx-auto mb-6" dir="rtl">
                <nav className="flex items-center text-gray-600 text-sm">
                    <Link to="/" className="flex items-center hover:text-green-600">
                        <Home className="w-4 h-4 ml-1" />
                        الرئيسية
                    </Link>
                    <ChevronLeft className="w-4 h-4 mx-2" />
                    <span className="text-green-600">
                        قسم ديوان الحفاظ
                    </span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Facebook Section */}
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

                {/* Diwan Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                    <h2 className="text-3xl font-bold mb-8 text-center">قسم ديوان الحفاظ</h2>
                    {diwans.map(diwan => (
                        <div key={diwan.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                            {diwan.diwan_images && diwan.diwan_images.length > 0 && (
                                <Carousel
                                    showThumbs={false}
                                    showStatus={false}
                                    infiniteLoop
                                    useKeyboardArrows
                                    autoPlay
                                    interval={5000}
                                    transitionTime={500}
                                    stopOnHover
                                    swipeable
                                    emulateTouch
                                    className="aspect-video"
                                >
                                    {diwan.diwan_images.map(image => (
                                        <div key={image.id} className="relative aspect-video">
                                            <img
                                                src={`https://api.ditq.org/storage/${image.image}`}
                                                alt="Diwan"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                            <div className="p-6">
                                <p className="text-gray-800 text-right leading-relaxed">
                                    {diwan.diwans[0].about}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiwanSection;
