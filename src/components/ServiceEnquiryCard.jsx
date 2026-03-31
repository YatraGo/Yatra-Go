import React, { useState } from 'react';
import { Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { SuccessPopup } from './ui';
import { submitWeb3Form } from '../lib/web3forms';

const initialForm = {
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    message: '',
};

const ServiceEnquiryCard = ({ service }) => {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await submitWeb3Form({
                subject: `${service.title} Service Enquiry`,
                replyTo: form.email,
                fields: {
                    inquiry_type: 'Service Page Enquiry',
                    service: service.title,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    preferred_travel_date: form.travelDate || 'Flexible',
                    message: form.message || service.whatsapp,
                },
            });

            setForm(initialForm);
            setShowSuccess(true);
        } catch (submitError) {
            console.error('Service enquiry failed', submitError);
            setError('Your service enquiry could not be sent right now. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-brand-gold">
                <h3 className="text-xl font-serif font-black text-brand-dark mb-2">Get Instant Quote</h3>
                <p className="text-gray-500 text-sm mb-6">Share your requirement for {service.title.toLowerCase()} and our team will reply on email and phone.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold"
                    />
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        placeholder="Email address"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold"
                    />
                    <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                        placeholder="Phone number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold"
                    />
                    <input
                        type="date"
                        value={form.travelDate}
                        onChange={(event) => setForm((current) => ({ ...current, travelDate: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold"
                    />
                    <textarea
                        rows="4"
                        value={form.message}
                        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                        placeholder="Tell us what you need, destination, dates, budget, group size..."
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold resize-none"
                    />
                    {error && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 w-full bg-brand-gold text-brand-dark font-black py-3.5 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-70"
                    >
                        <Send size={16} /> {submitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                </form>

                <a href="tel:+918979931256"
                    className="mt-3 flex items-center justify-center gap-2 w-full border-2 border-brand-dark text-brand-dark font-bold py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                    <Phone size={16} /> +91 8979931256
                </a>
            </motion.div>

            <SuccessPopup
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Service Query Sent"
                message={`Thanks for contacting Yatra Go about ${service.title}. Our team will get back to you shortly with availability, pricing, and the next steps.`}
            />
        </>
    );
};

export default ServiceEnquiryCard;
