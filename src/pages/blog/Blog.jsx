import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, CheckCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { BLOG_POSTS } from '../../data/blogs';
import { asset } from '../../lib/assets';
import { submitWeb3Form } from '../../lib/web3forms';

const HERO_IMG = asset('assets/Kedarnath 2.png');

const BlogCard = ({ post }) => (
    <Link to={`/blog/${post.slug || post.id}`} className="block group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-500 flex flex-col h-full cursor-pointer relative hover:-translate-y-1">
        <div className="relative h-32 sm:h-64 overflow-hidden">
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1626714485934-2979212ad12e?w=800&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Category Tag */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-brand-dark text-[7px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full shadow-lg group-hover:bg-brand-gold transition-colors">
                {post.category}
            </div>

            {/* Read Time */}
            <div className="absolute top-2 right-2 bg-brand-dark/70 backdrop-blur-md border border-white/20 text-white text-[7px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full flex items-center gap-1">
                <BookOpen size={9} className="text-brand-gold shrink-0" /> {post.readTime}
            </div>
            
            {/* Author floating over image edge */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 z-10">
                <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-brand-gold shadow-md object-cover shrink-0" />
                <div>
                    <span className="text-white text-[9px] sm:text-xs font-bold block leading-none">{post.author.name.split(' ')[0]}</span>
                    <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-wider block">{post.date.split(' ')[0]}</span>
                </div>
            </div>
        </div>
        
        <div className="p-3 sm:p-6 flex-1 flex flex-col relative z-20">
            <h3 className="text-xs sm:text-xl font-black font-serif text-brand-dark mb-2 leading-tight group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[32px] sm:min-h-[56px]">
                {post.title}
            </h3>
            <p className="text-gray-500 text-[10px] sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-1 font-medium">
                {post.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-5">
                <span className="text-[8px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-0.5">
                    <Sparkles size={10} className="text-brand-gold hidden sm:group-hover:block transition-all" /> 
                    Guide
                </span>
                <span className="flex items-center gap-1 text-brand-dark font-black text-xs sm:text-sm group-hover:text-brand-gold transition-colors">
                    Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
            </div>
        </div>
    </Link>
);

const Blog = () => {
    const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
    const regularPosts = BLOG_POSTS.filter(p => p.id !== featuredPost.id);

    const [email, setEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubscribing(true);
        try {
            await submitWeb3Form({
                subject: 'New Newsletter Subscription',
                replyTo: email,
                fields: {
                    inquiry_type: 'Newsletter Subscription',
                    email: email,
                    message: 'A user has subscribed to the Yatra Go Adventure Club Newsletter.'
                }
            });
            setSubscribed(true);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (err) {
            console.error('Subscription failed', err);
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Premium Travel Blog & Destination Guides | Yatra Go</title>
                <meta name="description" content="Discover premium SEO-friendly travel guides, insider tips, and hidden gems across Rishikesh, Uttarakhand, and the Char Dham Yatra." />
                <meta name="keywords" content="Rishikesh travel blog, Uttarakhand trekking guide, Char Dham Yatra tips, luxury camping Rishikesh, river rafting Rishikesh" />
            </Helmet>

            {/* ─── Hero Section ─── */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <img
                    src={HERO_IMG}
                    alt="Himalayan Travel"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark/95" />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <span className="inline-block text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md px-4 py-2 rounded-full">Blog</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 leading-tight drop-shadow-lg">
                        Yatra Go <span className="text-brand-gold italic">Blog</span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Immerse yourself in our premium collection of expert travel guides, cultural deep-dives, and breathtaking photography across the Himalayas.
                    </p>
                </motion.div>
            </section>

            {/* ─── Content Area ─── */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Featured Post (Full Width) */}
                    <ScrollReveal direction="up" className="mb-16">
                        <Link to={`/blog/${featuredPost.slug || featuredPost.id}`} className="block bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row group cursor-pointer hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1">
                            <div className="md:w-7/12 relative h-80 md:h-auto overflow-hidden">
                                <img 
                                    src={featuredPost.imageUrl} 
                                    alt={featuredPost.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                <div className="absolute top-6 left-6 bg-brand-gold text-brand-dark text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                    Editor's Pick
                                </div>
                            </div>
                            <div className="md:w-5/12 p-8 md:p-12 flex flex-col justify-center bg-brand-dark text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 text-xs text-brand-gold font-bold uppercase tracking-widest mb-4">
                                        <span>{featuredPost.category}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-serif font-black mb-6 leading-tight group-hover:text-brand-gold transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-white/70 text-base leading-relaxed mb-8">
                                        {featuredPost.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            <img src={featuredPost.author.avatar} alt="Author" className="w-10 h-10 rounded-full border-2 border-brand-gold" />
                                            <div>
                                                <span className="text-white text-sm font-bold block leading-none">{featuredPost.author.name}</span>
                                                <span className="text-white/50 text-[10px] uppercase tracking-wider">{featuredPost.date}</span>
                                            </div>
                                        </div>
                                        <div className="bg-brand-gold text-brand-dark w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all shadow-lg">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>

                    {/* Section Title */}
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <span className="inline-block text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2">Discover More</span>
                            <h2 className="text-4xl font-serif font-black text-brand-dark">Latest Articles</h2>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            {['All', 'Adventure', 'Spiritual', 'Offers'].map((tag, i) => (
                                <button key={i} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${i === 0 ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Standard Posts Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                        {regularPosts.map((post, i) => (
                            <ScrollReveal key={post.id} direction="up" delay={i * 0.1}>
                                <BlogCard post={post} />
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Newsletter / CTA */}
                    <ScrollReveal direction="up">
                        <div className="mt-20 bg-gradient-to-br from-brand-dark to-[#1a365d] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/10 blur-3xl rounded-full" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-blue/20 blur-3xl rounded-full" />
                            
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h3 className="text-3xl md:text-5xl font-serif font-black text-white mb-6">Join the Adventure Club</h3>
                                <p className="text-white/70 mb-10 text-lg">Subscribe to get exclusive Uttarakhand travel itineraries, VIP Char Dham updates, and early-bird discounts directly to your inbox.</p>
                                <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto relative" onSubmit={handleSubscribe}>
                                    <input 
                                        type="email" 
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        disabled={subscribed}
                                        placeholder="Enter your email address..." 
                                        className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:bg-white/20 transition-all font-medium disabled:opacity-50"
                                        required
                                    />
                                    {subscribed ? (
                                        <button disabled type="button" className="bg-green-500 text-white flex items-center justify-center gap-2 font-black px-8 py-4 rounded-2xl shadow-lg shadow-green-500/30 flex-shrink-0 cursor-not-allowed transition-all">
                                            <CheckCircle2 size={20} /> Subscribed
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={subscribing} className="bg-brand-gold text-brand-dark font-black px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-lg shadow-brand-gold/20 flex-shrink-0 relative overflow-hidden group disabled:opacity-75 min-w-[150px]">
                                            <span className="relative z-10">{subscribing ? 'Processing...' : 'Subscribe'}</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

            {/* Newsletter Success Popup */}
            <AnimatePresence>
                {showPopup && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: 50 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full relative z-10 shadow-2xl flex flex-col items-center text-center"
                        >
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}
                                className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/30 relative"
                            >
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"
                                />
                                <CheckCircle size={48} className="text-white drop-shadow-md" strokeWidth={2.5} />
                            </motion.div>
                            <h3 className="text-3xl font-black text-brand-dark mb-3 font-serif">Welcome to the Club!</h3>
                            <p className="text-gray-500 mb-6 font-medium">You have successfully subscribed to our premium newsletter. Get ready for exclusive updates in your inbox.</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Blog;
