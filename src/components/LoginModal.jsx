import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getDefaultRoleForEmail } from '../lib/userProfile';
import { notifyAdminOfRegistration } from '../lib/adminNotifications';

const LoginModal = ({ onClose }) => {
    const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot-password'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isFirebaseConfigured || !auth || !db) {
            setError('Firebase login is not configured yet. Add your VITE_FIREBASE_* values in a .env file.');
            return;
        }

        setLoading(true);
        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
                const nextPath = getDefaultRoleForEmail(email) === 'admin' ? '/admin/dashboard' : '/dashboard';
                onClose();
                window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                    title: 'Login Successful',
                    message: 'Your travel lounge is live now.',
                }));
                navigate(nextPath);
            } else {
                const role = getDefaultRoleForEmail(email);
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
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
                onClose();
                window.sessionStorage.setItem('yatrago-auth-popup', JSON.stringify({
                    title: 'Registration Successful',
                    message: 'Your Yatra Go profile is ready to explore.',
                }));
                navigate(nextPath);
            }
        } catch (err) {
            const messages = {
                'auth/user-not-found': 'No account found with this email.',
                'auth/wrong-password': 'Incorrect password. Please try again.',
                'auth/email-already-in-use': 'This email is already registered. Please login instead.',
                'auth/weak-password': 'Password must be at least 6 characters.',
                'auth/invalid-email': 'Please enter a valid email address.',
                'auth/invalid-credential': 'Invalid email or password.',
            };
            setError(messages[err.code] || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setResetMessage('');

        if (!forgotEmail.trim()) {
            setError('Please enter your email address');
            return;
        }

        if (!isFirebaseConfigured || !auth) {
            setError('Password reset is not configured yet.');
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, forgotEmail);
            setResetMessage('✅ Password reset link sent! Check your email inbox (and spam folder).');
            setForgotEmail('');
            setTimeout(() => {
                setMode('login');
                setResetMessage('');
            }, 3000);
        } catch (err) {
            const messages = {
                'auth/user-not-found': 'No account found with this email address.',
                'auth/invalid-email': 'Please enter a valid email address.',
                'auth/too-many-requests': 'Too many reset requests. Please try again later.',
            };
            setError(messages[err.code] || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isFirebaseConfigured || !auth || !db) {
            setError('Google Sign-In is not configured.');
            return;
        }
        setGoogleLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const role = getDefaultRoleForEmail(user.email);

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName || '',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    role,
                    photoURL: user.photoURL || '',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            }

            const nextPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';
            onClose();
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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-gray-100/80"
                >
                    {/* Decorative top gradient bar */}
                    <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-dark to-brand-gold opacity-60"></div>

                    {/* Premium Header Section */}
                    <div className="relative bg-gradient-to-br from-brand-dark via-brand-dark to-black px-8 py-6">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-3xl"></div>

                        <button onClick={onClose}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-white/30 shadow-lg cursor-pointer">
                            <X size={18} />
                        </button>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.1 }}
                            className="relative inline-block mb-4"
                        >
                            <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-brand-gold to-yellow-500 rounded-full p-3">
                                <User size={24} className="text-brand-dark" />
                            </div>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white text-2xl font-black font-serif mb-1"
                        >
                            {mode === 'login' ? '✨ Welcome Back!' : '🚀 Join YatraGo'}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/70 text-sm leading-relaxed font-medium"
                        >
                            {mode === 'login' 
                                ? 'Access your bookings, dashboards & exclusive travel experiences.' 
                                : 'Unlock personalized travel recommendations & premium features!'}
                        </motion.p>

                        {/* Premium badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wide bg-white/5 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm border border-brand-gold/20"
                        >
                            <Sparkles size={13} />
                            Premium Travel Experience
                        </motion.div>
                    </div>

                    <div className="px-8 py-6">
                        {/* Enhanced Mode toggle */}
                        <div className="flex rounded-xl overflow-hidden bg-gray-100/50 border border-gray-200 mb-5 p-0.5">
                            <button onClick={() => { setMode('login'); setError(''); }}
                                className={`flex-1 py-3 px-3 text-sm font-bold transition-all duration-300 rounded-lg cursor-pointer ${mode === 'login' 
                                    ? 'bg-gradient-to-br from-brand-gold to-yellow-500 text-brand-dark shadow-lg' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-white'}`}>
                                🔐 Login
                            </button>
                            <button onClick={() => { setMode('register'); setError(''); }}
                                className={`flex-1 py-3 px-3 text-sm font-bold transition-all duration-300 rounded-lg cursor-pointer ${mode === 'register' 
                                    ? 'bg-gradient-to-br from-brand-gold to-yellow-500 text-brand-dark shadow-lg' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-white'}`}>
                                ✨ Register
                            </button>
                        </div>

                        {/* Main form or Forgot Password form */}
                        {mode !== 'forgot-password' && (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Name field (Register only) */}
                            {mode === 'register' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                                        <User size={13} className="text-brand-gold" />
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text" required value={name} onChange={e => setName(e.target.value)}
                                            placeholder="John Anderson"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 group-focus-within:border-brand-gold group-focus-within:ring-2 group-focus-within:ring-brand-gold/20 outline-none text-sm transition-all bg-white/60 hover:bg-white"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Email field */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: mode === 'register' ? 0.2 : 0.1 }}
                            >
                                <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                                    <Mail size={13} className="text-brand-gold" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 group-focus-within:border-brand-gold group-focus-within:ring-2 group-focus-within:ring-brand-gold/20 outline-none text-sm transition-all bg-white/60 hover:bg-white"
                                    />
                                </div>
                            </motion.div>

                            {/* Password field - Only show in login mode */}
                            {mode === 'login' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                            <Lock size={13} className="text-brand-gold" />
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMode('forgot-password');
                                                setError('');
                                                setForgotEmail(email);
                                            }}
                                            className="text-xs font-bold text-brand-gold hover:text-yellow-500 transition-colors underline-offset-2 hover:underline cursor-pointer"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 group-focus-within:border-brand-gold group-focus-within:ring-2 group-focus-within:ring-brand-gold/20 outline-none text-sm transition-all bg-white/60 hover:bg-white pr-11"
                                        />
                                        <button type="button" onClick={() => setShowPwd(!showPwd)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors">
                                            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Password field - Only show in register mode */}
                            {mode === 'register' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                                        <Lock size={13} className="text-brand-gold" />
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 group-focus-within:border-brand-gold group-focus-within:ring-2 group-focus-within:ring-brand-gold/20 outline-none text-sm transition-all bg-white/60 hover:bg-white pr-11"
                                        />
                                        <button type="button" onClick={() => setShowPwd(!showPwd)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors cursor-pointer">
                                            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Divider with text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: mode === 'register' ? 0.4 : 0.3 }}
                                className="flex items-center gap-3 my-3"
                            >
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">or continue with</span>
                                <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent" />
                            </motion.div>

                            {/* Google Sign-In Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: mode === 'register' ? 0.5 : 0.4 }}
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-white to-gray-50 hover:from-brand-gold/5 hover:to-yellow-50 border-2 border-gray-200 hover:border-brand-gold text-gray-700 font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group shadow-sm relative overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    {googleLoading ? (
                                        <Loader2 size={18} className="animate-spin text-brand-gold" />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                        </svg>
                                    )}
                                    <span className="text-sm font-semibold">{googleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                                </div>
                            </motion.button>

                            {/* Error message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3"
                                >
                                    <div className="text-red-500 mt-0.5 flex-shrink-0">❌</div>
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            {/* Submit button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: mode === 'register' ? 0.6 : 0.5 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-brand-dark font-black py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-base cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        {mode === 'login' ? '🔓' : '✨'} {mode === 'login' ? 'Login to Account' : 'Create My Account'}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                        )}

                        {/* Forgot Password Form */}
                        {mode === 'forgot-password' && (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-4"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Reset Your Password</h3>
                                <p className="text-sm text-gray-600">Enter your email and we'll send you a reset link</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                                    <Mail size={13} className="text-brand-gold" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 group-focus-within:border-brand-gold group-focus-within:ring-2 group-focus-within:ring-brand-gold/20 outline-none text-sm transition-all bg-white/60 hover:bg-white"
                                    />
                                </div>
                            </motion.div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3"
                                >
                                    <div className="text-red-500 mt-0.5 flex-shrink-0">❌</div>
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            {resetMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-start gap-3"
                                >
                                    <div className="text-green-500 mt-0.5 flex-shrink-0">✅</div>
                                    <p className="text-green-700 text-sm font-medium">{resetMessage}</p>
                                </motion.div>
                            )}

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-brand-dark font-black py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-base cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        📧 Send Reset Link
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                type="button"
                                onClick={() => {
                                    setMode('login');
                                    setError('');
                                    setResetMessage('');
                                    setForgotEmail('');
                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors text-base cursor-pointer"
                            >
                                ← Back to Login
                            </motion.button>
                        </form>
                        )}

                        {/* Terms and Privacy Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: mode === 'register' ? 0.7 : 0.6 }}
                            className="text-center text-xs text-gray-500 mt-4 space-y-1"
                        >
                            <p className="font-medium">
                                By continuing, you agree to our{' '}
                                <Link to="/terms-and-conditions" onClick={onClose} className="text-brand-gold hover:text-yellow-500 font-bold underline-offset-2 hover:underline transition-colors cursor-pointer">
                                    Terms
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy-policy" onClick={onClose} className="text-brand-gold hover:text-yellow-500 font-bold underline-offset-2 hover:underline transition-colors cursor-pointer">
                                    Privacy Policy
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;
