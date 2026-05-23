import React, { useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import {
    CalendarDays, Download, MapPinned, Phone, Sparkles, Plane, Car, Train,
    Map as MapIcon, Mail, CheckCircle2, ArrowRight, Helicopter, AlertCircle,
    FileText, Shield, XCircle, Clock, Info
} from 'lucide-react';
import { getDestinationImage } from '../lib/itineraryBuilder';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro'; // Use -pro for Tailwind 4 support

// ─── Terms & Conditions Data ───
const TERMS_AND_CONDITIONS = [
    {
        title: 'Booking & Payment',
        points: [
            'A minimum advance of 30% of the total package cost is required to confirm your booking.',
            'Full payment must be completed at least 7 days before the departure date.',
            'Bookings are subject to availability and will be confirmed only upon receipt of the advance payment.',
            'All prices are per person on twin-sharing basis unless otherwise specified.',
        ],
    },
    {
        title: 'Inclusions & Exclusions',
        points: [
            'The itinerary covers only those services that are explicitly mentioned under "Inclusions" in the respective package.',
            'Any expense of personal nature, tips, porterage, laundry, telephone charges, etc., are not included.',
            'Entry fees to monuments, camera charges, and optional activities are not included unless specified.',
            'Yatra Go is not responsible for any expenses incurred due to natural calamities, strikes, or force majeure events.',
        ],
    },
    {
        title: 'Accommodation & Travel',
        points: [
            'Hotel check-in is typically at 2:00 PM and check-out at 12:00 PM. Early check-in or late check-out is subject to availability.',
            'AC vehicles will be non-AC on hilly terrain as per safety and mechanical requirements.',
            'Yatra Go reserves the right to alter the sequence of the itinerary or substitute hotels of equivalent standard if required.',
            'Helicopter services are subject to weather conditions and DGCA regulations. No refund is provided for weather cancellations unless the operator supports it.',
        ],
    },
    {
        title: 'Liability',
        points: [
            'Yatra Go acts as a travel facilitator and is not liable for any injury, loss, accident, or damage to property during the tour.',
            'Participants are advised to carry personal health and travel insurance for the duration of the trip.',
            'Yatra Go is not responsible for delays caused by traffic conditions, roadblocks, or government-imposed restrictions.',
        ],
    },
];

const CANCELLATION_POLICY = [
    { days: '30+ days before departure', refund: '90% Refund', color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    { days: '15–29 days before departure', refund: '60% Refund', color: 'amber', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    { days: '7–14 days before departure', refund: '30% Refund', color: 'orange', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
    { days: '0–6 days before departure', refund: 'No Refund', color: 'rose', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700' },
];

// ─── Component ───
const ItineraryResult = () => {
    const location = useLocation();
    const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
    const printRef = useRef();
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [pdfError, setPdfError] = useState('');

    const itinerary = useMemo(() => {
        if (location.state?.itinerary) return location.state.itinerary;
        const stored = sessionStorage.getItem('yatrago-latest-itinerary');
        return stored ? JSON.parse(stored) : null;
    }, [location.state]);

    // ─── Direct PDF Download — no print dialog ───
    const handleDownloadPdf = async () => {
        if (!itinerary || isGeneratingPdf) return;
        setIsGeneratingPdf(true);
        setPdfError('');

        try {
            const element = printRef.current;
            if (!element) throw new Error('Content not ready');

            // 1. Reset scroll to top to prevent offset artifacts during capture
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 500)); // Wait for any scrolls/animations to settle

            // 2. Optimizing capture using html2canvas-pro
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true,
                allowTaint: false,
                logging: false,
                backgroundColor: '#ffffff', // Explicitly white background
                imageTimeout: 20000,
                onclone: (clonedDoc) => {
                    const el = clonedDoc.querySelector('[data-pdf-content]');
                    if (el) {
                        el.style.display = 'block';
                        el.style.width = '1200px'; // Set a slightly wider base for capture
                        el.style.backgroundColor = '#ffffff';
                        el.style.boxShadow = 'none'; // CRITICAL: remove shadows causing black line artifacts
                        el.style.borderRadius = '0'; // Flat edges for PDF seams
                    }
                },
            });

            const imgData = canvas.toDataURL('image/png'); // PNG prevents black transparency issues

            const canvasW = canvas.width;
            const canvasH = canvas.height;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvasW, canvasH],
                compress: true,
            });

            // Add the image exactly once without slicing it
            pdf.addImage(imgData, 'PNG', 0, 0, canvasW, canvasH, undefined, 'FAST');

            const fileName = `YatraGo-${(itinerary.title || 'Itinerary').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error('PDF Generation failed:', error);
            setPdfError(`PDF download failed (${error.message || 'unknown error'}). Please try again.`);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const gallery = itinerary?.gallery || [];

    const getModeIcon = (mode = '') => {
        const m = mode.toLowerCase();
        if (m.includes('helicopter') || m.includes('heli')) return <Helicopter size={16} className="text-amber-500" />;
        if (m.includes('flight') || m.includes('air')) return <Plane size={16} className="text-blue-500" />;
        if (m.includes('train') || m.includes('rail')) return <Train size={16} className="text-purple-500" />;
        return <Car size={16} className="text-slate-500" />;
    };

    const getModeBadgeStyle = (mode = '') => {
        const m = mode.toLowerCase();
        if (m.includes('helicopter') || m.includes('heli')) return 'bg-amber-100 text-amber-700 border-amber-200';
        if (m.includes('flight') || m.includes('air')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (m.includes('train') || m.includes('rail')) return 'bg-purple-100 text-purple-700 border-purple-200';
        return 'bg-slate-100 text-slate-600 border-slate-200';
    };

    if (!itinerary) {
        return (
            <div className="min-h-[70vh] bg-slate-50 px-4 py-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
                    <img src={logoSrc} alt="Yatra Go" className="mx-auto h-12 w-auto mb-6" />
                    <h1 className="text-4xl font-serif font-black text-slate-950">No itinerary found</h1>
                    <p className="mt-4 text-slate-500">Please build a new itinerary first.</p>
                    <Link to="/itinerary-builder" className="mt-8 inline-flex rounded-2xl bg-brand-dark px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-gold hover:text-brand-dark">
                        Go To Builder
                    </Link>
                </div>
            </div>
        );
    }

    const isHelicopterTrip = itinerary.travelModeSelected === 'helicopter' || (itinerary.travelMode || '').toLowerCase().includes('helicopter');

    return (
        <div className="bg-slate-50 font-sans">
            <Helmet>
                <title>{itinerary.title} | Yatra Go Premium Itinerary</title>
            </Helmet>

            {/* ─── PDF Generating Overlay ─── */}
            <AnimatePresence>
                {isGeneratingPdf && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/85 backdrop-blur-md text-white"
                    >
                        <div className="text-center">
                            <div className="relative mx-auto mb-6 h-24 w-24">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                                <div className="absolute inset-0 rounded-full border-4 border-t-brand-gold border-r-brand-gold/40 border-b-transparent border-l-transparent animate-spin" />
                                <div className="absolute inset-3 flex items-center justify-center">
                                    <Download size={28} className="text-brand-gold" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif font-black mb-2">Preparing Your PDF</h2>
                            <p className="text-white/60 font-medium">Your download will start automatically...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    {/* ─── Header Controls ─── */}
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-6 px-4">
                        <Link to="/" className="flex items-center gap-4">
                            <img src={logoSrc} alt="Yatra Go" className="h-10 sm:h-12 w-auto" />
                        </Link>

                        <div className="flex flex-wrap gap-3">
                            <Link to="/itinerary-builder" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 transition hover:border-brand-gold hover:text-brand-dark">
                                Rebuild
                            </Link>
                            <button
                                onClick={handleDownloadPdf}
                                disabled={isGeneratingPdf}
                                className="inline-flex items-center gap-3 rounded-2xl bg-brand-dark px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-brand-gold hover:text-brand-dark shadow-lg shadow-brand-dark/10 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Download size={16} />
                                {isGeneratingPdf ? 'Downloading...' : 'Download Itinerary'}
                            </button>
                        </div>
                    </div>

                    {pdfError && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-bold text-rose-700">
                            <AlertCircle size={16} />
                            {pdfError}
                        </div>
                    )}

                    {/* ─── PDF Content Root ─── */}
                    <article ref={printRef} data-pdf-content className="overflow-hidden bg-white mx-auto text-slate-900 font-sans shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[1122px] max-w-[1122px]">
                        {/* TOP SECTION: Split Grid */}
                        <div className="flex w-full min-h-[600px]">
                            {/* Left Sidebar - Dark Blue */}
                            <div className="w-[340px] bg-[#0c1f38] text-white flex flex-col p-10 pt-14 relative overflow-hidden shrink-0" style={{ borderBottomRightRadius: '140px' }}>
                                {/* Background arc/line like image */}
                                <div className="absolute top-1/3 -right-20 w-64 h-64 border-[1px] border-brand-gold/20 rounded-full pointer-events-none" />
                                
                                <img src={logoSrc} alt="Yatra Go" className="w-56 mb-16 relative z-10" />
                                
                                <h1 className="text-[40px] font-serif font-black mb-1 text-white relative z-10 leading-none">ITINERARY</h1>
                                <div className="w-16 h-0.5 bg-brand-gold mb-4 relative z-10 mx-auto ml-0" />
                                <p className="text-xs text-white/80 mb-12 border-b border-brand-gold/30 pb-8 relative z-10 text-center mx-auto w-full max-w-[200px]">Memories Await, We Plan<br/>You Enjoy</p>
                                
                                <div className="space-y-8 relative z-10 pl-2">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-gold mb-1">PREPARED FOR</p>
                                        <p className="text-sm font-semibold">{itinerary.userName || 'Mr. Rajesh Sharma & Family'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-gold mb-1">TRIP DESTINATION</p>
                                        <p className="text-sm font-semibold">{itinerary.destination}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-gold mb-1">TRIP DATES</p>
                                        <p className="text-sm font-semibold">{itinerary.dates || 'Flexible Dates'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-gold mb-1">DURATION</p>
                                        <p className="text-sm font-semibold">{itinerary.daysCount} Days / {Math.max(1, itinerary.daysCount - 1)} Nights</p>
                                    </div>
                                </div>

                                {/* Mountain graphic at bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-48 opacity-20 pointer-events-none">
                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
                                        <path d="M0,100 L0,60 L15,80 L35,40 L55,70 L75,30 L100,70 L100,100 Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Right Content Area */}
                            <div className="flex-1 flex flex-col -ml-[100px] bg-white">
                                {/* Hero Image with Title */}
                                <div className="relative h-[380px] w-full" style={{ borderBottomLeftRadius: '140px', overflow: 'hidden' }}>
                                    {itinerary.heroImage ? (
                                        <img src={itinerary.heroImage} alt={itinerary.destination} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                                    
                                    {/* Overlay Text */}
                                    <div className="absolute bottom-6 left-32 right-10 text-center">
                                        <h2 className="text-[5.5rem] font-serif text-[#0c1f38] leading-[0.9] mb-1 drop-shadow-md">{itinerary.title || itinerary.destination}</h2>
                                        <p className="text-[22px] font-serif text-amber-600 italic drop-shadow-sm leading-none">Let's explore the magic of {itinerary.destination}</p>
                                        <div className="flex items-center justify-center mt-3 opacity-60">
                                            <div className="h-px bg-[#0c1f38] w-12" />
                                            <Plane size={14} className="text-[#0c1f38] mx-2 rotate-45" />
                                            <div className="h-px bg-[#0c1f38] w-12" />
                                        </div>
                                    </div>
                                </div>

                                {/* Highlights & Overview */}
                                <div className="pl-32 pr-10 pt-8 pb-8 flex-1 flex flex-col justify-between">
                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#0c1f38] mb-5">TRIP HIGHLIGHTS</p>
                                        <div className="grid grid-cols-4 gap-3 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#1b5e9e] flex items-center justify-center text-white mb-2 shadow-md">
                                                    <MapIcon size={20} />
                                                </div>
                                                <p className="text-[11px] font-bold text-slate-800 mb-0.5">Scenic Beauty</p>
                                                <p className="text-[9px] text-slate-500 leading-tight">Breathtaking views & landscapes</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#1b5e9e] flex items-center justify-center text-white mb-2 shadow-md">
                                                    <Sparkles size={20} />
                                                </div>
                                                <p className="text-[11px] font-bold text-slate-800 mb-0.5">Top Attractions</p>
                                                <p className="text-[9px] text-slate-500 leading-tight">Must-visit places & monuments</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#1b5e9e] flex items-center justify-center text-white mb-2 shadow-md">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <p className="text-[11px] font-bold text-slate-800 mb-0.5">Local Experiences</p>
                                                <p className="text-[9px] text-slate-500 leading-tight">Culture, cuisine & hospitality</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#1b5e9e] flex items-center justify-center text-white mb-2 shadow-md">
                                                    <Shield size={20} />
                                                </div>
                                                <p className="text-[11px] font-bold text-slate-800 mb-0.5">Comfort & Ease</p>
                                                <p className="text-[9px] text-slate-500 leading-tight">Premium stays & transfers</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Daily Overview Timeline */}
                                    <div>
                                        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#0c1f38] mb-5">DAILY OVERVIEW</p>
                                        <div className="relative flex justify-between px-4">
                                            <div className="absolute top-4 left-8 right-8 h-[1px] bg-slate-300 -z-10" />
                                            {(itinerary.days || []).slice(0, 7).map((day, idx) => (
                                                <div key={idx} className="flex flex-col items-center text-center w-[65px]">
                                                    <div className="w-8 h-8 rounded-full bg-[#0c1f38] text-white flex items-center justify-center text-[11px] font-bold mb-2 ring-4 ring-white shadow-sm">
                                                        {day.dayNumber.toString().padStart(2, '0')}
                                                    </div>
                                                    <p className="text-[8px] font-black uppercase text-slate-700 mb-0.5">{day.date || `Day ${idx + 1}`}</p>
                                                    <p className="text-[8px] text-slate-600 leading-tight line-clamp-2">{day.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM SECTION: Two Columns */}
                        <div className="flex border-t border-slate-200">
                            {/* Left: Detailed Itinerary */}
                            <div className="w-[72%] p-8 pr-6 border-r border-slate-200">
                                <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#0c1f38] mb-4">DETAILED ITINERARY</p>
                                <div className="space-y-3">
                                    {(itinerary.days || []).map((day, idx) => {
                                        const img = gallery.find(i => i.toLowerCase().includes(day.city?.toLowerCase())) || gallery[idx % gallery.length];
                                        return (
                                            <div key={idx} className="flex border border-slate-200 bg-white">
                                                {/* Day Badge */}
                                                <div className="w-[65px] bg-[#0c1f38] text-white flex flex-col items-center justify-center shrink-0 py-3 text-center border-r border-[#0c1f38]">
                                                    <span className="text-[8px] uppercase tracking-wider mb-0.5 opacity-90">DAY</span>
                                                    <span className="text-2xl font-black mb-0.5">{day.dayNumber.toString().padStart(2, '0')}</span>
                                                    <span className="text-[8px] uppercase tracking-wider opacity-90">{day.date || `${idx + 1} JUN`}</span>
                                                </div>
                                                
                                                {/* Details */}
                                                <div className="flex-1 py-3 px-4 flex flex-col justify-center min-h-[90px]">
                                                    <h3 className="text-[13px] font-bold text-[#1b5e9e] mb-1.5 leading-tight">{day.title}</h3>
                                                    <ul className="space-y-0.5 pl-3 list-disc marker:text-slate-400">
                                                        {day.morning?.slice(0, 2).map((li, i) => <li key={`m-${i}`} className="text-[10px] text-slate-800 leading-snug">{li}</li>)}
                                                        {day.afternoon?.slice(0, 2).map((li, i) => <li key={`a-${i}`} className="text-[10px] text-slate-800 leading-snug">{li}</li>)}
                                                    </ul>
                                                </div>

                                                {/* Image Thumbnail */}
                                                <div className="w-[120px] shrink-0 border-l border-r border-white">
                                                    {img ? (
                                                        <img src={img} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-100" />
                                                    )}
                                                </div>

                                                {/* Hotel & Meals */}
                                                <div className="w-[120px] shrink-0 px-3 py-2 flex flex-col justify-center space-y-2.5">
                                                    <div className="flex items-start gap-2">
                                                        <div className="mt-0.5">
                                                            <MapIcon size={12} className="text-[#0c1f38]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-bold text-slate-500 uppercase leading-none mb-0.5">Hotel</p>
                                                            <p className="text-[9px] font-medium text-slate-800 leading-tight">{day.stay || 'Standard Hotel'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <div className="mt-0.5">
                                                            <CheckCircle2 size={12} className="text-[#0c1f38]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-bold text-slate-500 uppercase leading-none mb-0.5">Meals</p>
                                                            <p className="text-[9px] font-medium text-slate-800 leading-tight">{day.mealPlan || 'Breakfast, Dinner'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Sidebar: Inclusions/Exclusions/Notes */}
                            <div className="w-[28%] bg-[#f8f9fa] p-8 shrink-0">
                                <div className="mb-8">
                                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1b5e9e] mb-4">INCLUSIONS</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded border border-[#1b5e9e]/30 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={10} className="text-[#1b5e9e]" /></div>
                                            <span className="text-[10px] text-slate-700 leading-snug">Accommodation with Breakfast</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded border border-[#1b5e9e]/30 flex items-center justify-center shrink-0 mt-0.5"><Car size={10} className="text-[#1b5e9e]" /></div>
                                            <span className="text-[10px] text-slate-700 leading-snug">Private Airport Transfers</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded border border-[#1b5e9e]/30 flex items-center justify-center shrink-0 mt-0.5"><MapPinned size={10} className="text-[#1b5e9e]" /></div>
                                            <span className="text-[10px] text-slate-700 leading-snug">All Sightseeing as per Itinerary</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded border border-[#1b5e9e]/30 flex items-center justify-center shrink-0 mt-0.5"><MapIcon size={10} className="text-[#1b5e9e]" /></div>
                                            <span className="text-[10px] text-slate-700 leading-snug">All Tours & Transfers on Private Basis</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded border border-[#1b5e9e]/30 flex items-center justify-center shrink-0 mt-0.5"><Sparkles size={10} className="text-[#1b5e9e]" /></div>
                                            <span className="text-[10px] text-slate-700 leading-snug">All Applicable Taxes</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-8 border-t border-slate-200 pt-6">
                                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1b5e9e] mb-4">EXCLUSIONS</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2.5">
                                            <Plane size={12} className="text-[#1b5e9e] shrink-0 mt-0.5" />
                                            <span className="text-[10px] text-slate-700 leading-snug">Airfare & Visa Charges</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <Shield size={12} className="text-[#1b5e9e] shrink-0 mt-0.5" />
                                            <span className="text-[10px] text-slate-700 leading-snug">Travel Insurance</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <Info size={12} className="text-[#1b5e9e] shrink-0 mt-0.5" />
                                            <span className="text-[10px] text-slate-700 leading-snug">Personal Expenses</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <AlertCircle size={12} className="text-[#1b5e9e] shrink-0 mt-0.5" />
                                            <span className="text-[10px] text-slate-700 leading-snug">Anything not mentioned in Inclusions</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-t border-slate-200 pt-6">
                                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1b5e9e] mb-4">IMPORTANT NOTES</p>
                                    <ul className="space-y-2 list-disc pl-3 marker:text-[#1b5e9e] marker:text-xs">
                                        <li className="text-[9px] text-slate-700 leading-snug">Standard Check-in: 02:00 PM & Check-out: 11:00 AM</li>
                                        <li className="text-[9px] text-slate-700 leading-snug">Itinerary is subject to change due to local conditions</li>
                                        <li className="text-[9px] text-slate-700 leading-snug">Please carry valid ID proof during travel</li>
                                        <li className="text-[9px] text-slate-700 leading-snug">Always keep travel documents & valuables safe</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ROUTE MAP SECTION */}
                        <div className="p-10 border-t border-slate-200 bg-[#0c1f38] text-white">
                             <div className="flex items-center gap-3 mb-6">
                                <MapPinned size={20} className="text-brand-gold" />
                                <h2 className="text-xl font-serif font-black uppercase tracking-widest text-white">Route Map & Details</h2>
                             </div>
                             <div className="flex flex-wrap gap-4">
                                {(itinerary.route || []).map((leg, i) => (
                                    <div key={i} className="flex-grow basis-[calc(25%-12px)] min-w-[200px] bg-white/10 rounded-lg p-4 border border-white/20 shadow-sm relative overflow-hidden">
                                        <div className="absolute -right-4 -bottom-4 opacity-10"><MapIcon size={64}/></div>
                                        <p className="text-[9px] text-brand-gold uppercase tracking-wider mb-1.5 font-bold">Leg {i + 1}</p>
                                        <p className="text-xs font-bold leading-tight mb-2 relative z-10">{leg.from} <ArrowRight size={10} className="inline mx-0.5" /> {leg.to}</p>
                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] opacity-80 bg-black/20 inline-flex px-2 py-1 rounded relative z-10">
                                            {getModeIcon(leg.mode)} {leg.mode} • {leg.distance}
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* TERMS AND POLICIES SECTION */}
                        <div className="p-10 border-t border-slate-200 bg-white grid grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#0c1f38] mb-5 border-b border-brand-gold inline-block pb-1">TERMS & CONDITIONS</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {TERMS_AND_CONDITIONS.slice(0, 2).map((section, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] font-bold text-slate-800 uppercase mb-1.5">{section.title}</p>
                                            <ul className="list-disc pl-3 space-y-1 marker:text-brand-gold">
                                                {section.points.slice(0, 2).map((pt, j) => (
                                                    <li key={j} className="text-[9px] text-slate-600 leading-snug">{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#0c1f38] mb-5 border-b border-brand-gold inline-block pb-1">CANCELLATION POLICY</h3>
                                <div className="space-y-2 max-w-[90%]">
                                    {CANCELLATION_POLICY.map((tier, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                            <span className="text-[10px] font-bold text-slate-700">{tier.days}</span>
                                            <span className={`text-[10px] font-black ${tier.text}`}>{tier.refund}</span>
                                        </div>
                                    ))}
                                    <p className="text-[8px] text-slate-400 mt-2 italic">* Cancellation requests must be submitted in writing. Refunds processed within 7–10 days.</p>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="bg-[#0A1628] text-white px-10 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-[11px] font-bold">
                                    <Phone size={12} className="text-brand-gold" /> +91 98765 43210
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-bold">
                                    <Mail size={12} className="text-brand-gold" /> info@yatrago.com
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-bold">
                                    <MapIcon size={12} className="text-brand-gold" /> www.yatrago.com
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-brand-gold font-serif text-xl italic leading-none mb-0.5">Thank you!</p>
                                <p className="text-[9px] text-white/60">We look forward to welcoming you on this journey.</p>
                            </div>
                        </div>
                    </article>

                    <div className="mt-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                        Auto-Generated by Yatra Go Elite AI
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ItineraryResult;
