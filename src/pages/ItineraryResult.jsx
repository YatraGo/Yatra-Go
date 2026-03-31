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

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4',
                compress: true,
            });

            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();

            const canvasW = canvas.width;
            const canvasH = canvas.height;

            const scale = pageW / canvasW;
            const imgW = pageW;
            const imgH = canvasH * scale;

            let yOffset = 0;
            let isFirst = true;

            while (yOffset < imgH) {
                if (!isFirst) pdf.addPage();
                // FAST compression for smoother slicing
                pdf.addImage(imgData, 'PNG', 0, -yOffset, imgW, imgH, undefined, 'FAST');
                yOffset += pageH;
                isFirst = false;
            }

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
                    <article ref={printRef} data-pdf-content className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_40px_100px_-40px_rgba(8,38,61,0.15)]">

                        {/* ────────── HERO ────────── */}
                        <div className="relative overflow-hidden px-8 pb-24 pt-20 sm:px-16 sm:pb-32 sm:pt-24 min-h-[500px] flex flex-col justify-center">
                            <div className="absolute inset-0 bg-slate-950" />
                            {itinerary.heroImage && (
                                <img src={itinerary.heroImage} alt={itinerary.destination} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/40 to-transparent" />

                            <div className="relative z-10">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-brand-gold backdrop-blur-md">
                                            <Sparkles size={14} /> Signature Edition
                                        </span>
                                        {isHelicopterTrip && (
                                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-amber-300 backdrop-blur-md">
                                                <Helicopter size={13} /> Helicopter Journey
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="mt-8 text-5xl font-serif font-black leading-[1.1] text-white sm:text-7xl lg:text-8xl max-w-4xl">
                                        {itinerary.title}
                                    </h1>
                                    <p className="mt-8 text-xl sm:text-2xl font-medium text-white/80 leading-relaxed max-w-2xl border-l-4 border-brand-gold pl-6">
                                        {itinerary.subtitle}
                                    </p>
                                    <div className="mt-12 flex flex-wrap gap-6 text-[13px] font-black uppercase tracking-widest text-white">
                                        <div className="flex items-center gap-3">
                                            <MapPinned size={20} className="text-brand-gold" /> {itinerary.destination}
                                        </div>
                                        <div className="h-4 w-px bg-white/20 hidden sm:block" />
                                        <div className="flex items-center gap-3">
                                            <CalendarDays size={20} className="text-brand-gold" /> {itinerary.daysCount} Premium Days
                                        </div>
                                        {isHelicopterTrip && (
                                            <>
                                                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                                                <div className="flex items-center gap-3">
                                                    <Helicopter size={20} className="text-amber-400" /> By Helicopter
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* ────────── OVERVIEW ────────── */}
                        <div className="px-8 py-20 sm:px-16 border-b border-slate-100">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Curated Expedition Overview</p>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>
                                <p className="text-2xl sm:text-3xl font-serif font-black leading-snug text-slate-900 mb-12">
                                    "{itinerary.overview}"
                                </p>

                                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Trip Architecture</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Pace</span>
                                                <span className="text-slate-900 font-black text-sm uppercase">Concise & Balanced</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Transport</span>
                                                <span className="text-slate-900 font-black text-sm uppercase">{itinerary.travelMode}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Style</span>
                                                <span className="text-slate-900 font-black text-sm uppercase">{itinerary.hotelStyle}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-6">Signature Highlights</p>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {(itinerary.highlights || []).map((item) => (
                                                <div key={item} className="flex gap-3 text-[14px] font-bold text-slate-700">
                                                    <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ────────── DAY-WISE ITINERARY ────────── */}
                        <div className="bg-white">
                            {(itinerary.days || []).map((day, index) => (
                                <div key={index} className="border-b border-slate-100">
                                    <div className="px-8 py-20 sm:px-16">
                                        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
                                            <div className="flex gap-8 items-start">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Day</p>
                                                    <div className="h-16 w-16 rounded-[1.5rem] bg-brand-dark flex items-center justify-center text-3xl font-black text-brand-gold shadow-xl shadow-brand-dark/10">
                                                        {day.dayNumber}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-gold mb-3 flex items-center gap-2">
                                                        <MapPinned size={14} /> {day.city}
                                                    </p>
                                                    <h2 className="text-4xl sm:text-5xl font-serif font-black text-slate-900 leading-tight">
                                                        {day.title}
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="hidden lg:block h-20 w-px bg-slate-100" />
                                            <div className="max-w-xs text-right hidden lg:block">
                                                <p className="text-lg font-medium leading-relaxed text-slate-500 italic">
                                                    "{day.summary}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Activity Flow */}
                                        <div className="space-y-12 mb-16">
                                            {[
                                                { label: 'Morning Expedition', items: day.morning, icon: <Sparkles size={20} /> },
                                                { label: 'Afternoon Discovery', items: day.afternoon, icon: <Sparkles size={20} /> },
                                                { label: 'Evening Relaxation', items: day.evening, icon: <Sparkles size={20} /> }
                                            ].map(period => (
                                                <div key={period.label} className="group border-l-2 border-slate-100 pl-10 hover:border-brand-gold transition-colors duration-500">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className="text-brand-gold opacity-40 group-hover:opacity-100 transition-opacity">
                                                            {period.icon}
                                                        </span>
                                                        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-brand-dark transition-colors">
                                                            {period.label}
                                                        </p>
                                                    </div>
                                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                        {(period.items || []).map(li => (
                                                            <div key={li} className="text-lg font-bold text-slate-700 leading-snug">
                                                                {li}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Day Logistics Footer */}
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-10 border-t border-slate-100">
                                            <div className="rounded-2xl bg-slate-50 p-6">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Signature Stay</p>
                                                <p className="text-sm font-black text-slate-900">{day.stay}</p>
                                            </div>
                                            <div className="rounded-2xl bg-slate-50 p-6">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Meal Curation</p>
                                                <p className="text-sm font-black text-slate-900">{day.mealPlan}</p>
                                            </div>
                                            <div className="rounded-2xl bg-slate-50 p-6 lg:col-span-2">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold mb-2">Logistics Note</p>
                                                <p className="text-sm font-black text-slate-900 italic">"{day.travelNotes}"</p>
                                            </div>
                                        </div>

                                        {/* Optional Day Photo */}
                                        {gallery.find(img => img.toLowerCase().includes(day.city?.toLowerCase())) && (
                                            <div className="mt-12 aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-slate-200">
                                                <img
                                                    src={gallery.find(img => img.toLowerCase().includes(day.city?.toLowerCase()))}
                                                    alt={day.city}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ────────── ROUTE MAP — REDESIGNED ────────── */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0c1e35] to-slate-900 px-8 py-24 sm:px-16">
                            {/* Background decoration */}
                            <div className="pointer-events-none absolute inset-0 opacity-30">
                                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
                                <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
                            </div>

                            <div className="relative z-10 max-w-4xl mx-auto">
                                {/* Section Header */}
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-[1.5rem] bg-brand-gold/15 border border-brand-gold/30 text-brand-gold mb-6">
                                        <MapIcon size={26} />
                                    </div>
                                    <h2 className="text-4xl sm:text-5xl font-serif font-black text-white mb-4">Journey Route Map</h2>
                                    <p className="text-white/50 font-medium text-lg">Your complete travel logistics at a glance</p>
                                </div>

                                {/* Route Timeline */}
                                <div className="relative">
                                    {/* Vertical connector line */}
                                    <div className="absolute left-[2.45rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-gold/60 via-brand-gold/20 to-brand-gold/60 hidden sm:block" />

                                    <div className="space-y-5">
                                        {(itinerary.route || []).map((leg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                                className="flex items-stretch gap-5 group"
                                            >
                                                {/* Day Badge */}
                                                <div className="relative flex flex-col items-center shrink-0 z-10">
                                                    <div className="h-[4.5rem] w-[4.5rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-brand-gold to-amber-500 shadow-lg shadow-brand-gold/25 text-brand-dark group-hover:scale-105 transition-transform duration-300">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-70">Day</span>
                                                        <span className="text-xl font-black leading-none">{leg.day || (i + 1)}</span>
                                                    </div>
                                                </div>

                                                {/* Route Card */}
                                                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 group-hover:bg-white/10 group-hover:border-brand-gold/30 transition-all duration-300 shadow-sm">
                                                    <div className="flex flex-wrap items-center gap-4 justify-between">
                                                        {/* From → To */}
                                                        <div className="flex items-center gap-4 min-w-0">
                                                            <div className="text-right shrink-0">
                                                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1">From</p>
                                                                <p className="text-base sm:text-lg font-black text-white">{leg.from}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0">
                                                                <div className="h-px w-6 bg-white/20" />
                                                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${getModeBadgeStyle(leg.mode)} bg-white`}>
                                                                    {getModeIcon(leg.mode)}
                                                                </div>
                                                                <div className="h-px w-6 bg-white/20" />
                                                            </div>
                                                            <div className="shrink-0">
                                                                <p className="text-[9px] font-bold text-brand-gold uppercase tracking-wider mb-1">To</p>
                                                                <p className="text-base sm:text-lg font-black text-white">{leg.to}</p>
                                                            </div>
                                                        </div>

                                                        {/* Mode + Distance chips */}
                                                        <div className="flex flex-wrap gap-2 shrink-0">
                                                            <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-black uppercase tracking-wider ${getModeBadgeStyle(leg.mode)} bg-white/90`}>
                                                                {getModeIcon(leg.mode)}
                                                                {leg.mode}
                                                            </span>
                                                            {leg.distance && (
                                                                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-black text-white/70 uppercase tracking-wider">
                                                                    <ArrowRight size={11} />
                                                                    {leg.distance}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* End marker */}
                                    <div className="flex items-center gap-5 mt-5">
                                        <div className="h-[4.5rem] w-[4.5rem] rounded-2xl flex items-center justify-center bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0">
                                            <CheckCircle2 size={28} />
                                        </div>
                                        <div className="flex-1 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-1">Journey Complete</p>
                                            <p className="text-sm font-bold text-white/70">Return to origin — {itinerary.origin || 'Home'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Essential Notes */}
                                {(itinerary.essentialNotes || []).length > 0 && (
                                    <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Info size={18} className="text-brand-gold" />
                                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-gold">Essential Travel Notes</p>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {(itinerary.essentialNotes || []).map((note, i) => (
                                                <div key={i} className="flex gap-3 text-sm font-semibold text-white/70 leading-relaxed">
                                                    <span className="text-brand-gold/60 font-black shrink-0">{(i + 1).toString().padStart(2, '0')}.</span>
                                                    {note}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ────────── TERMS & CONDITIONS ────────── */}
                        <div className="bg-white px-8 py-20 sm:px-16 border-t border-slate-100">
                            <div className="max-w-4xl mx-auto">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-brand-gold">
                                        <FileText size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal</p>
                                        <h2 className="text-3xl font-serif font-black text-slate-900">Terms & Conditions</h2>
                                    </div>
                                </div>

                                <div className="grid gap-8 sm:grid-cols-2">
                                    {TERMS_AND_CONDITIONS.map((section, i) => (
                                        <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="h-1 w-6 rounded-full bg-brand-gold" />
                                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">{section.title}</h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {section.points.map((point, j) => (
                                                    <li key={j} className="flex gap-3 text-[13px] text-slate-600 leading-relaxed font-medium">
                                                        <span className="text-brand-gold font-black shrink-0 mt-0.5">›</span>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ────────── CANCELLATION POLICY ────────── */}
                        <div className="bg-slate-50 px-8 py-16 sm:px-16 border-t border-slate-100">
                            <div className="max-w-4xl mx-auto">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white">
                                        <Shield size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Policy</p>
                                        <h2 className="text-3xl font-serif font-black text-slate-900">Cancellation Policy</h2>
                                    </div>
                                </div>

                                {/* Policy Note */}
                                <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-sm font-semibold text-amber-800 leading-relaxed">
                                        Cancellation requests must be submitted in writing via email to <strong>sales.yatrago@gmail.com</strong>. Refunds are processed within 7–10 business days. GST and payment gateway charges are non-refundable.
                                    </p>
                                </div>

                                {/* Cancellation Tiers */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {CANCELLATION_POLICY.map((tier, i) => (
                                        <div key={i} className={`rounded-2xl border ${tier.border} ${tier.bg} p-6 flex items-start gap-4`}>
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tier.badge}`}>
                                                {i === 0 ? <CheckCircle2 size={20} /> :
                                                 i === 1 ? <Clock size={20} /> :
                                                 i === 2 ? <AlertCircle size={20} /> :
                                                 <XCircle size={20} />}
                                            </div>
                                            <div>
                                                <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${tier.text} mb-1`}>
                                                    {tier.days}
                                                </p>
                                                <p className={`text-2xl font-serif font-black ${tier.text}`}>{tier.refund}</p>
                                                {i === 3 && (
                                                    <p className="text-[11px] text-rose-500 font-semibold mt-1">100% forfeiture of package cost</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-6 text-center text-[11px] font-semibold text-slate-400">
                                    * All cancellation calculations are based on the date the written request is received by Yatra Go. Force majeure events are governed by separate terms.
                                </p>
                            </div>
                        </div>

                        {/* ────────── PROFESSIONAL FOOTER ────────── */}
                        <div className="bg-brand-dark px-8 py-20 text-white sm:px-16 flex flex-wrap items-center justify-between gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
                                <Sparkles size={200} />
                            </div>

                            <div className="max-w-xl relative z-10">
                                <img src={logoSrc} alt="Yatra Go" className="h-12 mb-10 contrast-200 grayscale invert" />
                                <h3 className="text-4xl font-serif font-black mb-6">Designed by Travel Strategists.</h3>
                                <p className="text-lg font-medium text-white/60 leading-relaxed mb-10">
                                    This itinerary is a living document of your expedition. Our consultants are ready to customize any segment to fit your personal preference.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <a href={`tel:${itinerary.brand?.phone}`} className="flex items-center gap-4 rounded-2xl bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-dark transition hover:bg-white">
                                        <Phone size={16} /> Consult Specialist
                                    </a>
                                    <a href={`mailto:${itinerary.brand?.email}`} className="flex items-center gap-4 rounded-2xl border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10 cursor-pointer">
                                        <Mail size={16} /> Email Support
                                    </a>
                                </div>
                            </div>

                            <div className="relative z-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl min-w-[300px]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-8 bg-brand-gold rounded-full" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Contact Details</p>
                                </div>
                                <div className="space-y-4 font-bold text-white/90">
                                    <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Location</div>
                                    <p className="flex items-center gap-3 text-sm"><MapPinned size={14} className="text-brand-gold" /> Ganesh Vihar, Jwalapur, Haridwar</p>
                                    <p className="flex items-center gap-3 text-sm"><Phone size={14} className="text-brand-gold" /> +91 89799 31256</p>
                                    <p className="flex items-center gap-3 text-sm"><Mail size={14} className="text-brand-gold" /> sales.yatrago@gmail.com</p>
                                    <div className="text-xs uppercase tracking-widest text-white/40 mt-6 mb-2">Legal</div>
                                    <p className="text-[10px] text-white/40">© 2026 Yatra Go Yuvan Creations. All premium itineraries are protected under standard terms.</p>
                                </div>
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
