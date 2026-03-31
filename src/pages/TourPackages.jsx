import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Filter, Search, ArrowRight, Phone, Mail, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ALL_PACKAGES, formatPrice } from '../data/packages';
import ScrollReveal from '../components/ui/ScrollReveal';
import { asset } from '../lib/assets';

const REGIONS = ['All', 'Uttarakhand', 'Himachal Pradesh'];

const BADGE_STYLE = {
    BESTSELLER: 'bg-brand-gold text-brand-dark shadow-sm',
    TRENDING: 'bg-orange-500 text-white shadow-sm',
    POPULAR: 'bg-blue-500 text-white shadow-sm',
    ADVENTURE: 'bg-red-500 text-white shadow-sm',
    HONEYMOON: 'bg-pink-500 text-white shadow-sm',
    COMPLETE: 'bg-purple-600 text-white shadow-sm',
    SNOW: 'bg-sky-500 text-white shadow-sm',
    SCENIC: 'bg-teal-500 text-white shadow-sm',
    CULTURAL: 'bg-indigo-500 text-white shadow-sm',
    WILDLIFE: 'bg-green-600 text-white shadow-sm',
    PILGRIMAGE: 'bg-amber-600 text-white shadow-sm',
    TREKKING: 'bg-lime-600 text-white shadow-sm',
    WEEKEND: 'bg-violet-500 text-white shadow-sm',
};

