import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Mountain, ShieldAlert, Award
} from 'lucide-react';
import SEO from '../components/SEO';

const ChoptaSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Chopta (220 km / 7-8 hrs)',
      desc: 'Embark on your journey from the holy town of Haridwar. Our driver picks you up early. Ride through highly scenic routes, tracing the Alaknanda and Mandakini Rivers. Pass by Devprayag and Rudraprayag confluences. Ascend into the dense oak and rhododendron forests to reach Chopta, the "Mini Switzerland of India." Check into your Swiss camps/resort, enjoy dinner under a starlit sky, and rest.'
    },
    {
      day: 'Day 2',
      title: 'Chopta to Tungnath Temple & Chandrashila Summit Trek (5 km trek each way)',
      desc: 'Early morning start for the sacred Tungnath Temple, the highest Shiva temple in the world (standing at 3,680m / 12,073ft). The 3.5 km trek from Chopta is paved and offers breathtaking alpine meadow vistas. After offering prayers at Tungnath, trek an additional 1.5 km to the Chandrashila Summit (4,000m) for a stunning 360-degree panorama of Trishul, Nanda Devi, Chaukhamba, and Kedar peaks. Trek back to Chopta for dinner and overnight stay.'
    },
    {
      day: 'Day 3',
      title: 'Chopta to Ukhimath to Rudraprayag (90 km / 3-4 hrs)',
      desc: 'After breakfast, take a scenic drive to Ukhimath, the winter seat of Lord Kedarnath. Visit the historic Omkareshwar Temple. Continue down the winding mountain valleys to Rudraprayag. Check into your hotel alongside the rushing river streams. Rest and enjoy a freshly prepared local Garhwali dinner.'
    },
    {
      day: 'Day 4',
      title: 'Rudraprayag to Rishikesh to Haridwar (165 km / 6 hrs)',
      desc: 'Drive back towards the plains. Make a stopover in Rishikesh. Stroll across Ram Jhula and take in the spiritual river views. In the afternoon, proceed to Haridwar. Drop off at Haridwar railway station or hotel. Your rejuvenating Chopta Tungnath trek package concludes.'
    }
  ];

  const faqs = [
    {
      q: 'Is the Tungnath trek difficult for beginners?',
      a: 'The trek to Tungnath is classified as moderate. It is a 3.5 km paved pathway with a gradual incline, making it highly accessible for beginners and families. The further 1.5 km trek to Chandrashila summit is steeper and can be slippery in winter, requiring trekking poles and good footwear.'
    },
    {
      q: 'What is the altitude of Tungnath Temple and Chandrashila?',
      a: 'Tungnath Temple is situated at an altitude of 3,680 meters (12,073 feet) above sea level, making it the highest Shiva temple on earth. The Chandrashila summit sits at approximately 4,000 meters (13,123 feet).'
    },
    {
      q: 'Are Swiss camps and electricity available in Chopta?',
      a: 'Chopta is an eco-sensitive alpine zone. Accommodations are mostly eco-friendly Swiss tents and luxury camps. Standard electricity is limited, and most camps rely on solar power for light and hot water. Warm blankets are provided.'
    },
    {
      q: 'Can we visit Chopta in winter to see snow?',
      a: 'Yes, Chopta is incredibly beautiful in winter (January to March) and receives heavy snowfall. The snow-covered meadows and white canopy look magical. Heavy woolens, thermals, and waterproof boots are mandatory.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Chopta Tungnath Chandrashila Trek Package',
    'description': 'A beautiful 4-day alpine trekking package to Chopta, Tungnath (highest Shiva temple), and Chandrashila summit from Haridwar. Includes Swiss camping and local guide support.',
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
      'price': '8999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Chopta Tour Package | Tungnath Chandrashila Trek from Haridwar"
        description="Book the best Chopta tour package from Haridwar. Affordable 4-Day trekking package to Tungnath Temple & Chandrashila summit with Swiss camps & meals."
        keywords="Chopta Tour Package, Chopta Tungnath Trek, Travel Agency in Haridwar, Best Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Chopta.png"
          alt="Chopta Tungnath Trek Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Mini Switzerland of India</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Chopta Tour <span className="text-brand-gold">Package</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Trek to the highest Shiva temple on Earth at Tungnath and witness the panoramic Himalayan horizon from Chandrashila. 3 Nights & 4 Days package from Haridwar.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Call to Book Trek
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
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Mountain size={16} className="text-brand-gold" /> Apr - Jun, Oct - Dec</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Package Price</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹8,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  Chopta Tungnath Trek: Reach the Highest Shiva Temple
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Nestled in the pristine valleys of the Garhwal Himalayas, <strong>Chopta</strong> is a quiet, picturesque hamlet renowned for its lush alpine meadows (bugyals) and dense oak forests. Popularly referred to as the "Mini Switzerland of India," it serves as the base camp for the trekking trail to the historic <strong>Tungnath Temple</strong>—the highest Shiva shrine in the world—and the breathtaking <strong>Chandrashila Peak</strong>.
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we provide a complete, comfortable, and well-managed <strong>Chopta tour package</strong>. Our 4-day itinerary starts in Haridwar, driving you along the winding mountain routes to our cozy Swiss camp setup in Chopta. Our expert mountain guides lead the trek, ensuring a safe, enjoyable, and scenic climb.
                  </p>
                  <p>
                    Whether you are an adventure seeker looking to hike through snowy winter trails, a photography enthusiast aiming to capture the giant snow-clad peaks, or a pilgrim seeking the blessings of Lord Shiva, our Chopta tour is designed to deliver a premium mountain experience.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Trek to Tungnath, the highest Shiva Temple on Earth',
                    '360-degree Himalayan panorama from Chandrashila Summit',
                    'Stay in comfortable Swiss camps with attached bathrooms in Chopta',
                    'Guided trekking session with experienced mountain guides',
                    'Visits to Ukhimath winter temple and Deoria Tal (optional)',
                    'Scenic drives through Panch Prayag and river confluences',
                    'Reliable transport in private non-AC mountain cabs',
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
                      '2 Nights Swiss camp stay in Chopta (triple/double sharing)',
                      '1 Night hotel stay in Rudraprayag',
                      'Daily breakfast and dinner (pure veg)',
                      'All transfers by private non-AC cab in hilly regions',
                      'Experienced local trekking guide for Tungnath & Chandrashila',
                      'Toll, fuel, parking, and driver allowances'
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
                      'Pony, doli, or porter charges',
                      'Forest department entry charges (if applicable)',
                      'Emergency medical evacuations',
                      'Personal trekking gear (sticks, boots, etc.)',
                      'Travel insurance'
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Himalayan Meadows</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Chopta Trek Package</h3>
                  <p className="text-white/60 text-xs mt-1">Experience the pure silence of the peaks.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Price</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹8,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹11,000</div>
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
                  <span className="text-white/40 text-[10px] block">Need instant support?</span>
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

export default ChoptaSEO;
