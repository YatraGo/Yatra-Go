import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPin, Coffee, Utensils, Moon, Navigation, CheckCircle2, ChevronDown } from 'lucide-react';

const AccordionTimeline = ({ itinerary }) => {
    const [openDay, setOpenDay] = useState(0); // Only one day remains open at one time

    const handleToggle = (index) => {
        setOpenDay(openDay === index ? -1 : index);
    };

    return (
        <div className="relative border-l-2 border-brand-light ml-4 md:ml-6 mt-8 space-y-12">
            {itinerary.map((day, index) => {
                const isOpen = openDay === index;

                return (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Day Circle */}
                        <div
                            className={`absolute -left-[11px] top-0 w-[20px] h-[20px] rounded-full flex items-center justify-center transition-colors duration-500 ${
                                isOpen ? 'bg-brand-gold shadow-[0_0_15px_rgba(255,138,0,0.4)]' : 'bg-gray-300'
                            }`}
                        >
                            {isOpen ? <div className="w-[8px] h-[8px] bg-white rounded-full"></div> : null}
                        </div>

                        {/* Card */}
                        <div
                            onClick={() => handleToggle(index)}
                            className={`clickable premium-card bg-white rounded-[18px] p-6 cursor-pointer border-2 transition-all duration-300 ${
                                isOpen ? 'border-brand-gold/30 shadow-[0_16px_40px_-12px_rgba(255,138,0,0.15)] -translate-y-1' : 'border-transparent'
                            }`}
                        >
                            {/* Summary Header */}
                            <div className="flex justify-between items-center group">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-brand-mist text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Day {day.dayNumber}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors duration-300">
                                            {day.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2 max-w-xl">{day.summary}</p>
                                    
                                    {/* Quick Info Badges */}
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {day.driveTime && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
                                                <Navigation size={14} className="text-brand-accent" /> {day.driveTime}
                                            </span>
                                        )}
                                        {day.meals && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
                                                <Utensils size={14} className="text-brand-accent" /> {day.meals}
                                            </span>
                                        )}
                                        {day.hotel && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
                                                <Moon size={14} className="text-brand-accent" /> {day.hotel}
                                            </span>
                                        )}
                                        {day.altitude && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
                                                <MapPin size={14} className="text-brand-accent" /> {day.altitude}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                        isOpen ? 'bg-brand-gold text-white' : 'bg-brand-light text-brand-dark'
                                    }`}
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, y: -10 }}
                                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                                        exit={{ height: 0, opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 mt-6 border-t border-gray-100">
                                            
                                            {/* Detailed Timeline */}
                                            <div className="space-y-6">
                                                {day.details.map((detail, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="mt-1">
                                                            {detail.type === 'Morning' && <Coffee size={20} className="text-brand-gold" />}
                                                            {detail.type === 'Sightseeing' && <MapPin size={20} className="text-brand-accent" />}
                                                            {detail.type === 'Lunch' && <Utensils size={20} className="text-orange-400" />}
                                                            {detail.type === 'Evening' && <Moon size={20} className="text-brand-navy" />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-brand-dark">{detail.title}</h4>
                                                            <p className="text-gray-600 text-sm mt-1">{detail.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            {day.mapLink && (
                                                <div className="mt-6">
                                                    <a
                                                        href={day.mapLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()} // Prevent closing accordion
                                                        className="inline-flex items-center gap-2 text-brand-accent font-medium hover:text-brand-blue bg-brand-light px-4 py-2 rounded-xl transition-colors"
                                                    >
                                                        <Map size={18} /> View Route on Google Maps
                                                    </a>
                                                </div>
                                            )}

                                            {/* Important Notes */}
                                            {day.importantNotes && (
                                                <div className="mt-6 bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3">
                                                    <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={20} />
                                                    <p className="text-sm text-brand-dark/80">{day.importantNotes}</p>
                                                </div>
                                            )}

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AccordionTimeline;
