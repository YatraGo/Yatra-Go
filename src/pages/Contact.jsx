import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ChevronDown, Facebook, Instagram, Send, Youtube } from 'lucide-react';
import { db } from '../firebase/config';
import { SuccessPopup } from '../components/ui';
import ScrollReveal from '../components/ui/ScrollReveal';
import { submitWeb3Form } from '../lib/web3forms';

const FAQS = [
    { q: 'How do I book a tour with Yatra Go?', a: 'You can call us directly, send a WhatsApp message, or fill out our enquiry form. Our team will respond within 2 hours with a custom itinerary.' },
    { q: 'Do you offer customized tour packages?', a: 'Yes! All our packages are fully customizable. Share your travel dates, budget, and preferences, and we will design a trip just for you.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfers, UPI, credit/debit cards, and cash. Partial payment (advance booking) is also available.' },
    { q: 'Can you help with hotel and flight bookings?', a: 'Absolutely. We offer complete end-to-end travel solutions including hotel, cab, train, and air ticket bookings.' },
];

const initialForm = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    destination: '',
    travelDate: '',
    travelers: '2',
    budget: '',
    departureCity: '',
    tripFocus: '',
    stayCategory: '',
    callbackWindow: '',
    message: '',
};

const packageOptions = [
    'Adventure Package',
    'Pilgrimage Package',
    'Family Package',
    'Honeymoon Package',
    'Custom Package',
];

