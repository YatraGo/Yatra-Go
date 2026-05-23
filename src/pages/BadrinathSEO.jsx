import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Award, ShieldAlert, Info
} from 'lucide-react';
import SEO from '../components/SEO';

const BadrinathSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Rudraprayag / Birahi (165 km / 6 hrs)',
      desc: 'Meet our representative early morning in Haridwar and begin your drive towards Rudraprayag. The drive passes alongside the holy Ganga and Alaknanda Rivers. Pause at Devprayag to witness the majestic confluence of Bhagirathi and Alaknanda Rivers. Arrive at Rudraprayag in the afternoon, check into your hotel, enjoy a tasty dinner, and rest.'
    },
    {
      day: 'Day 2',
      title: 'Rudraprayag to Badrinath (160 km / 6 hrs)',
      desc: 'After an early breakfast, proceed towards Badrinath via Joshimath. Trace the Alaknanda River uphill. Upon arrival at Badrinath, check into your hotel. In the evening, visit the thermal springs at Tapt Kund for a refreshing bath, then enter the main Badrinath Temple for the divine evening Darshan and VIP Aarti. Overnight stay in Badrinath.'
    },
    {
      day: 'Day 3',
      title: 'Badrinath to Mana Village to Rudraprayag (160 km / 6 hrs)',
      desc: 'Wake up early to view the sunrise lighting up the Nilkantha Peak. Visit Mana Village, the last Indian village before the Tibet border. Explore Vyas Gufa, Ganesh Gufa, and the unique Bhim Pul over the Saraswati River. Check out and drive back to Rudraprayag, passing through Karnaprayag and Nandaprayag. Dinner and overnight stay at Rudraprayag.'
    },
    {
      day: 'Day 4',
      title: 'Rudraprayag to Rishikesh to Haridwar (165 km / 6 hrs)',
      desc: 'Drive down from Rudraprayag towards Rishikesh. Visit Ram Jhula, Laxman Jhula, and Triveni Ghat. Continue the drive to Haridwar. Drop off at Haridwar railway station or hotel in the evening. Your sacred Badrinath Tour Package concludes.'
    }
  ];

  const faqs = [
    {
      q: 'What is the significance of Tapt Kund in Badrinath?',
      a: 'Tapt Kund is a natural thermal hot spring located just below the Badrinath Temple. The sulfurous water is naturally heated to around 45°C. It is traditional for pilgrims to take a holy dip in the hot springs before entering the main temple for Darshan, as it is believed to cleanse the body and soul.'
    },
    {
      q: 'Is oxygen shortage common in Badrinath?',
      a: 'Badrinath stands at an altitude of 3,300 meters (10,827 feet). Some pilgrims may experience mild headaches or breathing issues due to thin air. It is recommended to stay hydrated, walk slowly, and carry portable oxygen cans if you have pre-existing breathing conditions.'
    },
    {
      q: 'Can we visit Mana Village in this package?',
      a: 'Yes, visiting Mana Village is fully included in our Badrinath Tour Package. Mana is located just 3 km from Badrinath Temple and is famous as the last Indian village before the Indo-China border.'
    },
    {
      q: 'Do we need registration for Badrinath Temple?',
      a: 'Yes, registration is mandatory for all pilgrims visiting Badrinath. You can register online through the Uttarakhand government tourism portal. Yatra Go assists all of our package clients with registration at no extra cost.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Badrinath Dham Tour Package',
    'description': 'A sacred 4-day pilgrimage tour package to Badrinath Temple from Haridwar. Stays at premium hotels, mountain transportation, and Mana Village sightseeing included.',
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
      'price': '11999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Badrinath Tour Package | Badrinath Yatra from Haridwar 2026"
        description="Book the best Badrinath tour package from Haridwar. Comprehensive 4-Day pilgrimage to Badrinath Dham, hot springs, and Mana Village with Yatra Go."
        keywords="Badrinath Tour Package, Badrinath Yatra from Haridwar, Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Badrinath.jpg"
          alt="Badrinath Tour Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Abode of Lord Vishnu</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Badrinath Tour <span className="text-brand-gold">Package</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Pay homage to Lord Badri Vishal. Complete 3 Nights & 4 Days pilgrimage tour package departing from Haridwar. Stays, driver, and registrations managed.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Book Badrinath Package
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
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Clock size={16} className="text-brand-gold" /> 3N / 4D</div>
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
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹11,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  Badrinath Yatra from Haridwar: Divine Pilgrimage
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Positioned on the banks of the Alaknanda River, <strong>Badrinath Temple</strong> is the ultimate seat of Lord Vishnu and one of the holy Char Dham sites of India. Bordered by the twin peaks of Nar and Narayana, this ancient temple is located at an altitude of 3,300 meters in the Chamoli district of Uttarakhand. It draws millions of pilgrims seeking spiritual moksha.
                  </p>
                  <p>
                    Our customized <strong>Badrinath tour package from Haridwar</strong> handles all details of the journey. We manage driver bookings, biometric cards, and comfortable hotel reservations so that you can travel with ease.
                  </p>
                  <p>
                    The 4-day itinerary includes sightseeing stops at ancient confluences like Devprayag and Rudraprayag, and a visit to Mana Village, the last Indian village before the China border, containing key spots like the Vyas Cave where the Mahabharata was written.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'VIP Darshan entry support at Badrinath Temple',
                    'Stay in comfortable hotels at Badrinath and Rudraprayag',
                    'Biometric and Yatra registration assistance',
                    'Sightseeing tour of Mana Village (Vyas Gufa, Bhim Pul)',
                    'Scenic drives through Devprayag, Rudraprayag, and Karnaprayag confluences',
                    'Visit to Joshimath Narsingh Temple',
                    'Comfortable private mountain cab transfers',
                    '24/7 dedicated support coordinator'
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
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">4-Day Detailed Itinerary</h2>
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
                      '1 Night hotel stay in Badrinath',
                      '2 Nights hotel stay in Rudraprayag/Birahi',
                      'Daily breakfast and dinner (pure veg)',
                      'All transfers by private non-AC cab in hilly regions',
                      'Sightseeing of Mana Village and Panch Prayag',
                      'Fuel, toll charges, parking, and driver allowances'
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
                      'Tapt Kund bath accessories',
                      'Pony or porter charges',
                      'VIP Darshan entry slips (optional)',
                      'Any personal medical tests or medicines',
                      'Travel insurance cover'
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Lord Vishnu's Abode</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Badrinath Yatra</h3>
                  <p className="text-white/60 text-xs mt-1">Reliable tour planning and local guides.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Price</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹11,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹14,500</div>
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

export default BadrinathSEO;
