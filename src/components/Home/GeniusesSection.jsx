import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

const GeniusesSection = () => {
    const [geniuses, setGeniuses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedGenius, setExpandedGenius] = useState(null);
    const cardRef = useRef(null);
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        fetch('https://ditq.org/api/indexAPI')
            .then(response => response.json())
            .then(data => {
                if (data && data.geniuses) {
                    setGeniuses(data.geniuses);
                }
            })
            .catch(error => console.error("Error fetching geniuses:", error))
            .finally(() => setIsLoading(false));
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

    if (isLoading) return <div>Loading...</div>;

    const currentGenius = geniuses[currentIndex];

    return (
        <>
            <Helmet>
                {/* <title>Geniuses - Your Website</title> */}
                <meta name="description" content="Description of your website's geniuses section." />
                <meta property="og:title" content="Geniuses - Your Website" />
                <meta property="og:description" content="Description of your website's geniuses section." />
                <meta property="og:image" content="URL_to_image" />
                <meta property="og:url" content="URL_to_page" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Geniuses - Your Website" />
                <meta name="twitter:description" content="Description of your website's geniuses section." />
                <meta name="twitter:image" content="URL_to_image" />
            </Helmet>
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500"
                    onClick={() => setIsExpanded(false)}
                />
            )}
            <section className="relative py-16 min-h-screen overflow-hidden" dir="rtl">
                <div className="container mx-auto text-center relative px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">نوابغ الإتقان</h2>
                    <div className="bg-white flex items-center justify-between w-full">
                        <div
                            ref={cardRef}
                            onClick={handleExpand}
                            className={`
                                flex items-stretch rounded-xl border-2 border-gray-300 shadow-lg overflow-hidden
                                transition-all duration-500 ease-in-out cursor-pointer origin-center
                                ${isExpanded
                                    ? 'fixed top-1/2 left-1/2 w-[90%] h-[70vh] z-50 bg-white'
                                    : 'w-full min-h-[500px] hover:scale-[1.02]'
                                }
                            `}
                            style={{
                                transform: isExpanded
                                    ? 'translate(-50%, -50%) scale(1)'
                                    : 'translate(0, 0) scale(1)',
                                transformOrigin: isExpanded
                                    ? `${clickPosition.x}px ${clickPosition.y}px`
                                    : 'center',
                                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {!isExpanded && (
                                <div className="flex flex-col justify-center gap-3 px-8" onClick={e => e.stopPropagation()}>
                                    {geniuses.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 
                                                ${currentIndex === index ? 'bg-green-500 w-4 h-4' : 'bg-green-100'}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className={`
                                flex flex-col items-center justify-center p-10 transition-all duration-500
                                ${isExpanded ? 'w-full mt-24' : 'flex-grow'}
                            `}>
                                <div className="text-center w-full max-w-3xl mx-auto">
                                    <h3 className="font-semibold text-3xl mb-4">
                                        {isExpanded ? expandedGenius.name : currentGenius.name}
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        {isExpanded ? expandedGenius.details : currentGenius.details}
                                    </p>
                                    {!isExpanded && (
                                        <div className="w-48 bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700 transition-colors mx-auto">
                                            عرض القصة
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`
                                transition-all duration-500 ease-out overflow-hidden
                                ${isExpanded
                                    ? 'absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full shadow-xl z-10'
                                    : 'w-2/5 flex-shrink-0'
                                }
                            `}
                                style={{
                                    transform: isExpanded
                                        ? 'translate(-50%, 0)'
                                        : 'translate(0, 0)',
                                }}
                            >
                                <img
                                    src={isExpanded ? expandedGenius.image : currentGenius.image}
                                    alt={isExpanded ? expandedGenius.name : currentGenius.name}
                                    className={`
                                        transition-all duration-500
                                        ${isExpanded
                                            ? 'w-full h-full object-cover rounded-full'
                                            : 'w-full h-full object-cover'
                                        }
                                    `}
                                />
                            </div>

                            {isExpanded && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-black transition-colors text-2xl"
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

export default GeniusesSection;