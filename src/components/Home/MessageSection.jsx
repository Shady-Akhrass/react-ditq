import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const MessageSection = () => {
    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                setVision(response.data.homes[0].vision);
                setMission(response.data.homes[0].mission);
            })
            .catch((error) => {
                console.error("Error fetching vision and mission:", error);
            });
    }, []);

    const cardVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <>
            <Helmet>
                <title>Message - Your Website</title>
                <meta name="description" content="Description of your website's message section." />
                <meta property="og:title" content="Message - Your Website" />
                <meta property="og:description" content="Description of your website's message section." />
                <meta property="og:image" content="URL_to_image" />
                <meta property="og:url" content="URL_to_page" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Message - Your Website" />
                <meta name="twitter:description" content="Description of your website's message section." />
                <meta name="twitter:image" content="URL_to_image" />
            </Helmet>
            <section className="relative py-16  overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">
                        <span className="text-green-600">رؤيتنا</span> ورسالتنا
                    </h1>

                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
                        {/* Vision Card */}
                        <motion.div
                            className={`w-full lg:w-2/3 max-w-2xl ${activeCard === 'vision' ? 'z-20' : 'z-10'}`}
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setActiveCard('vision')}
                            role="button"
                            aria-pressed={activeCard === 'vision'}
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && setActiveCard('vision')}
                        >
                            <div className="relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                                <div className="relative bg-white p-12 rounded-2xl shadow-lg">
                                    <div className="flex items-center mb-6" dir='rtl'>
                                        <span className="text-3xl text-green-500 mr-3" >🎯</span>
                                        <h2 className="text-2xl font-bold text-gray-800">رؤيتنا</h2>
                                    </div>
                                    <p className="text-lg leading-relaxed text-gray-600" dir='rtl'>{vision}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div
                            className={`w-full lg:w-2/3 max-w-2xl ${activeCard === 'mission' ? 'z-20' : 'z-10'}`}
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setActiveCard('mission')}
                            role="button"
                            aria-pressed={activeCard === 'mission'}
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && setActiveCard('mission')}
                        >
                            <div className="relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
                                <div className="relative bg-white p-12 rounded-2xl shadow-lg">
                                    <div className="flex items-center mb-6" dir='rtl'>
                                        <span className="text-3xl text-yellow-500 mr-3">🚀</span>
                                        <h2 className="text-2xl font-bold text-gray-800" >رسالتنا</h2>
                                    </div>
                                    <p className="text-lg leading-relaxed text-gray-600" dir='rtl'>{mission}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MessageSection;
