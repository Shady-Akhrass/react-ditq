import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ditq.org/api/indexAPI')
            .then((response) => {
                setImages(response.data.images);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
                setLoading(false);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        draggable: false,
        touchMove: false,
        dotsClass: 'slick-dots custom-dots',
        customPaging: (i) => (
            <div className="w-full h-[3px] bg-white/50 rounded-full"></div>
        ),
    };

    return (
        <section className="relative w-full h-auto">
            <div className="w-full h-screen overflow-hidden">
                {loading ? (
                    // Skeleton loader when the images are being fetched
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                    </div>
                ) : (
                    <Slider {...settings} className="w-full h-full overflow-hidden">
                        {images.map((item) => (
                            <div key={item.id} className="w-full h-screen">
                                <img
                                    src={item.image}
                                    alt={`Slide ${item.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </section>

    );
};

export default ImageSlider;
