import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
    Users, Book, GraduationCap, Trophy,
    School, BookOpen, Calendar, UserCheck
} from 'lucide-react';

const AchievementsSection = () => {
    const [achievements, setAchievements] = useState([]);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        fetch('https://ditq.org/api/indexAPI')
            .then(res => res.json())
            .then(data => setAchievements(data.homes))
            .catch(error => console.error("Error fetching achievements:", error));
    }, []);

    const stats = achievements.length > 0 ? [
        { icon: <Users className="w-8 h-8" />, value: achievements[0].student_number, label: "عدد الطلاب" },
        { icon: <UserCheck className="w-8 h-8" />, value: achievements[0].teacher_number, label: "عدد المعلمين" },
        { icon: <Book className="w-8 h-8" />, value: achievements[0].course_number, label: "عدد الدورات" },
        { icon: <GraduationCap className="w-8 h-8" />, value: achievements[0].memorizing_number, label: "عدد الحفاظ" },
        { icon: <Trophy className="w-8 h-8" />, value: achievements[0].contest_number, label: "عدد المسابقات" },
        { icon: <School className="w-8 h-8" />, value: achievements[0].camp_number, label: "عدد المخيمات" },
        { icon: <BookOpen className="w-8 h-8" />, value: achievements[0].lesson_number, label: "عدد الدروس" },
        { icon: <Calendar className="w-8 h-8" />, value: achievements[0].celebration_number, label: "عدد الحفلات" },
    ] : [];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (

        <section className="py-16" ref={ref}>

            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12 text-emerald-900 font-arabic"
                >
                    إنجازات الدار
                </motion.h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group"
                        >
                            {/* Main Card */}
                            <div className="bg-white rounded-lg shadow-sm  border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                                {/* Top Header Section */}
                                <div className="bg-green-600 px-6 py-4 border-b border-green-100 rounded-tl-3xl">
                                    <div className="flex items-center justify-center space-x-3 space-x-reverse">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                            className="p-2  rounded-lg text-white shadow-sm"
                                        >
                                            {stat.icon}
                                        </motion.div>
                                        <div className="text-lg font-medium text-white font-arabic ">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Content Section */}
                                <div className="px-6 py-6 bg-gradient-to-b from-white to-gray-50 rounded-br-3xl">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-black">
                                            {inView && (
                                                <CountUp
                                                    end={parseInt(stat.value)}
                                                    duration={2.5}
                                                    separator=","
                                                />
                                            )}
                                            <span className="text-gray-700">+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Accent Line */}
                                <div className="h-1 w-full bg-gradient-to-r from-green-600 to-green-700 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;