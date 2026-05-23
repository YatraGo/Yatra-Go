import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Award, ShieldAlert, Info
} from 'lucide-react';
import SEO from '../components/SEO';

const DoDhamSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Guptkashi (205 km / 7-8 hrs)',
      desc: 'Meet our representative early in Haridwar and begin your drive towards Guptkashi. Travel alongside the Alaknanda and Mandakini Rivers, passing through Devprayag and Rudraprayag. Arrive at Guptkashi in the afternoon, check in at your hotel, enjoy a pure vegetarian dinner, and rest.'
    },
    {
      day: 'Day 2',
      title: 'Guptkashi to Gaurikund to Kedarnath (30 km drive / 16 km trek)',
      desc: 'Wake up early. Drive to Sonprayag and board the local shuttle to Gaurikund. Start the 16 km climb to Kedarnath Temple. You can hike the path, hire a pony, or use helicopter services (must be pre-booked). Arrive at Kedarnath in the evening, check into your guest house/camps, and attend the divine evening prayers at the Shiva temple. Overnight stay in Kedarnath.'
    },
    {
      day: 'Day 3',
      title: 'Kedarnath to Gaurikund to Sonprayag to Guptkashi (16 km trek / 30 km drive)',
      desc: 'Participate in the morning Abhishek Darshan at Kedarnath Temple. Begin your trek down to Gaurikund. Board local shuttles to Sonprayag to meet your driver. Drive back to Guptkashi for dinner and overnight stay.'
    },
    {
      day: 'Day 4',
      title: 'Guptkashi to Badrinath (190 km / 7 hrs)',
      desc: 'Drive via Joshimath to Badrinath, the holy seat of Lord Vishnu. The route is highly scenic, tracing the Alaknanda River. Check into your hotel upon arrival. Take a hot bath in Tapt Kund before entering the Badrinath Temple for Darshan and Aarti. Overnight stay in Badrinath.'
    },
    {
      day: 'Day 5',
      title: 'Badrinath to Rudraprayag / Birahi (160 km / 5-6 hrs)',
      desc: 'Visit Mana Village, the last Indian village before the Tibet border. Explore Vyas Gufa and Bhim Pul. Drive back towards Rudraprayag, passing through Karnaprayag and Nandaprayag confluences. Check into your hotel for dinner and overnight stay.'
    },
    {
      day: 'Day 6',
      title: 'Rudraprayag to Rishikesh to Haridwar (165 km / 6 hrs)',
      desc: 'After breakfast, drive to Rishikesh. Visit the iconic Ram Jhula and Triveni Ghat. Continue your drive back to Haridwar. Drop off at Haridwar railway station or hotel. Your sacred Do Dham Yatra ends here.'
    }
  ];

  const faqs = [
    {
      q: 'What is the Do Dham Yatra?',
      a: 'The Do Dham Yatra in Uttarakhand typically refers to the pilgrimage to two of the four sacred shrines: Kedarnath (dedicated to Lord Shiva) and Badrinath (dedicated to Lord Vishnu). It is highly popular among pilgrims who want to visit the two most prominent Dhams but are short on time.'
    },
    {
      q: 'Which Do Dham route is better: Kedarnath-Badrinath or Yamunotri-Gangotri?',
      a: 'The Kedarnath-Badrinath Do Dham Yatra is the most popular and widely chosen combination due to the intense spiritual significance of visiting both Lord Shiva\'s and Lord Vishnu\'s abodes. The Yamunotri-Gangotri combination is usually preferred by travelers who want to visit the sources of the holy rivers Yamuna and Ganga.'
    },
    {
      q: 'How long is the Do Dham Yatra from Haridwar?',
      a: 'Our Do Dham Yatra package from Haridwar takes 6 Days and 5 Nights. This allows for a comfortable travel pace, proper acclimatization, time for the Kedarnath trek, and relaxed temple Darshans.'
    },
    {
      q: 'Do we need registration for the Do Dham Yatra?',
      a: 'Yes, registration is mandatory. You must register online on the Uttarakhand Tourism portal and select Kedarnath and Badrinath as your destinations. Yatra Go assists all of our guests with registration.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Do Dham Yatra (Kedarnath & Badrinath) Package',
    'description': 'A sacred 6-day pilgrimage tour package to Kedarnath and Badrinath from Haridwar. High-quality accommodation, private cab transfers, and registration support included.',
    'provider': {
      '@type': 'TravelAgency',
      'name': 'Yatra Go',
      'url': 'https://www.yatrago.com',
      'logo': 'https://www.yatrago.com/logo.png',
      'telephone': '+91-8979931256',
      'priceRange': '₹₹'
    },
    'itinerary': itinerary.map((day, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': day.day + ': ' + day.title,
      'text': day.desc
    })),
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '19999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Do Dham Yatra Package | Kedarnath & Badrinath Tour from Haridwar"
        description="Book the best Do Dham Yatra package from Haridwar. Affordable 6-Day pilgrimage tour to Kedarnath and Badrinath with hotel stays, meals & transport."
        keywords="Do Dham Yatra Package, Do Dham Yatra from Haridwar, Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Kedarnath 1.png"
          alt="Do Dham Yatra Tour Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Kedarnath & Badrinath Pilgrimage</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Do Dham Yatra <span className="text-brand-gold">from Haridwar</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Sacred 5 Nights & 6 Days Yatra to Kedarnath and Badrinath. Registration support, verified transport, and clean stays.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Book Do Dham Package
            </a>
            <Link to="/contact" className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">
              Request Callback
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Duration</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Clock size={16} className="text-brand-gold" /> 5N / 6D</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Start / End Point</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Haridwar</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Best Season</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Calendar size={16} className="text-brand-gold" /> May - Jun, Sep - Nov</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Package Price</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹19,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Rich SEO content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Introduction */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">
                  Do Dham Yatra (Kedarnath and Badrinath) from Haridwar
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    For pilgrims who are short on time but wish to experience the peak spiritual heights of the Himalayas, the <strong>Do Dham Yatra from Haridwar</strong> is the perfect pilgrimage. It combines the sacred darshan of the highest Jyotirlinga at <strong>Kedarnath Temple</strong> with the primary Vishnu seat of the Char Dham at <strong>Badrinath Temple</strong>.
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we design our Do Dham Yatra packages to optimize driving times, trekking rests, and temple darshans. Starting from Haridwar, the 6-day package covers comfortable double/triple sharing stays, pure vegetarian dinners, verified mountain cabs, and registration permits.
                  </p>
                  <p>
                    We track mountain weather and trail conditions closely, assisting with local helicopter bookings, pony hires, or porter services to make sure your high-altitude climb to Kedarnath is safe and spiritually fulfilling.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Divine Darshan at both Kedarnath and Badrinath Temples',
                    'Stay in comfortable hotels at Guptkashi, Kedarnath, and Badrinath',
                    'All mountain transit by private verified mountain cabs',
                    'Biometric and Yatra registration support by our team',
                    'Helicopter slot booking assistance for Kedarnath',
                    'Mana Village sightseeing tour included',
                    'Sightseeing stops at Devprayag and Rudraprayag confluences',
                    '24/7 client coordination'
                  ].map((hl, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700 text-sm font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">6-Day Detailed Itinerary</h2>
                <p className="text-gray-400 text-sm mb-6">Click on any day to view details.</p>
                <div className="space-y-4">
                  {itinerary.map((day, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveDay(activeDay === idx ? null : idx)}
                        className="w-full flex justify-between items-center bg-gray-50/50 p-4 text-left font-bold text-brand-dark hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="bg-brand-gold text-brand-dark text-xs px-2.5 py-1 rounded-full">{day.day}</span>
                          <span className="text-sm sm:text-base">{day.title}</span>
                        </span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${activeDay === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDay === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 border-t border-gray-100 text-gray-600 text-sm leading-relaxed bg-white">
                              {day.desc}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-serif font-black text-brand-dark mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} /> Inclusions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      '5 Nights hotel/camp stay as per itinerary',
                      'Daily breakfast and dinner (pure veg)',
                      'All transfers by private non-AC cab in hilly regions',
                      'Yatra registration support',
                      'Fuel, toll charges, parking, and driver allowances',
                      'Mana Village and Confluences sightseeing'
                    ].map((inc, i) => (
                      <li key={i} className="flex gap-2 items-start text-gray-600 text-sm">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={14} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-serif font-black text-brand-dark mb-4 flex items-center gap-2">
                    <XCircle className="text-rose-500" size={20} /> Exclusions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Lunch and personal snacks',
                      'Helicopter tickets to Kedarnath (extra cost)',
                      'Pony, doli, porter, or carriage charges',
                      'Local shuttle fares (Sonprayag to Gaurikund)',
                      'Personal medical charges and travel insurance',
                      'VIP Darshan entry slips'
                    ].map((exc, i) => (
                      <li key={i} className="flex gap-2 items-start text-gray-600 text-sm">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex justify-between items-center text-left font-bold text-brand-dark hover:text-brand-gold transition-colors py-2 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-2"
                          >
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Card */}
            <div className="lg:col-span-1">
              <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
                <div className="text-center">
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Most Booked Combo</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Do Dham Yatra</h3>
                  <p className="text-white/60 text-xs mt-1">Stays, driver, and registration handled.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Price</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹19,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹24,000</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Direct Call Booking
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Request Custom Quote
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 text-center">
                  <span className="text-white/40 text-[10px] block">Need help planning?</span>
                  <a href="https://wa.me/918979931256" className="text-brand-gold text-xs font-bold hover:underline mt-1 block">Chat on WhatsApp</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DoDhamSEO;
