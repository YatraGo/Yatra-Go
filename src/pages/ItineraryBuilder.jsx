import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Compass, LoaderCircle, MapPinned, Sparkles, Stars, Route, Helicopter, Car } from 'lucide-react';
import LocationAutocomplete from '../components/ui/LocationAutocomplete';
import { generateItinerary, isHelicopterEligible } from '../lib/itineraryBuilder';
import { asset } from '../lib/assets';

const quickDayOptions = ['2', '3', '4', '5', '7'];

const ItineraryBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialDestination = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return location.state?.destination || params.get('destination') || '';
    }, [location.search, location.state]);

    const [destination, setDestination] = useState(initialDestination);
    const [origin, setOrigin] = useState('');
    const [days, setDays] = useState('3');
    const [travelMode, setTravelMode] = useState('road'); // 'helicopter' | 'road'
    const [error, setError] = useState('');
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildStep, setBuildStep] = useState(0);

    const showHelicopterOption = useMemo(() => isHelicopterEligible(destination), [destination]);

    const handleDestinationChange = (val) => {
        setDestination(val);
        if (!isHelicopterEligible(val)) {
            setTravelMode('road');
        }
    };

    const handleBuild = async () => {
        if (!destination.trim()) {
            setError('Please enter or select a destination.');
            return;
        }
        if (!origin.trim()) {
            setError('Please enter your starting location.');
            return;
        }

        setIsBuilding(true);
        setError('');
        setBuildStep(1);

        const steps = ['Analyzing destinations...', 'Optimizing travel routes...', 'Matching stays...', 'Finalizing experience...'];
        const interval = setInterval(() => {
            setBuildStep((prev) => (prev < steps.length ? prev + 1 : prev));
        }, 800);

        try {
            const itinerary = await generateItinerary({
                destination: destination.trim(),
                origin: origin.trim(),
                days,
                travelMode,
            });
            clearInterval(interval);
            setBuildStep(steps.length + 1);
            setTimeout(() => {
                sessionStorage.setItem('yatrago-latest-itinerary', JSON.stringify(itinerary));
                navigate('/itinerary/result', { state: { itinerary } });
            }, 500);
        } catch (buildError) {
            clearInterval(interval);
            console.error('Itinerary build failed', buildError);
            setError('Itinerary generation failed. Please try again.');
            setIsBuilding(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-brand-gold/30">
            <Helmet>
                <title>Itinerary Builder | Yatra Go</title>
                <meta name="description" content="Professional AI-powered travel itinerary builder." />
            </Helmet>

            {/* Subtler Background Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute -right-[10%] bottom-[10%] h-[40%] w-[40%] rounded-full bg-brand-gold/5 blur-[120px]" />
            </div>

            <main className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
                {/* Header Section */}
                <div className="mb-12 text-center lg:text-left">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-gold backdrop-blur-md"
                    >
                        <Sparkles size={12} /> AI Travel Studio
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                    >
                        Plan Your <span className="text-brand-gold">Perfect Journey</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 lg:mx-0 sm:text-base"
                    >
                        Create a professional, high-fidelity travel itinerary tailored to your preferences in seconds.
                    </motion.p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column: Form Section */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-3xl"
                        >
                            <div className="space-y-1 p-6 sm:p-8">
                                {/* Destination Search */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                        <Compass size={14} className="text-brand-gold" /> Target Destination
                                    </label>
                                    <div className="relative group">
                                        <LocationAutocomplete
                                            value={destination}
                                            onChange={handleDestinationChange}
                                            placeholder="Where do you want to go?"
                                            className="w-full"
                                            inputClassName="h-14 border-white/10 bg-white/5 px-5 text-base transition-all group-focus-within:border-brand-gold/50 group-focus-within:bg-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6 pt-6 sm:grid-cols-2">
                                    {/* Starting Point */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                            <MapPinned size={14} className="text-brand-gold" /> Starting From
                                        </label>
                                        <div className="relative group">
                                            <LocationAutocomplete
                                                value={origin}
                                                onChange={setOrigin}
                                                placeholder="Departure city"
                                                className="w-full"
                                                inputClassName="h-12 border-white/10 bg-white/5 px-4 text-sm transition-all group-focus-within:border-brand-gold/50 group-focus-within:bg-white/10"
                                            />
                                        </div>
                                    </div>

                                    {/* Days Selection */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                            <CalendarDays size={14} className="text-brand-gold" /> Trip Duration
                                        </label>
                                        <div className="flex gap-2">
                                            {quickDayOptions.map((v) => (
                                                <button
                                                    key={v}
                                                    type="button"
                                                    onClick={() => setDays(v)}
                                                    className={`flex-1 h-12 rounded-xl border text-sm font-bold transition-all ${days === v ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'}`}
                                                >
                                                    {v}D
                                                </button>
                                            ))}
                                            <div className="relative flex-1">
                                                <select
                                                    value={days}
                                                    onChange={(e) => setDays(e.target.value)}
                                                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-2 text-xs font-bold text-slate-400 outline-none hover:border-white/20 appearance-none text-center"
                                                >
                                                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(v => (
                                                        <option key={v} value={v} className="bg-slate-900">{v} Days</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-30" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Helicopter Option */}
                                <AnimatePresence>
                                    {showHelicopterOption && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pt-8 overflow-hidden"
                                        >
                                            <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.03] p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                                                            <Helicopter size={16} />
                                                        </div>
                                                        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">VIP Travel Option</span>
                                                    </div>
                                                    <span className="text-[10px] font-medium text-brand-gold/60 italic">Available for {destination}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setTravelMode('helicopter')}
                                                        className={`flex flex-col items-center gap-2 rounded-xl border border-2 py-4 transition-all ${travelMode === 'helicopter' ? 'border-brand-gold bg-brand-gold/10' : 'border-white/5 bg-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-white/10'}`}
                                                    >
                                                        <span className="text-2xl">🚁</span>
                                                        <span className="text-[10px] font-black uppercase text-white tracking-widest">Air Charter</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setTravelMode('road')}
                                                        className={`flex flex-col items-center gap-2 rounded-xl border border-2 py-4 transition-all ${travelMode === 'road' ? 'border-brand-gold bg-brand-gold/10' : 'border-white/5 bg-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-white/10'}`}
                                                    >
                                                        <span className="text-2xl">🚗</span>
                                                        <span className="text-[10px] font-black uppercase text-white tracking-widest">Road Trip</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="pt-8">
                                    {error && (
                                        <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-300">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleBuild}
                                        disabled={isBuilding}
                                        className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-gold px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition-all hover:scale-[1.01] hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:grayscale"
                                    >
                                        {isBuilding ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={16} />}
                                        {isBuilding ? 'Generating Plan...' : 'Build My Itinerary'}
                                        <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity hover:opacity-10" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Preview/Info Section */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:sticky lg:top-32"
                        >
                            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300">
                                <Route size={14} className="text-brand-gold" /> Journey Overview
                            </h3>

                            <div className="mt-6 divide-y divide-white/5">
                                <div className="py-4">
                                    <p className="text-[10px] font-bold uppercase text-slate-500">Selected Path</p>
                                    <p className="mt-1 text-sm font-bold text-white">
                                        {origin || 'Origin'} 
                                        <ArrowRight size={12} className="inline mx-2 text-brand-gold" />
                                        {destination || 'Destination'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 py-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-500">Duration</p>
                                        <p className="mt-1 text-sm font-bold text-white">{days} Days</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-500">Style</p>
                                        <p className="mt-1 text-sm font-bold text-white capitalize">{travelMode}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-6">
                                    <div className="relative h-40 overflow-hidden rounded-xl border border-white/5">
                                        <img 
                                            src={asset('assets/Kedarnath 1.png')} 
                                            alt="Preview" 
                                            className="h-full w-full object-cover grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100 duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                                        <div className="absolute bottom-3 left-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Signature Preview</p>
                                            <h4 className="text-xs font-bold text-white">Branded PDF Output Ready</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {[
                                        'Proprietary optimization algorithm',
                                        'Direct-to-PDF professional layout',
                                        'Optimized stay & route logistics',
                                        'Local expert verified paths'
                                    ].map(text => (
                                        <div key={text} className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Processing Overlay */}
                <AnimatePresence>
                    {isBuilding && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md"
                        >
                            <div className="max-w-xs text-center">
                                <div className="relative mx-auto mb-6 h-16 w-16">
                                    <div className="absolute inset-0 animate-ping rounded-full border-2 border-brand-gold/30" />
                                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-brand-gold text-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                                        <LoaderCircle size={32} className="animate-spin" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white">Building Your Journey</h3>
                                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                                    {['Matching stays...', 'Optimizing routes...', 'Finalizing details...'][buildStep - 1] || 'Processing...'}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ItineraryBuilder;
