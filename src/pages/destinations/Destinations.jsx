import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Search, Filter, Star, MessageCircle, Phone } from 'lucide-react';
import { asset, normalizeAssetFields } from '../../lib/assets';

// ─── All 26 Destinations from yatrago.com ───
const DESTINATIONS = [
    // ── UTTARAKHAND ──
    {
        id: 'haridwar',
        region: 'Uttarakhand',
        name: 'Haridwar',
        tagline: 'Gateway of God',
        desc: 'Haridwar is a holy city known for the mesmerizing Ganga Aarti at Har Ki Pauri, ancient temples, and its sacred ghats where thousands come to seek divine blessings.',
        img: asset('assets/Haridwar 2.png'),
        highlights: ['Ganga Aarti at Har Ki Pauri', 'Mansa Devi Temple', 'Chandi Devi Temple', 'Rajaji National Park'],
        pkgLink: '/tour/haridwar-spiritual-sojourn',
        badge: '🕉️ Pilgrimage',
        bestTime: 'Oct – Mar',
        temprature: '15–35°C',
    },
    {
        id: 'rishikesh',
        region: 'Uttarakhand',
        name: 'Rishikesh',
        tagline: 'Adventure & Yoga Capital',
        desc: 'Rishikesh is the yoga capital of the world, offering a perfect blend of spirituality and thrilling adventure sports like river rafting, bungee jumping, and zip-lining on the banks of the holy Ganga.',
        img: asset('assets/R3.jpg'),
        highlights: ['River Rafting (Grade III–V)', 'Bungee Jumping at 83m', 'Laxman Jhula & Ram Jhula', 'Yoga & Meditation Centres'],
        pkgLink: '/tour/rishikesh-adventure-tour',
        badge: '🏄 Adventure',
        bestTime: 'Sep – Nov',
        temprature: '18–35°C',
    },
    {
        id: 'mussoorie',
        region: 'Uttarakhand',
        name: 'Mussoorie',
        tagline: 'Queen of Hills',
        desc: 'Mussoorie — the Queen of Hills — is famous for its stunning waterfalls, crisp mountain air, and the vibrant Mall Road. Misty mornings and panoramic Himalayan views make it an all-season escape.',
        img: 'public/assets/Mussoorie 1.png',
        highlights: ['Kempty Falls', 'Gun Hill Cable Car', "Camel's Back Road", 'Lal Tibba viewpoint'],
        pkgLink: '/tour/mussoorie-hill-escape',
        badge: '🌿 Hill Station',
        bestTime: 'Mar – Jun',
        temprature: '5–25°C',
    },
    {
        id: 'dehradun',
        region: 'Uttarakhand',
        name: 'Dehradun',
        tagline: 'Gateway to Uttarakhand',
        desc: 'Gateway to Uttarakhand, Dehradun is known for its pleasant climate, colonial-era institutions, and proximity to Mussoorie, Haridwar, and Rishikesh — making it a perfect base for exploring the state.',
        img: 'public/assets/Dehradun.png',
        highlights: ['Robber\'s Cave', 'Sahastradhara hot springs', 'Forest Research Institute', 'Clock Tower Market'],
        pkgLink: '/tour-packages?region=Uttarakhand',
        badge: '🏙️ City Escape',
        bestTime: 'Oct – Feb',
        temprature: '10–30°C',
    },
    {
        id: 'kedarnath',
        region: 'Uttarakhand',
        name: 'Kedarnath',
        tagline: 'Divine Himalayan Shrine',
        desc: 'Kedarnath, one of the holiest Shiva shrines and part of the sacred Char Dham Yatra, sits at 3,583m amidst snow-capped peaks. The trek to this ancient temple is both spiritually uplifting and visually breathtaking.',
        img: asset('assets/Kedarnath 1.png'),
        highlights: ['Kedarnath Temple (3583m)', 'Helicopter darshan available', 'Vasuki Tal lake trek', 'Sonprayag base camp'],
        pkgLink: '/tour/char-dham-yatra',
        badge: '🕉️ Char Dham',
        bestTime: 'May – Jun, Sep – Oct',
        temprature: '-5–15°C',
    },
    {
        id: 'badrinath',
        region: 'Uttarakhand',
        name: 'Badrinath',
        tagline: 'Abode of Vishnu',
        desc: 'A revered Hindu temple dedicated to Lord Vishnu at 3,133m, Badrinath is one of the four sites in Char Dham pilgrimage. The surrounding Neelkantha peak and Mana village — the last Indian village before Tibet — add to its mystical aura.',
        img: 'public/assets/Badrinath.jpg',
        highlights: ['Badrinath Temple', 'Mana Village', 'Tapt Kund hot springs', 'Satopanth Lake trek'],
        pkgLink: '/tour/char-dham-yatra',
        badge: '🕉️ Char Dham',
        bestTime: 'May – Jun, Sep – Oct',
        temprature: '-5–12°C',
    },
    {
        id: 'valley-of-flowers',
        region: 'Uttarakhand',
        name: 'Valley of Flowers',
        tagline: 'UNESCO World Heritage',
        desc: 'A UNESCO World Heritage Site, the Valley of Flowers burst into a riot of colour every monsoon with over 600 species of rare wildflowers set against snow-capped Himalayan peaks.',
        img: 'public/assets/Valley of Flowers.jpg',
        highlights: ['600+ species wildflowers', 'Hemkund Sahib Gurudwara', 'Ghangaria base camp', 'Rare Himalayan fauna'],
        pkgLink: '/tour-packages?region=Uttarakhand',
        badge: '🌸 UNESCO Site',
        bestTime: 'Jul – Sep',
        temprature: '5–18°C',
    },
    {
        id: 'chopta',
        region: 'Uttarakhand',
        name: 'Chopta',
        tagline: 'Mini Switzerland of India',
        desc: 'Chopta is a charming hamlet at 2,680m often called the "Mini Switzerland of India". It is the base camp for the famous Tungnath and Chandrashila trek, offering stunning oak & rhododendron forests and 360° Himalayan panoramas.',
        img: 'public/assets/Chopta.png',
        highlights: ['Tungnath Temple (highest Shiva temple)', 'Chandrashila summit (4000m)', 'Deoria Tal lake', 'Ukhimath village'],
        pkgLink: '/tour-packages?region=Uttarakhand',
        badge: '🏕️ Camping',
        bestTime: 'Mar – Apr, Sep – Nov',
        temprature: '-5–20°C',
    },
    {
        id: 'auli',
        region: 'Uttarakhand',
        name: 'Auli',
        tagline: 'India\'s Ski Paradise',
        desc: 'Auli is India\'s premier ski destination at 2,519m, with Asia\'s longest gondola cable car offering jaw-dropping views of Nanda Devi, the second highest peak in India. Snow activities from January to March make it the perfect winter getaway.',
        img: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80',
        highlights: ['Skiing slopes (beginner to expert)', 'Gondola — Asia\'s longest cable car', 'Nanda Devi peak views', 'Gurso Bugyal meadow trek'],
        pkgLink: '/tour/auli-snow-adventure',
        badge: '⛷️ Skiing',
        bestTime: 'Jan – Mar',
        temprature: '-10–10°C',
    },
    {
        id: 'nainital',
        region: 'Uttarakhand',
        name: 'Nainital',
        tagline: 'The Lake District of India',
        desc: 'Nainital enchants with its shimmering Naini Lake, colonial charm, and a ropeway to Snow View Point. Boating at sunset, Mall Road shopping, and the serene Naina Devi Temple make it a timeless hill station.',
        img: 'public/assets/Nainital 1.png',
        highlights: ['Naini Lake boating', 'Snow View Point ropeway', 'Naina Devi Temple', 'Tiffin Top sunrise'],
        pkgLink: '/tour/nainital-lake-tour',
        badge: '🚣 Lake Town',
        bestTime: 'Mar – Jun, Sep – Nov',
        temprature: '5–25°C',
    },

    // ── HIMACHAL PRADESH ──
    {
        id: 'manali',
        region: 'Himachal',
        name: 'Manali',
        tagline: 'Honeymoon & Snow Capital',
        desc: 'Discover the beauty of snow-capped mountains and lush valleys. Manali is a honeymoon favourite and backpacker\'s paradise — with Rohtang Pass snow, Solang Valley adventure, Hadimba Temple, and Old Manali cafés.',
        img: 'public/assets/Manali.png',
        highlights: ['Rohtang Pass (3978m)', 'Solang Valley snow activities', 'Hadimba Devi Temple', 'Old Manali cafés & market'],
        pkgLink: '/tour/shimla-manali-tour',
        badge: '❄️ Snow',
        bestTime: 'Dec – Feb, May – Jun',
        temprature: '-10–25°C',
    },
    {
        id: 'shimla',
        region: 'Himachal',
        name: 'Shimla',
        tagline: 'Queen of Hill Stations',
        desc: 'Himachal\'s capital city is famous for its Mall Road, colonial-era architecture, Kufri snow point, and the famous toy train ride through the mountains. Shimla is a charming blend of British heritage and Himalayan beauty.',
        img: 'public/assets/Shimla 1.png',
        highlights: ['Mall Road & Scandal Point', 'Christ Church & Ridge', 'Kufri snow & horse riding', 'Heritage toy train ride'],
        pkgLink: '/tour/shimla-manali-tour',
        badge: '🏔️ Colonial Charm',
        bestTime: 'Mar – Jun, Dec – Jan',
        temprature: '-5–25°C',
    },
    {
        id: 'kullu',
        region: 'Himachal',
        name: 'Kullu',
        tagline: 'Valley of Gods',
        desc: 'Famous for its scenic valleys, river rafting on the Beas, and ancient temples, Kullu is the gateway to Manali. The vibrant Kullu Dussehra festival draws thousands of pilgrims and tourists annually.',
        img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        highlights: ['Beas River rafting', 'Kullu Dussehra festival', 'Great Himalayan National Park', 'Raghunath Temple'],
        pkgLink: '/tour/shimla-manali-tour',
        badge: '🛶 Valley',
        bestTime: 'Oct – Nov, Mar – Jun',
        temprature: '5–30°C',
    },
    {
        id: 'dharamshala',
        region: 'Himachal',
        name: 'Dharamshala',
        tagline: 'Little Lhasa',
        desc: 'Home to His Holiness the Dalai Lama and the Tibetan government-in-exile, Dharamshala is a spiritual hub with Buddhist monasteries, Tibetan restaurants, and stunning cricket stadium views of the Dhauladhar range.',
        img: 'public/assets/Dharamshala 1.png',
        highlights: ['Dalai Lama Complex (McLeod Ganj)', 'Bhagsu Nag waterfall', 'Tsuglagkhang Monastery', 'World\'s highest cricket stadium'],
        pkgLink: '/tour/dharamshala-dalhousie-tour',
        badge: '☸️ Spiritual',
        bestTime: 'Mar – Jun, Sep – Nov',
        temprature: '5–28°C',
    },
    {
        id: 'mcleod-ganj',
        region: 'Himachal',
        name: 'McLeod Ganj',
        tagline: 'Spirit of Tibet in India',
        desc: 'A spiritual hub perched above Dharamshala, McLeod Ganj is famous for its monasteries, trekking trails to Triund, bustling Tibetan market, and the serene Namgyal Monastery — home of the Dalai Lama.',
        img: 'public/assets/McLeod Ganj.png',
        highlights: ['Namgyal Monastery', 'Triund trek (2828m)', 'Tibetan market & cafés', 'Dal Lake (Dharamshala)'],
        pkgLink: '/tour/dharamshala-dalhousie-tour',
        badge: '🏔️ Trekking',
        bestTime: 'Mar – Jun, Sep – Nov',
        temprature: '5–25°C',
    },
    {
        id: 'kasol',
        region: 'Himachal',
        name: 'Kasol',
        tagline: 'Backpacker\'s Paradise',
        desc: 'A backpacker\'s paradise in the Parvati Valley, Kasol is known for its stunning river landscapes, Israeli cafés, and access to the famous Kheerganga hot springs trek through dense Himalayan forests.',
        img: 'public/assets/Kasol 1.png',
        highlights: ['Kheerganga hot springs trek', 'Manikaran Sahib Gurudwara', 'Chalal village walk', 'Parvati River riverside camping'],
        pkgLink: '/tour/kasol-kheerganga-trek',
        badge: '🌿 Backpacker',
        bestTime: 'Mar – Jun, Sep – Oct',
        temprature: '5–25°C',
    },
    {
        id: 'spiti-valley',
        region: 'Himachal',
        name: 'Spiti Valley',
        tagline: 'Land in the Sky',
        desc: 'A high-altitude cold desert at 4,000m+, Spiti Valley offers dramatic moonscape landscapes, the world\'s highest motorable roads, ancient Buddhist monasteries at Kaza and Key, and the stunning crescent Chandratal Lake.',
        img: 'public/assets/Spiti 1.jpg',
        highlights: ['Key Monastery (world\'s highest motorable monastery)', 'Chandratal Lake (4300m)', 'Kibber village', 'Pin Valley National Park'],
        pkgLink: '/tour/spiti-valley-adventure',
        badge: '🏜️ Off-Beat',
        bestTime: 'Jun – Sep',
        temprature: '-30–20°C',
    },
    {
        id: 'dalhousie',
        region: 'Himachal',
        name: 'Dalhousie',
        tagline: 'Colonial Hill Retreat',
        desc: 'A beautiful hill station with a rich colonial-era charm, Dalhousie offers sweeping views of the Dhauladhar and Pir Panjal mountain ranges. Khajjiar — the "Mini Switzerland of India" — is just a short drive away.',
        img: 'public/assets/Dharamshala 2.png',
        highlights: ['Khajjiar meadow (Mini Switzerland)', 'St. John\'s Church', 'Kalatop Wildlife Sanctuary', 'Satdhara Falls'],
        pkgLink: '/tour/dharamshala-dalhousie-tour',
        badge: '🌿 Colonial',
        bestTime: 'Mar – Jun, Sep – Nov',
        temprature: '-3–25°C',
    },
];

