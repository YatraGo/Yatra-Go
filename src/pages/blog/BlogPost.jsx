import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SEO from '../../components/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.id === parseInt(id) || p.slug === id);

    useEffect(() => {
        if (!id) return;
        if (!post) {
            navigate('/blog', { replace: true });
        }
    }, [id, post, navigate]);

    if (!post) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.excerpt,
        'image': `https://www.yatrago.com/${post.imageUrl}`,
        'datePublished': post.date,
        'author': {
            '@type': 'Person',
            'name': post.author.name
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Yatra Go',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://www.yatrago.com/logo.png'
            }
        }
    };

    return (
        <div className="min-h-screen bg-brand-light">
            <SEO 
                title={`${post.title} | Yatra Go Travel Blog`}
                description={post.excerpt}
                ogImage={`https://www.yatrago.com/${post.imageUrl}`}
                ogType="article"
                schemaData={schema}
            />

            {/* Premium Hero Section */}
            <article>
                <header className="relative h-[70vh] min-h-[500px] w-full flex items-end pb-20 justify-center">
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
                    
                    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors mb-8 group text-sm font-bold uppercase tracking-widest">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                            </Link>

                            <div className="mb-6 flex items-center justify-center gap-4">
                                <span className="bg-brand-gold text-brand-dark text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-8 leading-tight drop-shadow-lg">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-medium">
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-brand-gold" /> {post.date}</span>
                                <span className="flex items-center gap-2"><Clock size={16} className="text-brand-blue" /> {post.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24">
                    <ScrollReveal direction="up">
                        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-14 lg:p-16 border border-gray-100">
                            
                            {/* Author Bio Banner */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 pb-10 border-b border-gray-100 mb-10">
                                <img src={post.author.avatar} alt={post.author.name} className="w-20 h-20 rounded-full border-4 border-gray-50 shadow-md object-cover" />
                                <div className="text-center sm:text-left">
                                    <h4 className="text-xl font-bold text-brand-dark">{post.author.name}</h4>
                                    <p className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-2">{post.author.role}</p>
                                    <p className="text-gray-500 text-sm max-w-md">An expert travel consultant detailing the raw, profound beauty of the Himalayas and guiding travelers through untamed trails.</p>
                                </div>
                            </div>

                            {/* Markdown-style Content Renderer */}
                            <div 
                                className="prose prose-lg prose-headings:font-serif prose-headings:font-black prose-headings:text-brand-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-brand-blue prose-blockquote:border-l-brand-gold prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic max-w-none prose-img:rounded-3xl prose-img:shadow-xl"
                                dangerouslySetInnerHTML={{ __html: post.content }} 
                            />

                            {/* Footer Share Banner */}
                            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3 text-brand-dark font-bold">
                                    <Share2 size={20} className="text-brand-gold" /> Share this Guide
                                </div>
                                <div className="flex gap-4">
                                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#1877f2] transition-colors"><Facebook size={18} /></button>
                                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#1da1f2] transition-colors"><Twitter size={18} /></button>
                                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#0077b5] transition-colors"><Linkedin size={18} /></button>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
