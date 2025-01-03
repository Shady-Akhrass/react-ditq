import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PartnersSection = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                // Assuming partners are under 'partners'
                setPartners(response.data.partners);
            })
            .catch((error) => {
                console.error("Error fetching partners:", error);
            });
    }, []);

    return (
        <section className="bg-gray-200 py-8">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">شركاؤنا</h2>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {partners.map((partner, index) => (
                            <div key={index} className="swiper-slide">
                                <div className="flex justify-center">
                                    <img src={partner.logo} alt={partner.name} className="h-20 w-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