const durationOptions = [
    '1-3 days',
    '4-7 days',
    '8-10 days',
    '10+ days',
];

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const serviceType = form.serviceType || 'Custom Package';
            const destination = form.destination || 'General Travel Enquiry';
            const travelDate = form.travelDate || 'To be discussed';
            const travelers = form.travelers || '2';
            const budget = form.budget || 'Need guidance';
            const departureCity = form.departureCity.trim() || 'Not shared';
            const tripFocus = form.tripFocus || 'Flexible';
            const stayCategory = form.stayCategory || 'Not specified';
            const callbackWindow = form.callbackWindow || 'Reach out at the earliest';

            if (db) {
                await addDoc(collection(db, 'enquiries'), {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    serviceType,
                    destination,
                    travelDate,
                    travelers,
                    budget,
                    departureCity,
                    tripFocus,
                    stayCategory,
                    callbackWindow,
                    message: form.message.trim(),
                    status: 'new',
                    createdAt: serverTimestamp(),
                });
            }

            await submitWeb3Form({
                subject: `${serviceType} - ${destination} Contact Query`,
                replyTo: form.email,
                fields: {
                    inquiry_type: 'Contact Page Query',
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    service_type: serviceType,
                    destination,
                    travel_date: travelDate,
                    travelers,
                    estimated_budget: budget,
                    departure_city: departureCity,
                    trip_focus: tripFocus,
                    stay_category: stayCategory,
                    callback_window: callbackWindow,
                    message: form.message || 'No additional message provided.',
                },
            });

            setForm(initialForm);
            setShowSuccess(true);
        } catch (submitError) {
            console.error('Contact form failed', submitError);
            setError('Your enquiry could not be sent right now. Please try again in a moment.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.08),_transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_42%,#f8fafc_100%)]">
            <Helmet>
                <title>Contact Us | Yatra Go - Travel Agency Haridwar</title>
                <meta name="description" content="Contact Yatra Go for tour packages, cab bookings, and travel enquiries. Based in Haridwar, Uttarakhand." />
            </Helmet>

            <section className="bg-white/80 py-12 sm:py-20 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] sm:rounded-[2.4rem] border border-slate-200/90 bg-white px-6 py-6 sm:py-8 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.25)] md:px-10">
                        <div className="mb-3 sm:mb-4 text-[10px] sm:text-sm font-bold text-slate-500">Home / Pages / Contact</div>
                        <p className="text-[10px] sm:text-sm font-black uppercase tracking-[0.24em] text-brand-gold">Contact Us</p>
                        <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-serif font-black text-slate-900 md:text-5xl leading-tight">Contact For Any Query</h1>
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
                        <ScrollReveal direction="left">
                            <div className="rounded-[2rem] sm:rounded-[2.4rem] border border-slate-200/90 bg-white p-6 sm:p-10 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.25)]">
                                <div className="space-y-6 sm:space-y-8 text-center sm:text-left">
                                    <div className="group">
                                        <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-tight">Address</h3>
                                        <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-7 sm:leading-8 text-slate-600 font-medium">
                                            Yatra Go House, Yoravar Enclave,
                                            <br />
                                            Phase-1, Ganesh Vihar, Sitapur,
                                            <br />
                                            Jwalapur, Haridwar
                                            <br />
                                            Uttarakhand 249407, INDIA
                                        </p>
                                    </div>

                                    <div className="group">
                                        <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-tight">Mobile</h3>
                                        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                                            <a href="tel:+918979931256" className="block text-sm sm:text-base font-bold text-slate-600 transition-colors hover:text-brand-gold tracking-tight">+91 8979931256</a>
                                            <a href="tel:+918979220256" className="block text-sm sm:text-base font-bold text-slate-600 transition-colors hover:text-brand-gold tracking-tight">+91 8979220256</a>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-tight">Email</h3>
                                        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 overflow-hidden">
                                            <a href="mailto:info@yatrago.com" className="block text-sm sm:text-base font-bold text-slate-600 transition-colors hover:text-brand-gold truncate">info@yatrago.com</a>
                                            <a href="mailto:sales.yatrago@gmail.com" className="block text-sm sm:text-base font-bold text-slate-600 transition-colors hover:text-brand-gold truncate">sales.yatrago@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-tight">Website</h3>
                                        <a
                                            href="https://www.yatrago.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-2 sm:mt-3 inline-block text-sm sm:text-base font-bold text-slate-600 transition-colors hover:text-brand-gold"
                                        >
                                            www.yatrago.com
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-3 border-t border-slate-100 pt-8 grid-cols-1 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-slate-100/50">
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Response Time</p>
                                        <p className="mt-1 sm:mt-2 text-sm sm:text-base font-black text-slate-900 leading-tight">Quick support</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-slate-100/50">
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Travel Desk</p>
                                        <p className="mt-1 sm:mt-2 text-sm sm:text-base font-black text-slate-900 leading-tight">Expert support</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <form onSubmit={handleSubmit} className="rounded-[2rem] sm:rounded-[2.4rem] border border-slate-200/90 bg-white p-6 sm:p-10 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.25)]">
                                <p className="text-[10px] sm:text-sm font-black uppercase tracking-[0.24em] text-brand-gold">Send us a message</p>
                                <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-serif font-black text-slate-900 md:text-4xl leading-tight">Plan Your Trip With Confidence</h2>
                                <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-slate-600 font-medium">
                                    We&apos;re here to make your travel dreams come true. Whether you need help choosing the right tour, dates, or destination, our team is ready to guide you.
                                </p>

                                <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                                            placeholder="Full name"
                                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Your Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                                            placeholder="Email address"
                                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Contact Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                            placeholder="Mobile number"
                                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Travelers</label>
                                        <div className="relative">
                                            <select
                                                value={form.travelers}
                                                onChange={(event) => setForm({ ...form, travelers: event.target.value })}
                                                className="w-full cursor-pointer appearance-none rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                            >
                                                <option value="1">1 Person</option>
                                                <option value="2">2 People</option>
                                                <option value="3-4">3-4 People</option>
                                                <option value="5-8">5-8 People</option>
                                                <option value="9+">9+ People</option>
                                            </select>
                                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Destination</label>
                                        <input
                                            type="text"
                                            value={form.destination}
                                            onChange={(event) => setForm({ ...form, destination: event.target.value })}
                                            placeholder="Uttarakhand, Char Dham..."
                                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="mb-1.5 block pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Duration</label>
                                        <div className="relative">
                                            <select
                                                value={form.tripFocus}
                                                onChange={(event) => setForm({ ...form, tripFocus: event.target.value })}
                                                className="w-full cursor-pointer appearance-none rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                            >
                                                <option value="">Select days</option>
                                                {durationOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Travel Date</label>
                                        <input
                                            type="date"
                                            value={form.travelDate}
                                            onChange={(event) => setForm({ ...form, travelDate: event.target.value })}
                                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="mb-1.5 block pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Package Style</label>
                                        <div className="relative">
                                            <select
                                                value={form.serviceType}
                                                onChange={(event) => setForm({ ...form, serviceType: event.target.value })}
                                                className="w-full cursor-pointer appearance-none rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                            >
                                                <option value="">Select style</option>
                                                {packageOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="pl-1 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Special Notes</label>
                                        <textarea
                                            rows={4}
                                            value={form.message}
                                            onChange={(event) => setForm({ ...form, message: event.target.value })}
                                            placeholder="Destinations, hotel preference, pickup city..."
                                            className="w-full resize-none rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 outline-none transition-all focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/10"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-xs sm:text-sm font-bold text-rose-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-brand-dark px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark disabled:opacity-70 sm:w-auto active:scale-95 shadow-xl shadow-brand-dark/10"
                                >
                                    <Send size={18} />
                                    {submitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[2.7rem] border border-slate-200/90 bg-white p-8 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.25)] md:p-12">
                        <ScrollReveal direction="up">
                            <h2 className="text-3xl font-serif font-black text-slate-900 md:text-4xl">Plan Your Next Adventure with Yatra Go!</h2>
                            <p className="mt-5 max-w-5xl text-base leading-8 text-slate-600">
                                At Yatra Go, we turn your travel dreams into reality. From serene pilgrimages and thrilling treks to tranquil retreats amidst nature, we offer personalized travel experiences that leave lasting memories.
                            </p>
                            <p className="mt-4 max-w-5xl text-base leading-8 text-slate-600">
                                Whether you&apos;re planning a peaceful pilgrimage, an exciting adventure, or a relaxed family retreat, our team is ready to guide you with clear planning and dependable support.
                            </p>
                        </ScrollReveal>

                        <div className="mt-10 grid gap-8 lg:grid-cols-2">
                            <ScrollReveal direction="left">
                                <div className="h-full rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-100">
                                    <h3 className="text-2xl font-serif font-black text-slate-900">Why Reach Out to Us?</h3>
                                    <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                                        <p><span className="font-black text-slate-900">Expert Assistance:</span> Our knowledgeable team answers your questions about destinations, routes, hotels, and travel planning.</p>
                                        <p><span className="font-black text-slate-900">Customized Itineraries:</span> Share your preferences and we&apos;ll create a travel plan that suits your style.</p>
                                        <p><span className="font-black text-slate-900">Hassle-Free Planning:</span> We handle transportation, stays, activities, and logistics so your trip feels smooth.</p>
                                        <p><span className="font-black text-slate-900">Support at Every Step:</span> We stay available before and during the journey whenever you need us.</p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="right">
                                <div className="h-full rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-100">
                                    <h3 className="text-2xl font-serif font-black text-slate-900">How to Get in Touch?</h3>
                                    <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                                        <p><span className="font-black text-slate-900">Visit Us in Haridwar:</span> Meet our team in person and discuss the best travel options for your trip.</p>
                                        <p><span className="font-black text-slate-900">Give Us a Call:</span> For quick guidance or detailed planning support, we&apos;re just a phone call away.</p>
                                        <p><span className="font-black text-slate-900">Send Us an Email:</span> Share your detailed query and we&apos;ll get back to you with the right information.</p>
                                        <p><span className="font-black text-slate-900">Use the Online Form:</span> Submit your requirements here and our team will review them promptly.</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-slate-900 py-32 text-white">
                <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-brand-blue/5 blur-[120px]" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-20 lg:grid-cols-2">
                        <ScrollReveal direction="left">
                            <span className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Operations Center</span>
                            <h2 className="mb-8 text-4xl font-serif font-black leading-tight md:text-5xl">
                                Yatra Go Base Camp
                                <br />
                                <span className="italic text-brand-gold">Working Hours</span>
                            </h2>
                            <div className="max-w-md space-y-6">
                                {[
                                    { day: 'Monday - Saturday', hours: '08:00 AM - 08:00 PM', color: 'text-brand-gold' },
                                    { day: 'Sunday & Holidays', hours: '10:00 AM - 05:00 PM', color: 'text-brand-gold' },
                                    { day: 'WhatsApp Support', hours: '24/7 Priority Channel', color: 'text-emerald-400' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b border-white/10 py-4">
                                        <span className="text-sm font-bold text-slate-400">{item.day}</span>
                                        <span className={`text-sm font-black uppercase tracking-widest ${item.color}`}>{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 flex items-center gap-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Social Pulse:</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark"><Facebook size={20} /></a>
                                    <a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark"><Instagram size={20} /></a>
                                    <a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark"><Youtube size={20} /></a>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-sm md:p-12">
                                <span className="mb-8 inline-block w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Intellectual Commons</span>
                                <h3 className="mb-12 text-center text-3xl font-serif font-black italic tracking-tight">F.A.Q.s</h3>
                                <div className="space-y-4">
                                    {FAQS.map((faq, index) => (
                                        <div key={index} className="overflow-hidden rounded-3xl border border-white/5 bg-white/5 transition-all">
                                            <button
                                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                                className="flex w-full items-center justify-between px-8 py-6 text-left font-bold text-slate-200 transition-colors hover:bg-white/5"
                                            >
                                                <span className="pr-4">{faq.q}</span>
                                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-transform duration-500 ${openFaq === index ? 'rotate-[135deg] border-transparent bg-brand-gold text-brand-dark' : ''}`}>
                                                    <ChevronDown size={14} className={openFaq === index ? 'rotate-180' : ''} />
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {openFaq === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: 'circOut' }}
                                                    >
                                                        <div className="select-none px-8 pb-8 text-sm font-medium italic leading-relaxed text-slate-400">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <SuccessPopup
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Query Received"
                message="Your message has been delivered to the Yatra Go team. We will review your details and get back to you shortly."
                variant="auth-card"
            />
        </div>
    );
};

export default Contact;
