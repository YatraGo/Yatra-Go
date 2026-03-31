import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ShieldCheck, Compass, Mountain, Map, Zap, Users } from 'lucide-react';
import { Button } from './ui';
import LocationAutocomplete from './ui/LocationAutocomplete';
import { asset } from '../lib/assets';

const trustPills = [
    { icon: <ShieldCheck size={16} />, label: 'Trusted Local Experts' },
    { icon: <Compass size={16} />, label: 'Custom Itineraries' },
    { icon: <Mountain size={16} />, label: 'Mountain-Ready Operations' },
];

const floatingCards = [
    {
        title: 'Chardham Priority',
        subtitle: 'Fast permits & transfers',
        icon: <Map className="text-blue-400" size={18} />,
        className: 'top-8 left-4 md:left-8',
        rotation: -6,
        delay: 0
    },
    {
        title: 'Adventure Blast',
        subtitle: 'Rafting & Bonfire sessions',
        icon: <Zap className="text-orange-400" size={18} />,
        className: 'top-24 right-0 md:right-6',
        rotation: 4,
        delay: 0.2
    },
    {
        title: 'Family Escapes',
        subtitle: 'Premium stays & transport',
        icon: <Users className="text-emerald-400" size={18} />,
        className: 'bottom-16 left-2 md:left-10',
        rotation: 2,
        delay: 0.4
    },
];

const Hero3D = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [destination, setDestination] = useState('');

    const heroMedia = [
        { type: 'image', src: 'https://traveltonirvana.com/wp-content/uploads/2023/10/Untitled-design-2048x1152-1.png' },
        { type: 'image', src: 'https://cdn.pixabay.com/photo/2022/10/05/07/11/temple-7499927_1280.jpg' },
        { type: 'video', src: asset('assets/Rafting.mp4') },
        { type: 'image', src: 'https://i.pinimg.com/1200x/fd/51/a4/fd51a47d301454df285cb6d8c908580f.jpg' },
        { type: 'image', src: 'https://i.pinimg.com/1200x/09/59/37/0959373d3581db78d3a8679000b98c26.jpg' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroMedia.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentItem = heroMedia[currentIndex];

    const handleStartBuilder = () => {
        if (!destination.trim()) return;
        navigate(`/itinerary-builder?destination=${encodeURIComponent(destination.trim())}`, {
            state: { destination: destination.trim() },
        });
    };

    return (
        <section className="relative min-h-[92vh] bg-[#020617] pb-16 pt-12">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {currentItem.type === 'image' ? (
                        <motion.img
                            key={currentIndex}
                            src={currentItem.src}
                            className="absolute inset-0 h-full w-full object-cover opacity-20"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1.08 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1 }}
                        />
                    ) : (
                        <motion.video
                            key={currentIndex}
                            src={currentItem.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover opacity-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#020617]/95 via-[#020617]/60 to-transparent" />
                <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.25),transparent_40%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] xl:gap-16">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            <Sparkles size={14} className="text-orange-400" />
                            North India Premium Journeys
                        </span>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mt-6 text-4xl font-serif font-black leading-[1.03] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                        >
                            Not Just A Trip.
                            <span className="block bg-gradient-to-r from-blue-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                                A Story You Will Retell.
                            </span>
                        </motion.h1>

                        <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
                            Yatra Go engineers high-impact travel experiences across Uttarakhand and Himachal Pradesh.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {trustPills.map((pill) => (
                                <span key={pill.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white backdrop-blur-md">
                                    <span className="text-orange-400">{pill.icon}</span>
                                    {pill.label}
                                </span>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-50 mt-9 max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-2xl"
                        >
                            <div className="flex flex-col gap-3 lg:flex-row">
                                <LocationAutocomplete
                                    value={destination}
                                    onChange={setDestination}
                                    placeholder="Tell us your dream destination"
                                    className="flex-1"
                                />

                                <Button
                                    type="button"
                                    variant="primary"
                                    size="lg"
                                    onClick={handleStartBuilder}
                                    disabled={!destination.trim()}
                                    className="rounded-xl px-7 py-3 text-lg shadow-lg shadow-orange-500/40 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                                    icon={Search}
                                >
                                    Build
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="relative min-h-[420px]">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20">
                            <img src="public/assets/Keda.jpg" className="h-full w-full object-cover" alt="Kedarnath preview" />
                        </div>

                        <div className="absolute inset-0 p-6 pointer-events-none">
                            {floatingCards.map((card, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute ${card.className} pointer-events-auto group/card`}
                                    initial={{ opacity: 0, y: 20, rotate: card.rotation }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, -10, 0],
                                        rotate: [card.rotation, card.rotation + 2, card.rotation]
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 0,
                                        y: -5,
                                        transition: { duration: 0.3 }
                                    }}
                                    transition={{
                                        y: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: card.delay
                                        },
                                        rotate: {
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: card.delay
                                        },
                                        opacity: { duration: 0.7, delay: 0.5 + card.delay }
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 group-hover/card:border-white/30 group-hover/card:bg-white/[0.12]">
                                        <div className="absolute -inset-2 bg-gradient-to-br from-white/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100" />
                                        <div className="relative flex items-center gap-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner transition-transform duration-300 group-hover/card:scale-110">
                                                {card.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-tight text-white">{card.title}</p>
                                                <p className="mt-1 text-[11px] font-medium text-white/60">{card.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero3D;
