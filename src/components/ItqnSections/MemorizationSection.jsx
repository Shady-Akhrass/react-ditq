import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Facebook, Home, ChevronLeft } from 'lucide-react';
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
  .carousel .slide {
    transition: opacity 0.5s ease-in-out !important;
  }
`;

const MemorizationSection = () => {
    const [memorization, setMemorization] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://ditq.org/api/memorization/API')
            .then(response => {
                const memorizationData = Array.isArray(response.data) ? response.data : [response.data];
                setMemorization(memorizationData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the memorization!', error);
                setError('Failed to load memorization');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!memorization?.length) return <div>No memorization found</div>;

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
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
                        قسم تحفيظ القرآن الكريم
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

                {/* Memorization Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                    <h2 className="text-3xl font-bold mb-8 text-center">قسم تحفيظ القرآن الكريم</h2>
                    {memorization.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                            {item.memorization_images && item.memorization_images.length > 0 && (
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
                                    {item.memorization_images.map(image => (
                                        <div key={image.id} className="relative aspect-video">
                                            <img
                                                src={`https://ditq.org/storage/${image.image}`}
                                                alt="Memorization"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                            <div className="p-6">
                                <p className="text-gray-800 text-right leading-relaxed">
                                    {item.memorizations[0].about}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemorizationSection;
