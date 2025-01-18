import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaHome, FaInfoCircle, FaBookOpen, FaNewspaper, FaBook, FaPhoneAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import Logo from '../../../public/logo.png';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageTitle, setPageTitle] = useState('دار الإتقان - الصفحة الرئيسية');
    const location = useLocation();

    const menuItems = [
        {
            icon: <FaHome className="text-xl" />,
            label: 'الرئيسية',
            link: '/home',
            id: 'home'
        },
        {
            icon: <FaInfoCircle className="text-xl" />,
            label: 'عن الدار',
            id: 'about',
            submenu: [
                { label: 'مجلس الإدارة', link: '/director', id: 'director' },
                { label: 'الرؤية والرسالة', link: '/vision', id: 'vision' },
                { label: 'كلمة رئيس الدار', link: '/speech', id: 'speech' },
                { label: 'الفروع', link: '/branches', id: 'branches' }
            ]
        },
        {
            icon: <FaBookOpen className="text-xl" />,
            label: 'أقسام الدار',
            id: 'departments',
            submenu: [
                { label: 'قسم تحفيظ القرآن الكريم', link: '/memorization-section', id: 'memorization' },
                { label: 'قسم الدورات والتجويد والأسانيد', link: '/courses-section', id: 'course' },
                { label: 'قسم ديوان الحفاظ', link: '/diwan-section', id: 'diwan' },
                { label: 'قسم التربية والمواهب الإبداعية', link: '/creatives-section', id: 'creative' },
                { label: 'قسم الأنشطة والمسابقة', link: '/activities-section', id: 'activity' }
            ]
        },
        {
            icon: <FaNewspaper className="text-xl" />,
            label: 'قسم الأخبار',
            link: '/news',
            id: 'news'
        },
        {
            icon: <FaBook className="text-xl" />,
            label: 'أدلة الدار',
            link: '/clues',
            id: 'clues'
        },
        {
            icon: <FaPhoneAlt className="text-xl" />,
            label: 'تواصل معنا',
            link: '/contact-us',
            id: 'contact-us'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to find menu item or submenu item by path
    const findMenuItemByPath = (path) => {
        // Remove leading slash for comparison
        const normalizedPath = path.replace(/^\//, '');

        // Check main menu items
        let menuItem = menuItems.find(item => item.link?.replace(/^\//, '') === normalizedPath);

        // If not found in main menu, check submenus
        if (!menuItem) {
            for (const item of menuItems) {
                if (item.submenu) {
                    const subItem = item.submenu.find(sub =>
                        sub.link?.replace(/^\//, '') === normalizedPath
                    );
                    if (subItem) {
                        return { mainItem: item, subItem };
                    }
                }
            }
        }

        return { mainItem: menuItem };
    };

    // Update selected item and page title based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        const { mainItem, subItem } = findMenuItemByPath(currentPath);

        // Set selected item based on current path
        if (subItem) {
            setSelectedItem(subItem.id);
            setOpenDropdown(mainItem.id);
            setPageTitle(`${subItem.label} | ${mainItem.label} | دار إتقان القرآن الكريم`);
        } else if (mainItem) {
            setSelectedItem(mainItem.id);
            // Special case for home route
            if (mainItem.id === 'home') {
                setPageTitle('دار الإتقان - الصفحة الرئيسية');
            } else {
                setPageTitle(`${mainItem.label} | دار إتقان القرآن الكريم`);
            }
        }

        // Save to localStorage for persistence
        if (subItem) {
            localStorage.setItem('selectedItem', subItem.id);
            localStorage.setItem('openDropdown', mainItem.id);
        } else if (mainItem) {
            localStorage.setItem('selectedItem', mainItem.id);
            localStorage.setItem('openDropdown', '');
        }
    }, [location.pathname]);

    // Restore selected state on component mount
    useEffect(() => {
        const savedSelectedItem = localStorage.getItem('selectedItem');
        const savedOpenDropdown = localStorage.getItem('openDropdown');

        if (savedSelectedItem) {
            setSelectedItem(savedSelectedItem);
        }
        if (savedOpenDropdown) {
            setOpenDropdown(savedOpenDropdown);
        }
    }, []);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
        localStorage.setItem('openDropdown', openDropdown === dropdownName ? '' : dropdownName);
    };

    const handleItemClick = (item, parentItem) => {
        setSelectedItem(item);
        setNavOpen(false);

        // Save state to localStorage
        localStorage.setItem('selectedItem', item);
        if (parentItem) {
            localStorage.setItem('openDropdown', parentItem);
        } else {
            localStorage.setItem('openDropdown', '');
        }
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageTitle} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageTitle} />
                <meta property="og:image" content="URL_to_image" />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageTitle} />
                <meta name="twitter:image" content="URL_to_image" />
            </Helmet>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <nav className="container mx-auto flex items-center justify-between px-6 py-2" dir="rtl">
                    <div className="flex items-center justify-between w-screen" dir='rtl'>
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-2xl bg-white px-2 py-2 rounded left-0"
                            onClick={() => setNavOpen(!navOpen)}
                        >
                            {navOpen ? <FaTimes /> : <FaBars />}
                        </button>

                        {/* Logo */}
                        <div className="logo bg-white rounded-full">
                            <Link to="/home" onClick={() => handleItemClick('home')}>
                                <img src={Logo} alt="Logo" className="h-14 ml-2 mr-2" />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center justify-left space-x-8 space-x-reverse bg-white rounded-full p-2 px-8 w-max mx-auto my-auto">
                            {menuItems.map((item) => (
                                <div key={item.id} className="relative">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className={`flex items-center text-lg font-medium hover:text-green-600 ${openDropdown === item.id ? 'text-green-600' : ''}`}
                                            >
                                                {item.label} <FaChevronDown className="mr-2" />
                                            </button>
                                            {openDropdown === item.id && (
                                                <ul className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-10">
                                                    {item.submenu.map((subItem) => (
                                                        <li key={subItem.id}>
                                                            <Link
                                                                to={subItem.link}
                                                                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${selectedItem === subItem.id ? 'bg-green-100 text-green-600' : ''}`}
                                                                onClick={() => handleItemClick(subItem.id, item.id)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.link}
                                            className={`text-lg font-medium hover:text-green-600 ${selectedItem === item.id ? 'text-green-600' : ''}`}
                                            onClick={() => handleItemClick(item.id)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`fixed inset-0 bg-white z-50 lg:hidden transition-transform duration-300 transform ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex justify-between items-right p-6 border-b">
                            <button
                                className="text-2xl"
                                onClick={() => setNavOpen(false)}
                            >
                                <FaTimes />
                            </button>
                            <img src={Logo} alt="Logo" className="h-12" />
                        </div>
                        <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
                            {menuItems.map((item) => (
                                <div key={item.id} className="mb-4">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className={`flex items-center w-full text-lg font-medium py-2 ${openDropdown === item.id ? 'text-green-600' : ''}`}
                                            >
                                                {item.icon}
                                                <span className="mr-3">{item.label}</span>
                                                <FaChevronDown className="mr-auto" />
                                            </button>
                                            <div
                                                className={`mt-2 pr-8 space-y-2 ${openDropdown === item.id ? 'block' : 'hidden'}`}
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.id}
                                                        to={subItem.link}
                                                        className={`block py-2 text-sm ${selectedItem === subItem.id ? 'text-green-600' : ''}`}
                                                        onClick={() => handleItemClick(subItem.id, item.id)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.link}
                                            className={`flex items-center text-lg font-medium py-2 ${selectedItem === item.id ? 'text-green-600' : ''}`}
                                            onClick={() => handleItemClick(item.id)}
                                        >
                                            {item.icon}
                                            <span className="mr-3">{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="mt-6">
                                <a
                                    href="https://wa.me/+972592889891"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-green-400 text-white text-center px-4 py-2 rounded-full text-lg hover:bg-green-600"
                                >
                                    تبرع لنا
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Search Box */}
                    <form
                        className={`search-box hidden lg:flex items-center transition-all duration-300 rounded-full ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
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
                </nav>
            </header>
        </>
    );
};

export default Navbar;