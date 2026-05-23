import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionHeader, PackageCard, Button } from '../../components/ui';
import { MapPin, Navigation } from 'lucide-react';

// Scraped data for featured destinations from yatrago.com
const DESTINATIONS = {
    'uttarakhand': {
        name: 'Uttarakhand',
        tagline: 'The Land of Gods',
        description: 'Uttarakhand, bordered by Nepal and Tibet, and shadowed by towering Himalayan peaks, is full of unspoiled natural beauty. Divided into two regions, Garhwal and Kumaon, it offers spectacular views, adventurous treks, and spiritual odysseys. Our Uttarakhand tours cover everything from the sacred Char Dham to the wildlife of Jim Corbett.',
        imageUrl: 'https://images.unsplash.com/photo-1626714485934-2979212ad12e?w=1200&q=80',
        highlights: [
            'Spiritual Heart of India',
            'Spectacular Himalayan Views',
            'Adventure Sports (Rafting, Trekking, Skiing)',
            'Rich Wildlife & National Parks'
        ],
        packages: [
            {
                id: 'haridwar-tour',
                slug: 'haridwar-spiritual-sojourn',
                title: 'Haridwar Tour Package',
                location: 'Haridwar - Uttarakhand',
                price: '15,999/-',
                currency: 'INR',
                duration: '3 Days',
                availability: 'Ganga City',
                rating: '5.0',
                imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
            },
            {
                id: 'rishikesh-tour',
                slug: 'rishikesh-adventure-tour',
                title: 'Rishikesh Tour Package',
                location: 'Rishikesh',
                price: '19,999/-',
                currency: 'INR',
                duration: '3 Days',
                availability: 'Adventure Hub',
                rating: '4.9',
                imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
            },
            {
                id: 'chardham-yatra',
                slug: 'char-dham-yatra',
                title: 'Chardham Yatra',
                location: 'Uttarakhand',
                price: '34,999/-',
                currency: 'INR',
                duration: '9 Days',
                availability: 'Spiritual Package',
                rating: '5.0',
                imageUrl: 'https://images.unsplash.com/photo-1626714485934-2979212ad12e?w=800&q=80',
            }
        ]
    },
    'himachal-pradesh': {
        name: 'Himachal Pradesh',
        tagline: 'Snow-Clad Mountains & Lush Valleys',
        description: 'Himachal Pradesh is a northern Indian state in the Himalayas. It\'s home to scenic mountain towns and resorts such as Dalhousie. Host to the Dalai Lama, Himachal Pradesh has a strong Tibetan presence. This is reflected in its Buddhist temples and monasteries. Discover the charm of Shimla, Manali, and Dharamshala with our curated tours.',
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80',
        highlights: [
            'Himalayan Landscapes',
            'Tibetan Culture & Monasteries',
            'Hill Stations (Shimla, Manali)',
            'Scenic Drives & Valleys'
        ],
        packages: [
            {
                id: 'exotic-himachal',
                title: 'Exotic Himachal',
                location: 'Himachal Pradesh',
                price: '24,999/-',
                currency: 'INR',
                duration: '6 Days',
                availability: 'Place of Hills',
                rating: '4.8',
                imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
            }
        ]
    },
    'default': {
        name: 'Global Destinations',
        tagline: 'Explore The World',
        description: 'Discover the most incredible destinations across the globe. From pristine beaches to historic cities, our carefully curated selection offers something for every type of traveler. Immerse yourself in local cultures, taste authentic cuisines, and create unforgettable memories.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
        highlights: ['Cultural Immersion', 'Stunning Landscapes', 'Premium Accommodations'],
        packages: []
    }
};

const DestinationDetails = () => {
    const { slug } = useParams();
    const dest = DESTINATIONS[slug] || DESTINATIONS['default'];

    return (
        <div className="bg-brand-light min-h-screen">
            <Helmet>
                <title>{`${dest.name} Tours & Travel Packages | Yatra Go`}</title>
                <meta name="description" content={`Explore ${dest.name} with Yatra Go. ${dest.description.substring(0, 150)}...`} />
            </Helmet>

            {/* Destination Hero */}
            <div className="relative h-[50vh] w-full">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/50 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 drop-shadow-md">
                        {dest.tagline}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg">
                        {dest.name}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Destination Intro */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-blue/5 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Navigation size={200} />
                    </div>
                    <div className="relative z-10 max-w-4xl hover:prose-a:text-brand-gold">
                        <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">About {dest.name}</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            {dest.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {dest.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-3 bg-brand-light p-4 rounded-xl">
                                    <MapPin size={20} className="text-brand-gold" />
                                    <span className="text-brand-blue font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Associated Packages */}
                <div>
                    <SectionHeader
                        title={`Tour Packages in ${dest.name}`}
                        subtitle="Curated Experiences"
                        align="center"
                    />

                    {dest.packages.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 mt-12">
                            {dest.packages.map((pkg, index) => (
                                <PackageCard key={pkg.id} pkg={pkg} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-12 bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xl text-gray-500 mb-6">New packages for this destination are coming soon!</p>
                            <Link to="/contact">
                                <Button variant="outline">Contact Us for Custom Tours</Button>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DestinationDetails;
