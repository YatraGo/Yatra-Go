import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
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
    const { currentUser, isAdmin, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const getAuthErrorMessage = (code) => {
        const messages = {
            'auth/user-not-found': 'Wrong email/password.',
            'auth/wrong-password': 'Wrong email/password.',
            'auth/invalid-credential': 'Wrong email/password.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/email-already-in-use': 'This email is already registered. Please login instead.',
            'auth/weak-password': 'Password must be at least 6 characters.',
            'auth/too-many-requests': 'Too many attempts. Please try again after some time.',
            'auth/network-request-failed': 'Network issue. Please check internet and try again.',
            'permission-denied': 'Unable to complete request right now. Please try again.',
        };
        return messages[code] || 'Unable to continue right now. Please try again.';
    };

    // Redirect if already logged in
    if (authLoading) return null;
    if (currentUser) {
        return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isFirebaseConfigured || !auth || !db) {
            setError('System authentication is currently offline. Please contact support.');
            return;
        }

        setLoading(true);

        let createdUser = null;
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
                createdUser = user;
                // Create user profile in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    name: name.trim(),
                    email,
                    phone: '',
                    role,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });

                try {
                    await notifyAdminOfRegistration({
                        userId: user.uid,
                        name: name.trim(),
                        email,
                        phone: '',
                        role,
                    });
                } catch (notificationError) {
                    console.error('Registration notification failed', notificationError);
                }

                const nextPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';
                window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                    title: 'Registration Successful',
                    message: 'Welcome aboard. Your premium travel dashboard is now ready.',
                }));
                navigate(nextPath);
            }
        } catch (err) {
            if (!isLogin && createdUser) {
                try {
                    await createdUser.delete();
                } catch {
                    try {
                        await signOut(auth);
                    } catch {
                        // Ignore cleanup error
                    }
                }
            }
            setError(getAuthErrorMessage(err.code));
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
                    <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white bg-white/70 p-6 sm:p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                        
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
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1] mb-3 sm:mb-4">
                                {isLogin ? 'Explore Your' : 'Begin Your'} <br />
                                <span className="text-brand-gold">{isLogin ? 'Travel Lounge' : 'Yatra Journey'}</span>
                            </h2>
                            <p className="text-slate-500 font-medium italic text-sm sm:text-lg px-2">
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
                                                className="pl-12 sm:pl-14 w-full px-5 sm:px-6 py-3.5 sm:py-4.5 rounded-[14px] sm:rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-base sm:text-lg shadow-sm"
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
                                        className="pl-12 sm:pl-14 w-full px-5 sm:px-6 py-3.5 sm:py-4.5 rounded-[14px] sm:rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-base sm:text-lg shadow-sm"
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
                                        className="pl-12 sm:pl-14 w-full px-5 sm:px-6 py-3.5 sm:py-4.5 rounded-[14px] sm:rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all font-bold text-slate-900 text-base sm:text-lg shadow-sm"
                                        placeholder="Secure Password"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-brand-dark text-white font-black py-4 sm:py-5 rounded-[14px] sm:rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 shadow-xl sm:shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl disabled:opacity-70 group hover:-translate-y-1 relative overflow-hidden shimmer-effect"
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {loading ? <Sparkles className="animate-spin sm:w-5 sm:h-5 w-4 h-4" /> : (isLogin ? <Lock className="sm:w-5 sm:h-5 w-4 h-4" /> : <User className="sm:w-5 sm:h-5 w-4 h-4" />)}
                                    {loading ? 'Authenticating...' : (isLogin ? 'Access Lounge' : 'Join Explorer Circle')}
                                    {!loading && <ArrowRight className="group-hover:translate-x-2 transition-transform sm:w-5 sm:h-5 w-4 h-4" />}
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 sm:gap-4 py-1 sm:py-2">
                                <div className="flex-1 h-px bg-slate-100" />
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-300">or continue with</span>
                                <div className="flex-1 h-px bg-slate-100" />
                            </div>

                            {/* Google Sign-In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 sm:gap-4 bg-white border border-slate-200 hover:border-brand-gold text-slate-800 font-black py-3.5 sm:py-4 rounded-[14px] sm:rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 group"
                            >
                                {googleLoading ? (
                                    <Sparkles className="animate-spin text-brand-gold sm:w-5 sm:h-5 w-4 h-4" />
                                ) : (
                                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5 w-5 h-5 block shrink-0">
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#4285F4"/>
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#34A853" opacity=".1"/>
                                        <path d="M11 14.3c-1.3 2.8-2 5.9-2 9.7s.7 6.9 2 9.7L4.3 39C1.6 34.5 0 29.4 0 24s1.6-10.5 4.3-15l6.7 5.3z" fill="#FBBC05"/>
                                        <path d="M24 9.5c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 2.1 29.6 0 24 0 14.6 0 6.5 5.5 2.6 13.5L11 20.2c2.1-6.1 7.9-10.7 13-10.7z" fill="#EA4335"/>
                                        <path d="M24 38.5c-5.1 0-10.9-4.6-13-10.7l-8.4 6.7C6.5 42.5 14.6 48 24 48c5.6 0 10.6-2.1 14.5-5.6l-6.4-6.4c-2.2 1.6-4.9 2.5-8.1 2.5z" fill="#34A853"/>
                                    </svg>
                                )}
                                <span className="text-sm sm:text-base">
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
                                    className="inline-flex items-center gap-2 font-serif font-black text-slate-900 text-base sm:text-lg hover:text-brand-gold transition-colors group"
                                >
                                    {isLogin ? 'Create Your Account' : 'Sign Into Your Lounge'}
                                    <span className="block h-1 w-0 bg-brand-gold group-hover:w-full transition-all duration-300 mx-auto" />
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-2 opacity-50 sm:opacity-40">
                        <div className="flex items-center gap-1.5 sm:gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <ShieldCheck className="w-[14px] h-[14px] sm:w-5 sm:h-5" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">SSL Verified</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1.5 sm:gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <Lock className="w-[14px] h-[14px] sm:w-5 sm:h-5" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">AES-256 Auth</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1.5 sm:gap-2 grayscale hover:grayscale-0 transition-all cursor-default group w-full sm:w-auto justify-center mt-2 sm:mt-0">
                            <Sparkles className="w-[14px] h-[14px] sm:w-5 sm:h-5" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">Premium Access</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Login;