const PackageCard = ({ pkg, isWishlisted, onToggleWishlist }) => (
    <div className="h-full flex flex-col">
        <div className="group relative flex-1 flex flex-col rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 overflow-hidden active:scale-[0.98]">
            {/* Image Section */}
            <div className="relative h-64 shrink-0 overflow-hidden">
                <img src={pkg.img} alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
                
                {/* Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500" />

                {/* Wishlist Button */}
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleWishlist(pkg.id || pkg.slug);
                    }}
                    className={`absolute top-5 right-5 h-10 w-10 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 z-10 ${
                        isWishlisted 
                        ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
                        : 'bg-white/20 border-white/20 text-white hover:bg-white/40'
                    }`}
                >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'animate-heart-pop' : ''} />
                </button>

                {/* Badges & Tags */}
                {pkg.tag && (
                    <div className="absolute top-5 left-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md ${BADGE_STYLE[pkg.tag] || 'bg-slate-900/80 text-white'}`}>
                            {pkg.tag}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <MapPin size={12} className="text-brand-gold" /> {pkg.location.split('·')[0].trim()}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-gold text-brand-dark text-[10px] font-black uppercase tracking-widest shadow-xl">
                        <Clock size={12} /> {pkg.days}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-1 relative bg-white">
                <div className="flex items-start justify-between mb-4 gap-4">
                    <h3 className="font-serif font-black text-slate-900 text-xl leading-tight group-hover:text-brand-gold transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                        {pkg.title}
                    </h3>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-100 text-xs font-black text-slate-500 shrink-0 h-fit">
                        <Star size={12} className="fill-brand-gold text-brand-gold shadow-sm" /> {pkg.rating}
                    </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-8 italic font-medium">"{pkg.desc}"</p>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                    <div>
                        {pkg.originalPrice && (
                            <div className="text-[10px] text-slate-300 line-through font-black tracking-widest uppercase mb-0.5">{formatPrice(pkg.originalPrice)}</div>
                        )}
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-serif font-black text-brand-dark tracking-tighter">{formatPrice(pkg.price)}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/person</span>
                        </div>
                    </div>

                    <Link
                        to={`/tour/${pkg.slug}`}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-dark/10 group/btn"
                    >
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-rotate-45 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const TourPackages = () => {
    const { currentUser, userProfile } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialRegion = searchParams.get('region') || 'All';
    const [region, setRegion] = useState(initialRegion);
    const [search, setSearch] = useState('');

    const toggleWishlist = async (pkgId) => {
        if (!currentUser) {
            // Could redirect to login or show a toast
            alert('Please login to save expeditions to your wishlist.');
            return;
        }

        const userRef = doc(db, 'users', currentUser.uid);
        const isCurrentlyWishlisted = userProfile?.wishlist?.includes(pkgId);

        try {
            await updateDoc(userRef, {
                wishlist: isCurrentlyWishlisted ? arrayRemove(pkgId) : arrayUnion(pkgId)
            });
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    const filtered = useMemo(() => {
        return ALL_PACKAGES.filter(p => {
            const matchRegion = region === 'All' || p.region === region;
            const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.location.toLowerCase().includes(search.toLowerCase());
            return matchRegion && matchSearch;
        });
    }, [region, search]);

    const handleRegion = (r) => {
        setRegion(r);
        if (r === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ region: r });
        }
    };


    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Tour Packages | Uttarakhand · Himachal | Yatra Go</title>
                <meta name="description" content="Explore handcrafted tour packages across Uttarakhand and Himachal Pradesh. Best prices, expert guides and 100% safe travel with Yatra Go." />
            </Helmet>

            {/* ── HERO ── */}
            <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
                <img
                    src={asset('assets/Tour Package.png')}
                    alt="Tour Packages — Yatra Go"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/75 via-brand-dark/50 to-brand-dark/85" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4 max-w-3xl mx-auto"
                >
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-sm mb-3 font-black">Uttarakhand · Himachal</span>
                    <h1 className="text-5xl font-serif font-black text-white mb-4">Our <span className="text-brand-gold">Tour Packages</span></h1>
                    <p className="text-white/75 text-lg max-w-xl mx-auto">{ALL_PACKAGES.length}+ handcrafted packages — from Char Dham pilgrimage to Himalayan treks.</p>
                </motion.div>
            </section>

            {/* ── FILTER BAR ── */}
            <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px] max-w-xs">
                        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search packages..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 transition-all font-medium"
                        />
                    </div>
                    {/* Region pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-2 text-sm text-gray-400 font-black uppercase tracking-widest mr-2"><Filter size={14} /> Filter</span>
                        {REGIONS.map(r => (
                            <button key={r} onClick={() => handleRegion(r)}
                                className={`px-5 py-2 rounded-xl text-sm font-black transition-all duration-300 ${region === r ? 'bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto text-xs font-black text-black-300 uppercase tracking-widest hidden sm:block">{filtered.length} package{filtered.length !== 1 ? 's' : ''} found</div>
                </div>
            </section>

            {/* ── GRID ── */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filtered.length === 0 ? (
                        <ScrollReveal direction="up">
                            <div className="text-center py-20 text-gray-400">
                                <Search size={60} className="mx-auto mb-6 opacity-20" />
                                <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">No Match Found</h3>
                                <p className="text-gray-500">We couldn't find any packages for "<strong>{search}</strong>"</p>
                                <button onClick={() => { setSearch(''); setRegion('All'); }} className="mt-8 bg-brand-gold text-brand-dark font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg">Clear All Filters</button>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filtered.map((pkg, i) => (
                                <ScrollReveal key={pkg.slug} direction="up" delay={i % 4 * 0.1}>
                                    <PackageCard 
                                        pkg={pkg} 
                                        isWishlisted={userProfile?.wishlist?.includes(pkg.id || pkg.slug)}
                                        onToggleWishlist={toggleWishlist}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA STRIP ── */}
            <section className="py-20 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <ScrollReveal direction="up">
                        <span className="inline-block text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] mb-6 border border-brand-gold/20 px-3 py-1 rounded-full">Custom Planning</span>
                        <h2 className="text-4xl font-serif font-black text-white mb-4 leading-tight">Can't find what you're looking for?</h2>
                        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Our travel experts design fully custom packages just for you. Send your request and it will reach our email directly.</p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-dark font-black px-10 py-4.5 rounded-2xl hover:bg-white transition-all duration-300 shadow-2xl shadow-brand-gold/20 text-lg"
                            >
                                <Mail size={20} /> Request Personalized Itinerary
                            </Link>
                            <a href="tel:+918979931256"
                                className="inline-flex items-center justify-center gap-3 border-2 border-brand-gold text-brand-gold font-black px-10 py-4.5 rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 text-lg">
                                <Phone size={20} /> +91 8979931256
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default TourPackages;
