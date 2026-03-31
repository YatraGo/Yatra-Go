import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, LogOut, X } from 'lucide-react';

const ConfirmPopup = ({
    open,
    title,
    onCancel,
    onConfirm,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
}) => (
    <AnimatePresence>
        {open && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[450] flex items-center justify-center bg-brand-dark/65 p-4 backdrop-blur-md"
                onClick={(event) => event.target === event.currentTarget && onCancel()}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className="w-full max-w-md overflow-hidden rounded-[34px] border border-[#f0ddaa] bg-[linear-gradient(135deg,#fffaf1_0%,#ffffff_52%,#fffdf8_100%)] shadow-[0_35px_90px_-32px_rgba(122,94,34,0.22)]"
                >
                    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#fff8ea_0%,#fffef9_58%,#ffffff_100%)] px-7 pb-6 pt-7 text-slate-900">
                        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-gold/20 blur-2xl" />
                        <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#fff2cc] blur-2xl" />
                        <button
                            type="button"
                            onClick={onCancel}
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fff8ea] hover:text-slate-800 hover:shadow-md"
                        >
                            <X size={16} />
                        </button>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-[#f0ddaa] bg-white text-brand-gold shadow-[0_16px_32px_-20px_rgba(229,186,74,0.45)]">
                                <LogOut size={32} />
                            </div>
                            <h3 className="mt-5 text-3xl font-serif font-black leading-tight text-slate-950">{title}</h3>
                        </div>
                    </div>

                    <div className="relative z-10 px-7 py-7">
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 rounded-2xl border border-[#ead9ac] bg-white py-3.5 font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fffaf1] hover:shadow-sm"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e7be61_0%,#dca63a_100%)] py-3.5 font-black text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.02] hover:shadow-[0_16px_30px_-18px_rgba(229,186,74,0.9)]"
                            >
                                <LogOut size={16} />
                                {confirmLabel}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default ConfirmPopup;
