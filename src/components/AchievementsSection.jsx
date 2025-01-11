import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AchievementsSection = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                // Assuming achievements are under 'achievements'
                setAchievements(response.data.achievements);
                console.log(response.data.achievements);
            })
            .catch((error) => {
                console.error("Error fetching achievements:", error);
            });
    }, []);

    return (
        <section className="relative py-16 min-h-screen overflow-hidden">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">إنجازات الدار خلال 16 عامًا</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="bg-blue-500 text-white p-4 rounded-lg">
                            <div className="text-4xl font-bold mb-2">{achievement.value}</div>
                            <p className="text-lg">{achievement.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
