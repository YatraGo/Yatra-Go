import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
    children, 
    delay = 0, 
    duration = 0.8, 
    direction = 'up', 
    distance = 40, 
    overflow = false,
    className = "" 
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Premium cubic-bezier
            },
        },
    };

    return (
        <div className={`${overflow ? '' : 'overflow-hidden'} ${className}`}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={variants}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
