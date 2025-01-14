import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedBrandCarousel = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                setImages(response.data.successPartners);
                // console.error(response)
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);

    return (
        <section className="relative py-16 min-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">شركاء النجاح</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img
                                src={image.image}
                                alt={image.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBrandCarousel;
