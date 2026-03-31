import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

const SuccessPopup = ({
    open,
    title,
    message,
    onClose,
    eyebrow = 'Yatra Go Team',
    subtitle = 'Your query has reached us successfully.',
    helperText = 'Team Yatra Go will review your request and get back to you shortly on your provided contact details.',
    buttonLabel = 'Close',
    variant = 'default',
    showButton = true,
    showClose = true,
    autoHideMs = 0,
}) => {
    useEffect(() => {
        if (!open || !autoHideMs) return undefined;

        const timer = window.setTimeout(() => {
            onClose();
        }, autoHideMs);

        return () => window.clearTimeout(timer);
    }, [autoHideMs, onClose, open]);

    return (
    <AnimatePresence>
        {open && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-[400] flex p-4 ${
                    variant === 'toast'
                        ? 'items-start justify-center pointer-events-none'
                        : variant === 'auth-card'
                            ? 'items-center justify-center pointer-events-none'
                        : 'items-center justify-center bg-brand-dark/60 backdrop-blur-md'
                }`}
                onClick={(event) => event.target === event.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ opacity: 0, y: variant === 'toast' ? -28 : variant === 'auth-card' ? 12 : 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: variant === 'toast' ? -18 : variant === 'auth-card' ? 10 : 24, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className={`w-full overflow-hidden border shadow-[0_30px_80px_-30px_rgba(7,13,31,0.45)] ${
                        variant === 'toast'
                            ? 'pointer-events-auto mt-6 max-w-xl rounded-[34px] border-emerald-200/80 bg-[linear-gradient(135deg,#0f3a2d_0%,#10573f_35%,#f1fff7_36%,#ffffff_100%)]'
                            : variant === 'auth-card'
                                ? 'pointer-events-none max-w-md overflow-visible rounded-[22px] border-slate-200 bg-white shadow-[0_20px_60px_-28px_rgba(15,23,42,0.24)]'
                            : 'max-w-md rounded-[28px] border-white/60 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_45%,#eef7ff_100%)]'
                    }`}
                >
                    <div className={`relative ${variant === 'toast' ? 'px-6 py-5 text-white' : variant === 'auth-card' ? 'px-10 pb-8 pt-16 text-slate-900' : 'bg-brand-dark px-7 pt-7 pb-5 text-white'}`}>
                        {showClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <div className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] ${
                            variant === 'toast'
                                ? 'rounded-full bg-emerald-400/15 px-4 py-2 text-emerald-100'
                                : variant === 'auth-card'
                                    ? 'mb-3 rounded-full bg-slate-50 px-3 py-1.5 text-slate-500'
                                : 'rounded-full bg-brand-gold/15 px-4 py-2 text-brand-gold'
                        }`}>
                            <Sparkles size={14} />
                            {eyebrow}
                        </div>
                        <div className={`flex items-center gap-4 ${variant === 'toast' ? 'mt-4' : variant === 'auth-card' ? 'justify-center' : 'mt-5'}`}>
                            <div className={`flex items-center justify-center ${
                                variant === 'toast'
                                    ? 'h-14 w-14 rounded-2xl bg-emerald-400/20 text-emerald-100'
                                    : variant === 'auth-card'
                                        ? 'absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4caf50] text-white shadow-[0_22px_45px_-18px_rgba(76,175,80,0.65)]'
                                    : 'w-16 h-16 rounded-2xl bg-emerald-400/15 text-emerald-300'
                            }`}>
                                <CheckCircle2 size={variant === 'toast' ? 30 : variant === 'auth-card' ? 36 : 34} />
                            </div>
                            <div className={variant === 'auth-card' ? 'text-center' : ''}>
                                <h3 className={`${variant === 'toast' ? 'text-3xl' : variant === 'auth-card' ? 'text-3xl font-sans' : 'text-2xl'} font-serif font-black`}>
                                    {title}
                                </h3>
                                <p className={`mt-2 ${variant === 'toast' ? 'text-sm text-emerald-50/80' : variant === 'auth-card' ? 'text-sm text-slate-500' : 'text-sm text-white/70'}`}>
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${variant === 'toast' ? 'px-6 pb-5 pt-0' : variant === 'auth-card' ? 'px-10 pb-10 pt-0 text-center' : 'px-7 py-7'}`}>
                        <p className={`${variant === 'toast' ? 'text-slate-700 leading-relaxed' : variant === 'auth-card' ? 'text-base leading-relaxed text-slate-600' : 'text-slate-600 leading-relaxed'}`}>{message}</p>
                        {helperText && (
                            <div className={`mt-6 p-4 text-sm ${
                                variant === 'toast'
                                    ? 'rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-900'
                                    : variant === 'auth-card'
                                        ? 'hidden'
                                    : 'rounded-2xl bg-amber-50 border border-amber-100 text-amber-900'
                            }`}>
                                {helperText}
                            </div>
                        )}
                        {showButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className={`mt-6 w-full font-black py-3.5 transition-colors ${
                                    variant === 'toast'
                                        ? 'rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600'
                                        : 'rounded-2xl bg-brand-gold text-brand-dark hover:bg-yellow-400'
                                }`}
                            >
                                {buttonLabel}
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    );
};

export default SuccessPopup;
