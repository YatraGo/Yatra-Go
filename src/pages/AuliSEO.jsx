import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Wind, ShieldAlert, Award
} from 'lucide-react';
import SEO from '../components/SEO';

const AuliSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Joshimath (275 km / 9 hrs)',
      desc: 'Embark on a scenic mountain drive from Haridwar. Travel alongside the Ganga and Alaknanda Rivers, passing through the beautiful Panch Prayag confluences (Devprayag, Rudraprayag, Karnaprayag). Reach Joshimath, the gateway to Auli and Badrinath, in the evening. Check in at your hotel, enjoy a tasty dinner, and prepare for Auli.'
    },
    {
      day: 'Day 2',
      title: 'Joshimath to Auli (Drive or Ropeway / 16 km)',
      desc: 'After breakfast, take the famous Joshimath-Auli cable car (Asia\'s longest ropeway, tickets self-payable) or drive up to Auli. Check into your resort/alpine camps. Spend the day admiring the 360-degree snow views of Nanda Devi, Kamet, and Trishul peaks. Take a walk on the soft snowy slopes. Overnight stay in Auli.'
    },
    {
      day: 'Day 3',
      title: 'Auli Skiing and Sightseeing',
      desc: 'Dedicate the day to thrilling winter sports. Auli is India\'s premier skiing destination. Take a basic skiing lesson from certified instructors on the ski slopes. Visit the artificial Auli Lake, which feeds snow-making guns for the ski tracks. Hike up to Gorson Bugyal (3 km trek through thick oak forests) for even grander mountain views. Dinner and overnight stay in Auli.'
    },
    {
      day: 'Day 4',
      title: 'Auli to Joshimath to Rudraprayag (180 km / 6 hrs)',
      desc: 'Check out of your Auli hotel and travel back down to Joshimath via ropeway or taxi. Spend some time visiting the ancient Narsingh Temple in Joshimath. Drive down the valley towards Rudraprayag. Check into your hotel alongside the confluence of Alaknanda and Mandakini. Dinner and rest.'
    },
    {
      day: 'Day 5',
      title: 'Rudraprayag to Rishikesh to Haridwar (165 km / 6 hrs)',
      desc: 'Drive from Rudraprayag towards Rishikesh. Explore Ram Jhula, Laxman Jhula, and spend some peaceful time at a riverside cafe. In the evening, drive back to Haridwar. Drop off at Haridwar railway station or hotel. Your exciting Auli snow vacation ends here.'
    }
  ];

  const faqs = [
    {
      q: 'When is the best time to see snow in Auli?',
      a: 'The best time to experience snow and skiing in Auli is from late December to early March. During these months, the slopes are covered under a thick blanket of natural snow, and the skiing championship is held.'
    },
    {
      q: 'How do I reach Auli from Haridwar?',
      a: 'Auli is approximately 290 km from Haridwar. The route is entirely via NH-58 up to Joshimath, from where you can take a 4 km cable car ropeway or drive 16 km by road to reach Auli.'
    },
    {
      q: 'Do I need skiing experience to visit Auli?',
      a: 'No experience is required. Basic 1-day skiing workshops are conducted on the slopes for beginners by professional ski instructors, who provide all gear (skis, boots, poles) on rent.'
    },
    {
      q: 'Is the Joshimath to Auli ropeway open throughout the year?',
      a: 'The ropeway is open most of the year except during periodic maintenance or extreme weather conditions (heavy winds/landslides). Tickets must be purchased directly at the Joshimath ticket office.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Auli Snow Adventure Tour Package',
    'description': 'A premium 5-day snow and skiing tour package to Auli from Haridwar. Includes Joshimath stay, ski gear rentals, and sightseeing guides.',
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
      'price': '12999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Auli Tour Package | Auli Skiing Tour from Haridwar 2026"
        description="Book the best Auli tour package from Haridwar. Complete 5-Day winter skiing itinerary, cable car guides, hotel stay, and Nanda Devi views with Yatra Go."
        keywords="Auli Tour Package, Auli Tour Package from Haridwar, Travel Agency in Haridwar, Best Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Auli 1.png"
          alt="Auli Tour Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Skiing Paradise of India</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Auli Tour <span className="text-brand-gold">Package</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Witness the towering peaks of Nanda Devi and carve the winter slopes of Auli. Complete 4 Nights & 5 Days tour package starting from Haridwar.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Call to Book Package
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
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Wind size={16} className="text-brand-gold" /> Dec - Mar (Snow), Apr - Jun</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Package Price</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹12,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  Explore Auli: The Ultimate Himalayan Ski Destination
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Perched at an astonishing altitude of 2,800 meters (9,186 feet) in the Chamoli district of Uttarakhand, <strong>Auli</strong> is a majestic ski resort and hill station renowned globally. Bordered by the giant peaks of the Himalayas, including India's second-highest summit <strong>Nanda Devi</strong> (7,816m), Auli offers panoramic meadows that transform into smooth ski slopes during the winter months.
                  </p>
                  <p>
                    Our curated <strong>Auli tour package from Haridwar</strong> handles all of the transit and hotel bookings. We drive you along the scenic paths of Joshimath, boarding the passenger ropeway directly to Auli. Whether you wish to enjoy skiing lessons on the slopes or hike the pine trails to Gorson Bugyal, our local travel experts are with you to coordinate a safe and memorable trip.
                  </p>
                  <p>
                    During the summer and autumn, Auli offers lush green meadows (bugyals) carpeted with wild alpine blossoms, making it a peaceful, cool getaway for families and couples looking to escape the heat of the plains.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Thrilling skiing lessons with local equipment rental support',
                    'Stay in premium resorts or cozy alpine camps in Auli',
                    'Breathtaking views of Nanda Devi and Trishul peaks',
                    'Scenic cable car ropeway ride from Joshimath to Auli',
                    'Guided trek to Gorson Bugyal and Auli Artificial Lake',
                    'Stopover at ancient Narsingh Temple in Joshimath',
                    'Comfortable private mountain cab transfers',
                    '24/7 dedicated support'
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
                      '2 Nights resort accommodation in Auli',
                      '2 Nights hotel accommodation in Joshimath/Rudraprayag',
                      'Daily breakfast and dinner (pure veg)',
                      'All transfers by private non-AC cab in hilly regions',
                      'Assisted tour guides for the trekking segments',
                      'Taxes, toll, parking, and driver allowances'
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
                      'Joshimath to Auli ropeway tickets (approx ₹1000/person)',
                      'Skiing equipment rental and coaching fees',
                      'Personal meals, lunches, and snacks',
                      'Snow-boot rentals and guide tips',
                      'Any emergency medical costs or rescue fees',
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Premium Winter Getaway</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Auli Skiing Tour</h3>
                  <p className="text-white/60 text-xs mt-1">Book early and get premium slopeside resorts.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Price</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹12,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹16,500</div>
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

export default AuliSEO;
