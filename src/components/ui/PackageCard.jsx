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
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-60 overflow-hidden">
                <img
                    src={pkg.imageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {pkg.featured && (
                    <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Featured
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={14} />
                    <span className="text-sm font-bold text-brand-dark">{pkg.rating || "4.8"}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin size={16} className="text-brand-emerald" />
                    <span>{pkg.location || "Multiple Locations"}</span>
                </div>

                <h3 className="text-xl font-bold text-brand-blue mb-3 font-serif line-clamp-2">
                    {pkg.title || "Premium Travel Experience"}
                </h3>

                <div className="border-t border-b border-gray-100 py-3 my-3 grid grid-cols-2 gap-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{pkg.duration || "3 Days / 2 Nights"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{pkg.availability || "Daily Departures"}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-brand-gold">
                            {pkg.currency === 'INR' ? '₹' : '$'}{pkg.price || "1,499"}
                        </p>
                    </div>
                    <Link to={detailsPath}>
                        <Button variant="primary" size="sm">Explore</Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
