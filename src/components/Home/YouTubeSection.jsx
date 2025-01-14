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
            <div className="py-4 flex justify-center items-center h-screen" dir="rtl">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    <Skeleton height={40} width={300} className="mb-16" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="grid grid-rows-2 gap-4">
                            <Skeleton height={288} />
                            <Skeleton height={288} />
                        </div>
                        <div className="col-span-2">
                            <Skeleton height={592} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" py-4 flex justify-center items-center h-screen">
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">المكتبة المرئية</h2>
                {videos.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="grid grid-rows-2 gap-4">
                            <iframe
                                className="w-full h-64 lg:h-72"
                                src={videos[0].secondary1}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Secondary Video 1"
                            ></iframe>
                            <iframe
                                className="w-full h-64 lg:h-72"
                                src={videos[0].secondary2}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Secondary Video 2"
                            ></iframe>
                        </div>
                        {/* Right side: Larger main video */}
                        <div className="col-span-2">
                            <iframe
                                className="w-full h-[38rem] lg:h-[37rem]" // Adjust the height as needed
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
        </div>
    );
};

export default YouTubeSection;
