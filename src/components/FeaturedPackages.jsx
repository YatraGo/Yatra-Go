import React from 'react';
import { PackageCard, SectionHeader, Button } from './ui';
import { Link } from 'react-router-dom';

// Scraped data for featured packages from yatrago.com
const FEATURED_PACKAGES = [
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
        featured: true,
        imageUrl: 'https://www.tripsavvy.com/thmb/l_8mGpbABJtXL6F7q6Q2vTn2TXs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-450780637_Darkroom-1aa87b7388274f03a8bc49e7b2148f3a.jpg',
        description: 'Explore the spiritual essence of Haridwar with visits to sacred ghats, temples, and the mesmerizing Ganga Aarti.'
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
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        description: 'Experience the thrill of river rafting, bungee jumping, and serene camping in the yoga capital of the world.'
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
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1626714485934-2979212ad12e?w=800&q=80',
        description: 'Experience divine bliss on our sacred Chardham Yatra - Yamunotri, Gangotri, Kedarnath & Badrinath with hassle-free darshan tours!'
    },
    {
        id: 'exotic-himachal',
        title: 'Exotic Himachal',
        location: 'Himachal Pradesh',
        price: '24,999/-',
        currency: 'INR',
        duration: '6 Days',
        availability: 'Place of Hills',
        rating: '4.8',
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        description: 'Discover Himachal\'s beauty with scenic mountains, lush valleys, and charming hill stations.'
    }
];

const FeaturedPackages = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Featured Tour Packages"
                    subtitle="Explore The World"
                    align="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {FEATURED_PACKAGES.map((pkg, index) => (
                        <PackageCard key={pkg.id} pkg={pkg} index={index} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link to="/tour-packages">
                        <Button variant="outline" size="lg">
                            View All Packages
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPackages;
