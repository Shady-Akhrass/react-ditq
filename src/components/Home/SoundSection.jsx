import React, { useEffect, useState } from 'react';
import axios from 'axios';
import soundCloud from '../../assets/images/image.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SoundSection = () => {
    const [soundData, setSoundData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.ditq.org/api/home/API')
            .then((response) => {
                if (response.data && response.data.sound && response.data.sound.length > 0) {
                    setSoundData(response.data.sound[0]); // Get first item from array
                }
            })
            .catch((error) => {
                console.error("Error fetching sound data:", error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <section className="relative py-16 min-h-screen overflow-hidden ">
                <div className="container mx-auto text-center relative px-4">
                    <Skeleton height={40} width={300} className="mb-16" />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-stretch rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[450px]">
                            <div className="w-3/5 flex-shrink-0">
                                <Skeleton height={450} />
                            </div>
                            <div className="w-2/5 flex items-center justify-center p-8 bg-gray-50">
                                <Skeleton height={450} width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!soundData) return null;

    return (
        <section className="relative py-16 min-h-screen overflow-hidden">
            <div className="container mx-auto text-center relative px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">{soundData.title}</h2>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-stretch rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[450px]">
                        {/* Left - SoundCloud Player */}
                        <div className="w-3/5 flex-shrink-0">
                            <iframe
                                title={soundData.name}
                                width="100%"
                                height="450"
                                scrolling="no"
                                frameBorder="no"
                                allow="autoplay"
                                src={soundData.main}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Right - Image */}
                        <div className="w-2/5 flex items-center justify-center p-8 bg-gray-50">
                            <img
                                src={soundCloud}
                                alt="SoundCloud App"
                                className="max-w-full h-auto max-h-[450px] object-contain rounded-2xl shadow-md"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = soundCloud;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SoundSection;
