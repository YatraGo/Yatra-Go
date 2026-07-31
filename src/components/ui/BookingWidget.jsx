import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, Calendar, MapPin, Heart, ShieldCheck, Headphones, MessageCircle, Phone, Mail, LayoutDashboard, ChevronDown } from 'lucide-react';

const TravelStyleCard = ({ title, desc, icon: Icon, selected, onClick }) => (
    <div 
        onClick={onClick}
        className={`clickable flex items-start p-4 rounded-xl border-2 transition-all duration-300 ${
            selected 
                ? 'border-brand-gold bg-orange-50 shadow-[0_4px_15px_rgba(255,138,0,0.15)] scale-[1.02]' 
                : 'border-gray-100 bg-white hover:border-brand-gold/50'
        }`}
    >
        <div className={`p-2 rounded-full mr-3 ${selected ? 'bg-brand-gold text-white' : 'bg-brand-light text-brand-dark'}`}>
            <Icon size={20} />
        </div>
        <div>
            <h4 className="font-bold text-brand-dark text-sm">{title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
    </div>
);

const ContactPrefButton = ({ label, icon: Icon, selected, onClick }) => (
    <button 
        type="button"
        onClick={onClick}
        className={`clickable flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
            selected 
                ? 'border-brand-blue bg-brand-mist shadow-[0_4px_15px_rgba(29,155,240,0.15)] scale-[1.02]' 
                : 'border-gray-100 bg-white hover:border-brand-blue/50'
        }`}
    >
        <Icon size={20} className={selected ? 'text-brand-blue' : 'text-gray-400'} />
        <span className={`text-xs mt-1.5 font-semibold ${selected ? 'text-brand-blue' : 'text-gray-500'}`}>{label}</span>
    </button>
);

const FloatingInput = ({ label, type = "text", ...props }) => (
    <div className="relative w-full mb-4">
        <input 
            type={type} 
            className="peer w-full h-14 bg-white text-brand-dark border-2 border-gray-100 rounded-xl px-4 pt-4 pb-1 text-sm outline-none transition-all duration-300 focus:border-brand-blue focus:shadow-[0_0_0_4px_rgba(29,155,240,0.1)] placeholder-transparent clickable"
            placeholder={label}
            {...props}
        />
        <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue cursor-text">
            {label}
        </label>
    </div>
);

const BookingWidget = ({ pkg }) => {
    const [travellers, setTravellers] = useState(2);
    const [style, setStyle] = useState('comfort');
    const [contactPref, setContactPref] = useState('whatsapp');

    const styles = [
        { id: 'comfort', title: 'Comfort', desc: 'Balanced hotel + sightseeing', icon: MapPin },
        { id: 'luxury', title: 'Luxury', desc: 'Premium rooms & transfers', icon: Star },
        { id: 'family', title: 'Family', desc: 'Paced for mixed ages', icon: Heart },
    ];

    const estimatedTotal = (parseFloat(pkg.price.replace(/,/g, '')) * travellers).toLocaleString();

    return (
        <div className="sticky top-24">
            <div className="glass-premium rounded-[24px] p-6 lg:p-8">
                
                {/* Header Section */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                    <img src={pkg.imageUrl} alt={pkg.title} className="w-24 h-24 object-cover rounded-xl shadow-md" />
                    <div>
                        <div className="flex items-center gap-1 mb-1">
                            <Star className="fill-brand-gold text-brand-gold" size={14} />
                            <span className="font-bold text-sm text-brand-dark">{pkg.rating}</span>
                            <span className="text-xs text-gray-500">({pkg.reviews})</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-brand-dark leading-tight">{pkg.title}</h3>
                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-2xl font-bold text-brand-gold">${pkg.price}</span>
                            <span className="text-xs text-gray-500 mb-1">/ person</span>
                        </div>
                    </div>
                </div>

                {/* Form Sections */}
                <form className="space-y-6">
                    
                    {/* Traveller Selector */}
                    <div>
                        <label className="block text-sm font-bold text-brand-dark mb-3">Travellers</label>
                        <div className="flex items-center justify-between bg-white border-2 border-gray-100 rounded-xl p-2">
                            <button 
                                type="button" 
                                onClick={() => travellers > 1 && setTravellers(t => t - 1)}
                                className="clickable w-10 h-10 rounded-lg flex items-center justify-center bg-brand-light text-brand-dark hover:bg-gray-200 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <motion.span 
                                key={travellers}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="font-bold text-xl w-12 text-center"
                            >
                                {travellers}
                            </motion.span>
                            <button 
                                type="button" 
                                onClick={() => setTravellers(t => t + 1)}
                                className="clickable w-10 h-10 rounded-lg flex items-center justify-center bg-brand-dark text-white hover:bg-brand-gold hover:text-white transition-colors shadow-md"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Travel Style */}
                    <div>
                        <label className="block text-sm font-bold text-brand-dark mb-3">Travel Style</label>
                        <div className="grid grid-cols-1 gap-3">
                            {styles.map(s => (
                                <TravelStyleCard 
                                    key={s.id}
                                    title={s.title}
                                    desc={s.desc}
                                    icon={s.icon}
                                    selected={style === s.id}
                                    onClick={() => setStyle(s.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Date Selector */}
                    <div>
                        <label className="block text-sm font-bold text-brand-dark mb-3">Preferred Date</label>
                        <div className="relative">
                            <input 
                                type="month" 
                                className="clickable w-full h-14 bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-medium text-brand-dark outline-none focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    {/* Contact Preference */}
                    <div>
                        <label className="block text-sm font-bold text-brand-dark mb-3">How should we reach you?</label>
                        <div className="flex gap-2">
                            <ContactPrefButton label="WhatsApp" icon={MessageCircle} selected={contactPref === 'whatsapp'} onClick={() => setContactPref('whatsapp')} />
                            <ContactPrefButton label="Call" icon={Phone} selected={contactPref === 'call'} onClick={() => setContactPref('call')} />
                            <ContactPrefButton label="Email" icon={Mail} selected={contactPref === 'email'} onClick={() => setContactPref('email')} />
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div>
                        <label className="block text-sm font-bold text-brand-dark mb-3">Your Details</label>
                        <FloatingInput label="Full Name" />
                        <FloatingInput label="Phone Number" type="tel" />
                        <FloatingInput label="Email Address" type="email" />
                        <FloatingInput label="City / Pickup Location" />
                    </div>

                    {/* Summary Card */}
                    <div className="bg-brand-navy text-white p-5 rounded-2xl shadow-xl">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Trip Summary</h4>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Package</span>
                                <span className="font-medium text-right max-w-[150px] truncate">{pkg.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Travellers</span>
                                <span className="font-medium">{travellers} Adults</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Estimated Base</span>
                                <span className="font-medium">${estimatedTotal}</span>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                            <span className="font-bold">Total Estimate</span>
                            <span className="text-xl font-bold text-brand-gold">${estimatedTotal}</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold to-orange-500 text-white font-bold text-lg shadow-[0_8px_20px_rgba(255,138,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,138,0,0.4)] transition-all flex items-center justify-center gap-2 clickable"
                    >
                        Get Free Quote
                    </motion.button>
                </form>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-brand-emerald" /> Secure Booking
                    </div>
                    <div className="flex items-center gap-2">
                        <Headphones size={16} className="text-brand-blue" /> 24/7 Support
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={16} className="text-brand-gold fill-brand-gold" /> 10k+ Travelers
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-brand-accent" /> Local Experts
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingWidget;
