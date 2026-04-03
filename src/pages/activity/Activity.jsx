import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Clock, Star, ArrowRight, CheckCircle2,
    Phone, Users, Shield, Zap, Filter,
    MessageCircle
} from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { ALL_ACTIVITIES, CATEGORIES } from '../../data/activities';
import { asset } from '../../lib/assets';

// ─── Activity Card ───
const ActivityCard = ({ activity }) => (
    <div className="h-full">
        <div className="premium-card flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden group">
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <img src={activity.img} alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                    onError={(e) => { e.target.src = asset('assets/Activities.png'); }} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className={`absolute top-3 sm:top-4 left-3 sm:left-4 text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-lg ${activity.badgeColor} uppercase tracking-widest`}>{activity.badge}</span>
                <span className={`absolute top-3 sm:top-4 right-3 sm:right-4 text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-lg ${activity.difficultyColor} uppercase tracking-widest bg-white/90 backdrop-blur-sm`}>{activity.difficulty}</span>
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 flex items-center gap-2 text-white font-bold text-[10px] sm:text-xs drop-shadow-md">
                    <MapPin size={12} className="text-brand-gold sm:w-[13px] sm:h-[13px]" /> {activity.location.split(',')[0]}
                </div>
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="font-bold text-brand-dark text-lg sm:text-xl font-serif group-hover:text-brand-gold transition-colors duration-300 leading-tight line-clamp-2 min-h-[48px] sm:min-h-[56px] w-full">{activity.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs font-black text-gray-500 shrink-0 bg-gray-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl">
                        <Star size={10} className="fill-brand-gold text-brand-gold sm:w-3 sm:h-3" /> {activity.rating}
                    </div>
                </div>
                <div className="flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-blue" /> {activity.duration}</span>
                    <span className="flex items-center gap-1.5"><Users size={12} className="text-brand-gold" /> {activity.groupSize}</span>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 sm:mb-6 flex-1 font-medium">{activity.desc}</p>
                <div className="mt-auto flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100">
                    <div>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest block leading-none mb-1">Fee Starts</span>
                        <div className="text-xl sm:text-2xl font-black text-brand-gold font-serif">₹{activity.price.toLocaleString('en-IN')}</div>
                    </div>
                    <Link to={`/activity/${activity.id}`}
                        className="bg-brand-dark text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-[13px] font-black hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center gap-2 shadow-xl shadow-brand-dark/10 group-hover:-translate-y-1 shimmer-effect shrink-0">
                        Explore <ArrowRight size={14} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

// ─── Why Book With Us strip ───
const trustFeatures = [
    { icon: <Shield size={22} />, text: 'Certified Safety Gear' },
    { icon: <CheckCircle2 size={22} />, text: 'Elite Instructors' },
    { icon: <Users size={22} />, text: 'Small Group Focus' },
    { icon: <Phone size={22} />, text: 'Real-time Support' },
];

// ─── Page ───
const Activity = () => {
    const [category, setCategory] = useState('All');

    const filtered = category === 'All' ? ALL_ACTIVITIES : ALL_ACTIVITIES.filter(a => a.category === category);

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Premium Adventure Activities | Rishikesh & Uttarakhand | Yatra Go</title>
                <meta name="description" content="Book River Rafting, Bungee Jumping, Paragliding, Trekking, Camping, Zip-lining, Kayaking and Rock Climbing in Rishikesh & Uttarakhand with Yatra Go. Certified guides, best prices." />
            </Helmet>

            {/* ─── HERO ─── */}
            <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden">
                <img
                    src={asset('assets/Activities.png')}
                    alt="River Rafting Adventure"
                    className="absolute inset-0 w-full h-full object-cover scale-110 motion-safe:animate-[slow-zoom_20s_infinite_alternate]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <ScrollReveal direction="down">
                        <span className="inline-block text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-5 sm:mb-6 bg-brand-gold/10 backdrop-blur-md px-4 py-2 rounded-full border border-brand-gold/20">The Himalaya Collection</span>
                        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif font-black text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                            Adventure <span className="text-brand-gold italic">Redefined</span>
                        </h1>
                        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-medium">Bespoke outdoor experiences engineered for thrill, managed with precision safety by Himalayan elite guides.</p>
                        <a href="#activities"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-dark font-black px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-white transition-all duration-300 shadow-2xl shadow-brand-gold/30 hover:-translate-y-1 text-base sm:text-lg">
                            <Zap size={22} className="shrink-0" /> See Our Catalog
                        </a>

                        {/* Trending Shelf */}
                        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-white/90">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                <Star size={14} className="fill-brand-gold" /> Trending:
                            </span>
                            <div className="flex flex-wrap justify-center gap-3">
                                {ALL_ACTIVITIES.filter(a => ['1', '4', '6'].includes(a.id)).slice(0, 3).map(act => (
                                    <Link key={act.id} to={`/activity/${act.id}`} 
                                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all hover:-translate-y-0.5 shadow-lg group/trend">
                                        <span className="text-sm font-bold text-white group-hover/trend:text-brand-gold transition-colors truncate max-w-[150px]">{act.name}</span>
                                        <ArrowRight size={14} className="text-brand-gold opacity-50 group-hover/trend:opacity-100 group-hover/trend:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </motion.div>
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
                    </div>
                </div>
            </section>

            {/* ─── TRUST STRIP ─── */}
            <section className="bg-brand-dark py-8 relative z-20 shadow-2xl">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8">
                    {trustFeatures.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] group">
                            <span className="text-brand-gold bg-brand-gold/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform">{f.icon}</span>
                            {f.text}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FILTER + GRID ─── */}
            <section id="activities" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category filter */}
                    <ScrollReveal direction="up">
                        <div className="flex items-center gap-3 mb-10 sm:mb-16 overflow-x-auto hide-scrollbar pb-3 w-full border-b sm:border-0 border-slate-100 sm:justify-center px-2">
                            <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-[0.2em] mr-2 sm:mr-4 flex items-center gap-2 shadow-sm p-2 sm:p-3 border rounded-xl shrink-0"><Filter size={14} /> Filter</span>
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setCategory(cat)}
                                    className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black transition-all duration-300 uppercase tracking-widest shrink-0 whitespace-nowrap ${category === cat ? 'bg-brand-gold text-brand-dark shadow-xl shadow-brand-gold/20 active-pill' : 'bg-white text-gray-400 hover:text-brand-dark hover:shadow-lg'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-2 sm:px-0">
                        {filtered.map((act, i) => (
                            <ScrollReveal key={act.id} direction="up" delay={i % 4 * 0.1}>
                                <ActivityCard activity={act} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INFO SECTION ─── */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <ScrollReveal direction="left">
                            <span className="inline-block text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">Elite Professional Standards</span>
                            <h2 className="text-5xl font-serif font-black text-brand-dark mb-8 leading-tight">
                                Zero Compromise. <br /><span className="text-brand-gold underline decoration-brand-gold/30 underline-offset-8">Total Security.</span>
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-10 text-lg font-medium">
                                Every activity in our collection is governed by strict Himalayan safety protocols and managed by Serac-trained professionals. We don't just guide; we engineer safety at every turn.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    ['Certified Hardware', 'Black Diamond & Petzl certified ropes and harnesses.'],
                                    ['Medical Readiness', 'Every guide is an IRCS certified first responder.'],
                                    ['Dynamic Safety', 'Real-time weather telemetry monitoring for all aerial events.'],
                                    ['Precision Instruction', 'Ratio of 1:4 instructor to guest for high-risk zones.'],
                                ].map(([title, desc], i) => (
                                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-2xl group hover:bg-brand-gold/5 transition-colors">
                                        <div className="bg-white p-2 rounded-xl shadow-sm text-brand-gold self-start group-hover:bg-brand-gold group-hover:text-white transition-all">
                                            <CheckCircle2 size={18} className="shrink-0" />
                                        </div>
                                        <div>
                                            <span className="font-black text-brand-dark text-[11px] uppercase tracking-wider block mb-1">{title}</span>
                                            <p className="text-gray-400 text-xs font-medium leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                           <div className="relative group">
                                <div className="absolute -inset-4 bg-brand-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="grid grid-cols-2 gap-6 relative">
                                    <div className="space-y-6">
                                        <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80" alt="Trekking safety" className="rounded-3xl h-64 object-cover w-full shadow-2xl hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        <img src={asset('assets/R1.jpg')} alt="Rafting" className="rounded-3xl h-56 object-cover w-full shadow-2xl hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div className="space-y-6 mt-12">
                                        <img src={asset('assets/Paragliding.png')} alt="Paragliding" className="rounded-3xl h-56 object-cover w-full shadow-2xl hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        <img src={asset('assets/Camping Y.png')} alt="Camping" className="rounded-3xl h-64 object-cover w-full shadow-2xl hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    </div>
                                </div>
                           </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 bg-gradient-to-br from-brand-dark to-slate-900 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <ScrollReveal direction="up">
                        <h2 className="text-5xl font-serif font-black text-white mb-6 leading-tight">Ready to Feel the Rush?</h2>
                        <p className="text-white/50 mb-12 text-lg font-medium max-w-2xl mx-auto">Book any activity instantly via WhatsApp or call our adventure desk — we'll confirm your slot within 2 hours.</p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full px-2 sm:px-0">
                            <a href="https://wa.me/918979931256?text=Hi! I want to book an adventure activity. Please share details."
                                target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-500 text-white font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:bg-white transition-all duration-300 shadow-2xl shadow-green-500/20 text-sm sm:text-lg hover:-translate-y-1">
                                <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" /> Instant WhatsApp Booking
                            </a>
                            <a href="tel:+918979931256"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border-2 border-brand-gold text-brand-gold font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 text-sm sm:text-lg hover:-translate-y-1">
                                <Phone size={20} className="sm:w-[22px] sm:h-[22px]" /> +91 8979931256
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default Activity;
