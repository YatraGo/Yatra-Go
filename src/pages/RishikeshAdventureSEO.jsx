import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Award, Shield, HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';

const RishikeshAdventureSEO = () => {
  const [activeActivity, setActiveActivity] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const activities = [
    {
      name: 'Bungee Jumping (India\'s Highest - 83m)',
      height: '83 meters (Jump from fixed platform)',
      price: '₹3,799 / jump',
      ageLimit: '12 - 45 years',
      weightLimit: '35 - 110 kg',
      desc: 'Experience India\'s highest bungee jumping platform suspended over a rocky cliff in Mohan Chatti, Rishikesh. Walk out onto the cantilever platform and take a leap of pure faith. Operated under the guidance of retired military engineers and jump masters from New Zealand.'
    },
    {
      name: 'Giant Swing',
      height: '83 meters (Fly over river valley)',
      price: '₹3,599 / flight',
      ageLimit: '12 - 45 years',
      weightLimit: '35 - 120 kg',
      desc: 'The Giant Swing operates from the same 83m high platform. Instead of a vertical drop, you are harnessed to ropes that release you into a massive, sweeping pendulum swing across the river valley. You can fly solo or as a tandem duo with a friend.'
    },
    {
      name: 'Flying Fox (Asia\'s Longest)',
      height: '1 km long wire (Speed up to 140 km/h)',
      price: '₹1,899 / flight',
      ageLimit: '12 - 45 years',
      weightLimit: '35 - 130 kg',
      desc: 'Harness up and glide face-down along Asia\'s longest zip-line cable. You are released from a high point, speeding down at up to 140 km/h just meters above the river rapids. An incredible, high-speed flying experience.'
    },
    {
      name: 'Riverside Ziplining',
      height: '400 meters across Ganga River',
      price: '₹899 / flight',
      ageLimit: '10 - 55 years',
      weightLimit: '30 - 110 kg',
      desc: 'Zipline directly across the roaring Ganga River in Shivpuri. Glide back and forth between two cliffs, taking in a bird\'s-eye view of white-water rafts and the sandy beaches below. Safe, affordable, and highly popular for families.'
    }
  ];

  const faqs = [
    {
      q: 'Is bungee jumping in Rishikesh safe?',
      a: 'Yes, bungee jumping in Rishikesh is 100% safe. The jumping platform at Mohan Chatti was designed and is operated by professional jump masters from New Zealand and retired military officers. All gear is checked daily, and elastic cords are imported. Safety protocols comply with Australian & New Zealand standards.'
    },
    {
      q: 'Can we book adventure combos to save money?',
      a: 'Yes, we offer custom adventure packages that combine river rafting (16km Shivpuri) with bungee jumping, giant swing, or flying fox. Booking a combo can save you up to 15% compared to individual activity prices.'
    },
    {
      q: 'Is booking in advance required for bungee jumping?',
      a: 'Yes, advance booking is highly recommended. Bungee jumping slots are strictly limited to around 100 jumps per day. During weekends and peak holiday seasons, slots get booked out weeks in advance.'
    },
    {
      q: 'Who should avoid extreme adventure activities?',
      a: 'People with high blood pressure, heart ailments, neurological disorders, epilepsy, back/neck injuries, recent fractures, or pregnant women are strictly prohibited from bungee jumping, giant swing, and flying fox.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Action',
    'name': 'Rishikesh Bungee Jumping & Adventure Bookings',
    'description': 'Book extreme adventure activities in Rishikesh: Bungee Jumping (83m), Giant Swing, Flying Fox, and Riverside Zipline with Yatra Go.',
    'location': {
      '@type': 'Place',
      'name': 'Mohan Chatti, Rishikesh, Uttarakhand, India'
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '899'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rishikesh Adventure Activities | Bungee Jumping & Zip Line 2026"
        description="Book the ultimate adventure activities in Rishikesh. Rates for India's highest Bungee Jumping (83m), Giant Swing, and Asia's longest Flying Fox."
        keywords="Rishikesh Adventure Activities, Bungee Jumping Rishikesh, Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Mohanchatti.jpg"
          alt="Adventure Activities in Rishikesh"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/50 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Leap of Faith</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Rishikesh Adventure <span className="text-brand-gold">Activities</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Jump from India's highest 83m bungee platform or fly over mountain gorges. Safe, certified extreme sports booked through Yatra Go.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Book Adventure Slots
            </a>
            <Link to="/contact" className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">
              Request Rate Card
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Bungee Height</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Compass size={16} className="text-brand-gold" /> 83 Meters</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Location</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Rishikesh, India</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Safety Standards</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Shield size={16} className="text-brand-gold" /> ANZ Standards</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Starting Rate</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹899<span className="text-gray-400 text-xs font-sans"> / flight</span></div>
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
                  Extreme Adventure Sports in Rishikesh: Bungee & Flying Fox
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Beyond its serene ashrams and yoga centers, Rishikesh is the center stage for <strong>extreme adventure activities in India</strong>. Adventurer seekers from all over the world travel here to challenge their fears by taking a leap from India\'s highest fixed platform for <strong>Bungee Jumping</strong>, flying down Asia\'s longest <strong>Flying Fox</strong>, or swinging across mountain canyons on the <strong>Giant Swing</strong>.
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we coordinate directly with licensed adventure operators who maintain rigorous safety standards. Every piece of equipment is checked daily, and jump lines are supervised by certified experts to ensure a safe and thrilling experience.
                  </p>
                  <p>
                    We offer comprehensive bookings, combining rafting trips on the Ganga River with bungee jumps, zip-lines, and stays in luxury riverside camps. We ensure you get confirmed slots and skip the long booking queues at the ticket desks.
                  </p>
                </div>
              </div>

              {/* Activities Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">Adventure Activity Details</h2>
                <p className="text-gray-400 text-sm mb-6">Click on any activity to view details and safety limits.</p>
                <div className="space-y-4">
                  {activities.map((act, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveActivity(activeActivity === idx ? null : idx)}
                        className="w-full flex justify-between items-center bg-gray-50/50 p-4 text-left font-bold text-brand-dark hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="text-base sm:text-lg font-serif font-black text-brand-dark">{act.name}</h3>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1 font-sans">
                            <span>Height/Length: {act.height}</span>
                            <span className="text-brand-gold font-bold">Rate: {act.price}</span>
                          </div>
                        </div>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${activeActivity === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeActivity === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 border-t border-gray-100 text-gray-600 text-sm leading-relaxed bg-white space-y-3">
                              <p>{act.desc}</p>
                              <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-xs">
                                <div>
                                  <span className="font-bold text-brand-dark block">Age Limits:</span>
                                  <span>{act.ageLimit}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-brand-dark block">Weight Limits:</span>
                                  <span>{act.weightLimit}</span>
                                </div>
                              </div>
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
                      'Access to adventure site and viewing platforms',
                      'Harnesses and safety equipment compliance check',
                      'Certified jump masters and instructors guiding you',
                      'First aid kits and emergency rescue standby',
                      'Jump Certificate of courage (for Bungee)',
                      'GST and booking fee inclusions'
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
                      'Transit from Rishikesh city to Mohan Chatti site',
                      'High-definition Go-Pro videos and photos (extra cost)',
                      'Personal meals and refreshments',
                      'Guide tips or porter services',
                      'Emergency medical insurance cover',
                      'Locker room rentals'
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">India's Highest Jump</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Book Adventure</h3>
                  <p className="text-white/60 text-xs mt-1">Get custom rates for adventure combos.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Bungee Jump (83m)</span>
                    <span className="font-bold text-brand-gold">₹3,799</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Giant Swing</span>
                    <span className="font-bold text-brand-gold">₹3,599</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Flying Fox</span>
                    <span className="font-bold text-brand-gold">₹1,899</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Riverside Zipline</span>
                    <span className="font-bold text-brand-gold">₹899</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Direct Call Booking
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Request Combo Quote
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 text-center">
                  <span className="text-white/40 text-[10px] block">Need help with directions?</span>
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

export default RishikeshAdventureSEO;
