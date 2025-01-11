import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import Logo from '../../public/logo.png';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Track selected item

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the clicked item as selected
    };

    return (
        <>
            <Helmet>
                <title>Header - Your Website</title>
                <meta name="description" content="Description of your website's header section." />
                <meta property="og:title" content="Header - Your Website" />
                <meta property="og:description" content="Description of your website's header section." />
                <meta property="og:image" content="URL_to_image" />
                <meta property="og:url" content="URL_to_page" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Header - Your Website" />
                <meta name="twitter:description" content="Description of your website's header section." />
                <meta name="twitter:image" content="URL_to_image" />
            </Helmet>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <nav className="container mx-auto flex items-center justify-between px-6 py-2" dir="rtl">
                    {/* Logo */}
                    <div className="logo hidden lg:block bg-white rounded-full">
                        <Link to="/home">
                            <img src={Logo} alt="Logo" className="h-14 ml-4 mr-4 " />
                        </Link>
                    </div>

                    {/* Links */}
                    <div
                        className={`nav-links fixed lg:static right-0 top-0 w-full h-screen lg:h-auto lg:flex items-center justify-between bg-white lg:bg-transparent transition-all duration-500 ${navOpen ? 'right-0' : '-right-full'
                            } lg:w-auto px-6 lg:px-0`}
                    >
                        <ul className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 lg:space-x-reverse bg-white rounded-full">
                            <li>
                                <Link
                                    to="/home"
                                    className={`mr-4 text-lg font-medium hover:text-green-600 ${selectedItem === 'home' ? 'text-green-600' : ''}`}
                                    onClick={() => handleItemClick('home')}
                                >
                                    الرئيسية
                                </Link>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => toggleDropdown('about')}
                                    className="flex items-center text-lg font-medium hover:text-green-600"
                                >
                                    عن الدار <FaChevronDown className="mr-2" />
                                </button>
                                {openDropdown === 'about' && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                                        <li>
                                            <Link
                                                to="/director"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'director' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('director')}
                                            >
                                                مجلس الإدارة
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/vision"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'vision' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('vision')}
                                            >
                                                الرؤية والرسالة
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/speech"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'speech' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('speech')}
                                            >
                                                كلمة رئيس الدار
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/branches"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'branches' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('branches')}
                                            >
                                                الفروع
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => toggleDropdown('departments')}
                                    className="flex items-center text-lg font-medium hover:text-green-600"
                                >
                                    أقسام الدار <FaChevronDown className="mr-2" />
                                </button>
                                {openDropdown === 'departments' && (
                                    <ul className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-10">
                                        <li>
                                            <Link
                                                to="/memorization"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'memorization' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('memorization')}
                                            >
                                                قسم تحفيظ القرآن الكريم
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/course"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'course' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('course')}
                                            >
                                                قسم الدورات والتجويد والأسانيد
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/diwan"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'diwan' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('diwan')}
                                            >
                                                قسم ديوان الحفاظ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/creative"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'creative' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('creative')}
                                            >
                                                قسم التربية والمواهب الإبداعية
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/activity"
                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === 'activity' ? 'bg-green-100 text-green-600' : ''}`}
                                                onClick={() => handleItemClick('activity')}
                                            >
                                                قسم الأنشطة والمسابقة
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className={`text-lg font-medium hover:text-green-600 ${selectedItem === 'news' ? 'text-green-600' : ''}`}
                                    onClick={() => handleItemClick('news')}
                                >
                                    قسم الأخبار
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/clues"
                                    className={`text-lg font-medium hover:text-green-600 ${selectedItem === 'clues' ? 'text-green-600' : ''}`}
                                    onClick={() => handleItemClick('clues')}
                                >
                                    أدلة الدار
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact-us"
                                    className={`ml-4 text-lg font-medium hover:text-green-600 ${selectedItem === 'contact-us' ? 'text-green-600' : ''}`}
                                    onClick={() => handleItemClick('contact-us')}
                                >
                                    تواصل معنا
                                </Link>
                            </li>

                        </ul>
                        <button className='m-4'>
                            <a
                                href="https://wa.me/+972592889891"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-400 text-white px-4 py-2 rounded-full text-lg hover:bg-green-600"
                            >
                                تبرع لنا
                            </a>
                        </button>
                    </div>

                    {/* Search Box */}
                    <form
                        className={`search-box flex items-center transition-all duration-300 rounded-full ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
                        role="search"
                        method="GET"
                        action="/itqan/search"
                    >
                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                placeholder="بحث..."
                                className="border border-gray-300 rounded-full px-4 py-2 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </form>

                    {/* Hamburger Icon for Mobile View */}
                    <div className="text-3xl cursor-pointer lg:hidden" onClick={() => setNavOpen(!navOpen)}>
                        {navOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