const DESTINATIONS_DATA = DESTINATIONS.map(normalizeAssetFields);

const TABS = ['All', 'Uttarakhand', 'Himachal', 'International'];

const BADGE_COLORS = {
    '🕉️ Pilgrimage': 'bg-amber-600 text-white',
    '🕉️ Char Dham': 'bg-amber-700 text-white',
    '🏄 Adventure': 'bg-orange-500 text-white',
    '🌿 Hill Station': 'bg-green-600 text-white',
    '🏙️ City Escape': 'bg-blue-600 text-white',
    '❄️ Snow': 'bg-sky-500 text-white',
    '⛷️ Skiing': 'bg-sky-600 text-white',
    '⛷️ Snow Sports': 'bg-sky-700 text-white',
    '🌸 UNESCO Site': 'bg-purple-600 text-white',
    '🌸 Scenic Valley': 'bg-pink-500 text-white',
    '🏕️ Camping': 'bg-green-700 text-white',
    '🚣 Lake Town': 'bg-teal-500 text-white',
    '🏔️ Colonial Charm': 'bg-indigo-500 text-white',
    '🏔️ Trekking': 'bg-lime-600 text-white',
    '🏔️ Glacier': 'bg-cyan-600 text-white',
    '☸️ Spiritual': 'bg-violet-600 text-white',
    '🌿 Backpacker': 'bg-emerald-500 text-white',
    '🌿 Colonial': 'bg-teal-600 text-white',
    '🏜️ Off-Beat': 'bg-yellow-600 text-white',
    '🛶 Valley': 'bg-green-500 text-white',
    '🏖️ Beach': 'bg-cyan-500 text-white',
    '🏖️ Beach Fun': 'bg-yellow-500 text-brand-dark',
    '🌆 City': 'bg-rose-500 text-white',
};

