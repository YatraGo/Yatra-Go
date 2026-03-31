import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { MapPin, Calendar, Clock, Star, Share2 } from 'lucide-react';

const PackageDetails = () => {
    const { id } = useParams();

    // Fake data for UI representation
    const pkg = {
        title: 'Bali Paradise Retreat: 7 Days of Serenity',
        location: 'Bali, Indonesia',
        price: '1,299',
        duration: '7 Days / 6 Nights',
        availability: 'Available Daily',
        rating: '4.9',
        reviews: 124,
        description: 'Experience the ultimate luxury retreat in Bali. Immerse yourself in the rich culture, breathtaking landscapes, and pristine beaches. Our handcrafted itinerary ensures you see the best of Bali while enjoying premium accommodations and exclusive experiences.',
        highlights: ['Ubud Monkey Forest Tour', 'Tegallalang Rice Terrace Trek', 'Nusa Penida Island Hopping', 'Luxury Spa Day'],
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    };

    return (
        <div className="bg-brand-light min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[60vh] min-h-[400px]">
                <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-4 text-brand-gold">
                        <Star className="fill-brand-gold" size={20} />
                        <span className="font-bold">{pkg.rating}</span>
                        <span className="text-gray-300 text-sm font-medium">({pkg.reviews} reviews)</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">{pkg.title}</h1>
                    <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium">
                        <span className="flex items-center gap-2"><MapPin size={20} /> {pkg.location}</span>
                        <span className="flex items-center gap-2"><Clock size={20} /> {pkg.duration}</span>
                        <span className="flex items-center gap-2"><Calendar size={20} /> {pkg.availability}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">{pkg.description}</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">Highlights</h2>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {pkg.highlights.map((h, i) => (
                                    <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                                        <span className="font-medium text-brand-dark">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-32 border border-gray-100">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-gray-500 font-medium mb-1">Price per person</p>
                                    <p className="text-4xl font-bold text-brand-gold font-serif">${pkg.price}</p>
                                </div>
                                <button className="text-gray-400 hover:text-brand-gold transition-colors">
                                    <Share2 size={24} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="bg-brand-light p-4 rounded-xl flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-500">Date</span>
                                    <span className="text-brand-dark">Select Date</span>
                                </div>
                                <div className="bg-brand-light p-4 rounded-xl flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-500">Travelers</span>
                                    <span className="text-brand-dark">2 Adults</span>
                                </div>
                            </div>

                            <Link to="/login">
                                <Button variant="primary" size="lg" fullWidth>
                                    Proceed to Book
                                </Button>
                            </Link>
                            <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                                You won't be charged yet.<br />Please login to continue.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
