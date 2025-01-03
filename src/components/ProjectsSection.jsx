import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                console.log(response.data); // Inspect API response
                setProjects(response.data.donate || []); // Ensure fallback
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
            }, 3000); // Change slide every 3 seconds
            return () => clearInterval(interval);
        }
    }, [projects.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (isLoading) {
        return (
            <section className="relative py-16 min-h-screen overflow-hidden" dir="rtl">
                <div className="container mx-auto text-center relative px-4">
                    <Skeleton height={40} width={300} className="mb-16" />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-stretch rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[400px]">
                            <Skeleton height={400} width="40%" />
                            <div className="flex-grow flex flex-col justify-center items-center p-10">
                                <Skeleton height={40} width={200} className="mb-6" />
                                <Skeleton height={20} width="80%" className="mb-8" />
                                <Skeleton height={40} width={150} />
                            </div>
                            <div className="flex flex-col justify-center gap-3 px-8">
                                <Skeleton circle={true} height={12} width={12} />
                                <Skeleton circle={true} height={12} width={12} />
                                <Skeleton circle={true} height={12} width={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!projects || projects.length === 0) return null;

    const currentProject = projects[currentIndex];

    return (
        <section className="relative py-16 min-h-screen overflow-hidden" dir="rtl">
            <div className="container mx-auto text-center relative px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">مشاريع بحاجة لدعمكم</h2>
                <div className="flex items-center justify-between w-full">
                    <div className="bg-white flex items-stretch  rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[400px]">
                        {/* Left - Image */}
                        <div className="w-2/5 flex-shrink-0">
                            <img
                                src={currentProject?.image || 'placeholder-image-url'}
                                alt={currentProject?.title || 'Project image'}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Middle - Content */}
                        <div className="flex-grow flex flex-col justify-center items-center p-10">
                            <div className="text-center max-w-xl">
                                <h3 className="font-semibold text-2xl mb-6">{currentProject?.title || 'Loading title...'}</h3>
                                <p className="text-base text-gray-600 mb-8">{currentProject?.details || 'Loading details...'}</p>
                                <div className="w-48 bg-yellow-500 text-white text-center py-4 rounded-lg hover:bg-yellow-600 transition-colors mx-auto">
                                    <a
                                        href={`/itqan/project/${currentProject?.title?.replace(/\s+/g, '-') || ''}/details`}
                                        className="text-base font-medium block"
                                    >
                                        عرض التفاصيل
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right - Navigation Dots */}
                        <div className="flex flex-col justify-center gap-3 px-8">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                        ? 'bg-yellow-300 w-4 h-4'
                                        : 'bg-yellow-50/100'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
