import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, align = 'center', light = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}
        >
            {subtitle && (
                <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-3 block">
                    {subtitle}
                </span>
            )}
            <h2 className={`text-3xl md:text-5xl font-serif font-bold ${light ? 'text-white' : 'text-brand-blue'}`}>
                {title}
            </h2>
            <div className={`h-1 w-20 bg-brand-gold mt-6 rounded-full ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`} />
        </motion.div>
    );
};

export default SectionHeader;
