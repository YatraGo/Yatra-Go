import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    CalendarDays,
    CheckCircle2,
    Clock,
    Compass,
    History,
    LogOut,
    Mail,
    MapPin,
    PencilLine,
    ImageUp,
    Phone,
    PlusCircle,
    RefreshCw,
    Search,
    ShieldCheck,
    Sparkles,
    Ticket,
    UserCircle2,
    Users,
    Utensils,
    Wallet,
    XCircle,
    ArrowUpRight,
    Navigation,
    Palmtree,
    Star,
    Zap,
    MoveRight,
    Heart,
    Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase/config';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ConfirmPopup, SuccessPopup } from '../components/ui';
import ScrollReveal from '../components/ui/ScrollReveal';

const extractCloudinaryPublicId = (url, cloudName) => {
    if (!url || !cloudName) return '';
    try {
        const marker = `/image/upload/`;
        const markerIndex = url.indexOf(marker);
        if (markerIndex === -1) return '';

        const afterUpload = url.slice(markerIndex + marker.length);
        const parts = afterUpload.split('/').filter(Boolean);
        const versionIndex = parts.findIndex((part) => /^v\d+$/.test(part));
        const publicPath = versionIndex >= 0 ? parts.slice(versionIndex + 1) : parts;
        if (publicPath.length === 0) return '';

        const fileName = publicPath[publicPath.length - 1];
        publicPath[publicPath.length - 1] = fileName.replace(/\.[^/.]+$/, '');
        return publicPath.join('/');
    } catch {
        return '';
    }
};

const buildEmailAvatarUrl = (nameOrEmail) => {
    if (!nameOrEmail) return '';
    const label = encodeURIComponent(nameOrEmail);
    return `https://ui-avatars.com/api/?name=${label}&background=0D3B66&color=fff&size=256&bold=true`;
};

