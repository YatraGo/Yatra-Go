import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Info, ShieldAlert, Award
} from 'lucide-react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ui/ScrollReveal';

const KedarnathSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Guptkashi (205 km / 7-8 hrs)',
      desc: 'Start your journey from Haridwar. Our driver picks you up from the railway station or your hotel. Enjoy a beautiful scenic drive passing through Devprayag (confluence of Bhagirathi and Alaknanda) and Rudraprayag (confluence of Mandakini and Alaknanda). Travel alongside the Mandakini River to reach Guptkashi. Check in at your hotel, enjoy a tasty dinner, and rest for the night.'
    },
    {
      day: 'Day 2',
      title: 'Guptkashi – Sonprayag – Gaurikund – Kedarnath (30 km drive / 16 km trek)',
      desc: 'Wake up early. Drive to Sonprayag and hop onto the local shuttle to Gaurikund, the official starting point of the Kedarnath trek. Start the 16 km climb to Kedarnath Temple. You can trek on foot, hire a pony, a porter, or a palanquin. If you have pre-booked a helicopter, proceed to the heliport instead. Reach the Kedarnath summit in the evening, check into your guest house, and experience the evening Aarti at the illuminated temple. Overnight stay at Kedarnath.'
    },
    {
      day: 'Day 3',
      title: 'Kedarnath to Gaurikund to Sonprayag to Guptkashi (16 km trek / 30 km drive)',
      desc: 'Wake up early to witness the divine sunrise on the snow-capped Kedarnath peaks. If you wish, participate in the early morning temple Abhishek Puja. Begin your trek down to Gaurikund. Upon arrival, take local shuttles back to Sonprayag to meet your driver. Drive to Guptkashi and check in at your hotel. Enjoy a warm dinner and a comfortable night\'s sleep.'
    },
    {
      day: 'Day 4',
      title: 'Guptkashi to Rishikesh (185 km / 6-7 hrs)',
      desc: 'After breakfast, drive towards the spiritual town of Rishikesh. The journey winds down the mountain roads, offering stunning river views. Upon reaching Rishikesh in the afternoon, check in at your hotel. In the evening, visit Ram Jhula, Laxman Jhula, and Triveni Ghat. Witness the spectacular evening Ganga Aarti. Enjoy dinner and stay overnight in Rishikesh.'
    },
    {
      day: 'Day 5',
      title: 'Rishikesh to Haridwar Departure (30 km / 1 hr)',
      desc: 'After breakfast, enjoy some free time to explore the ashrams or participate in optional adventure activities like zip-lining in Rishikesh. Later, drive back to Haridwar. Drop off at your preferred location in Haridwar (hotel or railway station) in the evening. Your Kedarnath Tour Package concludes with wonderful memories.'
    }
  ];

  const faqs = [
    {
      q: 'How long is the Kedarnath trek and is it difficult?',
      a: 'The Kedarnath trek starts from Gaurikund and is approximately 16 km long. It is considered moderately difficult to strenuous. The path is paved and well-managed, but it features continuous steep ascents. Hiring a pony, porter, or helicopter is recommended for children, seniors, or those with medical issues.'
    },
    {
      q: 'How do I book helicopter tickets for Kedarnath?',
      a: 'Helicopter tickets can only be booked online through the IRCTC heli-booking portal (heliyatra.irctc.co.in) using your Yatra registration details. Helicopter operators fly from Phata, Guptkashi, and Sirsi. Due to extremely high demand, slots fill up in minutes. Yatra Go can help coordinate the registration and assist with the booking process.'
    },
    {
      q: 'What is the altitude of Kedarnath Temple?',
      a: 'Kedarnath Temple is located at an altitude of 3,584 meters (11,759 feet) above sea level. Due to the high altitude, the climate remains cold throughout the year, and oxygen levels are lower than at sea level.'
    },
    {
      q: 'Is there mobile network coverage in Kedarnath?',
      a: 'Yes, major networks like BSNL, Jio, and Airtel have decent network coverage and internet services at the Kedarnath temple complex and along the trekking route. However, connectivity can be unstable during bad weather.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Kedarnath Tour Package from Haridwar',
    'description': 'A comprehensive 5-day spiritual tour package to Kedarnath Temple from Haridwar. Includes hotel stays, verified mountain transfers, registration support, and optional heli-charter booking assistance.',
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
      'price': '14999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Kedarnath Tour Package | 2026 Kedarnath Yatra from Haridwar"
        description="Book the ultimate Kedarnath tour package from Haridwar. Affordable 5-Day spiritual journey to Kedarnath Temple with stays, meals & registration assistance."
        keywords="Kedarnath Tour Package, Kedarnath Yatra from Haridwar, Travel Agency in Haridwar, Best Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Kedarnath 1.png"
          alt="Kedarnath Tour Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Gateway to Lord Shiva</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Kedarnath Tour <span className="text-brand-gold">Package</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Explore the sacred shrine of Kedarnath. Complete 4 Nights & 5 Days tour package starting from Haridwar. Reliable service, transparent pricing.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Call to Book
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
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Clock size={16} className="text-brand-gold" /> 4N / 5D</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Start / End Point</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Haridwar</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Best Season</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Calendar size={16} className="text-brand-gold" /> May - June, Sep - Oct</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Package Price</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹14,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  Kedarnath Yatra from Haridwar: A Spiritual Ascent
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Nestled amidst the spectacular snow-clad Himalayas, the <strong>Kedarnath Temple</strong> is one of the most sacred places of worship in Hinduism. Dedicated to Lord Shiva, it is the most prominent of the 12 Jyotirlingas and the crowning glory of the Panch Kedar temples in Uttarakhand. Reaching this remote sanctuary requires embarking on a journey of both physical stamina and spiritual devotion.
                  </p>
                  <p>
                    Our customized <strong>Kedarnath tour package</strong> is meticulously engineered for pilgrims starting their journey from Haridwar. We manage all of the travel logistics, biometric cards, driver bookings, and comfortable hotel reservations so you can focus entirely on the spiritual experience.
                  </p>
                  <p>
                    The tour takes you through the stunning river confluences of Devprayag and Rudraprayag, guiding you along the flowing Mandakini River directly to the trekking base camp of Gaurikund. Whether you choose to hike the 16 km path, hire a pony, or travel via helicopter, our team is with you every step of the way to provide safety and support.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Divine evening Darshan at Kedarnath Temple',
                    'Stay in comfortable hotels at Guptkashi and Kedarnath',
                    'All mountain permits and biometric passes handled',
                    'Experienced local driver specialized in hilly routes',
                    'Helicopter seat booking assistance (subject to availability)',
                    'Stops at Devprayag and Rudraprayag confluences',
                    'Sightseeing in Rishikesh (Ram Jhula, Triveni Ghat)',
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
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">5-Day Detailed Itinerary</h2>
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
                      '3 Nights hotel stay (Guptkashi & Rishikesh)',
                      '1 Night stay in guest house/tents at Kedarnath',
                      'Daily breakfast and dinner (pure veg)',
                      'All transfers by private non-AC cab in hilly regions',
                      'Mandatory travel registration support',
                      'Driver allowances, toll, and state taxes'
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
                      'Kedarnath helicopter tickets (extra cost)',
                      'Pony, doli, porter, or carriage charges',
                      'Local shuttle charges (Sonprayag to Gaurikund)',
                      'Any personal expenses or medical tests',
                      'Travel insurance coverage'
                    ].map((exc, i) => (
                      <li key={i} className="flex gap-2 items-start text-gray-600 text-sm">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Altitude Safety Guidelines */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2 flex items-center gap-2">
                  <ShieldAlert className="text-brand-gold" /> Altitude Safety & Tips
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    <strong>Acclimatization:</strong> Kedarnath stands at over 11,700 feet. Walk slowly and take regular breaks. Avoid heavy meals before starting the trek.
                  </p>
                  <p>
                    <strong>Weather Conditions:</strong> Mountain weather is unpredictable. Heavy rains or snow can drop the temperature rapidly. Carry reliable waterproof gloves, a raincoat, thermal innerwear, and dynamic layers.
                  </p>
                  <p>
                    <strong>Emergency Services:</strong> Medical camps are set up at intervals along the trekking path. Oxygen cylinders and emergency medical setups are available at the Kedarnath temple base.
                  </p>
                </div>
              </div>

              {/* FAQ Accordion */}
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Most Popular Tour</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Kedarnath package</h3>
                  <p className="text-white/60 text-xs mt-1">Hassle-free bookings with verified guides.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Price</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹14,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹18,000</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Call to Book Package
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Get Custom Quote
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 text-center">
                  <span className="text-white/40 text-[10px] block">Need instant assistance?</span>
                  <a href="https://wa.me/918979931256" className="text-brand-gold text-xs font-bold hover:underline mt-1 block">Message us on WhatsApp</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default KedarnathSEO;
