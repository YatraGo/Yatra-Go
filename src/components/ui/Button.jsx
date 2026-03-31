import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    icon: Icon,
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95";

    const variants = {
        primary: "bg-brand-gold text-brand-dark hover:bg-yellow-400",
        secondary: "bg-brand-blue text-white hover:bg-blue-900",
        outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark",
        ghost: "text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue",
        white: "bg-white text-brand-dark hover:bg-gray-50",
        glass: "glass-dark hover:bg-white/20"
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {Icon && <Icon className="mr-2" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
            {children}
        </motion.button>
    );
};

export default Button;