const Dashboard = () => {
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [bookings, setBookings] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
    const [authPopup, setAuthPopup] = useState(null);

    // Profile form state
    const [profileForm, setProfileForm] = useState({
        name: userProfile?.name || '',
        phone: userProfile?.phone || ''
    });
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileFeedback, setProfileFeedback] = useState('');
    const [photoUploading, setPhotoUploading] = useState(false);
    const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
    const [cropScale, setCropScale] = useState(1);
    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);
    const [showCropModal, setShowCropModal] = useState(false);
    const imageRef = useRef(null);
    const photoInputRef = useRef(null);

    // Booking form state
    const [bookingForm, setBookingForm] = useState({
        destination: '',
        travelDate: '',
        travelers: '1',
        notes: ''
    });
    const [bookingSaving, setBookingSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setProfileForm({
                name: userProfile.name || '',
                phone: userProfile.phone || ''
            });
        }
    }, [userProfile]);

    useEffect(() => {
        if (!currentUser || !db) {
            setLoading(false);
            return undefined;
        }

        const q = query(collection(db, 'bookings'), where('customerEmail', '==', currentUser.email));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const nextBookings = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setBookings(nextBookings);
            setLoading(false);
        }, (error) => {
            console.error('Bookings load failed', error);
            setLoading(false);
        });

        return () => {
            setTimeout(() => {
                if (unsubscribe) unsubscribe();
            }, 0);
        };
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser || !db) return undefined;

        // Fetch user's wishlist from their profile
        const unsubUser = onSnapshot(doc(db, 'users', currentUser.uid), (snapshot) => {
            if (snapshot.exists()) {
                setWishlist(snapshot.data().wishlist || []);
            }
        });

        // Fetch all packages to resolve wishlist items
        const unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
            const nextPkgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllPackages(nextPkgs);
        });

        return () => {
            setTimeout(() => {
                if (unsubUser) unsubUser();
                if (unsubPackages) unsubPackages();
            }, 0);
        };
    }, [currentUser]);

    useEffect(() => {
        const popupPayload = window.sessionStorage.getItem('yatrago-auth-popup');
        if (popupPayload) {
            setAuthPopup(JSON.parse(popupPayload));
            window.sessionStorage.removeItem('yatrago-auth-popup');
            setTimeout(() => setAuthPopup(null), 2500);
        }
    }, []);

    const stats = useMemo(() => ({
        total: bookings.length,
        upcoming: bookings.filter(b => b.status === 'confirmed').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        completed: bookings.filter(b => b.status === 'completed').length,
        saved: wishlist.length,
        profileCompleteness: (() => {
            let score = 20; // Basic auth
            if (userProfile?.name) score += 40;
            if (userProfile?.phone) score += 40;
            return score;
        })()
    }), [bookings, wishlist, userProfile]);

    const travelerFullName = userProfile?.name?.trim() || currentUser?.displayName?.trim() || currentUser?.email?.split('@')[0] || 'Explorer';
    const resolvedDisplayName = profileForm?.name?.trim() || travelerFullName;
    const firstName = resolvedDisplayName.split(' ')[0] || 'Traveler';
    const profilePhotoUrl = userProfile?.photoURL || currentUser?.photoURL || buildEmailAvatarUrl(resolvedDisplayName || currentUser?.email);

    const handleLogout = async () => {
        await signOut(auth);
        setLogoutPopupOpen(false);
        navigate('/');
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        if (!currentUser || !db) return;

        setProfileSaving(true);
        setProfileFeedback('');

        try {
            await setDoc(doc(db, 'users', currentUser.uid), {
                name: profileForm.name.trim(),
                phone: profileForm.phone.trim(),
                updatedAt: serverTimestamp()
            }, { merge: true });
            setProfileFeedback('Profile successfully updated.');
        } catch (error) {
            setProfileFeedback('Failed to update profile. Please try again.');
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePhotoUpload = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file || !currentUser || !db) return;

        const previewUrl = URL.createObjectURL(file);
        setSelectedPhotoFile(file);
        setPhotoPreviewUrl(previewUrl);
        setCropScale(1);
        setCropX(0);
        setCropY(0);
        setShowCropModal(true);
    };

    const openPhotoPicker = () => {
        setActiveTab('settings');
        photoInputRef.current?.click();
    };

    const handleCloseCropModal = () => {
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
        }
        setSelectedPhotoFile(null);
        setPhotoPreviewUrl('');
        setShowCropModal(false);
    };

    const getCroppedBlob = async () => {
        const img = imageRef.current;
        if (!img) throw new Error('Image not ready');

        const canvas = document.createElement('canvas');
        const size = 512;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas not supported');

        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const minSide = Math.min(naturalWidth, naturalHeight);
        const cropSide = minSide / cropScale;
        const maxX = Math.max(0, naturalWidth - cropSide);
        const maxY = Math.max(0, naturalHeight - cropSide);

        const sx = Math.min(maxX, Math.max(0, ((naturalWidth - cropSide) / 2) + cropX));
        const sy = Math.min(maxY, Math.max(0, ((naturalHeight - cropSide) / 2) + cropY));

        ctx.drawImage(img, sx, sy, cropSide, cropSide, 0, 0, size, size);

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Failed to create cropped image'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg', 0.9);
        });
    };

    const handleCropAndUpload = async () => {
        if (!selectedPhotoFile || !currentUser || !db) return;

        setPhotoUploading(true);
        setProfileFeedback('');

        try {
            const croppedBlob = await getCroppedBlob();
            // Close crop UI immediately after confirmation so options disappear.
            handleCloseCropModal();
            const signRes = await fetch('http://localhost:3001/api/cloudinary/sign-upload');
            if (!signRes.ok) throw new Error('Failed to get upload signature');
            const signData = await signRes.json();

            const uploadForm = new FormData();
            uploadForm.append('file', croppedBlob, `profile-${Date.now()}.jpg`);
            uploadForm.append('api_key', signData.apiKey);
            uploadForm.append('timestamp', String(signData.timestamp));
            uploadForm.append('signature', signData.signature);
            uploadForm.append('folder', signData.folder);
            uploadForm.append('upload_preset', signData.uploadPreset);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
                { method: 'POST', body: uploadForm }
            );
            if (!uploadRes.ok) throw new Error('Cloudinary upload failed');
            const uploadData = await uploadRes.json();

            const previousPublicId =
                userProfile?.photoPublicId ||
                extractCloudinaryPublicId(userProfile?.photoURL, signData.cloudName);

            await setDoc(doc(db, 'users', currentUser.uid), {
                photoURL: uploadData.secure_url || '',
                photoPublicId: uploadData.public_id || '',
                updatedAt: serverTimestamp(),
            }, { merge: true });

            if (previousPublicId && previousPublicId !== uploadData.public_id) {
                await fetch('http://localhost:3001/api/cloudinary/delete-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ publicId: previousPublicId }),
                });
            }

            setProfileFeedback('Profile photo updated successfully.');
        } catch (error) {
            console.error('Profile photo update failed', error);
            setProfileFeedback('Failed to update profile photo. Please try again.');
        } finally {
            setPhotoUploading(false);
        }
    };

    const handleBookingRequest = async (e) => {
        e.preventDefault();
        if (!currentUser || !db) return;

        setBookingSaving(true);
        try {
            await addDoc(collection(db, 'bookings'), {
                ...bookingForm,
                customerName: userProfile?.name || currentUser.displayName || 'Traveler',
                customerEmail: currentUser.email,
                customerPhone: userProfile?.phone || '',
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setBookingForm({ destination: '', travelDate: '', travelers: '1', notes: '' });
            setShowSuccess(true);
            setActiveTab('bookings');
        } catch (error) {
            alert('Booking request failed. Please try again.');
        } finally {
            setBookingSaving(false);
        }
    };

    if (!currentUser) return <Navigate to="/login" replace />;

    const navItems = [
        { id: 'home', label: 'Home Page', icon: Home, type: 'link' },
        { id: 'overview', label: 'Lounge Overview', icon: Compass },
        { id: 'registry', label: 'Trip Registry', icon: Ticket },
        { id: 'settings', label: 'Settings', icon: UserCircle2 },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'request', label: 'Plan New Trip', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-transparent text-slate-900 font-sans selection:bg-brand-gold/30 selection:text-brand-dark relative">
            <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={photoUploading}
                onChange={handlePhotoUpload}
            />
            {showCropModal && (
                <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8">
                        <h3 className="text-xl font-black text-brand-dark">Crop Profile Photo</h3>
                        <p className="mt-1 text-sm text-slate-500 font-medium">Crop is mandatory before upload.</p>

                        <div className="mt-5 rounded-2xl bg-slate-100 p-3">
                            <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-slate-200">
                                <img
                                    ref={imageRef}
                                    src={photoPreviewUrl}
                                    alt="Crop preview"
                                    className="w-full h-full object-cover"
                                    style={{ transform: `scale(${cropScale}) translate(${cropX / 6}px, ${cropY / 6}px)` }}
                                />
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Zoom</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="2.5"
                                    step="0.01"
                                    value={cropScale}
                                    onChange={(e) => setCropScale(Number(e.target.value))}
                                    className="w-full mt-2"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Horizontal</label>
                                <input
                                    type="range"
                                    min="-400"
                                    max="400"
                                    step="1"
                                    value={cropX}
                                    onChange={(e) => setCropX(Number(e.target.value))}
                                    className="w-full mt-2"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Vertical</label>
                                <input
                                    type="range"
                                    min="-400"
                                    max="400"
                                    step="1"
                                    value={cropY}
                                    onChange={(e) => setCropY(Number(e.target.value))}
                                    className="w-full mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={handleCloseCropModal}
                                className="rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-500 bg-slate-100 hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCropAndUpload}
                                disabled={photoUploading}
                                className="rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider text-white bg-brand-dark hover:bg-brand-gold hover:text-brand-dark disabled:opacity-60"
                            >
                                {photoUploading ? 'Uploading...' : 'Crop & Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* 🌟 PREMIUM NAV DESK (STICKY GLASS) */}
                <aside className="hidden lg:block lg:sticky lg:top-[128px] lg:z-20 lg:w-80 h-[calc(100vh-150px)] shrink-0 rounded-[3rem] border border-white/50 bg-white/10 backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden ring-1 ring-black/[0.03]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-emerald opacity-50" />
                <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50" />
                
                <div className="relative flex h-full flex-col">
                <div className="flex h-24 items-center justify-center border-b border-black/[0.03] px-8">
                        <Link to="/" className="flex items-center gap-4 group/logo">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark shadow-xl shadow-brand-dark/10 transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:rotate-3">
                                <Sparkles size={24} className="text-brand-gold" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold leading-none">Yatra Go</span>
                                <span className="mt-1.5 text-xl font-serif font-black text-brand-dark tracking-tight">Traveler Lounge</span>
                            </div>
                        </Link>
                    </div>

                    <div className="px-6 pt-10">
                        <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-dark to-slate-800 p-6 text-white shadow-2xl shadow-brand-dark/20 relative overflow-hidden group/profile">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/profile:bg-brand-gold/10 transition-colors duration-700" />
                            <div className="flex items-center gap-4 relative z-10">
                                <button
                                    type="button"
                                    onClick={openPhotoPicker}
                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/20 text-xl font-black text-brand-gold shadow-lg overflow-hidden cursor-pointer"
                                    title="Change profile photo"
                                >
                                    {profilePhotoUrl ? (
                                        <img
                                            src={profilePhotoUrl}
                                            alt={resolvedDisplayName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        userProfile?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'E'
                                    )}
                                </button>
                                <div className="min-w-0">
                                    <div className="truncate text-lg font-black tracking-tight">{resolvedDisplayName}</div>
                                    <div className="mt-1 truncate text-xs text-slate-400 font-bold">{currentUser.email}</div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3 text-[10px] backdrop-blur relative z-10 border border-white/5">
                                <span className="font-black uppercase tracking-widest text-slate-400">Journey Status</span>
                                <span className="inline-flex items-center gap-1.5 font-black uppercase tracking-[0.2em] text-brand-gold">
                                    Level 1 Explorer
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1.5 overflow-y-auto px-5 py-10">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => item.type === 'link' ? navigate('/') : setActiveTab(item.id)}
                                className={`group flex w-full items-center gap-4 rounded-[1.25rem] px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                                    activeTab === item.id
                                        ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/10 translate-x-1'
                                        : 'text-slate-400 hover:bg-slate-50 hover:text-brand-dark'
                                }`}
                            >
                                <item.icon size={18} className={activeTab === item.id ? 'text-brand-gold' : 'group-hover:text-brand-gold transition-colors'} />
                                <span className="flex-1 text-left">{item.label}</span>
                                {activeTab === item.id && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(255,138,23,0.8)]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6">
                        <button
                            onClick={() => setLogoutPopupOpen(true)}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:bg-brand-dark hover:text-white hover:border-brand-dark active:scale-95"
                        >
                            <LogOut size={16} />
                            Exit Lounge
                        </button>
                    </div>
                </div>
            </aside>

                {/* 🌟 MAIN CONTENT AREA */}
                <div className="flex-1 min-h-screen pt-4 lg:pt-8 lg:pr-12 pb-24 h-full w-full max-w-full overflow-x-hidden">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
                    
                    {/* Header Reveal */}
                    <ScrollReveal direction="down">
                        <header className="overflow-hidden rounded-3xl lg:rounded-[3rem] border border-white/60 bg-white/20 shadow-[0_30px_100px_rgba(8,38,61,0.04)] backdrop-blur-2xl ring-1 ring-black/[0.02]">
                            <div className="grid gap-8 lg:gap-10 px-6 py-8 lg:px-12 lg:py-10 lg:grid-cols-[1.2fr_0.8fr]">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark">
                                        <Compass size={14} className="text-brand-gold" /> Personalized Concierge
                                    </div>
                                    <h1 className="mt-6 text-4xl lg:text-5xl font-serif font-black text-slate-900 leading-[1.15]">
                                        Welcome, <span className="text-brand-gold italic underline decoration-slate-200 underline-offset-8">{firstName}</span>
                                    </h1>
                                    <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-500 italic">
                                        Your private dashboard for tracking expeditions, managing your passport profile, and curating your next great story.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-3xl bg-brand-dark p-6 text-white shadow-xl shadow-brand-dark/15 border border-white/5 relative group h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Zap size={32} />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Trips Booked</div>
                                        <div className="mt-4 text-3xl font-black font-serif">{stats.total}</div>
                                        <div className="mt-2 text-[10px] font-bold text-slate-400">Total Expeditions</div>
                                    </div>
                                    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-50 group h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Heart size={32} className="text-rose-400" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Wishlist</div>
                                        <div className="mt-4 text-3xl font-black font-serif text-slate-900">{stats.saved}</div>
                                        <div className="mt-2 text-[10px] font-bold text-slate-400">Items saved for later</div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </ScrollReveal>

                    {/* Mobile Navigation */}
                    <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-3 lg:hidden">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => item.type === 'link' ? navigate('/') : setActiveTab(item.id)}
                                className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-3 text-[9px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === item.id
                                        ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20'
                                        : 'bg-white text-slate-400 shadow-sm border border-slate-100 hover:bg-slate-50'
                                }`}
                            >
                                <item.icon size={18} className={activeTab === item.id ? 'text-brand-gold' : item.id === 'home' ? 'text-brand-blue' : ''} />
                                <span className="text-center leading-tight">{item.label.split(' ')[1] || item.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={() => setLogoutPopupOpen(true)}
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl p-3 text-[9px] font-black uppercase tracking-widest transition-all bg-white text-rose-500 shadow-sm border border-rose-100 hover:bg-rose-50"
                        >
                            <LogOut size={18} />
                            <span className="text-center leading-tight">Exit</span>
                        </button>
                    </div>

                    <div className="mt-8 lg:mt-12">
                        <AnimatePresence mode="wait">
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                                        <div className="space-y-10">
                                            <div className="rounded-3xl lg:rounded-[3rem] border border-white/60 bg-white/20 p-6 lg:p-8 shadow-3xl shadow-slate-200/10 backdrop-blur-2xl relative overflow-hidden accent-pattern-blue ring-1 ring-black/[0.02]">
                                                <div className="flex items-center justify-between mb-10">
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">Travel Pulse</div>
                                                        <h2 className="mt-3 text-3xl font-serif font-black text-slate-950">Active Expeditions</h2>
                                                    </div>
                                                    <button onClick={() => setActiveTab('bookings')} className="text-[10px] font-black uppercase tracking-widest text-brand-blue hover:text-brand-dark transition-colors flex items-center gap-2">History <ArrowUpRight size={14} /></button>
                                                </div>

                                                <div className="space-y-4">
                                                    {loading ? (
                                                        <div className="flex items-center justify-center py-20">
                                                            <RefreshCw className="animate-spin text-brand-gold" size={32} />
                                                        </div>
                                                    ) : bookings.slice(0, 3).length > 0 ? (
                                                        bookings.slice(0, 3).map((booking, i) => (
                                                            <div key={booking.id} className="admin-glass group flex flex-col gap-5 sm:gap-6 rounded-3xl lg:rounded-[2.5rem] border-slate-50 bg-white/50 p-4 sm:p-5 lg:p-6 sm:flex-row sm:items-center sm:justify-between transition-all hover:bg-white hover:shadow-xl w-full min-w-0">
                                                                <div className="flex items-center gap-4 sm:gap-5 w-full min-w-0 flex-1">
                                                                    <div className={`shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform ${booking.status === 'confirmed' ? 'bg-emerald-500' : 'bg-brand-dark'}`}>
                                                                        <MapPin size={24} />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <div className="truncate text-lg sm:text-xl font-serif font-black text-slate-900 mb-1">{booking.packageTitle || 'Tailored Journey'}</div>
                                                                        <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-slate-400 italic truncate">
                                                                            <CalendarDays size={14} className="text-brand-gold shrink-0" /> <span className="truncate">{booking.travelDate || 'Consultation Phase'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100/50">
                                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                                                                        booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                                        booking.status === 'pending' ? 'bg-brand-gold/5 text-brand-gold border-brand-gold/20' : 
                                                                        'bg-slate-50 text-slate-400 border-slate-100'
                                                                    }`}>
                                                                        {booking.status || 'pending'}
                                                                    </span>
                                                                    <button onClick={() => navigate(`/checkout/${booking.id}`)} className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-brand-dark hover:text-white transition-all shrink-0">
                                                                        <ArrowUpRight size={20} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="rounded-[2.5rem] border-2 border-dashed border-slate-100 bg-slate-50/50 py-20 text-center text-slate-400 font-bold italic">
                                                            Your journey catalog is currently waiting for it's first entry.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="rounded-3xl lg:rounded-[3rem] bg-brand-dark p-8 lg:p-12 text-white shadow-[0_50px_100px_rgba(8,38,61,0.2)] relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,138,23,0.15),_transparent_50%)]" />
                                                <div className="relative">
                                                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                                        <div className="max-w-md text-center md:text-left">
                                                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-4">Limited Access</div>
                                                            <h2 className="text-4xl font-serif font-black leading-tight text-slate-100">Map Your Next Discovery</h2>
                                                            <p className="mt-4 text-slate-400 font-medium italic leading-relaxed">Let our curators design a bespoke itinerary tailored to your specific travel vision.</p>
                                                            <button onClick={() => setActiveTab('request')} className="mt-8 inline-flex items-center gap-3 bg-white text-brand-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-gold transition-all duration-300 group/btn">
                                                                Start Consulting <MoveRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                                            </button>
                                                        </div>
                                                        <div className="relative hidden md:block">
                                                            <div className="w-56 h-56 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform duration-1000">
                                                                <Palmtree size={80} className="text-brand-gold opacity-30" />
                                                            </div>
                                                            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-dark shadow-2xl animate-bounce">
                                                                <Star size={32} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-10">
                                            <div className="rounded-3xl lg:rounded-[3rem] border border-slate-100 bg-white p-6 lg:p-10 shadow-3xl shadow-slate-200/20 relative group overflow-hidden">
                                                <div className="absolute -bottom-10 -right-10 text-slate-50 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                                    <History size={180} />
                                                </div>
                                                <div className="relative">
                                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Quick Stats</div>
                                                    <h2 className="mt-4 text-3xl font-serif font-black text-slate-950">Lounge Health</h2>
                                                    
                                                    <div className="mt-8 mb-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Completeness</span>
                                                            <span className="text-xs font-black text-brand-gold">{stats.profileCompleteness}%</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${stats.profileCompleteness}%` }}
                                                                className="h-full bg-gradient-to-r from-brand-gold to-brand-sunset"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 space-y-6">
                                                        {[
                                                            { label: 'Confirmed Expeditions', value: stats.upcoming, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                                            { label: 'Pending Requests', value: stats.pending, icon: Clock, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
                                                            { label: 'Completed Tales', value: stats.completed, icon: History, color: 'text-slate-400', bg: 'bg-slate-50' }
                                                        ].map((item, i) => (
                                                            <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`h-10 w-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                                                                        <item.icon size={18} />
                                                                    </div>
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                                                                </div>
                                                                <span className="text-xl font-serif font-black text-slate-900">{item.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-3xl lg:rounded-[3rem] border border-white bg-brand-cream/40 p-6 lg:p-10 backdrop-blur-xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                                    <Navigation size={120} className="text-brand-dark" />
                                                </div>
                                                <div className="relative">
                                                    <h2 className="text-2xl font-serif font-black text-slate-950">Traveler Tips</h2>
                                                    <p className="mt-6 text-sm font-medium leading-[1.8] text-slate-500 italic">"Travel is the only thing you buy that makes you richer. Keep your passport profile updated for smoother visa processing on international circuits."</p>
                                                    <button onClick={() => setActiveTab('profile')} className="mt-8 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-gold transition-colors">Setup Identity <MoveRight size={14} className="inline ml-1" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recommended Section */}
                                    <div className="rounded-3xl lg:rounded-[3rem] border border-white/60 bg-white/20 p-6 lg:p-14 shadow-3xl shadow-slate-200/10 backdrop-blur-3xl relative overflow-hidden ring-1 ring-black/[0.02]">
                                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Intelligent Curation</div>
                                                <h2 className="mt-4 text-4xl font-serif font-black text-slate-950 leading-tight">Recommended <span className="text-brand-gold italic">for You</span></h2>
                                                <p className="mt-3 text-slate-400 font-bold uppercase tracking-widest text-[9px]">Based on popular traveler trends and your exploration level</p>
                                            </div>
                                            <button onClick={() => navigate('/packages')} className="group flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all">
                                                View All <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                        </div>

                                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                            {allPackages.slice(0, 4).map((pkg) => (
                                                <div key={pkg.id || pkg.slug} className="group cursor-pointer" onClick={() => navigate(`/tour/${pkg.slug || pkg.id}`)}>
                                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                                        <img src={pkg.imageUrl || pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                                        <div className="absolute bottom-6 left-6 right-6">
                                                            <div className="text-[8px] font-black uppercase tracking-widest text-brand-gold mb-1">{pkg.region}</div>
                                                            <div className="text-white font-serif font-black text-lg line-clamp-1">{pkg.title}</div>
                                                        </div>
                                                        {wishlist.includes(pkg.id || pkg.slug) && (
                                                            <div className="absolute top-5 right-5 h-8 w-8 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-lg">
                                                                <Heart size={14} fill="currentColor" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* BOOKINGS TAB */}
                            {activeTab === 'bookings' && (
                                <motion.div
                                    key="bookings"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-10"
                                >
                                    <div className="admin-glass p-6 lg:p-12 bg-white/10 backdrop-blur-xl border-white/40 ring-1 ring-black/[0.02] rounded-3xl lg:rounded-[3rem]">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">History & Logistics</div>
                                                <h2 className="mt-3 text-3xl font-serif font-black text-brand-dark">Expedition Registry</h2>
                                            </div>
                                            <div className="rounded-2xl bg-white/50 border border-slate-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 shadow-sm">{stats.total} Total Bookings</div>
                                        </div>

                                        <div className="grid gap-6">
                                            {bookings.length > 0 ? bookings.map((booking, i) => (
                                                <ScrollReveal key={booking.id} direction="up" delay={i * 0.05}>
                                                    <div className="premium-card rounded-3xl lg:rounded-[3rem] border border-slate-100 bg-white p-6 lg:p-8 transition-all hover:border-brand-gold group relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                            <Ticket size={120} />
                                                        </div>
                                                        <div className="flex flex-col xl:flex-row gap-8 relative z-10 w-full overflow-hidden">
                                                            <div className="flex-1 space-y-8 min-w-0 w-full">
                                                                <div className="flex items-center gap-4 sm:gap-5 min-w-0 w-full">
                                                                    <div className="shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-brand-dark text-white flex items-center justify-center shadow-xl">
                                                                        <MapPin size={24} />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1 w-full">
                                                                        <h3 className="truncate text-xl sm:text-2xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors">{booking.packageTitle}</h3>
                                                                        <div className="truncate flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{booking.destination || 'Destination Pending'}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 min-w-0">
                                                                    {[
                                                                        { label: 'Departure', value: booking.travelDate || 'Discussion', icon: CalendarDays, color: 'text-brand-gold' },
                                                                        { label: 'Identity', value: booking.customerName || 'Explorer', icon: UserCircle2, color: 'text-indigo-500' },
                                                                        { label: 'Group', value: `${booking.travelers || 1} Person(s)`, icon: Users, color: 'text-brand-blue' },
                                                                        { label: 'Status', value: booking.status || 'Triage', icon: Star, color: 'text-emerald-500' }
                                                                    ].map((info, idx) => (
                                                                        <div key={idx} className="space-y-2 min-w-0">
                                                                             <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 truncate">
                                                                                <info.icon size={12} className={info.color} /> {info.label}
                                                                             </div>
                                                                             <p className="font-serif font-black text-slate-900 truncate text-sm sm:text-base">{info.value}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                
                                                                {booking.notes && (
                                                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium italic text-slate-500 leading-relaxed">
                                                                        " {booking.notes} "
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="shrink-0 flex flex-col justify-between items-start xl:items-end border-t xl:border-t-0 xl:border-l border-slate-100 pt-6 xl:pt-0 xl:pl-8 lg:w-48 gap-6 xl:gap-0">
                                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                                                                    booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                                    booking.status === 'pending' ? 'bg-brand-gold/5 text-brand-gold border-brand-gold/20' : 
                                                                    'bg-slate-50 text-slate-400 border-slate-100'
                                                                }`}>
                                                                    {booking.status || 'pending'}
                                                                </div>
                                                                <button onClick={() => navigate(`/checkout/${booking.id}`)} className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-white font-black px-6 py-4 rounded-2xl hover:bg-brand-gold transition-all duration-300 shadow-xl shadow-brand-dark/10 text-[10px] uppercase tracking-widest">
                                                                    Review Pack <ArrowUpRight size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ScrollReveal>
                                            )) : (
                                                <div className="admin-glass py-24 text-center border-dashed border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-[3rem]">
                                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white shadow-sm text-slate-200 mb-8">
                                                        <Compass size={48} />
                                                    </div>
                                                    <h3 className="text-3xl font-serif font-black text-slate-900">Catalogue Empty</h3>
                                                    <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">No expeditions found in your personal registry.</p>
                                                    <button onClick={() => setActiveTab('request')} className="mt-10 text-brand-gold font-black uppercase tracking-widest text-xs hover:underline mx-auto">Draft New Expedition</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* REQUEST TRIP TAB */}
                            {activeTab === 'request' && (
                                <motion.div
                                    key="request"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="space-y-10"
                                >
                                    <div className="grid xl:grid-cols-[1fr_400px] gap-12 items-start">
                                        <div className="admin-glass p-6 lg:p-12 accent-pattern bg-white/10 backdrop-blur-xl border-white/40 ring-1 ring-black/[0.02] rounded-3xl lg:rounded-[3rem]">
                                            <div className="mb-12">
                                                <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark">
                                                     <Star size={14} className="text-brand-gold" /> Custom Protocol
                                                </div>
                                                <h2 className="mt-6 text-4xl font-serif font-black text-brand-dark">Plan New Trip</h2>
                                                <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-widest leading-relaxed">Transmitting your travel vision to our strategic coordinators</p>
                                            </div>

                                            <form onSubmit={handleBookingRequest} className="space-y-8">
                                                <div className="grid gap-8 md:grid-cols-2">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Destination Radar</label>
                                                        <div className="relative group">
                                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors" size={20} />
                                                            <input
                                                                type="text"
                                                                value={bookingForm.destination}
                                                                onChange={(e) => setBookingForm({...bookingForm, destination: e.target.value})}
                                                                placeholder="e.g. Kedarnath Expedition"
                                                                className="w-full rounded-2xl border border-slate-100 bg-white/60 pl-14 pr-6 py-5 text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Target Date</label>
                                                        <div className="relative group">
                                                            <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors" size={20} />
                                                            <input
                                                                type="date"
                                                                value={bookingForm.travelDate}
                                                                onChange={(e) => setBookingForm({...bookingForm, travelDate: e.target.value})}
                                                                className="w-full rounded-2xl border border-slate-100 bg-white/60 pl-14 pr-6 py-5 text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid gap-8 md:grid-cols-2">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Group Complement</label>
                                                        <div className="relative group">
                                                            <UserCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                                            <select
                                                                value={bookingForm.travelers}
                                                                onChange={(e) => setBookingForm({...bookingForm, travelers: e.target.value})}
                                                                className="w-full rounded-2xl border border-slate-100 bg-white/60 pl-14 pr-6 py-5 text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold appearance-none"
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, '8+', 'Special Group'].map(num => <option key={num} value={num}>{num} Explorer(s)</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Logistical Tier</label>
                                                        <div className="flex gap-2">
                                                            {['Standard', 'Premium', 'Elite'].map(tier => (
                                                                <button key={tier} type="button" className="flex-1 py-4 text-[9px] font-black uppercase tracking-widest rounded-xl border border-slate-100 bg-white hover:border-brand-gold hover:text-brand-dark transition-all">
                                                                    {tier}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mission Briefing / Requests</label>
                                                    <textarea
                                                        value={bookingForm.notes}
                                                        onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                                                        rows={4}
                                                        placeholder="Mention dietary preferences, flight schedules, or specific visual targets..."
                                                        className="w-full rounded-3xl border border-slate-100 bg-white/60 px-6 py-5 text-sm font-medium outline-none transition-all focus:bg-white focus:border-brand-gold leading-relaxed italic"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={bookingSaving}
                                                    className="w-full inline-flex items-center justify-center gap-3 bg-brand-dark text-white font-black px-12 py-6 rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-2xl shadow-brand-dark/20 text-lg hover:-translate-y-1 disabled:opacity-50 group"
                                                >
                                                    {bookingSaving ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} className="text-brand-gold" />}
                                                    {bookingSaving ? 'Fetching Data...' : 'Send Request'}
                                                </button>
                                            </form>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="rounded-[3rem] bg-brand-dark p-8 lg:p-10 text-white shadow-2xl shadow-brand-dark/20 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                                    <ShieldCheck size={100} className="text-brand-gold" />
                                                </div>
                                                <div className="relative">
                                                    <h3 className="text-xl font-serif font-black mb-6">Execution Guarantee</h3>
                                                    <ul className="space-y-6">
                                                        {[
                                                            { text: 'Verified Coordination Team', icon: CheckCircle2 },
                                                            { text: '24/7 Strategic Support', icon: CheckCircle2 },
                                                            { text: 'Real-time Travel Signals', icon: CheckCircle2 }
                                                        ].map((item, idx) => (
                                                            <li key={idx} className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                                                <item.icon size={16} className="text-emerald-400" /> {item.text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="rounded-[3rem] border border-slate-100 bg-white p-8 lg:p-10 shadow-3xl shadow-slate-200/20">
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-6">Concierge Notice</div>
                                                <p className="text-sm font-medium leading-[1.8] text-slate-500 italic">"Our current operational response time is approximately 120 minutes for new requests. Strategic departures for Garhwal are filling up fast for the peak season."</p>
                                                <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                                                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                                                        <Navigation size={18} />
                                                    </div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-700">Yatra Go Operational HQ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <div className="rounded-3xl lg:rounded-[3rem] border border-white/60 bg-white/20 p-6 shadow-4xl shadow-slate-200/10 backdrop-blur-3xl lg:p-14 accent-pattern-blue ring-1 ring-black/[0.02]">
                                        <div className="mb-14 flex flex-col md:flex-row items-center gap-10">
                                            <div className="relative group">
                                                <button
                                                    type="button"
                                                    onClick={openPhotoPicker}
                                                    className="flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-brand-dark text-white shadow-2xl ring-4 ring-white transition-transform group-hover:scale-105 group-hover:-rotate-3 overflow-hidden cursor-pointer"
                                                    title="Change profile photo"
                                                >
                                                    {profilePhotoUrl ? (
                                                        <img
                                                            src={profilePhotoUrl}
                                                            alt={resolvedDisplayName}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-4xl font-black">{profileForm.name?.charAt(0) || currentUser?.email?.charAt(0).toUpperCase() || 'E'}</span>
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={openPhotoPicker}
                                                    className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-dark shadow-xl border-2 border-white cursor-pointer"
                                                    title="Change profile photo"
                                                >
                                                    <PencilLine size={18} />
                                                </button>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-gold mb-2">Passport Profile</div>
                                                <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tight">{resolvedDisplayName || 'Yatra Go Explorer'}</h2>
                                                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-3">
                                                    <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">Verified Identity</span>
                                                    <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[9px] font-black uppercase tracking-widest">Priority Member</span>
                                                </div>
                                            </div>
                                        </div>

                                        <form onSubmit={handleProfileSave} className="space-y-10">
                                            <div className="rounded-[2rem] border border-slate-100 bg-white/60 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div>
                                                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">Profile Photo</div>
                                                    <div className="text-sm font-semibold text-slate-600 mt-1">
                                                        {profilePhotoUrl ? 'Current photo is active.' : 'Google photo will be used automatically if available.'}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={openPhotoPicker}
                                                    className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-brand-dark text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all"
                                                >
                                                    {photoUploading ? <RefreshCw className="animate-spin" size={16} /> : <ImageUp size={16} />}
                                                    {photoUploading ? 'Uploading...' : 'Change Photo'}
                                                </button>
                                            </div>
                                            <div className="grid gap-10 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">Official Name</label>
                                                    <div className="relative group">
                                                        <UserCircle2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors" size={22} />
                                                        <input
                                                            type="text"
                                                            value={profileForm.name}
                                                            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                                            className="w-full rounded-[1.75rem] border border-slate-100 bg-white/60 pl-16 pr-8 py-5 text-base font-bold outline-none transition-all focus:bg-white focus:border-brand-gold focus:ring-8 focus:ring-brand-gold/5"
                                                            placeholder="Enter full name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">Communication Line</label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors" size={22} />
                                                        <input
                                                            type="tel"
                                                            value={profileForm.phone}
                                                            onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                                                            className="w-full rounded-[1.75rem] border border-slate-100 bg-white/60 pl-16 pr-8 py-5 text-base font-bold outline-none transition-all focus:bg-white focus:border-brand-gold focus:ring-8 focus:ring-brand-gold/5"
                                                            placeholder="+91 XXXXX XXXXX"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-10 md:grid-cols-2">
                                                <div className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                                        <Mail size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Authenticated ID</div>
                                                        <div className="font-bold text-slate-900 text-base">{currentUser.email}</div>
                                                    </div>
                                                </div>
                                                <div className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-gold shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                                        <ShieldCheck size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Identity Tier</div>
                                                        <div className="font-black text-brand-dark uppercase tracking-[0.2em] text-xs">Platinum Traveler</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {profileFeedback && (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className={`rounded-2xl px-8 py-5 text-sm font-bold flex items-center gap-4 ${profileFeedback.includes('successfully') ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-rose-200 bg-rose-50 text-rose-700'}`}>
                                                    {profileFeedback.includes('successfully') ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                                    {profileFeedback}
                                                </motion.div>
                                            )}

                                            <div className="flex pt-6">
                                                <button
                                                    type="submit"
                                                    disabled={profileSaving}
                                                    className="inline-flex items-center justify-center gap-4 bg-brand-dark text-white font-black px-14 py-6 rounded-2xl hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 shadow-4xl shadow-brand-dark/30 text-lg hover:-translate-y-2 disabled:opacity-50 group"
                                                >
                                                    {profileSaving ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} className="group-hover:text-white transition-colors" />}
                                                    {profileSaving ? 'Synchronizing Archive...' : 'Save Changes'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            )}

                            {/* WISHLIST TAB */}
                            {activeTab === 'wishlist' && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="space-y-10"
                                >
                                    <div className="admin-glass p-6 lg:p-12 bg-white/10 backdrop-blur-xl border-white/40 ring-1 ring-black/[0.02] rounded-3xl lg:rounded-[3rem]">
                                        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                                            <div>
                                                <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">
                                                     <Heart size={14} fill="currentColor" /> Saved Expeditions
                                                </div>
                                                <h2 className="mt-6 text-3xl font-serif font-black text-brand-dark">Your Curated Interests</h2>
                                                <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-widest leading-relaxed">{wishlist.length} packages currently in your wishlist</p>
                                            </div>
                                            <button onClick={() => navigate('/packages')} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-brand-dark transition-colors">Browse Catalog <PlusCircle size={14} /></button>
                                        </div>

                                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                            {wishlist.length > 0 ? wishlist.map((pkgId) => {
                                                const pkg = allPackages.find(p => p.id === pkgId);
                                                if (!pkg) return null;
                                                return (
                                                    <div key={pkgId} className="premium-card rounded-3xl lg:rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden transition-all hover:border-brand-gold shadow-sm group flex flex-col h-full">
                                                        <div className="h-48 overflow-hidden relative shrink-0">
                                                            {pkg.imageUrl || pkg.img ? (
                                                                <img src={pkg.imageUrl || pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                            ) : (
                                                                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                                    <Palmtree size={48} />
                                                                </div>
                                                            )}
                                                            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                                                <Heart size={20} fill="white" />
                                                            </div>
                                                        </div>
                                                        <div className="p-7 flex flex-col flex-1">
                                                            <div className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">{pkg.region}</div>
                                                            <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors line-clamp-2 mb-4 min-h-[3.5rem] leading-tight">
                                                                {pkg.title}
                                                            </h3>
                                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                                                <span className="text-lg font-black text-slate-900">{pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : 'Ask'}</span>
                                                                <button onClick={() => navigate(`/checkout?package=${pkg.id || pkg.slug}`)} className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg shadow-brand-dark/10">
                                                                    <MoveRight size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }) : (
                                                <div className="col-span-full py-24 text-center border-dashed border-2 border-slate-100 bg-slate-50/50 rounded-[3rem]">
                                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white shadow-sm text-slate-200 mb-8">
                                                        <Heart size={48} />
                                                    </div>
                                                    <h3 className="text-3xl font-serif font-black text-slate-900">Wishlist Clear</h3>
                                                    <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Explore our expeditions and save what mirrors your soul.</p>
                                                    <button onClick={() => navigate('/packages')} className="mt-10 text-brand-gold font-black uppercase tracking-widest text-xs hover:underline mx-auto">Explore Catalog</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                </div>
            </div>

            <ConfirmPopup
                open={logoutPopupOpen}
                onCancel={() => setLogoutPopupOpen(false)}
                onConfirm={handleLogout}
                title="Deactivate Lounge Access?"
                confirmLabel="Confirm Exit"
                cancelLabel="Stay Active"
            />

            <SuccessPopup
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Request Sent"
                message="Your custom expedition protocol has been successfully received. A concierge lead will connect with your strategy within 120 minutes."
                eyebrow="Mission Logged"
                variant="auth-card"
            />
            
            <SuccessPopup
                open={Boolean(authPopup)}
                onClose={() => setAuthPopup(null)}
                title={authPopup?.title || 'Access Granted!'}
                message={authPopup?.message || 'Your personal luxury travel lounge is now online.'}
                eyebrow="Authentication"
                subtitle="Identity Confirmed"
                showButton={false}
                showClose={false}
                variant="auth-card"
                autoHideMs={2200}
            />
        </div>
    );
};

export default Dashboard;
