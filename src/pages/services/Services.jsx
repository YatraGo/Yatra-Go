import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import VehicleBookingModal from '../../components/VehicleBookingModal';
import VehicleSidebarModal from '../../components/VehicleSidebarModal';
import ServiceEnquiryCard from '../../components/ServiceEnquiryCard';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { normalizeAssetFields } from '../../lib/assets';
import {
    Hotel, Car, Train, Plane, Bike, CheckCircle2, Phone, MessageCircle,
    ArrowRight, Shield, Star, Clock, Users, MapPin
} from 'lucide-react';

const SERVICES_DATA = {
    hotel: {
        title: 'Hotel Booking',
        subtitle: '🏨 Comfort at Every Stop',
        tagline: 'Handpicked stays — from Himalayan resorts to sacred riverside dharamshalas',
        desc: 'Yatra Go partners with 150+ carefully vetted hotels, resorts, and homestays across Uttarakhand and Himachal Pradesh. Whether you want a luxury mountain resort in Mussoorie or a cosy riverside campsite in Rishikesh — we find the best fit for your budget and travel style.',
        img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85',
        whatsapp: 'Hi! I want hotel booking assistance. Please help.',
        features: [
            { icon: Shield, title: 'Verified Properties', desc: '200+ personally verified hotels, resorts & homestays' },
            { icon: Star, title: 'Best Price Guarantee', desc: 'We match or beat any price you find online' },
            { icon: Clock, title: '24/7 Booking Support', desc: 'Our team is available round the clock for assistance' },
            { icon: CheckCircle2, title: 'Flexible Cancellation', desc: 'Free cancellation up to 24hrs before check-in on most hotels' },
        ],
        categories: [
            { name: 'Luxury Resorts', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', desc: '5-star experience in the Himalayas' },
            { name: 'Heritage Hotels', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', desc: 'Colonial & vintage properties' },
            { name: 'Riverside Camps', img: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80', desc: 'Bonfire & tent camps in Rishikesh' },
            { name: 'Budget Stays', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', desc: 'Clean, comfortable rooms from ₹799/night' },
        ],
    },
    'car-rental': {
        title: 'Car & Coach Rental',
        subtitle: '🚗 Travel at Your Pace',
        tagline: 'Verified, air-conditioned vehicles with expert hill-trained drivers',
        desc: 'Explore Uttarakhand\'s winding mountain roads and Himalayan passes with complete confidence. Our fleet of well-maintained vehicles — from compact Dzires to luxury Fortuners and 26-seater coaches — comes with fully verified, experienced drivers who know every route.',
        img: 'public/assets/Car Rental.jpg',
        whatsapp: 'Hi! I need car/coach rental for my trip. Please share rates and availability.',
        features: [
            { icon: Shield, title: 'Verified Drivers', desc: 'Police-verified, hill-trained drivers with commercial license' },
            { icon: Car, title: 'Well-Maintained Fleet', desc: 'Regularly serviced AC vehicles — Innova, Fortuner, Tempo Traveller' },
            { icon: MapPin, title: 'All Routes Covered', desc: 'Haridwar to Badrinath, Manali to Spiti, Shimla to Manali' },
            { icon: Clock, title: 'Transparent Pricing', desc: 'No hidden charges — per-km or package pricing available' },
        ],
        categories: [
            { name: 'Swift Dzire', img: 'public/assets/Swift Dzire.jpg', desc: 'Sedan · 4+1 Seats · AC · Budget Option', price: '₹3500/day' },
            { name: 'Etios', img: 'public/assets/Etios.jpg', desc: 'Sedan · 4+1 Seats · AC · Budget Option', price: '₹3500/day' },
            { name: 'Ertiga', img: 'public/assets/Ertiga.jpg', desc: 'MVP · 7 Seats', price: '₹4500/day' },
            { name: 'Kia Carens', img: 'public/assets/Carens.avif', desc: 'MVP · 7 Seats', price: '₹4500/day' },
            { name: 'Innova Crysta', img: 'public/assets/Crysta.jpg', desc: 'SUV · 7 Seats · AC', price: '₹6000/day' },
            { name: 'Toyota Fortuner',   img: 'public/assets/Fortuner.jpg', desc: 'Luxury SUV · 7 Seats · Hill Special', price: 'Enquire Rates' },
            { name: 'Tempo Traveller', img: 'public/assets/Tempo Traveller 12+1 Seater Luxury.jpg', desc: 'Van · 12–26 Seats · Group Trips', price: 'Enquire Rates' },
            { name: 'Coach/Bus', img: 'public/assets/Luxury AC Coach.jpg', desc: 'Van · 40 Seats · Group Trips', price: 'Enquire Rates' },
        ],
    },
    'bike-rental': {
        title: 'Bike Rental',
        subtitle: '🏍️ Two-Wheeled Freedom',
        tagline: 'Royal Enfields & scooters for the ultimate Himalayan road trip',
        desc: 'There\'s no better way to experience the winding mountain roads of Uttarakhand and Himachal than on two wheels. Rent a classic Royal Enfield Bullet, Himalayan, or Thunderbird from our well-maintained fleet and ride through stunning passes, valleys, and pilgrimage routes at your own pace.',
        img: 'public/assets/Bike Rental.png',
        whatsapp: 'Hi! I want to rent a bike for my trip. Please share bike types, rates and availability.',
        features: [
            { icon: Bike, title: 'Royal Enfield Fleet', desc: 'Scooty, Bullet, Himalayan, Thunderbird — all serviced & verified' },
            { icon: Shield, title: 'Safety Gear Included', desc: 'Helmet, gloves and basic toolkit included in every rental' },
            { icon: Clock, title: 'Flexible Rentals', desc: 'Daily, weekly or monthly rental plans available' },
            { icon: MapPin, title: 'Popular Routes', desc: 'Uttarakhand Only' },
        ],
        categories: [
            { name: 'Honda Activa', img: 'public/assets/Activa 125.png', desc: 'Scooter · Easy city/town and Dham Routes use', price: '₹600/day' },
            { name: 'Access 125', img: 'public/assets/Access.jpg', desc: 'Scooter · Easy city/town and Dham Routes use', price: '₹600/day' },
            { name: 'Classic 350', img: 'public/assets/Classic 350.png', desc: '350cc · Budget classic', price: '₹1200/day' },
            { name: 'Himalayan', img: 'public/assets/Himalayan 450.png', desc: '410cc · Best for mountain passes', price: '₹1500/day' },
            { name: 'Thunderbird 500', img: 'public/assets/Thunderbird.jpg', desc: '500cc · Long highway cruiser', price: '₹1800/day' },
        ],
    },
};

const SERVICES = Object.fromEntries(Object.entries(SERVICES_DATA).map(([key, value]) => [key, normalizeAssetFields(value)]));

const Services = () => {
    const { type } = useParams();
    const service = SERVICES[type] || SERVICES['hotel'];
    const [selectedCar, setSelectedCar] = useState(null);
    const [sidebarModalOpen, setSidebarModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>{service.title} | Yatra Go Services</title>
                <meta name="description" content={service.desc.substring(0, 160)} />
            </Helmet>

            {/* ── HERO ── */}
            <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
                <img src={service.img} alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <span className="inline-block bg-brand-gold text-brand-dark text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">{service.subtitle}</span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-black text-white mb-2">{service.title}</h1>
                    <p className="text-white/70 text-lg max-w-2xl">{service.tagline}</p>
                </motion.div>
            </section>

            {/* ── SERVICE NAV TABS ── */}
            <section className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {[
                        { slug: 'hotel', label: '🏨 Hotels' },
                        { slug: 'car-rental', label: '🚗 Car Rental' },
                        { slug: 'bike-rental', label: '🏍️ Bike Rental' },
                    ].map(s => (
                        <Link key={s.slug} to={`/services/${s.slug}`}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${type === s.slug ? 'bg-brand-gold text-brand-dark shadow' : 'text-gray-600 hover:bg-amber-50'}`}>
                            {s.label}
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

                    {/* Left col — details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* About */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-serif font-black text-brand-dark mb-4">
                                About Our <span className="text-brand-gold">{service.title}</span> Service
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">{service.desc}</p>
                        </motion.div>

                        {/* Feature grid */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <h2 className="text-2xl font-serif font-black text-brand-dark mb-5">Why Book With Yatra Go?</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.features.map((f, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                            <f.icon size={22} className="text-brand-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-dark mb-1">{f.title}</h3>
                                            <p className="text-gray-500 text-sm">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Category cards */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-2xl font-serif font-black text-brand-dark mb-5">Our Options</h2>
                            {['car-rental', 'bike-rental'].includes(type) ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.categories.map((cat, i) => (
                                        <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 flex flex-col relative cursor-pointer" onClick={() => setSelectedCar(cat)}>
                                            <div className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-black px-2.5 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center gap-1 group-hover:bg-brand-gold transition-colors">
                                                <CheckCircle2 size={12} className="text-green-500 group-hover:text-brand-dark" /> Verified
                                            </div>
                                            {cat.price && (
                                                <div className="absolute top-4 left-0 z-30 bg-brand-dark text-white font-black px-4 py-1.5 rounded-r-xl shadow-[0_4px_15px_rgba(8,38,61,0.5)] flex items-center gap-1 border-y-2 border-r-2 border-brand-gold transform transition-transform group-hover:scale-105 origin-left">
                                                    <span className="text-brand-gold text-lg">₹</span>
                                                    {cat.price.replace('₹', '')}
                                                </div>
                                            )}
                                            <div className="h-48 overflow-hidden bg-gray-50 relative flex items-center justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent flex items-center justify-center pointer-events-none z-10"></div>
                                                <img src={cat.img} alt={cat.name}
                                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-20 ${type === 'bike-rental' ? 'scale-110' : ''}`}
                                                    loading="lazy"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'; }} />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="font-serif font-black text-xl text-brand-dark group-hover:text-brand-blue transition-colors mb-2 pr-2">{cat.name}</h3>
                                                
                                                <div className="flex flex-wrap gap-1.5 mb-5 overflow-hidden h-auto">
                                                    {cat.desc.split('·').map((tag, idx) => (
                                                        <span key={idx} className="bg-gray-50 text-gray-500 border border-gray-100 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>

                                                <button className="mt-auto w-full bg-brand-dark text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 group-hover:bg-brand-blue transition-colors shadow-md group-hover:shadow-lg">
                                                    {type === 'bike-rental' ? <Bike size={16} /> : <Car size={16} />} View Details & Book
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {service.categories.map((cat, i) => (
                                        <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="h-40 overflow-hidden">
                                                <img src={cat.img} alt={cat.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'; }} />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-brand-dark mb-1">{cat.name}</h3>
                                                <p className="text-gray-500 text-sm">{cat.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right col — sticky booking card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-4">
                            {/* WhatsApp CTA */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-brand-gold">
                                <h3 className="text-xl font-serif font-black text-brand-dark mb-2">Get Instant Quote</h3>
                                <p className="text-gray-500 text-sm mb-6">Our travel experts reply within minutes. Available 7 AM – 10 PM daily.</p>
                                
                                {['car-rental', 'bike-rental'].includes(type) ? (
                                    <button onClick={() => setSidebarModalOpen(true)}
                                        className="flex items-center justify-center gap-2 w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-blue transition-colors mb-4 shadow-[0_4px_14px_0_rgba(8,38,61,0.39)]">
                                        {type === 'bike-rental' ? <Bike size={18} /> : <Car size={18} />} Book a {type === 'bike-rental' ? 'Bike' : 'Vehicle'}
                                    </button>
                                ) : (
                                    <Link to="/contact"
                                        className="flex items-center justify-center gap-2 w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-blue transition-colors mb-4 shadow-[0_4px_14px_0_rgba(8,38,61,0.39)]">
                                        Send Enquiry
                                    </Link>
                                )}

                                <a href={`https://wa.me/918979931256?text=${encodeURIComponent(service.whatsapp)}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">
                                    <MessageCircle size={18} /> WhatsApp Us
                                </a>
                            </motion.div>

                            {/* All services quick links */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">Our Other Services</h4>
                                <div className="space-y-1">
                                    {[
                                        { slug: 'hotel', label: '🏨 Hotel Booking' },
                                        { slug: 'car-rental', label: '🚗 Car & Coach Rental' },
                                        { slug: 'bike-rental', label: '🏍️ Bike Rental' },
                                    ].filter(s => s.slug !== type).map(s => (
                                        <Link key={s.slug} to={`/services/${s.slug}`}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-brand-gold hover:bg-amber-50 transition-colors">
                                            {s.label} <ArrowRight size={14} />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Trust signals */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                className="bg-brand-dark rounded-2xl p-5 text-center">
                                <div className="text-brand-gold font-black text-2xl font-serif">5000+</div>
                                <div className="text-white/70 text-sm">Happy Customers</div>
                                <div className="flex justify-center gap-0.5 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                                    ))}
                                </div>
                                <div className="text-white/50 text-xs mt-1">Rated 4.9/5 on Google</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BOOK NOW CTA ── */}
            <section className="py-14 bg-brand-dark">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-serif font-black text-white mb-3">Ready to Book?</h2>
                    <p className="text-white/60 mb-8">Speak to our travel experts and get your personalised booking done in minutes.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-8 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors">
                            Send Enquiry <ArrowRight size={18} />
                        </Link>
                        <a href={`https://wa.me/918979931256?text=${encodeURIComponent(service.whatsapp)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-600 transition-colors">
                            <MessageCircle size={18} /> WhatsApp Now
                        </a>
                    </div>
                </div>
            </section>

            {/* WhatsApp FAB */}
            <a href="https://wa.me/918979931256" target="_blank" rel="noopener noreferrer"
                className="fixed bottom-24 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all z-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" />
                </svg>
            </a>

            {['car-rental', 'bike-rental'].includes(type) && (
                <>
                    <VehicleBookingModal isOpen={!!selectedCar} onClose={() => setSelectedCar(null)} selectedVehicle={selectedCar} type={type} />
                    <VehicleSidebarModal isOpen={sidebarModalOpen} onClose={() => setSidebarModalOpen(false)} categories={service.categories} type={type} />
                </>
            )}
        </div>
    );
};

export default Services;

