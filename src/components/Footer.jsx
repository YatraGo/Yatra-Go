import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
    const sitemapHref = `${import.meta.env.BASE_URL}sitemap.xml`;

    return (
        <footer className="bg-slate-950 text-white relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full translate-y-1/2" />

            {/* Pre-footer CTA strip */}
            <div className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-brand-gold/5 to-brand-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
                        <div className="text-center lg:text-left max-w-2xl">
                            <span className="inline-flex items-center gap-2 text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                                <Sparkles size={12} /> Elite Travel Strategy
                            </span>
                            <h3 className="text-3xl md:text-4xl font-serif font-black mb-4 leading-tight">Ready to Sculpt Your <span className="text-brand-gold italic">Elite Expedition?</span></h3>
                            <p className="text-slate-400 font-medium leading-relaxed italic">Consult with our master travel strategists and receive a bespoke blueprint for your next journey, curated with precision and trust.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                            <a href="tel:+918979931256" className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 sm:px-8 text-xs sm:text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-brand-gold active:scale-95">
                                <Phone size={18} className="text-brand-gold shrink-0" /> +91 89799-31256
                            </a>
                            <Link to="/contact" className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-brand-gold px-6 sm:px-8 text-xs sm:text-sm font-black uppercase tracking-widest text-brand-dark transition-all hover:bg-white active:scale-95 shadow-2xl shadow-brand-gold/20 shimmer-effect">
                                <Mail size={18} className="shrink-0" /> Reserve a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer body */}
            <div className="pt-16 sm:pt-24 pb-10 sm:pb-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-16 mb-16 sm:mb-20">

                        {/* Col 1: Brand */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <Link to="/" className="inline-block group">
                                    <img
                                        src={logoSrc}
                                        alt="Yatra Go"
                                        className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                    />
                                    <span className="hidden text-3xl font-serif font-black text-brand-gold">Yatra Go</span>
                                </Link>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    Yatra Go is a premiere Haridwar-based travel atelier, engineering high-impact journeys across the Himalayas. We redefine luxury through granular planning, elite logistics, and unwavering on-ground guardianship.
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Operations Center</h4>
                                <div className="space-y-4">
                                    <a href="tel:+918979931256" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-brand-gold transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors"><Phone size={14} /></div>
                                        +91 8979931256
                                        <br />
                                        +91 8979220256
                                    </a>
                                    <a href="mailto:info@yatrago.com" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-brand-gold transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors"><Mail size={14} /></div>
                                        sales.yatrago@gmail.com
                                    </a>
                                    <div className="flex items-start gap-3 text-sm font-bold text-slate-300 leading-relaxed group">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/10 transition-colors"><MapPin size={14} /></div>
                                        <span className="pt-1 italic">Yatra Go, Ganesh Vihar, Sitapur, Jwalapur, Haridwar, Uttarakhand 249407</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Curated Collections */}
                        <div>
                            <h4 className="text-white font-black font-serif mb-6 sm:mb-8 text-xl sm:text-lg border-b border-white/5 pb-4 tracking-tight">Curated Packages</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Char Dham Yatra', path: '/chardham-yatra-from-haridwar' },
                                    { name: 'Rishikesh Adventure', path: '/tour/rishikesh-adventure-tour' },
                                    { name: 'Shimla-Manali Elite', path: '/tour/shimla-manali-tour' },
                                    { name: 'Mussoorie Escape', path: '/tour/mussoorie-hill-escape' },
                                    { name: 'Spiti Expedition', path: '/tour/spiti-valley-adventure' },
                                    { name: 'Auli Snow Tour', path: '/auli-tour-package' },
                                ].map((l, i) => (
                                    <li key={i}>
                                        <Link to={l.path} className="group flex items-center gap-2 text-sm text-slate-400 font-bold transition-all hover:text-brand-gold hover:translate-x-1">
                                            <ArrowRight size={12} className="text-brand-gold opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3: Fleet & Concierge */}
                        <div>
                            <h4 className="text-white font-black font-serif mb-6 sm:mb-8 text-xl sm:text-lg border-b border-white/5 pb-4 tracking-tight">Fleet & Concierge</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Luxury Hotel Curation', path: '/services/hotel' },
                                    { name: 'Elite Car Rental', path: '/haridwar-taxi-service' },
                                    { name: 'Adventure Activities', path: '/rishikesh-adventure-activities' },
                                    { name: 'Bike Expeditions', path: '/services/bike-rental' },
                                    { name: 'Honeymoon Touches', path: '/tour/romantic-himachal-honeymoon' },
                                ].map((l, i) => (
                                    <li key={i}>
                                        <Link to={l.path} className="group flex items-center gap-2 text-sm text-slate-400 font-bold transition-all hover:text-brand-gold hover:translate-x-1">
                                            <ArrowRight size={12} className="text-brand-gold opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4: Corporate */}
                        <div>
                            <h4 className="text-white font-black font-serif mb-6 sm:mb-8 text-xl sm:text-lg border-b border-white/5 pb-4 tracking-tight">Company info</h4>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { name: 'Our Story', path: '/about-us' },
                                    { name: 'Contact us', path: '/contact' },
                                    { name: 'Explorer Blog', path: '/blog' },
                                    { name: 'Safety & Privacy', path: '/privacy-policy' },
                                ].map((l, i) => (
                                    <li key={i}>
                                        <Link to={l.path} className="group flex items-center gap-2 text-sm text-slate-400 font-bold transition-all hover:text-brand-gold hover:translate-x-1">
                                            <ArrowRight size={12} className="text-brand-gold opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                {[
                                    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/profile.php?id=61570195815554' },
                                    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/yatrago_official/' },
                                    { icon: <Youtube size={18} />, href: 'https://www.youtube.com/@YatraGo-q4o' },
                                ].map((s, i) => (
                                    <a key={i} href={s.href}
                                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 hover:-translate-y-1">
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Bottom Utility Bar */}
                    <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full lg:w-auto text-center md:text-left">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                &copy; {currentYear} <span className="text-white">Yatra Go</span>. All rights reserved.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                                <Link to="/privacy-policy" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Privacy</Link>
                                <Link to="/terms-and-conditions" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Terms</Link>
                                <a href={sitemapHref} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Sitemap</a>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 w-full lg:w-auto">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-brand-gold shrink-0" />
                                <span>SSL Encrypted</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-white/10" />
                            <p className="flex items-center justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                DESIGNED by
                                <a href="https://yatrago.com/" target="_blank" rel="noopener noreferrer"
                                    className="text-white hover:text-brand-gold transition-colors">Yuvan Creations</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
