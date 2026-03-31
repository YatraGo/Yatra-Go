import React, { useState } from 'react';
import { X, MapPin, Clock, Star, CheckCircle2, XCircle, ChevronDown, ChevronUp, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../data/packages';

const PackageModal = ({ pkg, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [openDay, setOpenDay] = useState(null);
    const [mainImg, setMainImg] = useState(pkg?.img);

    if (!pkg) return null;

    const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.92, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 40 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
                >
                    {/* Header Image */}
                    <div className="relative h-72 overflow-hidden">
                        <img
                            src={mainImg}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        {/* Tag */}
                        <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-xs font-black px-3 py-1.5 rounded-full">{pkg.tag}</span>
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                            <X size={18} />
                        </button>
                        {/* Title overlay */}
                        <div className="absolute bottom-4 left-5 right-5">
                            <h2 className="text-white text-2xl font-black font-serif leading-tight mb-1">{pkg.title}</h2>
                            <div className="flex items-center gap-4 text-white/80 text-sm">
                                <span className="flex items-center gap-1"><MapPin size={13} /> {pkg.location}</span>
                                <span className="flex items-center gap-1"><Clock size={13} /> {pkg.days}</span>
                                <span className="flex items-center gap-1"><Star size={13} className="fill-brand-gold text-brand-gold" /> {pkg.rating} ({pkg.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail gallery */}
                    {pkg.gallery && (
                        <div className="flex gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                            {pkg.gallery.map((imgUrl, i) => (
                                <button key={i} onClick={() => setMainImg(imgUrl)}
                                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${mainImg === imgUrl ? 'border-brand-gold' : 'border-transparent'}`}>
                                    <img src={imgUrl} alt="" className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Pricing + CTA row */}
                    <div className="flex items-center justify-between px-5 py-4 bg-amber-50 border-b border-amber-100">
                        <div>
                            <span className="text-xs text-gray-500">Starting from</span>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-brand-gold font-serif">{formatPrice(pkg.price)}</span>
                                <span className="text-gray-400 line-through text-sm mb-1">{formatPrice(pkg.originalPrice)}</span>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1">{discount}% OFF</span>
                            </div>
                            <p className="text-xs text-gray-500">Per person | Taxes & fees may apply</p>
                        </div>
                        <div className="flex gap-2">
                            <a href="tel:+918979931256"
                                className="flex items-center gap-1.5 border-2 border-brand-dark text-brand-dark font-bold px-4 py-2 rounded-lg text-sm hover:bg-brand-dark hover:text-white transition-colors">
                                <Phone size={15} /> Call Now
                            </a>
                            <Link to={pkg.link || `/tour/${pkg.slug}`} onClick={onClose}
                                className="flex items-center gap-1.5 bg-brand-gold text-brand-dark font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition-colors shadow">
                                View Full Page <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 px-5 bg-white">
                        {['overview', 'itinerary', 'includes'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`py-3 px-4 text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab ? 'border-brand-gold text-brand-gold' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}>
                                {tab === 'includes' ? 'Includes / Excludes' : tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-5 max-h-80 overflow-y-auto">
                        {activeTab === 'overview' && (
                            <div>
                                <p className="text-gray-600 leading-relaxed mb-5">{pkg.description || pkg.desc}</p>
                                <h4 className="font-bold text-brand-dark mb-3">Package Highlights</h4>
                                <ul className="grid sm:grid-cols-2 gap-2">
                                    {pkg.highlights?.map((h, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'itinerary' && (
                            <div className="space-y-2">
                                {pkg.itinerary?.map((day, i) => (
                                    <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setOpenDay(openDay === i ? null : i)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-amber-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="bg-brand-gold text-brand-dark font-black text-xs px-2.5 py-1 rounded-full">Day {day.day}</span>
                                                <span className="font-bold text-brand-dark text-sm">{day.title}</span>
                                            </div>
                                            {openDay === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </button>
                                        {openDay === i && (
                                            <p className="px-4 py-3 text-sm text-gray-600 bg-white">{day.desc}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'includes' && (
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2"><CheckCircle2 size={16} /> What's Included</h4>
                                    <ul className="space-y-2">
                                        {pkg.includes?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><XCircle size={16} /> Not Included</h4>
                                    <ul className="space-y-2">
                                        {pkg.excludes?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Email CTA */}
                    <div className="px-5 py-4 bg-[#fff9ec] border-t border-[#f0ddaa] flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            <strong>Need custom itinerary?</strong> Open the package page and send your request by email.
                        </p>
                        <Link
                            to={pkg.link || `/tour/${pkg.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-2 bg-brand-gold text-brand-dark font-bold text-sm px-5 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                            <Mail size={16} />
                            Email Request
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PackageModal;
