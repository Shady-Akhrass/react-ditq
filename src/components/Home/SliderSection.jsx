import React, { useEffect, useState, useCallback, memo } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet';

// Memoized image component
const OptimizedImage = memo(({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'
                }`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
        />
    );
});

const ImageSlider = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        axios.get('https://api.ditq.org/api/home/API', {
            signal: controller.signal
        })
            .then((response) => {
                setImages(response.data.images);
                setLoading(false);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error("Error fetching images:", error);
                    setLoading(false);
                }
            });

        return () => controller.abort();
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
        lazyLoad: true,
        initialSlide: 0,
        swipeToSlide: true
    };

    if (loading) {
        return (
            <div className="w-full h-screen bg-gray-100 animate-pulse" />
        );
    }

    return (
        <>
            <Helmet>
                <title>دار الإتقان - الصفحة الرئيسية</title>
                <meta name="description" content="الصفحة الرئيسية لدار الإتقان للقرآن الكريم" />
                {/* Preload first image */}
                {images[0] && (
                    <link rel="preload" as="image" href={images[0].image} />
                )}
            </Helmet>
            <section className="relative w-full h-auto">
                {/* Mobile View */}
                <div className="block md:hidden w-full h-[50vh]">
                    {images[0] && (
                        <OptimizedImage src={images[0].image} alt="Featured Image" />
                    )}
                </div>

                {/* Desktop Slider */}
                <div className="hidden md:block w-full h-screen overflow-hidden">
                    <Slider {...settings}>
                        {images.map((item) => (
                            <div key={item.id} className="w-full h-screen">
                                <OptimizedImage src={item.image} alt={`Slide ${item.id}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    );
};

export default memo(ImageSlider);
