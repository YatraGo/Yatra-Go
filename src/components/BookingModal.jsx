import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, Users, MapPin, Send, CheckCircle, ChevronDown, BaggageClaim } from 'lucide-react';
import { submitWeb3Form } from '../lib/web3forms';

const initialForm = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    travelDate: '',
    guests: '',
    destination: '',
    message: ''
};

const SERVICES = [
    'Tour Package (Uttarakhand)',
    'Tour Package (Himachal)',
    'Hotel Booking',
    'Car / Coach Rental',
    'Bike Rental',
    'Customized Trip'
];

const BookingModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await submitWeb3Form({
                subject: `New Premium Booking: ${form.serviceType || 'General Enquiry'}`,
                replyTo: form.email,
                fields: {
                    inquiry_type: 'Premium Booking Modal',
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    service: form.serviceType,
                    travel_date: form.travelDate,
                    guests: form.guests,
                    destination: form.destination,
                    message: form.message || 'No additional message provided.'
                }
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setForm(initialForm);
                onClose();
            }, 3500);
        } catch (err) {
            console.error('Booking submission failed:', err);
            setError('Failed to send booking request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[160] flex items-center justify-center px-4 sm:px-6 py-6 font-sans">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(8,38,61,0.25)] flex flex-col max-h-[90vh]"
                    >
                        {/* Header Gradient */}
                        <div className="relative bg-gradient-to-r from-brand-dark via-[#1a365d] to-brand-blue px-6 py-8 sm:px-10 shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-3 mb-2 text-brand-gold">
                                <BaggageClaim size={24} />
                                <span className="text-sm font-bold uppercase tracking-widest">Premium Booking</span>
                            </div>
                            <h2 className="text-3xl font-serif font-black text-white">Plan Your Journey</h2>
                            <p className="text-white/80 mt-2 text-sm max-w-md">
                                Fill out the details below and our travel experts will design the perfect itinerary for you.
                            </p>
                            
                            {/* Decorative element */}
                            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#ffffff" d="M45.7,-76.4C58.9,-69.3,69.1,-55.3,77.6,-41.2C86.1,-27.1,92.9,-13.6,90.4,-1.5C87.9,10.6,76.1,21.2,66.1,31.4C56.1,41.6,47.9,51.4,37.1,60.2C26.3,69,13.1,76.8,-0.7,78C-14.5,79.2,-29,73.8,-42.1,65.6C-55.2,57.4,-66.9,46.4,-75.4,33.1C-83.9,19.8,-89.2,4.2,-86.3,-10.1C-83.4,-24.4,-72.3,-37.4,-60.1,-46.9C-47.9,-56.4,-34.6,-62.4,-21.5,-70.5C-8.4,-78.6,4.5,-88.8,17.4,-88.7C30.3,-88.6,40.1,-78.2,45.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                                </svg>
                            </div>
                        </div>

                        {/* Form area */}
                        <div className="px-6 py-6 sm:px-10 overflow-y-auto no-scrollbar relative flex-1">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-dark mb-2 font-serif">Request Received!</h3>
                                    <p className="text-gray-600 max-w-sm">
                                        Thank you for choosing Yatra Go. Our travel expert will contact you within 2 hours with the best tailor-made options.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        {/* Name */}
                                        <div className="relative group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <User size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="text" required
                                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="relative group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Phone Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <Phone size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="tel" required
                                                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        {/* Email */}
                                        <div className="relative group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <Mail size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="email" required
                                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Service Type */}
                                        <div className="relative group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Select Service</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <BaggageClaim size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <select
                                                    required
                                                    value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })}
                                                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5 appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Choose a service</option>
                                                    {SERVICES.map(svc => <option key={svc} value={svc}>{svc}</option>)}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                                    <ChevronDown size={18} className="text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                                        {/* Destination / Specifics */}
                                        <div className="relative sm:col-span-1 group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Destination</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <MapPin size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                    placeholder="e.g. Manali"
                                                />
                                            </div>
                                        </div>

                                        {/* Travel Date */}
                                        <div className="relative sm:col-span-1 group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Travel Date</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <Calendar size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="date"
                                                    value={form.travelDate} onChange={e => setForm({ ...form, travelDate: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                />
                                            </div>
                                        </div>

                                        {/* Guests */}
                                        <div className="relative sm:col-span-1 group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Guests</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <Users size={18} className="text-brand-blue/70 group-focus-within:text-brand-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="number" min="1"
                                                    value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm shadow-black/5"
                                                    placeholder="Count"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                        {/* Message */}
                                        <div className="relative group">
                                            <label className="block text-[13px] font-bold text-brand-dark mb-1.5 transition-colors group-focus-within:text-brand-blue">Special Requirements <span className="text-gray-400 font-normal">(Optional)</span></label>
                                            <textarea
                                                rows={3}
                                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all duration-300 text-[14px] bg-gray-50/50 hover:bg-white focus:bg-white resize-none shadow-sm shadow-black/5"
                                                placeholder="Tell us about any specific preferences, budget, etc."
                                            />
                                        </div>

                                    {error && (
                                        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full mt-2 relative overflow-hidden group bg-gradient-to-r from-brand-gold via-orange-400 to-brand-sunset text-white font-black py-4 rounded-xl shadow-[0_8px_20px_-10px_rgba(255,138,23,0.8)] transition-all hover:shadow-[0_12px_24px_-10px_rgba(255,138,23,0.9)] disabled:opacity-75"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {submitting ? 'Processing...' : 'Send Booking Request'} <Send size={18} />
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
