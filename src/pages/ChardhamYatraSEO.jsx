import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Map, ShieldAlert, Award, FileText, AlertCircle, Info
} from 'lucide-react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ui/ScrollReveal';

const ChardhamYatraSEO = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Haridwar to Barkot (220 km / 7-8 hrs)',
      desc: 'Embark on your sacred journey. Meet our representative in Haridwar early in the morning. We drive through the picturesque town of Mussoorie and pause at the scenic Kempty Falls. Continue the winding mountain drive alongside the Yamuna River to reach Barkot. Check into your hotel, relax, and prepare for the Yamunotri trek the next day. Enjoy a freshly prepared dinner at the hotel.'
    },
    {
      day: 'Day 2',
      title: 'Barkot – Janki Chatti – Yamunotri – Janki Chatti – Barkot (45 km drive / 6 km trek each way)',
      desc: 'Early morning drive to Janki Chatti, the starting point of the Yamunotri trek. You can trek the 6 km path on foot, hire a pony, or use a palanquin (doli). Upon reaching Yamunotri, take a holy dip in Surya Kund\'s natural hot water springs. Cook rice as Prasad. Offer prayers to Goddess Yamuna at the main temple. Trek back to Janki Chatti and drive back to Barkot for dinner and overnight stay.'
    },
    {
      day: 'Day 3',
      title: 'Barkot to Uttarkashi (100 km / 4 hrs)',
      desc: 'After breakfast, take a scenic drive to Uttarkashi, situated on the banks of the Bhagirathi River. Uttarkashi is renowned for its ancient spiritual heritage, often compared to Kashi (Varanasi). In the evening, visit the famous Kashi Vishwanath Temple, dedicated to Lord Shiva, and witness the mesmerizing evening prayers. Check into your hotel for dinner and rest.'
    },
    {
      day: 'Day 4',
      title: 'Uttarkashi – Gangotri – Uttarkashi (100 km drive each way / 3-4 hrs)',
      desc: 'Drive along the spellbinding Bhagirathi valley to Gangotri. Witness high altitude apple orchards en route. At Gangotri, take a holy dip in the icy waters of the Bhagirathi River. Perform Puja and Darshan at the Gangotri Temple, dedicated to Goddess Ganga. Spend some quiet time in the peaceful alpine surroundings before driving back to Uttarkashi for the night.'
    },
    {
      day: 'Day 5',
      title: 'Uttarkashi to Guptkashi (220 km / 8-9 hrs)',
      desc: 'Set off on a long but scenic drive to Guptkashi. The route passes through the massive Tehri Dam reservoir and Devprayag (the sacred confluence where Alaknanda and Bhagirathi meet to form the Ganges). Travel along the Mandakini River to reach Guptkashi. Visit the ancient Ardh Narishwar Temple in the evening. Dinner and overnight stay at the hotel.'
    },
    {
      day: 'Day 6',
      title: 'Guptkashi to Sonprayag to Gaurikund to Kedarnath (30 km drive / 16 km trek)',
      desc: 'Check out early. Drive to Sonprayag, then take local shuttles to Gaurikund, the base of the Kedarnath trek. Start the 16 km climb to Kedarnath Temple. You can walk, take a pony, or use helicopter services (must be pre-booked). Arrive at Kedarnath in the evening, check into your guest house/camps, and join the evening prayers at the legendary 8th-century Shiva temple. Experience the divine vibe of the Himalayas.'
    },
    {
      day: 'Day 7',
      title: 'Kedarnath to Gaurikund to Sonprayag to Guptkashi (16 km trek / 30 km drive)',
      desc: 'Wake up early for the morning Abhishek Darshan at Kedarnath Temple. Witness the golden sun rays lighting up the majestic Kedarnath peak behind the temple. Begin your trek down to Gaurikund. Board local shuttles to Sonprayag and meet your driver. Drive back to Guptkashi for a well-deserved dinner and comfortable overnight stay.'
    },
    {
      day: 'Day 8',
      title: 'Guptkashi to Badrinath (190 km / 7 hrs)',
      desc: 'Drive via Joshimath to Badrinath, the holy seat of Lord Vishnu. The route is highly scenic, tracing the Alaknanda River. Check into your hotel upon arrival. In the evening, take a refreshing bath in the natural hot spring of Tapt Kund before entering the brightly painted Badrinath Temple for VIP Darshan and the evening Aarti. Overnight stay in Badrinath.'
    },
    {
      day: 'Day 9',
      title: 'Badrinath to Rudraprayag / Birahi (160 km / 5-6 hrs)',
      desc: 'Visit Mana Village, the last Indian village before the Tibet border. Explore Vyas Gufa (where Sage Vyas wrote the Mahabharata) and Bhim Pul. Drive back towards Rudraprayag, passing through Vishnuprayag, Nandaprayag, and Karnaprayag confluences. Check into your riverside hotel for dinner and overnight stay.'
    },
    {
      day: 'Day 10',
      title: 'Rudraprayag to Rishikesh to Haridwar (165 km / 6 hrs)',
      desc: 'After breakfast, drive to Rishikesh, the Yoga capital of the world. Visit the iconic Ram Jhula, Laxman Jhula, and the tranquil Triveni Ghat. Continue your drive back to Haridwar. Drop off at Haridwar railway station or hotel in the evening. Your sacred Char Dham Yatra ends here with lifetime memories and divine blessings.'
    }
  ];

  const faqs = [
    {
      q: 'What is the best time to go for Char Dham Yatra?',
      a: 'The best time to undertake the Char Dham Yatra is from May to June and from September to November. July and August should be avoided due to heavy monsoon rains, which cause landslides and road blockages in the mountainous areas of Uttarakhand.'
    },
    {
      q: 'How do I register for the Char Dham Yatra 2026?',
      a: 'Registration is mandatory for all pilgrims. You can register online through the official portal of Uttarakhand Tourism Department (registrationandtouristcare.uk.gov.in) or offline at designated counters in Haridwar, Rishikesh, and other transit points. We assist all our package clients with registration at no extra cost.'
    },
    {
      q: 'Can I do the Kedarnath Yatra by helicopter?',
      a: 'Yes, helicopter services are available from Phata, Sirsi, and Guptkashi to Kedarnath. You must book tickets in advance through the IRCTC heli-booking portal. Weather conditions play a critical role, so flights may experience delays.'
    },
    {
      q: 'Is oxygen cylinder required for the Char Dham Yatra?',
      a: 'Since Yamunotri, Kedarnath, and Badrinath are located at high altitudes (above 10,000 feet), oxygen levels are lower. It is recommended to carry portable oxygen cans. Pilgrims with cardiovascular or respiratory ailments should consult a doctor before booking.'
    },
    {
      q: 'What type of clothing should I pack for the tour?',
      a: 'Pack heavy woolens, thermal innerwear, windcheaters, waterproof jackets, comfortable walking shoes with good grip, woolen socks, and gloves. The weather at Kedarnath and Badrinath can drop below freezing even in summer nights.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Tour',
    'name': 'Char Dham Yatra from Haridwar 2026',
    'description': 'A sacred 10-day pilgrimage tour to Yamunotri, Gangotri, Kedarnath, and Badrinath departing from Haridwar. Best-in-class hotels, verified mountain transport, and professional guides.',
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
      'name': day.day + ': ' + day.title.split(' (')[0],
      'text': day.desc
    })),
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '24999',
      'valueAddedTaxIncluded': 'true',
      'eligibleRegion': 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Char Dham Yatra from Haridwar | 2026 Package & Tour Guide"
        description="Book the best Char Dham Yatra package from Haridwar 2026. Fully custom 10-Day spiritual tour to Yamunotri, Gangotri, Kedarnath & Badrinath with Yatra Go."
        keywords="Char Dham Yatra from Haridwar, Char Dham Yatra Package 2026, Travel Agency in Haridwar, Best Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="https://thedptours.com/wp-content/uploads/2025/04/chardham.jpg"
          alt="Char Dham Yatra Tour Package from Haridwar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Uttarakhand Sacred Pilgrimage</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Char Dham Yatra <span className="text-brand-gold">from Haridwar</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Complete 9 Nights & 10 Days Pilgrimage Package to Yamunotri, Gangotri, Kedarnath, and Badrinath. Lock your 2026 departure today.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Book Yatra Now
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
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Clock size={16} className="text-brand-gold" /> 9N / 10D</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Start / End Point</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Haridwar</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Best Time</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Calendar size={16} className="text-brand-gold" /> May - Jun, Sep - Nov</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Price</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹24,999<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  Experience the Sacred Char Dham Yatra from Haridwar
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Embarking on the <strong>Char Dham Yatra from Haridwar</strong> is a lifelong dream for millions of devout Hindus. This sacred pilgrimage takes you to the four celestial shrines of Uttarakhand nestled deep in the Garhwal Himalayas: <strong>Yamunotri</strong>, <strong>Gangotri</strong>, <strong>Kedarnath</strong>, and <strong>Badrinath</strong>. Collectively known as the Chardham, these sites are believed to open the doors of moksha (spiritual liberation).
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we pride ourselves on being the <strong>best travel agency in Haridwar</strong>, offering meticulously planned, comfortable, and spiritually fulfilling Char Dham Yatra packages. Our 10-day tour starts and ends in the holy city of Haridwar, taking care of all your logistics, biometric registrations, hotel stays, transport, and local guide support.
                  </p>
                  <p>
                    The journey starts from Haridwar and moves sequentially from West to East, honoring ancient traditions. We navigate the river confluences, high-altitude passes, and deep spiritual ashrams, ensuring you stay safe and physically comfortable throughout the rugged mountain terrains of Uttarakhand.
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4">Tour Highlights</h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'VIP Darshan arrangements at all four temples',
                    'Biometric & Yatra registrations handled by our team',
                    'Comfortable double/triple sharing rooms with attached bathrooms',
                    'Certified local drivers specialized in mountain driving',
                    'Helicopter booking assistance for Kedarnath Temple',
                    'Visit to Mana Village (India\'s last village before Tibet)',
                    'Scenic drives through Devprayag, Rudraprayag, and Joshimath',
                    '24/7 dedicated trip support coordinator'
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
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">10-Day Detailed Itinerary</h2>
                <p className="text-gray-400 text-sm mb-6">Click on any day to view the route and sightseeing details.</p>
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
                      '9 Nights accommodation in standard/deluxe hotels',
                      'Daily breakfast and dinner (pure veg meal options)',
                      'All transit and transfers by private AC vehicle',
                      'Fuel, toll charges, parking, and driver allowances',
                      'Mandatory Yatra registration support',
                      'Local sightseeing as per itinerary'
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
                      'Lunch and personal mineral water bottles',
                      'Helicopter tickets to Kedarnath Temple',
                      'Pony, doli, or porter charges during treks',
                      'Gaurikund shuttle fees (government regulated)',
                      'VIP Darshan entry slips (optional)',
                      'Travel insurance and medical emergencies'
                    ].map((exc, i) => (
                      <li key={i} className="flex gap-2 items-start text-gray-600 text-sm">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Route & Essential Info */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-4 flex items-center gap-2">
                  <Info className="text-brand-gold" /> Planning Your Char Dham Yatra
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm mb-2 uppercase">Physical Fitness Required</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      The Yatra involves high-altitude driving and trekking. The Kedarnath trek is 16 km long and goes up to 11,750 feet. It is advised to perform daily cardio and leg workouts at least 30 days prior to the journey.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm mb-2 uppercase">Medical Advice</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Consult your general physician before booking. Altitude sickness, cold chills, and low oxygen levels are common. Carry essential medications for fever, altitude sickness, pain relief, and stomach relief.
                    </p>
                  </div>
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

            {/* Right Column: Sticky Lead Card */}
            <div className="lg:col-span-1">
              <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
                <div className="text-center">
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Early Booking Discount</span>
                  <h3 className="text-2xl font-serif font-black mt-2">Book Your Pilgrimage</h3>
                  <p className="text-white/60 text-xs mt-1">Select departures for the 2026 season are now open.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-white/40 text-xs">Standard Package</span>
                    <div className="text-2xl font-serif font-black text-brand-gold mt-1">₹24,999</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-xs">Original Cost</span>
                    <div className="text-base line-through text-white/50 mt-1">₹32,000</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Direct Call Booking
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Request a Custom Quote
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 text-center">
                  <span className="text-white/40 text-[10px] block">Need help planning?</span>
                  <a href="https://wa.me/918979931256" className="text-brand-gold text-xs font-bold hover:underline mt-1 block">Chat with us on WhatsApp</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ChardhamYatraSEO;
