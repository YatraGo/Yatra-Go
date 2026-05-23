import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Shield, CreditCard, Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';

const HaridwarTaxiSEO = () => {
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const fleet = [
    {
      name: 'Swift Dzire (Sedan)',
      capacity: '4 Passengers + 1 Driver',
      baggage: '2 Medium Bags',
      localRate: '₹2,200 / day (80 km / 8 hrs limit)',
      outstationRate: '₹12 / km (Min 250 km / day)',
      img: 'public/assets/Swift Dzire.jpg',
      desc: 'The Swift Dzire is the ultimate choice for budget-conscious families and business travelers. It features reliable air-conditioning, soft fabric seats, and a comfortable suspension system ideal for negotiating city roads and local sightseeing in Haridwar.'
    },
    {
      name: 'Ertiga (MUV)',
      capacity: '6 Passengers + 1 Driver',
      baggage: '3 Bags',
      localRate: '₹3,000 / day (80 km / 8 hrs limit)',
      outstationRate: '₹15 / km (Min 250 km / day)',
      img: 'public/assets/Ertiga.jpg',
      desc: 'The Maruti Ertiga is a highly popular option for medium-sized families traveling across Uttarakhand. With flexible seating arrangements, decent luggage room, and excellent mileage, it offers a great balance of comfort and affordability.'
    },
    {
      name: 'Innova Crysta (Premium SUV)',
      capacity: '7 Passengers + 1 Driver',
      baggage: '4 Large Bags',
      localRate: '₹4,500 / day (80 km / 8 hrs limit)',
      outstationRate: '₹20 / km (Min 250 km / day)',
      img: 'public/assets/Crysta.jpg',
      desc: 'The Toyota Innova Crysta is the gold standard for long-distance highway travel and high-altitude mountain runs. It offers captain seating, powerful dual-zone air conditioning, superior safety features, and a plush ride quality that filters out road vibrations.'
    },
    {
      name: 'Tempo Traveller (Group Van)',
      capacity: '12 - 17 Passengers + 1 Driver',
      baggage: 'Dedicated Roof Carrier',
      localRate: '₹6,000 / day (80 km / 8 hrs limit)',
      outstationRate: '₹28 / km (Min 250 km / day)',
      img: 'public/assets/Tempo Traveller 12+1 Seater Luxury.jpg',
      desc: 'For larger groups, corporate teams, and multi-family pilgrimages, our Luxury Tempo Traveller is the perfect vehicle. Equipped with pushback reclining seats, dynamic sound systems, individual charging ports, and a massive overhead luggage rack.'
    }
  ];

  const faqs = [
    {
      q: 'Do you provide outstation taxi service to Kedarnath and Badrinath?',
      a: 'Yes, we provide outstation cabs for complete Char Dham and Do Dham tours starting from Haridwar. Our drivers are highly experienced in navigating the steep hairpins and landslide-prone mountain curves of Uttarakhand.'
    },
    {
      q: 'Are your taxi fares inclusive of toll taxes and state entries?',
      a: 'For outstation tours, toll taxes, state border entry fees, and parking charges are generally charged extra on actual bills. For local tours or pre-defined fixed packages, we provide all-inclusive rates so there are no surprises.'
    },
    {
      q: 'Can I book a one-way cab from Delhi Airport to Haridwar?',
      a: 'Yes, we offer reliable one-way airport transfer taxis from Indira Gandhi International (IGI) Airport, Delhi, to Haridwar, Rishikesh, or Dehradun. The driving distance is about 220 km and takes approximately 4 to 5 hours via the Meerut expressway.'
    },
    {
      q: 'Are your vehicles air-conditioned and cleaned regularly?',
      a: 'All our vehicles are fully air-conditioned and undergo thorough cleaning and sanitization after every single trip. Drivers are trained to maintain absolute hygiene and high hospitality standards.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'Yatra Go Taxi Service Haridwar',
    'description': 'Premium taxi service in Haridwar, Uttarakhand. Local sightseeing cabs, airport transfers, and outstation trips to Char Dham, Mussoorie, and Nainital.',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Yatra Go',
      'telephone': '+91-8979931256',
      'priceRange': '₹₹'
    },
    'areaServed': 'Haridwar, Rishikesh, Dehradun, Uttarakhand',
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '2200'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Taxi Service in Haridwar | Outstation & Sightseeing Cabs 2026"
        description="Book the best taxi service in Haridwar with Yatra Go. Clean cabs, experienced drivers for local sightseeing, Delhi airport pickup, Char Dham tours."
        keywords="Taxi Service in Haridwar, Best Taxi Service in Haridwar, Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Crysta.jpg"
          alt="Taxi Service in Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/50 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Professional Mountain Logistics</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Taxi Service <span className="text-brand-gold">in Haridwar</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Hire local and outstation taxis with police-verified drivers. Affordable sedan, SUV, and traveler rates starting at just ₹12 / km.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Call for Taxi Booking
            </a>
            <Link to="/contact" className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">
              Request Taxi Rate Chart
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Starting Rate</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Car size={16} className="text-brand-gold" /> ₹12 / km</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Service Area</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Pan Uttarakhand & Delhi</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Driver Type</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Shield size={16} className="text-brand-gold" /> Verified Hill Experts</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Booking Deposit</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹0 <span className="text-gray-400 text-xs font-sans">(Pay Driver Directly)</span></div>
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
                  Rent Clean Cabs for Local Sightseeing & Outstation Runs
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Finding a reliable, clean, and reasonably priced <strong>taxi service in Haridwar</strong> is vital for enjoying your trip, whether you are visiting for local temple Darshan or setting off on the rugged mountain trails of the Himalayas. Our fleet of sedan, SUV, and Tempo Traveller vehicles is ready to provide seamless transit.
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we pride ourselves on being the <strong>best travel agency in Haridwar</strong>, offering premium travel packages and professional logistics support. All our drivers are police-verified, local natives who have extensive experience driving on the narrow, high-altitude curves of Chamoli, Uttarkashi, and Rudraprayag.
                  </p>
                  <p>
                    Whether you need a swift airport pickup from Dehradun or Delhi, a comfortable sedan for family sightseeing in Haridwar and Rishikesh, or a heavy-duty SUV like the Innova Crysta for your Char Dham pilgrimage, we guarantee upfront, transparent quotes without any hidden surcharges.
                  </p>
                </div>
              </div>

              {/* Fleet List */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">Our Vehicle Fleet & Pricing</h2>
                <p className="text-gray-400 text-sm mb-6">Click on a vehicle type to view capacity and detailed rates.</p>
                <div className="space-y-4">
                  {fleet.map((vehicle, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveVehicle(activeVehicle === idx ? null : idx)}
                        className="w-full flex justify-between items-center bg-gray-50/50 p-4 text-left font-bold text-brand-dark hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="bg-brand-gold text-brand-dark text-xs px-2.5 py-1 rounded-full"><Car size={14} className="inline mr-1" />{vehicle.name.split(' ')[0]}</span>
                          <span className="text-sm sm:text-base">{vehicle.name}</span>
                        </span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${activeVehicle === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeVehicle === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 border-t border-gray-100 text-gray-600 text-sm leading-relaxed bg-white space-y-4">
                              <p>{vehicle.desc}</p>
                              <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                                <div>
                                  <span className="text-xs text-gray-400 uppercase font-bold block">Capacity & Luggage</span>
                                  <span className="text-brand-dark text-sm font-semibold">{vehicle.capacity} | {vehicle.baggage}</span>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-400 uppercase font-bold block">Fares</span>
                                  <span className="text-brand-gold text-sm font-bold">Local: {vehicle.localRate} <br/> Outstation: {vehicle.outstationRate}</span>
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

              {/* Service Features */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Why Book Your Cab With Us?</h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex gap-3 items-start">
                    <Shield className="text-brand-gold shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Safe & Verified Drivers</h4>
                      <p className="text-gray-500 text-xs mt-1">Our drivers are background-checked, polite, and trained in defensive mountain driving protocols.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CreditCard className="text-brand-gold shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Transparent Billing</h4>
                      <p className="text-gray-500 text-xs mt-1">No hidden fuel charges, surge pricing, or sudden driver fee increments. Get a clean receipt.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Clock className="text-brand-gold shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Punctual & Reliable</h4>
                      <p className="text-gray-500 text-xs mt-1">We track flights and train schedules. The driver is stationed before you land or exit the platform.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Sparkles className="text-brand-gold shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">Custom Routes Supported</h4>
                      <p className="text-gray-500 text-xs mt-1">Add custom halts, sightseeing detours, or restaurant breaks as you head up the valleys.</p>
                    </div>
                  </div>
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
                      'Clean, well-maintained air-conditioned cab',
                      'Highly experienced professional local driver',
                      'Fuel costs and standard maintenance expenses',
                      'Driver meals and basic overnight halt charges',
                      'Assistance with carrying bags',
                      'Complimentary local drinking water'
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
                      'State border entry taxes (for outside UK)',
                      'Toll taxes and parking slips (billed at actuals)',
                      'GST (5% applicable on booking amount)',
                      'Additional sightseeing detour fuel charges',
                      'Driver tips (optional, highly appreciated)',
                      'Multi-day night driving surcharge (after 10 PM)'
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

            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
                <div className="text-center">
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Fast Outstation Booking</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Book a Cab</h3>
                  <p className="text-white/60 text-xs mt-1">Get custom rates for your destination.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Sedan (Dzire)</span>
                    <span className="font-bold text-brand-gold">₹12 / km</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>MUV (Ertiga)</span>
                    <span className="font-bold text-brand-gold">₹15 / km</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Premium SUV (Crysta)</span>
                    <span className="font-bold text-brand-gold">₹20 / km</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Tempo Traveller</span>
                    <span className="font-bold text-brand-gold">₹28 / km</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Direct Call Booking
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Request Route Rates
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

export default HaridwarTaxiSEO;
