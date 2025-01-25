import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Facebook, Home, ChevronLeft } from 'lucide-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Helmet } from 'react-helmet';

const carouselStyles = `
  .carousel .control-dots .dot {
    background: #22c55e !important;
    box-shadow: none !important;
    width: 10px !important;
    height: 10px !important;
  }
  .carousel .control-dots .dot.selected {
    background: #16a34a !important;
  }
  .carousel .slide {
    transition: opacity 0.5s ease-in-out !important;
  }
`;

const CoursesSection = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://ditq.org/api/course/API')
            .then(response => {
                const coursesData = Array.isArray(response.data) ? response.data : [response.data];
                setCourses(coursesData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
                setError('Failed to load courses');
                setLoading(false);
            });
    }, []);

    const getMetaDescription = () => {
        if (courses?.length > 0 && courses[0].courses[0]) {
            return courses[0].courses[0].about.substring(0, 160) + '...';
        }
        return "قسم الدورات والتجويد والأسانيد في دار الإتقان - دورات متخصصة في علوم القرآن والتجويد";
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!courses?.length) return <div>No courses found</div>;

    const metaDescription = getMetaDescription();

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>قسم الدورات والتجويد والأسانيد - دار الإتقان</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`دار الإتقان, دورات, تجويد, أسانيد, علوم القرآن${courses.length > 0 ? `, ${courses[0].courses[0]?.title || ''}` : ''}`} />
                <meta property="og:title" content="قسم الدورات والتجويد والأسانيد - دار الإتقان" />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                {courses.length > 0 && courses[0].course_images && courses[0].course_images.length > 0 && (
                    <meta property="og:image" content={`https://ditq.org/storage/${courses[0].course_images[0].image}`} />
                )}
            </Helmet>
            <style>{carouselStyles}</style>

            {/* Navigation Path */}
            <div className="max-w-7xl mx-auto mb-6" dir="rtl">
                <nav className="flex items-center text-gray-600 text-sm">
                    <Link to="/" className="flex items-center hover:text-green-600">
                        <Home className="w-4 h-4 ml-1" />
                        الرئيسية
                    </Link>
                    <ChevronLeft className="w-4 h-4 mx-2" />
                    <span className="text-green-600">
                        قسم الدورات والتجويد والأسانيد
                    </span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Facebook Section */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="sticky top-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900">آخر المنشورات</h2>
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/dar.etqan.gaza"
                                    data-tabs="timeline"
                                    data-width="450"
                                    data-height="500"
                                    data-small-header="true"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="false"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                    <h2 className="text-3xl font-bold mb-8 text-center">قسم الدورات والتجويد والأسانيد</h2>
                    {courses.map(course => (
                        <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                            {course.course_images && course.course_images.length > 0 && (
                                <Carousel
                                    showThumbs={false}
                                    showStatus={false}
                                    infiniteLoop
                                    useKeyboardArrows
                                    autoPlay
                                    interval={5000}
                                    transitionTime={500}
                                    stopOnHover
                                    swipeable
                                    emulateTouch
                                    className="aspect-video"
                                >
                                    {course.course_images.map(image => (
                                        <div key={image.id} className="relative aspect-video">
                                            <img
                                                src={`https://ditq.org/storage/${image.image}`}
                                                alt="Course"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                            <div className="p-6">
                                <p className="text-gray-800 text-right leading-relaxed">
                                    {course.courses[0].about}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesSection;
