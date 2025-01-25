import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                setProjects(response.data.donate || []);
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
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [projects.length]);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    if (isLoading) {
        return (
            <section className="relative py-16 min-h-screen overflow-hidden" dir="rtl">
                <div className="container mx-auto text-center relative px-4">
                    <Skeleton height={40} width={300} className="mb-16" />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-stretched rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden w-full min-h-[400px]">
                            <Skeleton height={400} width="40%" />
                            <div className="flex-grow flex flex-col justify-center items-center p-10">
                                <Skeleton height={40} width={200} className="mb-6" />
                                <Skeleton height={20} width="80%" className="mb-8" />
                                <Skeleton height={40} width={150} />
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
        <>
            <Helmet>
                <title>{selectedProject ? `${selectedProject.title} - دار الإتقان` : "المشاريع - دار الإتقان"}</title>
                <meta name="description" content={selectedProject ? selectedProject.details : "اكتشف المشاريع التي تحتاج إلى دعمكم."} />
                <meta property="og:title" content={selectedProject ? selectedProject.title : "المشاريع - دار الإتقان"} />
                <meta property="og:description" content={selectedProject ? selectedProject.details : "اكتشف المشاريع التي تحتاج إلى دعمكم."} />
                {selectedProject?.image && <meta property="og:image" content={selectedProject.image} />}
            </Helmet>


            <section className="relative py-24 min-h-screen overflow-hidden" dir="rtl">
                <div className="container mx-auto relative px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800"
                    >
                        مشاريع بحاجة لدعمكم
                    </motion.h2>

                    <div className="relative h-[600px] flex flex-col items-center justify-center">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute w-full max-w-5xl"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row"
                                >
                                    <motion.div
                                        className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
                                        whileHover={{ backgroundColor: "#f8fafc" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 text-center md:text-right"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {currentProject?.title}
                                        </motion.h3>

                                        <motion.p
                                            className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center md:text-right line-clamp-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {currentProject?.details}
                                        </motion.p>

                                        <div className="flex justify-center md:justify-start space-x-4">
                                            <motion.button
                                                onClick={() => openModal(currentProject)}
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-32 md:w-48 bg-green-600 text-white text-center py-3 md:py-4 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                                            >
                                                عرض التفاصيل
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="md:w-1/2 relative overflow-hidden"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.img
                                            src={currentProject?.image || 'placeholder-image-url'}
                                            alt={currentProject?.title}
                                            className="w-full h-[300px] md:h-[500px] object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Updated Progress Dots */}
                        <div className="absolute bottom-[-40px] flex gap-3 justify-center">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                        ? 'bg-green-600 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-white rounded-2xl w-[90vw] h-[90vh] overflow-hidden shadow-2xl"
                            >
                                <div className="relative h-full">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 left-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
                                    >
                                        <X className="w-6 h-6 text-gray-700" />
                                    </button>

                                    <div className="grid md:grid-cols-2 h-full">
                                        <div className="h-1/2 md:h-full">
                                            <motion.img
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            />
                                        </div>
                                        <div className="p-8 overflow-y-auto h-1/2 md:h-full">
                                            <motion.h2
                                                className="text-3xl font-bold mb-4 text-gray-800"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {selectedProject.title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-gray-600 mb-6"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {selectedProject.details}
                                            </motion.p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-32 md:w-48 bg-green-600 text-white text-center py-3 md:py-4 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base">

                                                دعم المشروع
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};

export default ProjectsSection;