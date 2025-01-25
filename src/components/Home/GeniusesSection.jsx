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

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl">Loading...</div>
        </div>
    );

    const currentGenius = geniuses[currentIndex];

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
                                    ? 'fixed top-0 md:top-1/2 left-1/2 w-full md:w-[90%] h-full md:h-[80vh] z-50 bg-white'
                                    : 'w-full min-h-[500px] hover:scale-[1.02]'
                                }
                            `}
                            style={{
                                transform: isExpanded
                                    ? `translate(-50%, ${window.innerWidth >= 768 ? '-50%' : '0'}) scale(1)`
                                    : 'translate(0, 0) scale(1)',
                                transformOrigin: isExpanded
                                    ? `${clickPosition.x}px ${clickPosition.y}px`
                                    : 'center',
                                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className={`
                                transition-all duration-500 ease-out overflow-hidden
                                order-1 md:order-3
                                ${isExpanded
                                    ? 'w-full md:w-1/2 h-48 md:h-full'
                                    : 'w-full md:w-2/5 h-48 md:h-auto'
                                }
                            `}>
                                <img
                                    src={isExpanded ? expandedGenius.image : currentGenius.image}
                                    alt={isExpanded ? expandedGenius.name : currentGenius.name}
                                    className="w-full h-full object-cover"
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
                                flex flex-col justify-center p-4 md:p-10 transition-all duration-500
                                order-3 md:order-2 h-full
                                ${isExpanded ? 'w-full md:w-1/2 overflow-y-auto' : 'flex-grow'}
                            `}>
                                <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto py-4 md:py-0 space-y-6 md:space-y-8">
                                    <h3 className="font-semibold text-2xl md:text-3xl">
                                        {isExpanded ? expandedGenius.name : currentGenius.name}
                                    </h3>
                                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-screen-2xl">
                                        {isExpanded ? expandedGenius.details : currentGenius.details}
                                    </p>
                                    {!isExpanded && (
                                        <div className="w-32 md:w-48 bg-green-600 text-white text-center py-3 md:py-4 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base">
                                            عرض القصة
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isExpanded && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="absolute top-2 right-2 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-black transition-colors text-xl md:text-2xl z-10"
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