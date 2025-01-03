import React, { useEffect, useState } from 'react';

const GeniusesSection = () => {
    const [geniuses, setGeniuses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://ditq.org/api/indexAPI')
            .then(response => response.json())
            .then(data => {
                if (data && data.geniuses) {
                    setGeniuses(data.geniuses);
                } else {
                    console.error("Unexpected response structure", data);
                }
            })
            .catch(error => console.error("Error fetching geniuses:", error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (geniuses.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => 
                (prevIndex + 1) % geniuses.length // Cycle through available items
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [geniuses.length]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => 
            (prevIndex + 1) % geniuses.length // Cycle through available items
        );
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? geniuses.length - 1 : prevIndex - 1
        );
    };

    if (isLoading) return <div>Loading...</div>;

    const currentGenius = geniuses[currentIndex];

    return (
        <section className="relative py-16 min-h-screen overflow-hidden" dir="rtl">
            <div className="container mx-auto text-center relative px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">نوابغ الإتقان</h2>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-stretch  rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[400px]">
                        {/* Left - Navigation Dots */}
                        <div className="flex flex-col justify-center gap-3 px-8">
                            {geniuses.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentIndex === index
                                            ? 'bg-green-500 w-4 h-4'
                                            : 'bg-green-100'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Middle - Content */}
                        <div className="flex-grow flex flex-col justify-center items-center p-10">
                            <div className="text-center max-w-xl">
                                <h3 className="font-semibold text-2xl mb-6">{currentGenius.name}</h3>
                                <p className="text-base text-gray-600 mb-8">{currentGenius.details}</p>
                                <div className="w-48 bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700 transition-colors mx-auto">
                                    <a href={`/itqan/geniuse/${currentGenius.name.replace(/\s+/g, '-')}/details`}
                                        className="text-base font-medium block">
                                        عرض القصة
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right - Image */}
                        <div className="w-2/5 flex-shrink-0">
                            <img
                                src={currentGenius.image}
                                alt={currentGenius.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GeniusesSection;
