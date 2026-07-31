import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import LoginModal from './LoginModal';
import BookingModal from './BookingModal';
import { ConfirmPopup } from './ui';

const Navbar = () => {
    const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState('');
    const { currentUser, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        handleScroll(); // Set initial state
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        if (!auth) return;

        try {
            await signOut(auth);
            setLogoutPopupOpen(false);
            setIsMobileMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'Packages',
            path: '/tour-packages',
            megaMenu: [
                {
                    region: 'Uttarakhand',
                    regionPath: '/tour-packages?region=Uttarakhand',
                    items: [
                        { name: 'Char Dham Yatra', path: '/chardham-yatra-from-haridwar', badge: 'Bestseller' },
                        { name: 'Rishikesh Adventure', path: '/tour/rishikesh-adventure-tour', badge: 'Trending' },
                        { name: 'Nainital Lake Tour', path: '/tour/nainital-lake-tour' },
                        { name: 'Mussoorie Hill Escape', path: '/tour/mussoorie-hill-escape' },
                        { name: 'Jim Corbett Safari', path: '/tour/jim-corbett-wildlife-safari' },
                        { name: 'Auli Snow Adventure', path: '/auli-tour-package' },
                        { name: 'Haridwar Spiritual Tour', path: '/tour/haridwar-spiritual-sojourn' },
                    ]
                },
                {
                    region: 'Himachal Pradesh',
                    regionPath: '/tour-packages?region=Himachal Pradesh',
                    items: [
                        { name: 'Shimla & Manali Tour', path: '/tour/shimla-manali-tour', badge: 'Bestseller' },
                        { name: 'Dharamshala & Dalhousie', path: '/tour/dharamshala-dalhousie-tour' },
                        { name: 'Spiti Valley Adventure', path: '/tour/spiti-valley-adventure', badge: 'Adventure' },
                        { name: 'Kasol & Kheerganga Trek', path: '/tour/kasol-kheerganga-trek' },
                        { name: 'Himachal Honeymoon', path: '/tour/romantic-himachal-honeymoon', badge: 'Couple' },
                    ]
                },
            ]
        },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Activity', path: '/activity' },
        {
            name: 'Our Services',
            path: '#',
            dropdown: [
                { name: 'Travel Blog', path: '/blog' },
                { name: 'Car Rental', path: '/haridwar-taxi-service' },
                { name: 'Bike Rental', path: '/services/bike-rental' },
                { name: 'Hotel Booking', path: '/services/hotel' }
            ]
        },
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    // Handle Mobile Dropdown Toggles
    const [openDropdowns, setOpenDropdowns] = useState({});
    const toggleDropdown = (name) => {
        setOpenDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleNavPointerMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        event.currentTarget.style.setProperty('--mx', `${x}%`);
        event.currentTarget.style.setProperty('--my', `${y}%`);
        event.currentTarget.style.setProperty('--nav-glow-opacity', '1');
    };

    const handleNavPointerLeave = (event) => {
        event.currentTarget.style.setProperty('--nav-glow-opacity', '0');
        setHoveredLink('');
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[120] transition-all duration-500 font-sans">

                <div className={`hidden sm:block overflow-hidden transition-all duration-500 w-full border-b border-white/10 ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <div className="flex gap-6">
                            <a href="tel:+918979931256" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                                <Phone size={10} className="text-brand-gold" /> +91 89799-31256
                            </a>
                            <a href="mailto:sales.yatrago@gmail.com" className="flex items-center gap-2 hover:text-brand-azure transition-colors">
                                <Mail size={10} />sales.yatrago@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-4 opacity-60">
                            <Facebook size={10} className="hover:text-brand-gold cursor-pointer" href="https://www.facebook.com/profile.php?id=61570195815554" />
                            <Instagram size={10} className="hover:text-brand-gold cursor-pointer" href="https://www.instagram.com/yatrago_official/" />
                            <Youtube size={10} className="hover:text-brand-gold cursor-pointer" href="https://www.youtube.com/@YatraGo-q4o" />
                        </div>
                    </div>
                </div>

                <nav
                    className={`transition-all duration-700 relative w-full border-b ${isScrolled
                        ? 'border-slate-200 bg-white/95 py-2 shadow-sm'
                        : 'border-white/20 bg-white/80 py-3 lg:py-5'
                        } backdrop-blur-[40px] shadow-sm`}
                    onMouseMove={handleNavPointerMove}
                    onMouseLeave={handleNavPointerLeave}
                    style={{
                        '--mx': '50%',
                        '--my': '0%',
                        '--nav-glow-opacity': '0',
                        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                >
                    {/* 🌟 PREMIUM GLASS HIGHLIGHT 🌟 */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center w-full lg:gap-4 xl:gap-8">

                            {/* Logo - Left Side with Magnetic Effect */}
                            <div className="flex shrink-0 items-center">
                                <Link to="/"
                                    className="flex items-center gap-3 group whitespace-nowrap transition-transform duration-500 hover:scale-105"
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = (e.clientX - rect.left - rect.width / 2) / 4;
                                        const y = (e.clientY - rect.top - rect.height / 2) / 4;
                                        e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = `translate(0px, 0px)`;
                                    }}
                                >
                                    <div className="relative">
                                        <img
                                            src={logoSrc}
                                            alt="Yatra Go"
                                            className="h-8 sm:h-10 xl:h-12 w-auto object-contain transition-all duration-500"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
                                        />
                                        <div className="absolute inset-0 bg-brand-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                    <span className="text-2xl xl:text-3xl font-serif font-black text-slate-900 tracking-tighter hidden">
                                        Yatra <span className="text-brand-gold">Go</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation - Centered Single Line */}
                            <div className="hidden lg:flex justify-center items-center whitespace-nowrap">
                                <div className="flex space-x-1 xl:space-x-1.5 bg-slate-900/5 p-1 rounded-[1.5rem] border border-slate-200/50 backdrop-blur-xl shadow-inner">
                                    {navLinks.map((link) => (
                                        <div
                                            key={link.name}
                                            className="relative group"
                                            onMouseEnter={() => setHoveredLink(link.name)}
                                            onMouseLeave={() => setHoveredLink('')}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`relative isolate flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] xl:text-[13px] font-black uppercase tracking-widest transition-all duration-300
                                            ${isActive(link.path) ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                            >
                                                {isActive(link.path) && (
                                                    <motion.span
                                                        layoutId="navbar-active-pill"
                                                        className="absolute inset-0 -z-10 rounded-xl bg-brand-gold shadow-xl shadow-brand-gold/20"
                                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                    />
                                                )}
                                                {!isActive(link.path) && hoveredLink === link.name && (
                                                    <motion.span
                                                        layoutId="navbar-hover-pill"
                                                        className="absolute inset-0 -z-10 rounded-xl bg-white shadow-md border border-slate-200/50"
                                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                                    />
                                                )}
                                                <span>{link.name}</span>
                                                {(link.dropdown || link.megaMenu) && (
                                                    <ChevronDown size={14} className={`mt-0.5 transition-transform duration-300 ${hoveredLink === link.name ? 'rotate-180 text-brand-gold' : ''}`} />
                                                )}
                                            </Link>

                                            {/* Mega Menu — for Packages */}
                                            {link.megaMenu && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-[140]">
                                                    <div className="flex w-max min-w-[750px] gap-8 rounded-[2.5rem] border border-slate-200 bg-white px-10 py-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                                                        {link.megaMenu.map((group) => (
                                                            <div key={group.region} className="flex-1 min-w-[220px]">
                                                                <Link to={group.regionPath}
                                                                    className="mb-4 block border-b border-slate-100 pb-3 text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold transition-colors hover:text-brand-dark">
                                                                    {group.region}
                                                                </Link>
                                                                <div className="space-y-1">
                                                                    {group.items.map(item => (
                                                                        <Link key={item.name} to={item.path}
                                                                            onClick={() => window.scrollTo(0, 0)}
                                                                            className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-brand-dark">
                                                                            <span>{item.name}</span>
                                                                            {item.badge && (
                                                                                <span className="ml-2 shrink-0 rounded-full bg-brand-gold/20 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-brand-gold">{item.badge}</span>
                                                                            )}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Standard Dropdown — for Our Services */}
                                            {link.dropdown && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-left z-[140]">
                                                    <div className="relative flex flex-col rounded-[1.5rem] border border-slate-200 bg-white py-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                                                        {link.dropdown.map(subItem => (
                                                            <Link
                                                                key={subItem.name}
                                                                to={subItem.path}
                                                                className="block px-6 py-3 text-[14px] font-bold text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-brand-dark hover:translate-x-1"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Auth & Booking Actions - Right Side */}
                            <div className="hidden lg:flex items-center justify-end shrink-0 gap-3">
                                {currentUser ? (
                                    <div className="flex items-center gap-2">
                                        <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                                            className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-brand-dark px-5 py-2.5 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-brand-gold hover:text-brand-dark shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] ring-1 ring-white/10 hover:-translate-y-0.5">
                                            <Sparkles size={14} className="text-brand-gold animate-pulse" />
                                            <span>{isAdmin ? 'Admin Panel' : 'My Lounge'}</span>
                                        </Link>
                                        <button onClick={() => setLogoutPopupOpen(true)}
                                            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:border-rose-500/30 hover:text-rose-500 transition-all shadow-sm" title="Logout">
                                            <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setBookingModalOpen(true)} className="group relative isolate overflow-hidden whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-[12px] font-black uppercase tracking-[0.2em] text-slate-600 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/50 hover:text-brand-dark hover:shadow-[0_20px_40px_-24px_rgba(8,38,61,0.45)] cursor-pointer">
                                            <span className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(45, 129, 212, 0.85))]" />
                                            <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(240,184,60,0.22),transparent_48%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <span className="absolute -left-10 top-1/2 -z-10 h-16 w-10 -translate-y-1/2 rotate-12 bg-white/90 blur-sm transition-all duration-700 group-hover:left-[120%]" />
                                            <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <span className="relative flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-brand-gold transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_14px_rgba(240,184,60,0.9)]" />
                                                Enquire
                                            </span>
                                        </button>
                                        <button onClick={() => setLoginModalOpen(true)} className="whitespace-nowrap rounded-2xl bg-brand-gold px-6 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-brand-dark shadow-[0_10px_25px_-5px_rgba(255,165,0,0.4)] transition-all duration-300 hover:bg-brand-dark hover:text-white hover:-translate-y-1 cursor-pointer">
                                            Sign in
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button  */}
                            <div className="lg:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white text-brand-dark transition-all active:scale-95 shadow-xl border border-slate-200"
                                >
                                    {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Drawer */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                className="lg:hidden absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-2xl z-[130] max-h-[calc(100vh-80px)] overflow-y-auto flex flex-col"
                            >
                                <div className="px-4 py-4 sm:p-6 flex flex-col w-full">
                                    {/* Compact Quick Contact Row */}
                                    <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                        <a href="tel:+918979931256" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-[11px] font-black text-slate-900 border border-slate-200/50 shadow-sm leading-none">
                                            <Phone size={12} className="text-brand-gold" /> +91 89799 31256
                                        </a>
                                        <div className="flex gap-2 text-slate-400">
                                            <a href="https://www.facebook.com/profile.php?id=61570195815554" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Facebook size={14} /></a>
                                            <a href="https://www.instagram.com/yatrago_official/" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Instagram size={14} /></a>
                                            <a href="https://www.youtube.com/@YatraGo-q4o" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Youtube size={14} /></a>
                                        </div>
                                    </div>

                                    {/* Navigation Links */}
                                    <div className="space-y-1">
                                        {navLinks.map((link) => (
                                            <div key={link.name} className="w-full">
                                                <div
                                                    className={`flex justify-between items-center w-full rounded-xl px-4 py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all cursor-pointer
                                                ${isActive(link.path) ? 'bg-brand-gold text-brand-dark shadow-sm' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-50'}`}
                                                    onClick={() => (link.dropdown || link.megaMenu) ? toggleDropdown(link.name) : setIsMobileMenuOpen(false)}
                                                >
                                                    <Link to={(link.dropdown || link.megaMenu) ? '#' : link.path} className="flex-1">{link.name}</Link>
                                                    {(link.dropdown || link.megaMenu) && (
                                                        <ChevronDown size={14} className={`transition-transform duration-500 ${openDropdowns[link.name] ? 'rotate-180 text-brand-gold' : ''}`} />
                                                    )}
                                                </div>

                                                <AnimatePresence>
                                                    {(link.megaMenu || link.dropdown) && openDropdowns[link.name] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden bg-slate-50/50 rounded-xl mt-1 border border-slate-100/50"
                                                        >
                                                            {link.megaMenu ? link.megaMenu.map((group) => (
                                                                <div key={group.region} className="border-b border-slate-200/50 last:border-0 p-2 sm:p-3">
                                                                    <div className="pl-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold mb-1.5">{group.region}</div>
                                                                    {group.items.map(item => (
                                                                        <Link key={item.name} to={item.path}
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                            className="flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-bold text-slate-600 hover:text-brand-dark hover:bg-white transition-all">
                                                                            <span>{item.name}</span>
                                                                            {item.badge && <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[8px] font-black text-brand-gold">{item.badge}</span>}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )) : link.dropdown.map(subItem => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    to={subItem.path}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="block px-6 py-2.5 text-[11px] font-bold text-slate-600 hover:text-brand-dark hover:bg-white transition-all border-b border-slate-100 last:border-0"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-2.5 py-4 mt-2 border-t border-slate-100">
                                        {currentUser ? (
                                            <>
                                                <Link
                                                    to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="w-full rounded-xl bg-brand-dark px-5 py-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white shadow-md flex items-center justify-center gap-2"
                                                >
                                                    <Sparkles size={14} className="text-brand-gold animate-pulse" />
                                                    {isAdmin ? 'Admin Panel' : 'My Lounge'}
                                                </Link>
                                                <button
                                                    onClick={() => setLogoutPopupOpen(true)}
                                                    className="w-full rounded-xl bg-rose-50 px-5 py-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-rose-500 border border-rose-100 flex items-center justify-center gap-2"
                                                >
                                                    <LogOut size={14} /> Logout Account
                                                </button>
                                            </>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3">
                                                <button onClick={() => { setIsMobileMenuOpen(false); setBookingModalOpen(true); }} className="rounded-xl border border-slate-200 py-3 text-center text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
                                                    Enquire
                                                </button>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="rounded-xl bg-brand-gold py-3 text-center text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-brand-dark shadow-md active:scale-95 transition-all"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
            {loginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
            <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
            <ConfirmPopup
                open={logoutPopupOpen}
                onCancel={() => setLogoutPopupOpen(false)}
                onConfirm={handleLogout}
                title="Are you sure you want to end your session?"
                confirmLabel="Log Out"
                cancelLabel="Stay Connected"
            />
        </>
    );
};

export default Navbar;