const DestinationCard = ({ dest }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        whileHover={{ y: -8 }}
        className="group relative flex flex-col rounded-[2rem] bg-white border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] overflow-hidden"
    >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
            <img src={dest.img} alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/10 ${BADGE_COLORS[dest.badge] || 'bg-slate-900/80 text-white'}`}>
                    {dest.badge}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                    <MapPin size={10} className="text-brand-gold" /> {dest.region}
                </span>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 text-[9px] font-black uppercase tracking-widest text-brand-gold">
                    Best: {dest.bestTime}
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 relative bg-white">
            <div className="mb-4">
                <h3 className="text-2xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors duration-300">{dest.name}</h3>
                <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mt-1">{dest.tagline}</p>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-6 font-medium italic">"{dest.desc}"</p>

            {/* Highlights */}
            <div className="mb-6 flex flex-wrap gap-2">
                {dest.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="text-[9px] bg-slate-50 text-slate-500 font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-slate-100">
                        {h}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <Link to={dest.pkgLink}
                className="flex items-center justify-center gap-2 bg-brand-dark text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-dark/10 group/btn active:scale-95">
                Explore Packages <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

const Destinations = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        return DESTINATIONS_DATA.filter(d => {
            const matchRegion = activeTab === 'All' || d.region === activeTab;
            const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
                d.tagline.toLowerCase().includes(search.toLowerCase());
            return matchRegion && matchSearch;
        });
    }, [activeTab, search]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Destinations | Uttarakhand · Himachal · Thailand | Yatra Go</title>
                <meta name="description" content="Explore handcrafted travel destinations across Uttarakhand, Himachal Pradesh and Thailand. Real photos, travel highlights and tours from Yatra Go." />
            </Helmet>

            {/* ── HERO ── */}
            <section className="relative h-[58vh] min-h-[400px] flex items-end overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
                    {[
                        asset('assets/Tour Package.png'),
                        asset('assets/Kedarnath 1.png'),
                        asset('assets/Camping Y.png'),
                        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
                        asset('assets/Haridwar 2.png'),
                        asset('assets/R3.jpg'),
                    ].map((src, i) => (
                        <img key={i} src={src} alt="" className="w-full h-full object-cover" loading="lazy"
                            onError={(e) => { e.target.src = asset('assets/Tour Package.png'); }} />
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-black/30" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <span className="inline-block text-brand-gold font-black uppercase tracking-widest text-xs mb-2 bg-brand-dark/40 px-3 py-1 rounded-full backdrop-blur-sm border border-brand-gold/30">22 Destinations · India & Thailand</span>
                    <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white mb-3">Where to <span className="text-brand-gold">Next?</span></h1>
                    <p className="text-white/70 text-lg max-w-2xl">From sacred Himalayan shrines to golden Thai beaches — Yatra Go curates unforgettable journeys to every corner.</p>
                </motion.div>
            </section>

            {/* ── FILTER BAR (sticky) ── */}
            <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative min-w-[180px] max-w-xs flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search destination..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-gold" />
                    </div>
                    {/* Region pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1 text-sm text-gray-500"><Filter size={13} /></span>
                        {TABS.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-brand-gold text-brand-dark shadow' : 'bg-gray-100 text-gray-600 hover:bg-amber-50'}`}>
                                {tab === 'International' ? '🌏 International' : tab}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto text-xs text-gray-400 hidden sm:block">{filtered.length} destination{filtered.length !== 1 ? 's' : ''}</div>
                </div>
            </section>

            {/* ── DESTINATIONS GRID ── */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.length === 0 ? (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center py-20 text-gray-400">
                                <MapPin size={40} className="mx-auto mb-4 opacity-30" />
                                <p className="text-lg">No destinations found for "<strong>{search}</strong>"</p>
                                <button onClick={() => { setSearch(''); setActiveTab('All'); }}
                                    className="mt-4 text-brand-gold font-bold hover:underline">Clear filters</button>
                            </motion.div>
                        ) : (
                            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filtered.map(dest => <DestinationCard key={dest.id} dest={dest} />)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ── STATS STRIP ── */}
            <section className="py-10 bg-brand-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { num: '22+', label: 'Destinations' },
                            { num: '16+', label: 'Tour Packages' },
                            { num: '5000+', label: 'Happy Travellers' },
                            { num: '10+', label: 'Years of Trust' },
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <div className="text-3xl font-serif font-black text-brand-gold">{stat.num}</div>
                                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-14 bg-gradient-to-br from-amber-50 to-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-serif font-black text-brand-dark mb-3">Can't decide where to go?</h2>
                    <p className="text-gray-500 mb-8">Our travel experts will craft the perfect itinerary for you — free of charge!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://wa.me/918979931256?text=Hi! I need help choosing a destination. Please suggest."
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-black px-8 py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                            <MessageCircle size={18} /> Chat on WhatsApp
                        </a>
                        <a href="tel:+918979931256"
                            className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark font-bold px-8 py-3.5 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                            <Phone size={18} /> +91 8979931256
                        </a>
                    </div>
                </div>
            </section>

            {/* WhatsApp FAB */}
            <a href="https://wa.me/918979931256" target="_blank" rel="noopener noreferrer"
                className="fixed bottom-24 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all z-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" />
                </svg>
            </a>
        </div>
    );
};

export default Destinations;


