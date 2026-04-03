import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    MapPin, Phone, Star, ArrowRight, CheckCircle2,
    Award, Clock, Users, Shield, Zap, Heart,
    Mountain, Waves, Bike, Tent, Car, Plane, Train, Hotel,
    Calendar, CreditCard, Headphones, Globe
} from 'lucide-react';
import Hero3D from '../components/Hero3D';
import PackageModal from '../components/PackageModal';
import { PACKAGES, ACTIVITIES, formatPrice } from '../data/packages';

// ─────────────────────────────────────────────────────────────
// Section 2 – Welcome to YatraGo
// ─────────────────────────────────────────────────────────────
const WelcomeSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Why Travelers Choose Us</span>
                    <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark leading-tight mb-5 sm:mb-6">
                        Where Ordinary Trips Become <span className="text-brand-gold">Iconic Memories</span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        YatraGo is a high-performance travel company from <strong>Haridwar, Uttarakhand</strong>. We design precision-planned journeys that blend comfort, speed, and wow-factor across North India's most unforgettable destinations.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Every itinerary is built by destination specialists with real ground experience. You get one trusted team for tours, hotels, transport, adventure, and pilgrimage planning from start to finish.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {[
                            { icon: <Award size={20} />, text: '10+ Years Experience' },
                            { icon: <Users size={20} />, text: '5000+ Happy Travelers' },
                            { icon: <MapPin size={20} />, text: '50+ Destinations' },
                            { icon: <Shield size={20} />, text: '100% Safe & Trusted' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                                <span className="text-brand-gold">{item.icon}</span>
                                <span className="text-brand-dark font-semibold text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/about-us" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-gold text-brand-dark font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow">
                        Learn More About Us <ArrowRight size={18} />
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                >
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
                        <img src="public/assets/Kedarnath 1.png" alt="Kedarnath" className="rounded-2xl h-40 sm:h-64 w-full object-cover shadow-lg" />
                        <img src="public/assets/Rishikesh.jpg" alt="Rishikesh Rafting" className="rounded-2xl h-40 sm:h-64 w-full object-cover shadow-lg mt-6 sm:mt-8" />
                        <img src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&q=80" alt="Kashmir Dal Lake" className="rounded-2xl h-32 sm:h-48 w-full object-cover shadow-lg -mt-3 sm:-mt-4" />
                        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80" alt="Manali Mountains" className="rounded-2xl h-32 sm:h-48 w-full object-cover shadow-lg mt-3 sm:mt-4" />
                    </div>
                    <div className="absolute -bottom-2 sm:-bottom-4 left-2 sm:-left-4 bg-brand-gold text-brand-dark px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg font-black text-center">
                        <div className="text-xl sm:text-2xl font-serif">5000+</div>
                        <div className="text-[10px] sm:text-xs font-bold">Happy Travelers</div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Section 3 – Journeys Built To Impress with real photos
// ─────────────────────────────────────────────────────────────
const PackageCard = ({ pkg, onViewDetails }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
    >
        <div className="relative h-48 sm:h-52 overflow-hidden">
            <img
                src={pkg.img}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute top-3 left-3 bg-brand-gold text-brand-dark text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider">{pkg.tag}</span>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 sm:gap-2 text-white text-[10px] sm:text-xs">
                <Star size={12} className="fill-brand-gold text-brand-gold" /> {pkg.rating} ({pkg.reviews} reviews)
            </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mb-2">
                <MapPin size={12} className="sm:w-[13px] sm:h-[13px]" /> {pkg.location}
            </div>
            <h3 className="font-bold text-brand-dark text-base sm:text-lg mb-2 font-serif leading-tight group-hover:text-brand-gold transition-colors">{pkg.title}</h3>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Clock size={12} className="sm:w-[13px] sm:h-[13px]" /> {pkg.days}</span>
            </div>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                    <span className="text-[10px] sm:text-xs text-gray-400">Starting from</span>
                    <div className="text-xl sm:text-2xl font-black text-brand-gold font-serif">{formatPrice(pkg.price)}</div>
                </div>
                <button
                    onClick={() => onViewDetails(pkg)}
                    className="bg-brand-dark text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:bg-brand-gold hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer"
                >
                    View Details <ArrowRight size={14} />
                </button>
            </div>
        </div>
    </motion.div>
);

const AwesomePackages = ({ onViewDetails }) => (
    <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Our Signature Plans</span>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">Journeys Built To Impress</h2>
                <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">Battle-tested itineraries for families, couples, pilgrims, and thrill seekers who want smooth execution and standout experiences.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {PACKAGES.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} onViewDetails={onViewDetails} />)}
            </div>
            <div className="text-center w-full">
                <Link to="/tour-packages" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border-2 border-brand-dark text-brand-dark font-bold px-8 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors">
                    View All Packages <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Section 4 – High-Value Deals. Fast-Closing Slots.
// ─────────────────────────────────────────────────────────────
const BestDeals = ({ onViewDetails }) => {
    const deals = PACKAGES.filter(p => ['haridwar-rishikesh-tour', 'rishikesh-adventure-tour', 'manali-tour-package'].includes(p.slug));
    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Limited Time Offers</span>
                    <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">High-Value Deals. Fast-Closing Slots.</h2>
                    <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">Secure premium departures before they fill up. Early booking gets better inventory and stronger savings.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                    {deals.map((pkg, i) => {
                        const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
                        return (
                            <motion.div
                                key={pkg.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                                onClick={() => onViewDetails(pkg)}
                            >
                                <div className="relative h-48 sm:h-56">
                                    <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <span className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-[10px] sm:text-xs font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{discount}% OFF</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                                    <p className="text-white/70 text-[10px] sm:text-xs mb-1 flex items-center gap-1"><Clock size={11} /> {pkg.days}</p>
                                    <h3 className="text-white font-bold font-serif mb-2 text-base sm:text-lg">{pkg.title}</h3>
                                    <div className="flex items-end gap-2 sm:gap-3">
                                        <span className="text-xl sm:text-2xl font-black text-brand-gold">{formatPrice(pkg.price)}</span>
                                        <span className="text-white/40 line-through text-[10px] sm:text-sm">{formatPrice(pkg.originalPrice)}</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1 text-brand-gold text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg text-center md:text-left">
                    <div>
                        <h3 className="text-brand-dark text-lg sm:text-xl font-bold font-serif">Flash Sale - Limited Slots</h3>
                        <p className="text-brand-dark/80 text-xs sm:text-sm mt-1 sm:mt-0">These departures move quickly. Call now and lock your seats before pricing changes.</p>
                    </div>
                    <a href="tel:+918979931256" className="w-full md:w-auto justify-center bg-brand-dark text-white font-bold px-7 py-3 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-2">
                        <Phone size={16} /> Call to Book
                    </a>
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────────────────────
// Section 5 – Adventure That Hits Different with real photos
// ─────────────────────────────────────────────────────────────
const AdventureActivities = () => (
    <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-brand-dark/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Thrills Await</span>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-white">Adventure That Hits Different</h2>
                <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm sm:text-base">From white-water rapids to high-altitude trails, every activity is handpicked for safety, intensity, and unforgettable energy.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {ACTIVITIES.map((act, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
                    >
                        <div className="relative h-36 sm:h-40 overflow-hidden">
                            <img src={act.img} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="p-4 sm:p-5">
                            <h3 className="text-lg sm:text-xl font-bold text-white font-serif mb-1">{act.name}</h3>
                            <p className="text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1"><MapPin size={11} />{act.location}</p>
                            <p className="text-white/60 text-xs sm:text-sm mb-4">{act.desc}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-brand-gold font-black text-base sm:text-lg">{act.price}</span>
                                <Link to="/activity" className="text-white/70 text-xs sm:text-sm font-bold hover:text-brand-gold transition-colors flex items-center gap-1">
                                    Book <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center">
                <Link to="/activity" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-gold text-brand-dark font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow">
                    Explore All Activities <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Section 6 – Best Taxi Services with real photos
// ─────────────────────────────────────────────────────────────
const vehicles = [
    { name: 'Swift Dzire', type: 'Sedan - 4+1 Seats', img: 'public/assets/Swift Dzire.jpg', tags: ['Budget', 'A/C'], badge: '* Economy' },
    { name: 'Ertiga', type: '7 Seats', img: 'public/assets/Ertiga.jpg', tags: ['A/C', 'Excellent'], badge: '* Budget' },
    { name: 'Innova Crysta', type: 'SUV - 6+1 Seats', img: 'public/assets/Crysta.jpg', tags: ['A/C', 'Luggage'], badge: '* Premium' },
    { name: 'Tempo Traveller', type: 'Van - 12 Seats', img: 'public/assets/Tempo Traveller 12+1 Seater Luxury.jpg', tags: ['Group Trips', 'A/C'], badge: '* Group Fav' },
];

const TaxiServices = () => (
    <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Ride in Comfort</span>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">Travel Logistics, Zero Stress</h2>
                <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">Verified vehicles and experienced mountain drivers for smooth, safe movement from city roads to steep hill routes.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                {vehicles.map((v, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                        <div className="relative h-36 sm:h-40 overflow-hidden">
                            <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80'; }} />
                        </div>
                        <div className="p-4 sm:p-5 text-center">
                            <span className="text-[10px] sm:text-xs bg-brand-gold/20 text-brand-gold font-bold px-2.5 py-1 rounded-full">{v.badge}</span>
                            <h3 className="text-lg sm:text-xl font-bold text-brand-dark mt-3 font-serif">{v.name}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm mb-4">{v.type}</p>
                            <div className="flex justify-center gap-2 flex-wrap">
                                {v.tags.map((t, j) => (
                                    <span key={j} className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full">{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { icon: <Shield size={24} />, title: 'Verified Drivers', desc: 'All drivers are police-verified and trained' },
                    { icon: <Clock size={24} />, title: '24/7 Service', desc: 'Round-the-clock availability, even on festivals' },
                    { icon: <CreditCard size={24} />, title: 'Transparent Pricing', desc: 'No hidden charges, fare quoted upfront' },
                    { icon: <Headphones size={24} />, title: 'Dedicated Support', desc: 'Trip coordinator assigned for every booking' },
                ].map((f, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                        <span className="text-brand-gold mt-0.5">{f.icon}</span>
                        <div>
                            <h4 className="font-bold text-brand-dark text-sm">{f.title}</h4>
                            <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <Link to="/services/car-rental" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-dark text-white font-bold px-8 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors shadow">
                    <Car size={18} /> Book a Vehicle
                </Link>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Section 7 – Travel Styles, Perfectly Matched with real destination photos
// ─────────────────────────────────────────────────────────────
const themes = [
    { label: 'Honeymoon', link: '/tour/romantic-himachal-honeymoon', img: 'public/assets/Romantic Himachal.png', desc: 'Romantic stays in Kashmir, Manali & Mussoorie' },
    { label: 'Religious Yatra', link: '/destination/uttarakhand', img: 'public/assets/Uttarakhand.jpg', desc: 'Char Dham, Haridwar & Kedarnath pilgrimage' },
    { label: 'Family Tours', link: '/tour-packages', img: 'https://res.cloudinary.com/jerrick/image/upload/v1678459920/640b441016713b001d851c82.jpg', desc: 'Kid-friendly comfortable family holiday packages' },
    { label: 'Corporate Groups', link: '/contact', img: 'https://5.imimg.com/data5/SELLER/Default/2022/1/SU/VL/NV/146195647/corporate-tours-service.jpeg', desc: 'Team outings & corporate retreat planning' },
    { label: 'Adventure Seekers', link: '/activity', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80', desc: 'Trekking, rafting, camping combo packs' },
    { label: 'Budget Travel', link: '/tour-packages', img: 'public/assets/Budget Tour.jpg', desc: 'Maximum experience, minimum spend packages' },
];

const ThemePackages = () => (
    <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Travel Your Way</span>
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">Travel Styles, Perfectly Matched</h2>
                <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">Choose your vibe and let us engineer the route, stay, and activities around your exact travel goals.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <Link to={theme.link} className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group relative">
                            <div className="relative h-48 sm:h-52 overflow-hidden">
                                <img src={theme.img} alt={theme.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                    <h3 className="text-white text-xl sm:text-2xl font-black font-serif mb-1">{theme.label}</h3>
                                    <p className="text-white/70 text-xs sm:text-sm">{theme.desc}</p>
                                    <div className="flex items-center gap-1 mt-2 sm:mt-3 text-brand-gold text-[10px] sm:text-sm font-bold tracking-wider sm:tracking-normal uppercase sm:capitalize">
                                        Explore <ArrowRight size={14} className="sm:w-[14px] sm:h-[14px] w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Section 8 – Online Booking CTA
// ─────────────────────────────────────────────────────────────
const OnlineBookingCTA = () => (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-dark via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-brand-dark/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Easy & Fast</span>
                    <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-white leading-tight mb-5 sm:mb-6">
                        Lock Your Next Escape <span className="text-brand-gold">In Minutes</span>
                    </h2>
                    <p className="text-white/70 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                        Send your plan once and our team moves fast. You receive a clear, personalized itinerary and booking confirmation without back-and-forth confusion.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {[
                            'Instant confirmation via WhatsApp and email',
                            'Flexible payment options: part or full',
                            'Free itinerary customization',
                            '24/7 support from inquiry to return',
                        ].map((pt, i) => (
                            <li key={i} className="flex items-center gap-3 text-white/80 text-xs sm:text-base">
                                <CheckCircle2 size={18} className="text-brand-gold shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                {pt}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-8 py-3.5 sm:py-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg text-sm sm:text-lg">
                            <Calendar size={20} className="w-4 h-4 sm:w-5 sm:h-5" /> Enquire Now
                        </Link>
                        <a href="tel:+918979931256" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-3.5 sm:py-4 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-colors text-sm sm:text-lg">
                            <Phone size={20} className="w-4 h-4 sm:w-5 sm:h-5" /> +91 8979931256
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:mt-0">
                    {[
                        { step: '01', icon: <MapPin size={28} className="w-5 h-5 sm:w-7 sm:h-7" />, title: 'Choose Destination', desc: 'Pick from 50+ curated destinations' },
                        { step: '02', icon: <Calendar size={28} className="w-5 h-5 sm:w-7 sm:h-7" />, title: 'Select Dates', desc: 'Tell us your travel window' },
                        { step: '03', icon: <Users size={28} className="w-5 h-5 sm:w-7 sm:h-7" />, title: 'Group Size', desc: 'Solo, couple, family or group' },
                        { step: '04', icon: <CreditCard size={28} className="w-5 h-5 sm:w-7 sm:h-7" />, title: 'Confirm & Pay', desc: 'Secure booking with flexible payment' },
                    ].map((step, i) => (
                        <div key={i} className="bg-white/8 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/12 transition-colors">
                            <span className="text-brand-gold text-[10px] sm:text-xs font-black tracking-widest">{step.step}</span>
                            <div className="text-brand-gold mt-2 mb-2 sm:mb-3">{step.icon}</div>
                            <h4 className="text-white font-bold text-xs sm:text-sm font-serif">{step.title}</h4>
                            <p className="text-white/50 text-[10px] sm:text-xs mt-1">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────
// Page: Home
// ─────────────────────────────────────────────────────────────
const Home = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <title>Yatra Go - Premium Travel & Tour Packages | Haridwar, Uttarakhand</title>
                <meta name="description" content="Yatra Go delivers high-impact tour packages, pilgrimage journeys, adventure activities, taxi services, and hotel bookings across Uttarakhand, Himachal Pradesh, and Kashmir." />
                <meta property="og:title" content="Yatra Go - Premium Travel & Tour Packages" />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* 1. Hero */}
            <Hero3D />
            {/* 2. Welcome to YatraGo */}
            <WelcomeSection />
            {/* 3. Journeys Built To Impress */}
            <AwesomePackages onViewDetails={setSelectedPackage} />
            {/* 4. Best Deals */}
            <BestDeals onViewDetails={setSelectedPackage} />
            {/* 5. Adventure That Hits Different */}
            <AdventureActivities />
            {/* 6. Taxi Services */}
            <TaxiServices />
            {/* 7. Travel Styles, Perfectly Matched */}
            <ThemePackages />
            {/* 8. Online Booking CTA */}
            <OnlineBookingCTA />

            {/* Package Detail Modal */}
            {selectedPackage && (
                <PackageModal
                    pkg={selectedPackage}
                    onClose={() => setSelectedPackage(null)}
                />
            )}
        </div>
    );
};

export default Home;

