import React, { useEffect, useState, useRef, memo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { lowQualityCompress } from '../hooks/CompressImage';

// Memoize the SkeletonCard component
const SkeletonCard = memo(() => (
    <div className="w-full min-h-[500px] rounded-xl border-2 shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-white">
        <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/5 h-48 md:h-auto bg-gray-200 animate-pulse">
                <div className="w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shine" />
                </div>
            </div>

            <div className="flex-grow p-4 md:p-10">
                <div className="flex flex-col items-center justify-start h-full space-y-6 md:space-y-8">
                    <div className="w-3/4 h-8 bg-gray-200 rounded-lg animate-pulse">
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shine" />
                        </div>
                    </div>

                    <div className="space-y-4 w-full">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse">
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shine" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-32 md:w-48 h-12 bg-gray-200 rounded-lg animate-pulse">
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shine" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

// Memoize the card content component
const GeniusCardContent = memo(({ genius, isExpanded, onExpand }) => (
    <div className="flex flex-col items-center justify-start h-full w-full max-w-3xl mx-auto py-4 md:py-0 space-y-6 md:space-y-8">
        <h3 className="font-semibold text-xl md:text-3xl">
            {genius.name}
        </h3>
        <p className={`text-base md:text-lg text-gray-600 leading-relaxed max-w-screen-2xl ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {genius.details}
        </p>
        {!isExpanded && (
            <div className="w-32 md:w-48 bg-green-600 text-white text-center py-3 md:py-4 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base">
                عرض القصة
            </div>
        )}
    </div>
));

const GeniusesSection = () => {
    const [geniuses, setGeniuses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedGenius, setExpandedGenius] = useState(null);
    const [compressedImages, setCompressedImages] = useState({});
    const cardRef = useRef(null);
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    const compressAndCacheImage = async (imageUrl, id) => {
        try {
            const url = imageUrl.replace('https://api.ditq.org', '');
            const response = await fetch(url, {
                headers: {
                    'Accept': 'image/*'
                }
            });
            const blob = await response.blob();
            const compressedBlob = await lowQualityCompress(blob);
            const compressedUrl = URL.createObjectURL(compressedBlob);
            setCompressedImages(prev => ({ ...prev, [id]: compressedUrl }));
            return compressedUrl;
        } catch (error) {
            console.error("Image compression failed:", error);
            return imageUrl.replace('https://api.ditq.org', '');
        }
    };

    useEffect(() => {
        const fetchGeniuses = async () => {
            try {
                const response = await axios.get('/api/home/API', {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const geniusData = response?.data?.geniuses || [];
                setGeniuses(geniusData);

                geniusData.forEach(genius => {
                    if (genius.image) {
                        compressAndCacheImage(genius.image, genius.id);
                    }
                });
            } catch (error) {
                console.error("Error fetching geniuses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGeniuses();

        return () => {
            Object.values(compressedImages).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    useEffect(() => {
        if (geniuses.length === 0 || isExpanded) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % geniuses.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [geniuses.length, isExpanded]);

    const handleExpand = (event) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setClickPosition({ x, y });
        setCardPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        });
        setExpandedGenius(currentGenius);
        setIsExpanded(true);
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <style>
                {`
                    @keyframes shine {
                        to {
                            transform: translateX(100%);
                        }
                    }
                    
                    .skeleton-shine {
                        animation: shine 1.5s infinite;
                    }
                `}
            </style>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-800">نوابغ الإتقان</h2>
                <SkeletonCard />
            </div>
        </div>
    );

    const currentGenius = geniuses[currentIndex];

    // Rest of your component remains the same...
    return (
        <>
            <Helmet>
                <title>{currentGenius ? `${currentGenius.name} - نوابغ الإتقان` : 'نوابغ الإتقان'}</title>
                <meta name="description" content={currentGenius ? currentGenius.details : "تعرف على نوابغ الإتقان وقصص نجاحهم."} />
                <meta property="og:title" content={currentGenius ? currentGenius.name : "نوابغ الإتقان"} />
                <meta property="og:description" content={currentGenius ? currentGenius.details : "تعرف على نوابغ الإتقان وقصص نجاحهم."} />
                <meta property="og:image" content={currentGenius?.image || "URL_to_default_image"} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={currentGenius ? currentGenius.name : "نوابغ الإتقان"} />
                <meta name="twitter:description" content={currentGenius ? currentGenius.details : "تعرف على نوابغ الإتقان وقصص نجاحهم."} />
                <meta name="twitter:image" content={currentGenius?.image || "URL_to_default_image"} />
            </Helmet>

            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500"
                    onClick={() => setIsExpanded(false)}
                />
            )}

            <section className="relative py-8 md:py-16 min-h-screen overflow-hidden" dir="rtl">
                <div className="container mx-auto text-center relative px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-800">نوابغ الإتقان</h2>
                    <div className="bg-white flex items-center justify-between w-full">
                        <div
                            ref={cardRef}
                            onClick={handleExpand}
                            className={`
                                flex flex-col md:flex-row items-stretch rounded-xl border-2 shadow-lg overflow-hidden
                                transition-all duration-500 ease-in-out cursor-pointer origin-center
                                ${isExpanded
                                    ? 'fixed top-0 left-0 md:left-1/2 md:top-1/2 w-full h-full md:w-[90%] md:h-[80vh] z-50 bg-white'
                                    : 'w-full min-h-[500px] hover:scale-[1.02]'
                                }
                            `}
                            style={{
                                transform: isExpanded
                                    ? window.innerWidth >= 768
                                        ? 'translate(-50%, -50%) scale(1)'
                                        : 'translate(0, 0) scale(1)'
                                    : 'translate(0, 0) scale(1)',
                                transformOrigin: isExpanded
                                    ? `${clickPosition.x}px ${clickPosition.y}px`
                                    : 'center',
                                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className={`
                                relative transition-all duration-500 ease-out overflow-hidden
                                order-1 md:order-3
                                ${isExpanded
                                    ? 'w-full h-[30vh] md:w-1/2 md:h-full'
                                    : 'w-full md:w-2/5 h-48 md:h-auto'
                                }
                            `}>
                                <img
                                    src={compressedImages[isExpanded ? expandedGenius?.id : currentGenius?.id] || (isExpanded ? expandedGenius?.image : currentGenius?.image)}
                                    alt={isExpanded ? expandedGenius?.name : currentGenius?.name}
                                    className="w-full h-full object-cover"
                                    width="800"
                                    height="600"
                                    loading="lazy"
                                />
                            </div>

                            {!isExpanded && (
                                <div className="flex md:flex-col justify-center gap-3 p-4 md:px-8 order-2"
                                    onClick={e => e.stopPropagation()}>
                                    {geniuses.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 
                                                ${currentIndex === index ? 'bg-green-500 w-3 md:w-4 h-3 md:h-4' : 'bg-green-100'}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className={`
                                flex flex-col justify-start p-4 md:p-10 transition-all duration-500
                                order-3 md:order-2
                                ${isExpanded
                                    ? 'w-full h-[70vh] md:w-1/2 md:h-full overflow-y-auto pb-20'
                                    : 'flex-grow'
                                }
                            `}>
                                <GeniusCardContent
                                    genius={isExpanded ? expandedGenius : currentGenius}
                                    isExpanded={isExpanded}
                                    onExpand={handleExpand}
                                />
                            </div>

                            {isExpanded && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-black transition-colors z-10"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(GeniusesSection);