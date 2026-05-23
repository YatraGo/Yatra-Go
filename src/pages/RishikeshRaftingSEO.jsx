import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Waves, MapPin, Clock, Phone, ChevronDown, CheckCircle2,
  XCircle, Shield, Info, HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';

const RishikeshRaftingSEO = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const routes = [
    {
      name: 'Brahmpuri Course (Basic)',
      distance: '9 km',
      duration: '1.5 - 2 hrs',
      price: '₹799 / person',
      rapids: 'Grade I & II (Initiation, Double Trouble, Hilton)',
      desc: 'The Brahmpuri rafting stretch is the shortest and easiest course in Rishikesh. Perfect for families, children above 12, and first-time rafters who want a safe, splashing experience without extreme adrenaline. The water is relatively calm and offers beautiful scenic views of ashrams and foothills.'
    },
    {
      name: 'Shivpuri Course (Popular Choice)',
      distance: '16 km',
      duration: '2.5 - 3 hrs',
      price: '₹1,299 / person',
      rapids: 'Grade II & III (Roller Coaster, Return to Sender, Golf Course)',
      desc: 'The Shivpuri stretch is the absolute crowd favorite. It packs a punch with exciting Grade III rapids that will test your rowing skills and splash you with cool mountain water. Ideal for adventure seekers, groups of friends, and families with teen children. Includes a cliff jumping experience en route.'
    },
    {
      name: 'Marine Drive Course (Thrilling Expedition)',
      distance: '26 km',
      duration: '3.5 - 4.5 hrs',
      price: '₹1,999 / person',
      rapids: 'Grade III & III+ (Three Blind Mice, Cross Fire, Roller Coaster)',
      desc: 'For those who want a longer, challenging river experience, the Marine Drive course is perfect. It features massive wave trains, rapid-fire Grade III confluences, and plenty of swimming stretches. Requires a good level of physical fitness and stamina.'
    },
    {
      name: 'Kaudiyala Course (Advanced Rafting)',
      distance: '35 km',
      duration: '5 - 6 hrs',
      price: '₹2,999 / person',
      rapids: 'Grade IV & IV+ (The Wall, Daniel\'s Dip, Three Blind Mice)',
      desc: 'The Kaudiyala stretch is an extreme, world-class white water rafting experience. It features "The Wall," a legendary Grade IV+ rapid that requires precision maneuvers and is notorious for flipping rafts. Strictly for experienced rafters or physically strong enthusiasts looking for maximum adventure.'
    }
  ];

  const faqs = [
    {
      q: 'Is swimming mandatory for river rafting in Rishikesh?',
      a: 'No, swimming is not mandatory for Grade I, II, and III rafting stretches (Brahmpuri and Shivpuri). You will be fitted with high-buoyancy life jackets and helmets, and accompanied by certified river guides who handle all rescue operations. However, for Kaudiyala (Grade IV), basic swimming knowledge is recommended.'
    },
    {
      q: 'When is the river rafting season open in Rishikesh?',
      a: 'The rafting season officially opens in mid-September and closes by the end of June. The best months are October to May. Rafting is strictly closed during the monsoon months (July to mid-September) due to high water levels and fast currents.'
    },
    {
      q: 'What is the age limit for river rafting?',
      a: 'The minimum age limit for basic rafting (Brahmpuri) is 12 years. For Shivpuri and longer courses, it is 14 or 16 years. Children below 12 and pregnant women are strictly not allowed on the rafts for safety reasons.'
    },
    {
      q: 'What should I wear and carry during rafting?',
      a: 'Wear quick-dry synthetic shorts/t-shirts, nylon clothes, or swimwear. Avoid cotton sarees, jeans, and heavy boots. Sandals with straps or old sneakers are ideal. Avoid carrying phones, wallets, or expensive watches on the raft; you can store them in your transport vehicle or dry bags provided by the operator.'
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Action',
    'name': 'Rishikesh River Rafting Booking',
    'description': 'Book River Rafting tours in Rishikesh. Choose from 9km, 16km, 26km, or 35km stretches on the holy Ganga. Top safety equipment and certified river guides.',
    'location': {
      '@type': 'Place',
      'name': 'Rishikesh, Uttarakhand, India'
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '799',
      'priceValidUntil': '2026-12-31'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rishikesh River Rafting | Rates, Booking & Safety Guide 2026"
        description="Experience the thrill of Rishikesh River Rafting on the Ganga. View rates for Shivpuri (16km), Brahmpuri (9km), Marine Drive (26km) with Yatra Go."
        keywords="Rishikesh River Rafting, Rishikesh Adventure Activities, Best Travel Agency in Haridwar, Uttarakhand Tour Packages"
        schemaData={schema}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center text-center">
        <img
          src="public/assets/Rishikesh.jpg"
          alt="River Rafting in Rishikesh"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/50 to-brand-dark/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">India's Adventure Capital</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight mb-4">
            Rishikesh River <span className="text-brand-gold">Rafting</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Ride the wild rapids of the Ganga River under the guidance of certified rescue experts. Packages start at just ₹799 per person.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:+918979931256" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-lg font-black text-sm hover:bg-yellow-400 transition-colors shadow flex items-center gap-2">
              <Phone size={16} /> Book Rafting Slots
            </a>
            <Link to="/contact" className="border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">
              Request Info
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Stretches Available</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Waves size={16} className="text-brand-gold" /> 9 km to 35 km</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Rafting Location</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><MapPin size={16} className="text-brand-gold" /> Rishikesh, India</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Season</span>
            <div className="text-brand-dark text-lg font-black mt-1 flex items-center justify-center gap-1.5"><Clock size={16} className="text-brand-gold" /> Sep 15 - Jun 30</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Starting Rate</span>
            <div className="text-brand-gold text-2xl font-black mt-0.5 font-serif">₹799<span className="text-gray-400 text-xs font-sans"> / person</span></div>
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
                  White Water River Rafting on the Holy Ganga
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full"></div>
                <div className="prose text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Rishikesh holds the undisputed title of the <strong>Adventure Capital of India</strong>, and the primary driver of this fame is the white-water river rafting on the holy Ganges. Flowing down from the icy glaciers of the Garhwal Himalayas, the Ganges in Rishikesh offers an array of challenging, pulse-pounding rapids, ranging from Grade I (easy ripples) to Grade IV (difficult, high waves).
                  </p>
                  <p>
                    At <strong>Yatra Go</strong>, we partner with the most reliable, licensed rafting operators in Rishikesh. Every single rafting expedition is led by certified, highly trained river guides equipped with state-of-the-art rescue gear, high-buoyancy life vests, and emergency rescue kayaks to ensure your absolute safety.
                  </p>
                  <p>
                    Beyond rafting, our adventure combos include riverside camping, bonfire nights, cliff jumping from a height of 25 feet into the cold river waters, and visiting iconic spots like the Beatles Ashram or the Ram and Laxman suspension bridges.
                  </p>
                </div>
              </div>

              {/* Stretches list */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2">Rafting Course Details</h2>
                <p className="text-gray-400 text-sm mb-6">Explore the four popular rafting courses from Brahmpuri to Kaudiyala.</p>
                <div className="space-y-6">
                  {routes.map((route, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveRoute(activeRoute === idx ? null : idx)}
                        className="w-full flex justify-between items-center bg-gray-50/50 p-5 text-left font-bold text-brand-dark hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="text-base sm:text-lg font-serif font-black text-brand-dark">{route.name}</h3>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1 font-sans">
                            <span>Distance: {route.distance}</span>
                            <span>Duration: {route.duration}</span>
                            <span className="text-brand-gold font-bold">Rate: {route.price}</span>
                          </div>
                        </div>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${activeRoute === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeRoute === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 border-t border-gray-100 text-gray-600 text-sm leading-relaxed bg-white space-y-3">
                              <p>{route.desc}</p>
                              <div>
                                <span className="font-bold text-brand-dark text-xs uppercase block">Key Rapids:</span>
                                <span className="text-brand-gold text-xs font-bold">{route.rapids}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety section */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mb-2 flex items-center gap-2">
                  <Shield className="text-brand-gold animate-pulse" /> Safety Protocols & Gear
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-brand-gold font-bold text-xs uppercase block mb-1">Life Jacket</span>
                    <span className="text-gray-500 text-xs leading-relaxed">High-buoyancy jackets that keep you afloat even if you don't know how to swim.</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-brand-gold font-bold text-xs uppercase block mb-1">Certified Guides</span>
                    <span className="text-gray-500 text-xs leading-relaxed">Every raft has a professional river captain certified in wilderness first aid and rescue operations.</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-brand-gold font-bold text-xs uppercase block mb-1">Safety Kayak</span>
                    <span className="text-gray-500 text-xs leading-relaxed">Longer stretches are accompanied by a safety kayaker to quickly retrieve swimmers.</span>
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
                      'Raft rental, paddles, and helmets',
                      'Imported high-buoyancy life vest',
                      'Certified river guide on the raft',
                      'Transportation from booking office to start point',
                      'Body surfing and cliff jumping (Shivpuri stretch)',
                      'First aid kits and emergency rescue bags'
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
                      'Digital photographs and Go-Pro videos',
                      'Wetsuits or water boots (available on hire)',
                      'Personal meals and refreshments',
                      'Return transfer from river point to booking office',
                      'Rafting permits or environment fee (₹20/person)',
                      'Personal travel insurance'
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
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">Fast Closing Slots</span>
                  <h3 className="text-2xl font-serif font-black mt-2">River Rafting Rates</h3>
                  <p className="text-white/60 text-xs mt-1">Book online and avoid peak-hour queues.</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Brahmpuri (9 km)</span>
                    <span className="font-bold text-brand-gold">₹799</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Shivpuri (16 km)</span>
                    <span className="font-bold text-brand-gold">₹1,299</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Marine Drive (26 km)</span>
                    <span className="font-bold text-brand-gold">₹1,999</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Kaudiyala (35 km)</span>
                    <span className="font-bold text-brand-gold">₹2,999</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:+918979931256" className="w-full bg-brand-gold text-brand-dark py-3.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
                    <Phone size={16} /> Direct Call Booking
                  </a>
                  <Link to="/contact" className="w-full border border-white/20 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    Enquire Combo Package
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

export default RishikeshRaftingSEO;
