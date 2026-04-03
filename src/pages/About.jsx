import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Award, Users, MapPin, Clock, Shield, Heart, Star,
    Target, Eye, Zap, CheckCircle2, Phone, ArrowRight,
    Globe, Mountain, Compass, ThumbsUp, Headphones,
    TrendingUp, CreditCard
} from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { asset } from '../lib/assets';

// ─── Animation Wrapper ───
const FadeIn = ({ children, delay = 0, dir = 'up', className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: dir === 'up' ? 30 : dir === 'down' ? -30 : 0, x: dir === 'left' ? -40 : dir === 'right' ? 40 : 0 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// ─── Stats counter ───
const stats = [
    { value: '10+', label: 'Years of Experience', icon: <Clock size={28} /> },
    { value: '5000+', label: 'Happy Travelers', icon: <Users size={28} /> },
    { value: '50+', label: 'Destinations Covered', icon: <MapPin size={28} /> },
    { value: '99%', label: 'Satisfaction Rate', icon: <Star size={28} /> },
];

// ─── Team ───
const team = [
    { name: 'Aman Verma', role: 'Founder & CEO', img: 'public/assets/Aman.png', quote: '"Every journey begins with a single step — we make sure every step is perfect."' },
    { name: 'Aman Verma', role: 'Head of Operations', img: 'public/assets/Aman.png', quote: '"We don\'t just plan trips, we craft memories."' },
    { name: 'Aman Verma', role: 'Lead Travel Consultant', img: 'public/assets/Aman.png', quote: '"Our mountains are not just destinations — they are life-changing experiences."' },
    { name: 'Aman Verma', role: 'Customer Relations', img: 'public/assets/Aman.png', quote: '"Every traveler deserves to feel safe, valued and inspired."' },
];

// ─── Values / Why Choose Us ───
const whyUs = [
    { icon: <Shield size={28} />, title: '100% Safe & Verified', desc: 'All vehicles, guides, and stays are verified. We prioritize your safety above everything else.' },
    { icon: <CreditCard size={28} />, title: 'Transparent Pricing', desc: 'No hidden charges. Full cost breakdown shared upfront before you confirm.' },
    { icon: <Compass size={28} />, title: 'Expert Local Guides', desc: '10+ years of on-ground experience in Uttarakhand, Himachal Pradesh and beyond.' },
    { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'A dedicated coordinator is assigned to every booking — reachable anytime, anywhere.' },
    { icon: <Globe size={28} />, title: '50+ Destinations', desc: 'From Char Dham to Spiti — we cover India\'s most spectacular sacred and scenic trails.' },
    { icon: <Heart size={28} />, title: 'Curated Experiences', desc: 'Every package is hand-crafted with love and on-ground insight — not a template.' },
    { icon: <TrendingUp size={28} />, title: 'Best Price Guarantee', desc: 'Found a cheaper deal? Show us and we\'ll match or beat it. No questions asked.' },
    { icon: <ThumbsUp size={28} />, title: '5000+ Happy Travelers', desc: 'Families, honeymooners, solo adventurers, and pilgrims trust us year after year.' },
];

// ─── Milestones ───
const milestones = [
    { year: '2014', title: 'YatraGo Founded', desc: 'Started in Haridwar with a small office and a big dream to redefine Uttarakhand travel.' },
    { year: '2016', title: 'First 500 Travelers', desc: 'Reached our first milestone of 500 happy travelers in just 2 years of operation.' },
    { year: '2018', title: 'Expanded to Himachal', desc: 'Launched Manali, Shimla, and Spiti Valley packages extending beyond Uttarakhand.' },
    { year: '2020', title: 'Digital Booking Platform', desc: 'Launched online booking, WhatsApp support and 24/7 customer assistance.' },
    { year: '2022', title: 'Rajasthan & International', desc: 'Added Rajasthan, Madhya Pradesh and international destinations including Nepal and Bhutan.' },
    { year: '2024', title: '5000+ Happy Travelers', desc: 'Celebrated a major milestone — 5000+ satisfied travelers and counting!' },
];

// ─── Page ───
const About = () => (
    <div className="min-h-screen">
        <Helmet>
            <title>About Us | Yatra Go — Premium Travel Agency, Haridwar</title>
            <meta name="description" content="Know the story, mission, vision and team behind Yatra Go — Haridwar's most trusted travel agency specializing in Uttarakhand and Himachal Pradesh tours." />
        </Helmet>

        {/* ── HERO BANNER ── */}
        <section className="relative h-[55vh] sm:h-[65vh] min-h-[400px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
            <img
                src={asset('assets/About us.png')}
                alt="Kedarnath mountains — YatraGo"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/75 via-brand-dark/55 to-brand-dark/85" />
            <FadeIn className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Established 2014 · Haridwar, Uttarakhand</span>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white mb-4 sm:mb-5 leading-tight">
                    Our Story of <span className="text-brand-gold">Inspiring Journeys</span>
                </h1>
                <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto font-medium">A Haridwar-born travel agency that has helped 5000+ families, pilgrims and adventure seekers discover the real India.</p>
            </FadeIn>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="bg-brand-gold py-8 sm:py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent)] animate-pulse" />
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
                {stats.map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="text-brand-dark group cursor-default">
                            <div className="flex justify-center mb-2 sm:mb-3 text-brand-dark/70 group-hover:scale-110 group-hover:text-brand-dark transition-all duration-300">{s.icon}</div>
                            <div className="text-3xl sm:text-4xl xl:text-5xl font-black font-serif tracking-tight">{s.value}</div>
                            <div className="text-[10px] sm:text-sm font-bold mt-1 sm:mt-2 opacity-80 uppercase tracking-wider">{s.label}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <FadeIn dir="left">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <img src={asset('assets/Kedarnath 1.png')} alt="Chardham Yatra" className="rounded-2xl h-44 sm:h-60 w-full object-cover shadow-lg mt-6 sm:mt-8" />
                            <img src={asset('assets/Haridwar Aarti.png')} alt="Haridwar Ganga Aarti" className="rounded-2xl h-44 sm:h-60 w-full object-cover shadow-lg" />
                            <img src={asset('assets/Devprayag.png')} alt="Devprayag" className="rounded-2xl h-36 sm:h-48 w-full object-cover shadow-lg -mt-3 sm:-mt-4" />
                            <img src={asset('assets/Shimla 1.png')} alt="Shimla Hill Station" className="rounded-2xl h-36 sm:h-48 w-full object-cover shadow-lg mt-3 sm:mt-4" />
                        </div>
                        <div className="mt-5 bg-brand-dark text-white p-4 sm:p-5 rounded-2xl">
                            <p className="text-brand-gold font-bold text-xs sm:text-sm mb-1">📍 Our Headquarters</p>
                            <p className="text-white/80 text-xs sm:text-sm">94, Yoravar Enclave, Phase-1, Ganesh Vihar, Sitapur, Jwalapur, Haridwar, Uttarakhand — 249407</p>
                        </div>
                    </FadeIn>
                    <FadeIn dir="right">
                        <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Who We Are</span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-dark leading-tight mb-5 sm:mb-6">
                            Born in the Land of <span className="text-brand-gold">the Gods</span>
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong>YatraGo</strong> was founded in 2014 in the holy city of Haridwar, Uttarakhand — at the very doorstep of the Himalayas. What started as a small local cab and pilgrimage service has grown into one of the most trusted full-service travel agencies in North India.
                            </p>
                            <p>
                                Over the past decade, we have served thousands of pilgrims on Char Dham Yatras, guided adventure enthusiasts through Rishikesh white waters, helped honeymooners find romance in Shimla, and taken families on unforgettable Manali snow vacations.
                            </p>
                            <p>
                                We are not just a travel agency. We are <em>travel storytellers</em> — every tour we design carries the soul of the destination and the genuine care of our team.
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-6 py-3.5 sm:py-3 rounded-[14px] sm:rounded-lg hover:bg-yellow-400 transition-colors shadow">
                                <Phone size={16} /> Talk to Us
                            </Link>
                            <Link to="/tour-packages" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark font-bold px-6 py-3.5 sm:py-3 rounded-[14px] sm:rounded-lg hover:bg-brand-dark hover:text-white transition-colors">
                                View Packages <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="up">
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">What Drives Us</span>
                        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">Mission & Vision</h2>
                        <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                    </div>
                </ScrollReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Mission */}
                    <ScrollReveal delay={0.1}>
                        <div className="premium-card overflow-hidden h-full group bg-white">
                            <div className="relative h-48 overflow-hidden">
                                <img src={asset('assets/Our Mission.png')} alt="Mission" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                                    <div className="bg-brand-gold text-brand-dark w-11 h-11 rounded-xl flex items-center justify-center shadow-lg">
                                        <Target size={22} />
                                    </div>
                                    <span className="text-white font-black text-2xl font-Montserrat uppercase tracking-tight">Our Mission</span>
                                </div>
                            </div>
                            <div className="p-7">
                                <p className="text-black-600 leading-relaxed text-base">
                                    To make travel accessible, meaningful and memorable for every Indian — whether they seek divine blessings at the Char Dham, adventure in the Himalayas, or a romantic escape in the valleys of Himachal.
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {['Deliver end-to-end travel solutions', 'Ensure 100% customer satisfaction', 'Promote responsible tourism', 'Support local communities'].map((p, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-black-600"><CheckCircle2 size={16} className="text-brand-gold shrink-0" />{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>
                    {/* Vision */}
                    <ScrollReveal delay={0.2}>
                        <div className="premium-card overflow-hidden h-full group bg-white">
                            <div className="relative h-48 overflow-hidden">
                                <img src={asset('assets/Our Vision.png')} alt="Vision" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                                    <div className="bg-brand-gold text-brand-dark w-11 h-11 rounded-xl flex items-center justify-center shadow-lg">
                                        <Eye size={22} />
                                    </div>
                                    <span className="text-white font-black text-2xl font-Montserrat uppercase tracking-tight">Our Vision</span>
                                </div>
                            </div>
                            <div className="p-7">
                                <p className="text-black-600 leading-relaxed text-base">
                                    To become the most trusted travel partner across North India — a brand synonymous with safety, authenticity and extraordinary experiences for every type of traveler.
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {['Top-rated agency in Uttarakhand', 'Expand to 100+ destinations', 'Build India\'s best traveler community', 'Lead responsible Himalayan travel'].map((p, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-black-600"><CheckCircle2 size={16} className="text-brand-blue shrink-0" />{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>
                    {/* Core Values */}
                    <ScrollReveal delay={0.3}>
                        <div className="brand-dark-shell premium-card overflow-hidden h-full group">
                            <div className="relative h-48 overflow-hidden">
                                <img src={asset('assets/Our Value.png')} alt="Values" className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-brand-dark/40 to-transparent" />
                                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                                    <div className="bg-brand-gold text-brand-dark w-11 h-11 rounded-xl flex items-center justify-center shadow-lg">
                                        <Zap size={22} />
                                    </div>
                                    <span className="text-white font-black text-2xl font-Montserrat uppercase tracking-tight">Our Values</span>
                                </div>
                            </div>
                            <div className="p-7">
                                <p className="text-grey/80 leading-relaxed mb-6 font-medium">The principles that govern every trip we plan and every relationship we build.</p>
                                <ul className="space-y-4 text-grey/85">
                                    {[
                                        ['Integrity', 'Transparent — always'],
                                        ['Safety', 'Your wellbeing first'],
                                        ['Excellence', 'Never settle for average'],
                                        ['Community', 'Give back to local people'],
                                    ].map(([title, desc], i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="bg-brand-gold text-brand-dark w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-brand-gold/20 shadow-md">{i + 1}</span>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-base leading-none">{title}</span>
                                                <span className="text-grey/85 text-xs mt-1">— {desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="text-center mb-10 sm:mb-14">
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Our Advantage</span>
                    <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black text-brand-dark">Why Choose Yatra Go?</h2>
                    <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">We're not just another travel company. Here's what makes us different from everyone else.</p>
                </FadeIn>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {whyUs.map((w, i) => (
                        <FadeIn key={i} delay={i * 0.06}>
                            <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:bg-brand-dark hover:border-brand-dark hover:shadow-xl transition-all duration-300 cursor-default">
                                <div className="text-brand-gold group-hover:scale-110 transition-transform mb-4">{w.icon}</div>
                                <h3 className="font-bold text-brand-dark group-hover:text-white text-base mb-2 font-serif transition-colors">{w.title}</h3>
                                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{w.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>

        {/* ── JOURNEY TIMELINE ── */}
        <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400)', backgroundSize: 'cover' }}></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn className="text-center mb-10 sm:mb-14">
                    <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-sm mb-3">Our Journey</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">From 2014 to Today</h2>
                    <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
                </FadeIn>
                <div className="relative">
                    {/* Central line */}
                    <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-brand-gold/30 hidden md:block"></div>
                    <div className="space-y-10">
                        {milestones.map((m, i) => (
                            <FadeIn key={i} delay={i * 0.1} dir={i % 2 === 0 ? 'left' : 'right'}>
                                <div className={`flex gap-8 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white/8 border border-white/10 rounded-2xl p-4 sm:p-5 hover:bg-white/12 transition-colors">
                                            <span className="inline-block bg-brand-gold text-brand-dark font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full mb-2">{m.year}</span>
                                            <h3 className="text-white font-bold text-base sm:text-lg font-serif mb-2">{m.title}</h3>
                                            <p className="text-white/60 text-xs sm:text-sm">{m.desc}</p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 w-4 h-4 rounded-full bg-brand-gold border-4 border-brand-dark mt-5 hidden md:block"></div>
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* ── ACHIEVEMENTS / AWARDS ── */}
        <section className="py-12 sm:py-16 bg-amber-50 border-y border-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark">Recognition & Achievements</h2>
                    <div className="w-12 h-1 bg-brand-gold mx-auto mt-3 rounded-full"></div>
                </FadeIn>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { icon: <Award size={28} />, title: 'Best Tour Operator 2023', body: 'Uttarakhand Tourism Excellence Awards' },
                        { icon: <Star size={28} />, title: '4.9 / 5.0 Rating', body: 'Across 1000+ verified Google reviews' },
                        { icon: <Users size={28} />, title: '5000+ Happy Travelers', body: 'Families, pilgrims, honeymooners & adventurers served' },
                        { icon: <Heart size={28} />, title: '10+ Years of Trust', body: 'A decade of crafting unforgettable journeys in Uttarakhand' },
                    ].map((a, i) => (
                        <FadeIn key={i} delay={i * 0.08}>
                            <div className="bg-white border border-amber-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-brand-gold w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">{a.icon}</div>
                                <h3 className="font-bold text-brand-dark font-serif mb-1">{a.title}</h3>
                                <p className="text-gray-500 text-sm">{a.body}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-dark via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute inset-0 bg-brand-dark/60"></div>
            <FadeIn className="relative z-10 max-w-3xl mx-auto text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mb-4 sm:mb-5">
                    Let's Plan Your <span className="text-brand-gold">Next Adventure</span>
                </h2>
                <p className="text-white/70 text-sm sm:text-lg mb-8 sm:mb-10 lg:px-12 font-medium">
                    Join thousands of happy travelers who chose Yatra Go. Talk to our expert, share your dream, and we'll make it real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                    <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-xl text-sm sm:text-base">
                        <Phone size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> Talk to a Travel Expert
                    </Link>
                    <Link to="/tour-packages" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:border-brand-gold hover:text-brand-gold transition-colors text-sm sm:text-base">
                        Explore Packages <ArrowRight size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </Link>
                </div>
            </FadeIn>
        </section>
    </div>
);

export default About;
