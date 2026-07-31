import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Star, Share2, Shield, CheckCircle2, Navigation } from 'lucide-react';
import AccordionTimeline from '../components/ui/AccordionTimeline';
import BookingWidget from '../components/ui/BookingWidget';

const PackageDetails = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fake data for UI representation
    const pkg = {
        title: 'Do Dham Yatra (Kedarnath & Badrinath)',
        location: 'Uttarakhand, India',
        price: '37,998',
        duration: '6 Days / 5 Nights',
        availability: 'Available May-Oct',
        rating: '4.9',
        reviews: 342,
        description: 'Embark on a spiritual journey to the sacred shrines of Kedarnath and Badrinath. Experience the ultimate luxury retreat amidst the Himalayas. Immerse yourself in the rich culture, breathtaking landscapes, and pristine rivers. Our handcrafted itinerary ensures you see the best of Uttarakhand while enjoying premium accommodations and smooth transfers.',
        highlights: ['VIP Darshan Assistance', 'Helicopter Booking Support', 'Premium Stays', 'Experienced Local Guide'],
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3e9990b2c?q=80&w=1200&auto=format&fit=crop',
        itinerary: [
            {
                dayNumber: 1,
                title: 'Haridwar → Guptkashi',
                summary: 'Drive via Devprayag & Rudraprayag to Guptkashi.',
                driveTime: '7-8 Hours',
                meals: 'Dinner',
                hotel: 'Camp/Hotel in Guptkashi',
                altitude: '1,319 m',
                mapLink: 'https://maps.google.com',
                importantNotes: 'Start early morning to avoid traffic near Rishikesh. Keep warm clothes handy.',
                details: [
                    { type: 'Morning', title: 'Departure', description: 'Pick up from Haridwar and start the scenic drive.' },
                    { type: 'Sightseeing', title: 'Devprayag', description: 'Witness the holy confluence of Alaknanda and Bhagirathi rivers.' },
                    { type: 'Lunch', title: 'En route', description: 'Stop at a local restaurant for traditional Garhwali food.' },
                    { type: 'Evening', title: 'Arrival', description: 'Check-in to your hotel/camp and rest for the night.' }
                ]
            },
            {
                dayNumber: 2,
                title: 'Kedarnath Darshan',
                summary: 'Trek or helicopter to Kedarnath, overnight stay.',
                driveTime: '1 Hour + 16km Trek',
                meals: 'Breakfast & Dinner',
                hotel: 'Camp in Kedarnath',
                altitude: '3,583 m',
                details: [
                    { type: 'Morning', title: 'To Gaurikund', description: 'Drive to Sonprayag, take local jeep to Gaurikund.' },
                    { type: 'Sightseeing', title: 'Trek', description: 'Start the 16km trek to Kedarnath. Ponies/Palkis available.' },
                    { type: 'Evening', title: 'Darshan', description: 'Attend the divine evening Aarti at Kedarnath Temple.' }
                ]
            },
            {
                dayNumber: 3,
                title: 'Return to Guptkashi',
                summary: 'Trek back to Gaurikund, drive to Guptkashi.',
                driveTime: '1 Hour + Trek',
                meals: 'Breakfast & Dinner',
                hotel: 'Camp/Hotel in Guptkashi',
                altitude: '1,319 m',
                details: [
                    { type: 'Morning', title: 'Morning Darshan', description: 'Visit temple early morning before starting the trek down.' },
                    { type: 'Sightseeing', title: 'Descent', description: 'Trek down to Gaurikund.' },
                    { type: 'Evening', title: 'Arrival', description: 'Reach Guptkashi and relax your muscles.' }
                ]
            },
            {
                dayNumber: 4,
                title: 'Guptkashi → Badrinath',
                summary: 'Scenic mountain drive to Badrinath, evening aarti.',
                driveTime: '7-8 Hours',
                meals: 'Breakfast & Dinner',
                hotel: 'Hotel in Badrinath',
                altitude: '3,300 m',
                details: [
                    { type: 'Morning', title: 'Departure', description: 'Long scenic drive through dense forests and waterfalls.' },
                    { type: 'Sightseeing', title: 'Joshimath', description: 'Cross Joshimath and Govindghat.' },
                    { type: 'Evening', title: 'Badrinath Aarti', description: 'Arrive in Badrinath and attend the spectacular evening Aarti.' }
                ]
            }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="bg-brand-light min-h-screen pb-24">
            {/* Hero Image Section */}
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={pkg.imageUrl} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633] via-[#0B1633]/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 text-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-brand-gold/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-default">
                                    <Star size={14} className="fill-white" /> Bestseller
                                </span>
                                <span className="flex items-center gap-1 text-gray-300 text-sm font-medium cursor-default">
                                    <Star size={14} className="fill-brand-gold text-brand-gold" /> {pkg.rating} ({pkg.reviews} Reviews)
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 drop-shadow-xl leading-tight">
                                {pkg.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base font-medium text-gray-200">
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm cursor-default"><MapPin size={20} className="text-brand-gold" /> {pkg.location}</span>
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm cursor-default"><Clock size={20} className="text-brand-gold" /> {pkg.duration}</span>
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm cursor-default"><Calendar size={20} className="text-brand-gold" /> {pkg.availability}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Side: Details & Itinerary */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-12"
                        >
                            {/* Overview */}
                            <motion.section variants={itemVariants} className="premium-card p-6 md:p-8">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Package Overview
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{pkg.description}</p>
                            </motion.section>

                            {/* Highlights */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Premium Highlights
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {pkg.highlights.map((h, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="text-brand-gold" size={20} />
                                            </div>
                                            <span className="font-bold text-brand-dark">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Itinerary */}
                            <motion.section variants={itemVariants}>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark flex items-center gap-3">
                                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                        Detailed Itinerary
                                    </h2>
                                </div>
                                <p className="text-gray-500 mb-8 max-w-2xl">A carefully curated day-by-day plan designed for maximum comfort, scenic beauty, and cultural immersion.</p>
                                
                                <AccordionTimeline itinerary={pkg.itinerary} />
                            </motion.section>

                        </motion.div>
                    </div>

                    {/* Right Side: Sticky Booking Widget */}
                    <div className="lg:col-span-5 xl:col-span-4 relative">
                        <BookingWidget pkg={pkg} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
