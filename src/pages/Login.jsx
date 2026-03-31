import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { getDefaultRoleForEmail } from '../lib/userProfile';
import { notifyAdminOfRegistration } from '../lib/adminNotifications';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { currentUser, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    if (currentUser) {
        navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isFirebaseConfigured || !auth || !db) {
            setError('System authentication is currently offline. Please contact support.');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                const nextPath = getDefaultRoleForEmail(email) === 'admin' ? '/admin/dashboard' : '/dashboard';
                window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                    title: 'Access Granted',
                    message: 'Welcome back to your Yatra Go travel lounge.',
                }));
                navigate(nextPath);
            } else {
                const role = getDefaultRoleForEmail(email);
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                // Create user profile in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    name,
                    email,
                    phone: '',
                    role,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });

                try {
                    await notifyAdminOfRegistration({
                        userId: user.uid,
                        name,
                        email,
                        phone: '',
                        role,
                    });
                } catch (notificationError) {
                    console.error('Registration notification failed', notificationError);
                }

                const nextPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';
                window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                    title: 'Registration Complete',
                    message: 'Your Yatra Go explorer profile is active.',
                }));
                navigate(nextPath);
            }
        } catch (err) {
            setError(err.message?.includes('auth/') ? 'Invalid credentials. Please verify your email and password.' : err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isFirebaseConfigured || !auth || !db) {
            setError('Google Sign-In is not configured. Please add Firebase credentials.');
            return;
        }
        setGoogleLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const role = getDefaultRoleForEmail(user.email);

            // Ensure Firestore profile exists
            const { doc: firestoreDoc, getDoc: firestoreGetDoc, setDoc: firestoreSetDoc, serverTimestamp: ts } = await import('firebase/firestore');
            const userRef = firestoreDoc(db, 'users', user.uid);
            const userSnap = await firestoreGetDoc(userRef);
            if (!userSnap.exists()) {
                await firestoreSetDoc(userRef, {
                    name: user.displayName || '',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    role,
                    photoURL: user.photoURL || '',
                    createdAt: ts(),
                    updatedAt: ts(),
                });
            }

            const nextPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';
            window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                title: 'Google Login Successful',
                message: `Welcome, ${user.displayName || 'Explorer'}!`,
            }));
            navigate(nextPath);
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError('Google Sign-In failed. Please try again.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(229,186,74,0.15),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.05),_transparent_40%)] pt-32 pb-20 flex items-center justify-center px-4 overflow-hidden relative">
            
            {/* Background Aesthetic Elements */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-blue/5 blur-[120px] rounded-full" />
            
            <ScrollReveal direction="up">
                <div className="max-w-xl w-full">
                    <div className="relative overflow-hidden rounded-[3rem] border border-white bg-white/70 p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                        
                        {/* Shimmer line atop card */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
                        
                        <div className="text-center mb-10">
                            <motion.div 
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-dark text-brand-gold shadow-2xl shadow-brand-dark/20 mb-8 mx-auto rotate-3"
                            >
                                <Compass size={32} />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1] mb-4">
                                {isLogin ? 'Explore Your' : 'Begin Your'} <br />
                                <span className="text-brand-gold">{isLogin ? 'Travel Lounge' : 'Yatra Journey'}</span>
                            </h2>
                            <p className="text-slate-500 font-medium italic text-lg">
                                {isLogin ? 'Welcome back to base camp, explorer.' : 'Join our elite circle of world travelers today.'}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-rose-600 text-sm font-bold p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3"
                                    >
                                        <ShieldCheck size={18} className="shrink-0" /> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {!isLogin && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="relative group"
                                        >
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                <User className="text-slate-300 group-focus-within:text-brand-gold transition-colors" size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="pl-14 w-full px-6 py-4.5 rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-lg shadow-sm"
                                                placeholder="Full Legal Name"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="text-slate-300 group-focus-within:text-brand-gold transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-14 w-full px-6 py-4.5 rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-lg shadow-sm"
                                        placeholder="Email Address"
                                    />
                                </div>
                                
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className="text-slate-300 group-focus-within:text-brand-gold transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-14 w-full px-6 py-4.5 rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-lg shadow-sm"
                                        placeholder="Secure Password"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-3 text-xl disabled:opacity-70 group hover:-translate-y-1 relative overflow-hidden shimmer-effect"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {loading ? <Sparkles className="animate-spin" size={20} /> : (isLogin ? <Lock size={20} /> : <User size={20} />)}
                                    {loading ? 'Authenticating...' : (isLogin ? 'Access Lounge' : 'Join Explorer Circle')}
                                    {!loading && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-slate-100" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">or continue with</span>
                                <div className="flex-1 h-px bg-slate-100" />
                            </div>

                            {/* Google Sign-In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-100 hover:border-brand-gold text-slate-800 font-black py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 group"
                            >
                                {googleLoading ? (
                                    <Sparkles size={20} className="animate-spin text-brand-gold" />
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                )}
                                <span className="text-base">
                                    {googleLoading ? 'Signing in...' : 'Continue with Google'}
                                </span>
                            </button>

                            <div className="text-center pt-8 border-t border-slate-100/50">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                                    {isLogin ? "Need an Invitation?" : "Already Authorized?"}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    className="inline-flex items-center gap-2 font-serif font-black text-slate-900 text-lg hover:text-brand-gold transition-colors group"
                                >
                                    {isLogin ? 'Create Your Account' : 'Sign Into Your Lounge'}
                                    <span className="block h-1 w-0 bg-brand-gold group-hover:w-full transition-all duration-300 mx-auto" />
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="mt-12 flex items-center justify-center gap-8 px-4 opacity-40">
                        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <ShieldCheck size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">SSL Verified</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <Lock size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">AES-256 Auth</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <Sparkles size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Access</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Login;
