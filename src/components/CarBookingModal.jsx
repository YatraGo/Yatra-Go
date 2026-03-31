import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Calendar, Send, CheckCircle, Car, ShieldCheck } from 'lucide-react';
import { submitWeb3Form } from '../lib/web3forms';

const initialForm = {
    name: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: '',
    message: ''
};

const CarBookingModal = ({ isOpen, onClose, selectedCar }) => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCar) return;
        setSubmitting(true);
        setError('');

        try {
            await submitWeb3Form({
                subject: `New Car Rental Booking: ${selectedCar.name}`,
                replyTo: '', // Not requiring email for car booking based on current design to keep it simple, or use a default
                fields: {
                    inquiry_type: 'Car Rental Booking',
                    car_model: selectedCar.name,
                    name: form.name,
                    phone: form.phone,
                    pickup_location: form.pickupLocation,
                    dropoff_location: form.dropoffLocation,
                    start_date: form.startDate,
                    end_date: form.endDate,
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

    if (!isOpen || !selectedCar) return null;

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
                        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Left Side: Car Details */}
                        <div className="md:w-5/12 bg-gradient-to-br from-brand-dark to-brand-blue relative flex flex-col justify-between p-8 text-white">
                            <button
                                onClick={onClose}
                                className="md:hidden absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                            >
                                <X size={20} />
                            </button>
                            
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-gold mb-6">
                                    <Car size={14} /> Premium Rental
                                </div>
                                
                                <h3 className="text-3xl font-serif font-black mb-2 leading-tight">
                                    {selectedCar.name}
                                </h3>
                                <div className="text-white/70 flex items-center gap-2 text-sm mb-6">
                                    <ShieldCheck size={16} className="text-brand-gold" /> Verify & Book instantly
                                </div>
                            </div>
                            
                            <div className="relative mt-auto">
                                <img 
                                    src={selectedCar.img} 
                                    alt={selectedCar.name} 
                                    className="w-full object-contain drop-shadow-2xl translate-y-4 scale-110"
                                />
                                <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-xs font-black px-3 py-1.5 rounded-l-lg shadow-lg">
                                    {selectedCar.desc.split('·')[1]?.trim() || selectedCar.desc.split('·')[0]}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Booking Form */}
                        <div className="md:w-7/12 px-6 py-8 sm:px-10 overflow-y-auto w-full">
                            <button
                                onClick={onClose}
                                className="hidden md:flex absolute top-6 right-6 p-2 text-gray-400 hover:text-brand-dark bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center h-full"
                                >
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-dark mb-2 font-serif">Booking Request Sent!</h3>
                                    <p className="text-gray-600 max-w-sm">
                                        Thank you for choosing Yatra Go. Our travel expert will contact you shortly to confirm your booking for {selectedCar.name}.
                                    </p>
                                </motion.div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-serif font-black text-brand-dark mb-1">Enter Booking Details</h2>
                                    <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100">Reserve your {selectedCar.name} today</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Name */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <User size={18} className="text-gray-400 group-focus-within:text-brand-blue" />
                                                    </div>
                                                    <input
                                                        type="text" required
                                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <Phone size={18} className="text-gray-400 group-focus-within:text-brand-blue" />
                                                    </div>
                                                    <input
                                                        type="tel" required
                                                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Pickup Location */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pickup Location</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <MapPin size={18} className="text-gray-400 group-focus-within:text-green-500" />
                                                    </div>
                                                    <input
                                                        type="text" required
                                                        value={form.pickupLocation} onChange={e => setForm({ ...form, pickupLocation: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="e.g. Haridwar Station"
                                                    />
                                                </div>
                                            </div>

                                            {/* Dropoff Location */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Drop-off Location</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <MapPin size={18} className="text-gray-400 group-focus-within:text-red-500" />
                                                    </div>
                                                    <input
                                                        type="text" required
                                                        value={form.dropoffLocation} onChange={e => setForm({ ...form, dropoffLocation: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/30 focus:border-red-500 outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="e.g. Kedarnath"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Start Date */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <Calendar size={18} className="text-gray-400 group-focus-within:text-brand-blue" />
                                                    </div>
                                                    <input
                                                        type="date" required
                                                        value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                    />
                                                </div>
                                            </div>

                                            {/* End Date */}
                                            <div className="relative group">
                                                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                        <Calendar size={18} className="text-gray-400 group-focus-within:text-brand-blue" />
                                                    </div>
                                                    <input
                                                        type="date" required
                                                        value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="relative group pt-2">
                                            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Special Requirements <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                                            <textarea
                                                rows={2}
                                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all text-sm bg-gray-50/50 hover:bg-white focus:bg-white resize-none"
                                                placeholder="Tell us about any specific preferences, sightseeing requests, etc."
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
                                            className="w-full mt-4 relative overflow-hidden group bg-gradient-to-r from-brand-dark to-brand-blue text-white font-black py-4 rounded-xl shadow-[0_8px_20px_-10px_rgba(8,38,61,0.8)] transition-all hover:shadow-[0_12px_24px_-10px_rgba(8,38,61,0.9)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {submitting ? 'Processing...' : `Request ${selectedCar.name}`} <Send size={18} />
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CarBookingModal;
