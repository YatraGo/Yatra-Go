import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Clock, Star, ArrowLeft, CheckCircle2, 
    Phone, Users, Shield, Zap, MessageCircle, 
    Mail, ShieldCheck, Camera, Waves
} from 'lucide-react';
import { ALL_ACTIVITIES } from '../../data/activities';
import SuccessPopup from '../../components/ui/SuccessPopup';
import { submitWeb3Form } from '../../lib/web3forms';
import ScrollReveal from '../../components/ui/ScrollReveal';

// ─── Rafting Route Selector ───
const RaftingRouteSelector = ({ routes, selectedRoute, onSelect }) => (
    <div className="mb-8">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <Waves size={16} className="text-brand-blue" /> Choose Your Stretch
        </h3>
        <div className="grid grid-cols-2 gap-3">
            {routes.map(route => (
                <button key={route.id} onClick={() => onSelect(route)}
                    className={`text-left p-4 rounded-[1.5rem] border-2 transition-all duration-300 ${selectedRoute?.id === route.id ? 'border-brand-gold bg-brand-gold/5 shadow-xl shadow-brand-gold/10' : 'border-slate-100 bg-slate-50 hover:border-brand-gold/40'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-2xl font-serif font-black ${selectedRoute?.id === route.id ? 'text-brand-dark' : 'text-slate-500'}`}>{route.label}</span>
                        {selectedRoute?.id === route.id && <div className="w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center"><CheckCircle2 size={12} className="text-white" /></div>}
                    </div>
                    <div className={`text-[10px] font-black px-2 py-0.5 rounded-full w-fit mb-2 ${route.gradeColor}`}>{route.grade} · {route.difficulty}</div>
                    <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1"><Clock size={10} /> {route.duration}</div>
                    <div className="mt-3 text-brand-dark font-black text-lg">₹{route.price.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-bold">/person</span></div>
                </button>
            ))}
        </div>
        <AnimatePresence mode="wait">
            {selectedRoute && (
                <motion.div key={selectedRoute.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                    className="mt-4 p-5 rounded-[1.5rem] bg-brand-dark text-white">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold mb-1">{selectedRoute.name}</p>
                    <p className="text-xs text-white/70 font-medium leading-relaxed">{selectedRoute.desc}</p>
                    <div className="mt-4">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Key Rapids</p>
                        <div className="flex flex-wrap gap-2">{selectedRoute.rapids.map((r, i) => <span key={i} className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full text-white/80">{r}</span>)}</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Best For</div>
                        <div className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{selectedRoute.bestFor}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// ─── Thrill Factory Activity Selector ───
const ThrillOptionsSelector = ({ options, selectedOption, onSelect }) => (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap size={16} className="text-red-400" /> Thrill Factory Rishikesh
            </h3>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mb-5">Choose your activity or combo package</p>
        <div className="space-y-3">
            {options.map(opt => (
                <button key={opt.id} onClick={() => onSelect(opt)}
                    className={`w-full text-left p-4 rounded-[1.5rem] border-2 transition-all duration-300 group ${selectedOption?.id === opt.id ? 'border-brand-gold bg-brand-gold/5 shadow-xl shadow-brand-gold/10' : 'border-slate-100 bg-slate-50 hover:border-brand-gold/40 hover:bg-brand-gold/5'}`}>
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{opt.icon}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className={`font-black text-sm ${selectedOption?.id === opt.id ? 'text-brand-dark' : 'text-slate-600'}`}>{opt.name}</span>
                                    {opt.badge && (
                                        <span className="text-[9px] font-black bg-brand-gold text-brand-dark px-2 py-0.5 rounded-full uppercase tracking-widest">{opt.badge}</span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${opt.difficultyColor}`}>{opt.difficulty}</span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={9} /> {opt.duration}</span>
                                    <span className="text-[10px] font-bold text-slate-400">Age: {opt.minAge}+</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <div className="text-lg font-black text-brand-dark">₹{opt.price.toLocaleString('en-IN')}</div>
                            <div className="text-[9px] text-slate-400 font-bold">/person</div>
                        </div>
                    </div>
                </button>
            ))}
        </div>

        <AnimatePresence mode="wait">
            {selectedOption && (
                <motion.div key={selectedOption.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                    className="mt-4 p-5 rounded-[1.5rem] bg-brand-dark text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{selectedOption.icon}</span>
                        <div>
                            <p className="font-black text-white text-sm">{selectedOption.name}</p>
                            <p className="text-[9px] text-brand-gold font-black uppercase tracking-widest">Max Weight: {selectedOption.maxWeight}</p>
                        </div>
                    </div>
                    <p className="text-xs text-white/70 font-medium leading-relaxed mb-4">{selectedOption.desc}</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedOption.highlights.map((h, i) => (
                            <span key={i} className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full text-white/80 flex items-center gap-1">
                                <CheckCircle2 size={9} className="text-brand-gold" /> {h}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const ActivityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedThrillOption, setSelectedThrillOption] = useState(null);
    const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', date: '', guests: '1' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const found = ALL_ACTIVITIES.find(a => a.id === id);
        if (found) {
            setActivity(found);
            if (found.raftingRoutes) {
                setSelectedRoute(found.raftingRoutes.find(r => r.id === 'shivpuri') || found.raftingRoutes[0]);
            }
            if (found.thrillOptions) {
                setSelectedThrillOption(found.thrillOptions[0]);
            }
            window.scrollTo(0, 0);
        } else {
            navigate('/activity');
        }
    }, [id, navigate]);

    const isRafting = activity?.id === 'river-rafting';
    const isBungee = activity?.id === 'bungee-jumping';

    const currentPrice = selectedRoute?.price ?? selectedThrillOption?.price ?? activity?.price;
    const currentDuration = selectedRoute?.duration ?? selectedThrillOption?.duration ?? activity?.duration;
    const currentDifficulty = selectedRoute?.difficulty ?? selectedThrillOption?.difficulty ?? activity?.difficulty;
    const currentGrade = selectedRoute?.grade ?? (selectedThrillOption ? `${selectedThrillOption.minAge}+ · ${selectedThrillOption.maxWeight}` : activity?.grade);

    const bookingLabel = selectedRoute
        ? `${activity?.name} — ${selectedRoute.name} (${selectedRoute.label})`
        : selectedThrillOption
            ? `${selectedThrillOption.name} @ Thrill Factory Rishikesh`
            : activity?.name;

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitWeb3Form({
                subject: `Activity Booking: ${bookingLabel}`,
                replyTo: bookingForm.email,
                fields: {
                    activity: bookingLabel,
                    price_per_person: `₹${currentPrice?.toLocaleString('en-IN')}`,
                    location: activity?.location,
                    ...bookingForm,
                }
            });
            setShowSuccess(true);
            setBookingForm({ name: '', email: '', phone: '', date: '', guests: '1' });
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Something went wrong. Please try again or contact us via WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!activity) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Helmet>
                <title>{activity.name} in {activity.location} | Yatra Go Adventure</title>
                <meta name="description" content={activity.desc} />
            </Helmet>

            {/* ─── Hero ─── */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
                <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
                    src={activity.img} alt={activity.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1539228945657-b12e1ffb1574?w=1200&q=80'; }} />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark/95" />
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-16 md:pb-24">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
                        <Link 
                            to="/activity" 
                            className="inline-flex items-center gap-2 text-white/90 hover:text-brand-gold font-bold text-xs sm:text-sm mb-6 sm:mb-8 transition-all group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]" /> Back to Catalog
                        </Link>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-brand-gold text-brand-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{activity.category} Adventure</span>
                            <div className="flex items-center gap-2">
                                <Star size={18} className="fill-brand-gold text-brand-gold" />
                                <span className="text-white font-black text-lg">{activity.rating}</span>
                                <span className="text-white/60 text-sm">({activity.reviews} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-tight tracking-tight mb-4">
                            {activity.name} <span className="text-brand-gold italic">Expedition</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8 text-white/90">
                            <div className="flex items-center gap-3"><MapPin size={22} className="text-brand-gold" /><span className="text-sm sm:text-lg font-bold uppercase tracking-wide">{activity.location}</span></div>
                            <div className="hidden sm:block border-l border-white/20 h-8" />
                            <div className="flex items-center gap-3"><Clock size={22} className="text-brand-gold" /><span className="text-sm sm:text-lg font-bold uppercase tracking-wide">{currentDuration}</span></div>
                            {(selectedRoute || selectedThrillOption) && (
                                <>
                                    <div className="hidden sm:block border-l border-white/20 h-8" />
                                    <div className="flex items-center gap-3">
                                        <Zap size={22} className="text-brand-gold" />
                                        <span className="text-sm sm:text-lg font-bold uppercase tracking-wide">
                                            {selectedRoute ? `${selectedRoute.label} · ${selectedRoute.grade}` : selectedThrillOption?.name}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Stats Strip ─── */}
            <div className="bg-white border-b border-slate-100 shadow-sm relative z-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { icon: <Zap size={20} className="text-orange-400 sm:w-6 sm:h-6" />, label: 'Intensity', value: currentDifficulty },
                            { icon: <ShieldCheck size={20} className="text-blue-400 sm:w-6 sm:h-6" />, label: 'Grade', value: currentGrade },
                            { icon: <Users size={20} className="text-emerald-400 sm:w-6 sm:h-6" />, label: 'Min. Age', value: selectedThrillOption?.minAge || activity.minAge },
                            { icon: <Clock size={20} className="text-purple-400 sm:w-6 sm:h-6" />, label: 'Duration', value: currentDuration },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 group">
                                <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                                    <p className="font-black text-brand-dark text-[11px] sm:text-sm">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Content Grid ─── */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 xl:gap-24">

                    {/* Left Column */}
                    <div className="space-y-20">
                        <ScrollReveal direction="up">
                            <h2 className="text-3xl font-serif font-black text-brand-dark mb-6">The <span className="text-brand-gold italic">Experience</span></h2>
                            <p className="text-slate-500 text-sm sm:text-lg leading-relaxed font-medium italic mb-10 border-l-4 border-brand-gold pl-4 sm:pl-8">
                                "{selectedRoute ? selectedRoute.desc : selectedThrillOption ? selectedThrillOption.desc : activity.desc}"
                            </p>
                            <h3 className="text-xl font-serif font-black text-brand-dark mb-8 uppercase tracking-wider flex items-center gap-3">
                                <Zap className="text-brand-gold" size={24} /> Expedition Highlights
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {(selectedThrillOption?.highlights || activity.highlights).map((h, i) => (
                                    <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="bg-brand-gold/10 p-2 rounded-xl text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all"><CheckCircle2 size={18} /></div>
                                        <p className="text-slate-600 font-bold text-sm leading-relaxed">{h}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up">
                            <h3 className="text-xl font-serif font-black text-brand-dark mb-8 uppercase tracking-wider flex items-center gap-3">
                                <Camera className="text-brand-gold" size={24} /> Visual Gallery
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                {activity.gallery.map((img, i) => (
                                    <div key={i} className={`relative overflow-hidden rounded-[2.5rem] shadow-xl group ${i === 2 ? 'col-span-2 h-96' : 'h-72'}`}>
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1565118531796-763e5082d113?w=800&q=80'; }} />
                                        <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up">
                            <div className="bg-brand-dark rounded-[3rem] p-12 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-3xl rounded-full" />
                                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                                    <div className="w-full">
                                        <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-gold mb-6 sm:mb-8 uppercase tracking-tight flex items-center gap-3"><Shield size={22} /> Purely Included</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {activity.includes.map((inc, i) => (
                                                <li key={i} className="flex items-center gap-3 text-white/80 font-bold tracking-wide text-xs sm:text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />{inc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                                        <h4 className="text-brand-gold font-black uppercase tracking-[0.2em] text-[10px] mb-4">Safety First Protocol</h4>
                                        <p className="text-white/60 text-sm leading-relaxed italic">All activities are operated under strict safety guidelines with internationally certified equipment and trained jump masters / pilots.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column — Booking */}
                    <div className="lg:sticky lg:top-36 h-fit space-y-8">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-brand-gold/5 blur-2xl rounded-full" />

                            {/* Selectors */}
                            {isRafting && activity.raftingRoutes && (
                                <RaftingRouteSelector routes={activity.raftingRoutes} selectedRoute={selectedRoute} onSelect={setSelectedRoute} />
                            )}
                            {isBungee && activity.thrillOptions && (
                                <ThrillOptionsSelector options={activity.thrillOptions} selectedOption={selectedThrillOption} onSelect={setSelectedThrillOption} />
                            )}

                            {/* Price */}
                            <div className="relative mb-8 p-6 bg-brand-dark rounded-[1.5rem]">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] block mb-2">
                                    {selectedThrillOption ? selectedThrillOption.name : selectedRoute ? `${selectedRoute.label} Route` : 'Package Fee'}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <AnimatePresence mode="wait">
                                        <motion.span key={currentPrice} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                            className="text-4xl font-serif font-black text-brand-gold">
                                            ₹{currentPrice?.toLocaleString('en-IN')}
                                        </motion.span>
                                    </AnimatePresence>
                                    <span className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Per Person</span>
                                </div>
                                {selectedRoute && <div className="mt-1 text-[10px] text-white/50 font-bold">{selectedRoute.name}</div>}
                                <div className="mt-4 flex items-center gap-2 text-emerald-400 bg-emerald-400/10 w-fit px-3 py-1.5 rounded-xl">
                                    <ShieldCheck size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Instant Confirmation</span>
                                </div>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
                                        <input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">People</label>
                                        <select value={bookingForm.guests} onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all appearance-none cursor-pointer">
                                            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1 ? 'Person' : 'People'}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <input type="text" placeholder="Your Name" required value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all" />
                                <input type="tel" placeholder="Mobile Number" required value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all" />

                                {bookingForm.guests && currentPrice && (
                                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Total ({bookingForm.guests} × ₹{currentPrice?.toLocaleString('en-IN')})</span>
                                        <span className="text-lg font-black text-brand-dark">₹{(currentPrice * parseInt(bookingForm.guests)).toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                <button type="submit" disabled={isSubmitting}
                                    className="w-full bg-brand-dark text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-xl group active:scale-95 disabled:opacity-75">
                                    <Mail size={18} className="group-hover:rotate-12 transition-transform" />
                                    {isSubmitting ? 'Requesting...' : 'Request Slot via Email'}
                                </button>
                            </form>

                            <div className="relative my-6 text-center text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">
                                <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-slate-100" />
                                <span className="bg-white relative px-4">OR</span>
                            </div>

                            <a href={`https://wa.me/918979931256?text=Hi! I want to book *${encodeURIComponent(bookingLabel)}*%0ADate: ${bookingForm.date || 'TBD'}%0APeople: ${bookingForm.guests}%0APlease confirm availability and pricing.`}
                                target="_blank" rel="noopener noreferrer"
                                className="w-full bg-green-500 text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-green-600 transition-all duration-300 shadow-xl group active:scale-95">
                                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> Book via WhatsApp
                            </a>

                            <p className="text-center text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Response within 15 minutes</p>
                        </motion.div>

                        <div className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between divide-x divide-slate-100">
                            {[
                                { icon: <Shield size={18} className="text-blue-500"/>, label: 'ISI Safety' },
                                { icon: <Zap size={18} className="text-brand-gold"/>, label: 'Certified' },
                                { icon: <Star size={18} className="text-amber-500"/>, label: '4.8 Rated' },
                            ].map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 px-2">
                                    {item.icon}<span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SuccessPopup open={showSuccess} onClose={() => setShowSuccess(false)}
                title="Request Authenticated"
                message={`Your booking request for ${bookingLabel} has been sent. A travel strategist will contact you shortly.`} />
        </div>
    );
};

export default ActivityDetails;
