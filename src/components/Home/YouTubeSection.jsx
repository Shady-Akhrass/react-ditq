import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const YouTubeSection = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                setVideos(response.data.youtubes);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="py-4 px-4 sm:px-6 lg:px-8 lg:mx-32">
                <Skeleton height={40} width={300} className="mb-16 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 grid grid-rows-2 gap-4">
                        <Skeleton height={200} md:height={288} />
                        <Skeleton height={200} md:height={288} />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton height={400} md:height={592} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-4 px-4 sm:px-6 lg:px-8 lg:mx-32">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-800">
                المكتبة المرئية
            </h2>
            {videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 grid grid-rows-2 gap-4">
                        <iframe
                            className="w-full h-48 md:h-72 rounded-lg"
                            src={videos[0].secondary1}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Secondary Video 1"
                        ></iframe>
                        <iframe
                            className="w-full h-48 md:h-72 rounded-lg"
                            src={videos[0].secondary2}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Secondary Video 2"
                        ></iframe>
                    </div>
                    <div className="md:col-span-2">
                        <iframe
                            className="w-full h-64 md:h-[37rem] rounded-lg"
                            src={videos[0].main}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Main Video"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YouTubeSection;