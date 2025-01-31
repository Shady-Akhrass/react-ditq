import React, { useEffect, useState, memo, useCallback } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const API_URL = 'https://api.ditq.org/api';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="py-4 px-4 text-center text-red-600">
                    Something went wrong loading the video section.
                </div>
            );
        }
        return this.props.children;
    }
}

// Optimized VideoFrame component that only loads when visible
const VideoFrame = memo(({ src, title, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const frameRef = React.useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (frameRef.current) {
            observer.observe(frameRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={frameRef} className={className}>
            {isVisible ? (
                <iframe
                    src={src}
                    title={title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
        </div>
    );
});

const YouTubeSectionContent = memo(() => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${API_URL}/home/API`);
                if (isMounted) {
                    setVideos(response.data.youtubes);
                    setError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setError('Failed to load videos');
                    console.error("Error fetching videos:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchVideos();
        return () => { isMounted = false; };
    }, []);

    if (error) {
        return (
            <div className="py-4 px-4 sm:px-6 lg:px-8 lg:mx-32 text-center text-red-600">
                {error}
            </div>
        );
    }

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
                        <VideoFrame
                            className="w-full h-48 md:h-72 rounded-lg"
                            src={videos[0].secondary1}
                            title="Secondary Video 1"
                        />
                        <VideoFrame
                            className="w-full h-48 md:h-72 rounded-lg"
                            src={videos[0].secondary2}
                            title="Secondary Video 2"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <VideoFrame
                            className="w-full h-64 md:h-[37rem] rounded-lg"
                            src={videos[0].main}
                            title="Main Video"
                        />
                    </div>
                </div>
            )}
        </div>
    );
});

YouTubeSectionContent.displayName = 'YouTubeSectionContent';

const YouTubeSection = () => (
    <ErrorBoundary>
        <YouTubeSectionContent />
    </ErrorBoundary>
);

export default YouTubeSection;