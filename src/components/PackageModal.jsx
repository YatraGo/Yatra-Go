import React, { useState } from 'react';
import { X, MapPin, Clock, Star, CheckCircle2, XCircle, ChevronDown, ChevronUp, Phone, Mail, ArrowRight, Zap, Sparkles, Globe } from 'lucide-react';
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
                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative flex flex-col"
                >
                    {/* Header Image - Reduced height for compact look */}
                    <div className="relative h-48 sm:h-64 shrink-0 overflow-hidden">
                        <img
                            src={mainImg}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        
                        {/* Status Tags */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                            <span className="bg-brand-gold text-brand-dark text-[9px] sm:text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">{pkg.tag}</span>
                            {discount > 0 && (
                                <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-lg flex items-center gap-1">
                                    <Zap size={9} className="fill-white" /> SAVE {discount}%
                                </span>
                            )}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 z-50 ring-1 ring-white/10 active:scale-90"
                        >
                            <X size={18} />
                        </button>

                        {/* Title overlay */}
                        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
                            <h2 className="text-white text-lg sm:text-2xl font-black font-serif leading-tight mb-1 drop-shadow-md">{pkg.title}</h2>
                            <div className="flex flex-wrap items-center gap-3 text-white/90 text-[10px] sm:text-xs font-bold">
                                <span className="flex items-center gap-1"><MapPin size={12} className="text-brand-gold" /> {pkg.location}</span>
                                <span className="flex items-center gap-1"><Clock size={12} className="text-brand-gold" /> {pkg.days}</span>
                                <span className="flex items-center gap-1"><Star size={12} className="fill-brand-gold text-brand-gold border-none" /> {pkg.rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact CTA Bar - Stacked on Mobile, Row on PC */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-brand-dark text-white gap-3 shrink-0">
                        <div className="text-center sm:text-left">
                            <div className="flex items-baseline justify-center sm:justify-start gap-2">
                                <span className="text-2xl sm:text-3xl font-black text-brand-gold font-serif">{formatPrice(pkg.price)}</span>
                                {pkg.originalPrice && <span className="text-[10px] sm:text-xs text-white/30 line-through">{formatPrice(pkg.originalPrice)}</span>}
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto gap-2">
                            <a href="tel:+918979931256"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-white/20 text-white font-black px-3 py-2 sm:px-5 rounded-xl text-[10px] sm:text-xs hover:bg-white hover:text-brand-dark transition-all active:scale-95">
                                <Phone size={14} /> CALL
                            </a>
                            <Link to={pkg.link || `/tour/${pkg.slug}`} onClick={onClose}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-4 py-2 sm:px-6 rounded-xl text-[10px] sm:text-xs hover:bg-white transition-all shadow-lg shadow-brand-gold/10 active:scale-95">
                                BOOK NOW <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                        {/* Tabs - Horizontal Scroll on Mobile */}
                        <div className="flex border-b border-slate-100 px-4 sm:px-6 sticky top-0 bg-white z-20 overflow-x-auto no-scrollbar">
                            {['overview', 'itinerary', 'includes'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-brand-gold text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-900'}`}>
                                    {tab === 'includes' ? 'Includes / Excludes' : tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Area */}
                        <div className="p-4 sm:p-6 italic-support">
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium mb-5">{pkg.description || pkg.desc}</p>
                                    <h4 className="font-serif font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
                                        <Sparkles size={14} className="text-brand-gold" /> Highlights
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {pkg.highlights?.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 italic">
                                                <CheckCircle2 size={14} className="text-brand-gold shrink-0 mt-0.5" />
                                                <span className="text-[10px] sm:text-xs text-slate-700 font-bold leading-tight">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'itinerary' && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                                    {pkg.itinerary?.map((day, i) => (
                                        <div key={i} className="rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => setOpenDay(openDay === i ? null : i)}
                                                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all ${openDay === i ? 'bg-brand-dark text-white' : 'bg-white text-slate-900'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider ${openDay === i ? 'bg-brand-gold text-brand-dark' : 'bg-slate-100 text-slate-500'}`}>Day {day.day}</span>
                                                    <span className="font-black text-[11px] sm:text-xs uppercase tracking-tight">{day.title}</span>
                                                </div>
                                                {openDay === i ? <ChevronUp size={14} className="text-brand-gold" /> : <ChevronDown size={14} className="text-slate-300" />}
                                            </button>
                                            <AnimatePresence>
                                                {openDay === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="px-4 py-3 text-xs text-slate-600 bg-slate-50 border-t border-slate-100 font-medium italic"
                                                    >
                                                        {day.desc}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'includes' && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                        <h4 className="font-black text-emerald-800 text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2 font-serif"><CheckCircle2 size={14} /> Inclusions</h4>
                                        <ul className="space-y-2">
                                            {pkg.includes?.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs text-emerald-900/70 font-bold leading-tight italic">
                                                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                                        <h4 className="font-black text-rose-800 text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2 font-serif"><XCircle size={14} /> Exclusions</h4>
                                        <ul className="space-y-2">
                                            {pkg.excludes?.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs text-rose-900/70 font-bold leading-tight italic">
                                                    <XCircle size={12} className="text-rose-400 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Slim Footer CTA */}
                    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                        <div className="hidden sm:block">
                            <h5 className="font-black text-[10px] uppercase text-slate-800">Tailor-Made?</h5>
                            <p className="text-[9px] text-slate-500 font-bold italic">Request for your party.</p>
                        </div>
                        <Link 
                            to={pkg.link || `/tour/${pkg.slug}`} 
                            onClick={onClose}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                        >
                            <Mail size={14} /> CUSTOM REQUEST
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PackageModal;
