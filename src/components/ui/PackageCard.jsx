import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Clock } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg, index }) => {
    const detailsPath = pkg.slug ? `/tour/${pkg.slug}` : '/tour-packages';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-32 sm:h-60 overflow-hidden">
                <img
                    src={pkg.imageUrl || pkg.img || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {pkg.featured && (
                    <div className="absolute top-2 left-2 bg-brand-gold text-brand-dark text-[8px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wide">
                        Featured
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg flex items-center gap-0.5">
                    <Star className="text-yellow-500 fill-yellow-500 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="text-[10px] sm:text-sm font-bold text-brand-dark">{pkg.rating || "4.8"}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-sm text-gray-500 mb-1.5">
                    <MapPin size={14} className="text-brand-emerald shrink-0" />
                    <span className="truncate">{pkg.location || "Multiple Locations"}</span>
                </div>

                <h3 className="text-xs sm:text-xl font-bold text-brand-blue mb-2 font-serif line-clamp-2 min-h-[32px] sm:min-h-[56px] leading-tight">
                    {pkg.title || "Premium Travel Experience"}
                </h3>

                <div className="border-t border-b border-gray-100 py-1.5 sm:py-3 my-1.5 sm:my-3 grid grid-cols-2 gap-y-1 gap-x-2 text-[8px] sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock size={12} className="shrink-0" />
                        <span className="truncate">{pkg.duration || pkg.days || "3 Days"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={12} className="shrink-0" />
                        <span className="truncate">{pkg.availability || "Daily Departures"}</span>
                    </div>
                </div>

                <div className="mt-auto flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between pt-1.5 gap-2">
                    <div>
                        <p className="text-[8px] sm:text-sm text-gray-500 leading-none">From</p>
                        <p className="text-sm sm:text-2xl font-bold text-brand-gold leading-none mt-0.5">
                            {pkg.currency === 'INR' ? '₹' : '₹'}{pkg.price || "1,499"}
                        </p>
                    </div>
                    <Link to={detailsPath} className="w-full min-[480px]:w-auto">
                        <Button variant="primary" className="py-1.5 sm:py-2 text-[10px] sm:text-xs w-full">Explore</Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
