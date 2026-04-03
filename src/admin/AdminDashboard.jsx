import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import {
    Activity,
    AlertTriangle,
    ArrowUpRight,
    BadgeCheck,
    Bell,
    CalendarClock,
    Crown,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Package,
    Phone,
    Settings,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    Target,
    UserCheck,
    Users,
    Home,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import ManagePackages from './ManagePackages';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';
import ManageEnquiries from './ManageEnquiries';
import { getAdminEmail } from '../lib/userProfile';
import { ConfirmPopup, SuccessPopup } from '../components/ui';
import ScrollReveal from '../components/ui/ScrollReveal';

const formatDate = (value) => {
    if (!value) return 'Just now';

    try {
        if (typeof value.toDate === 'function') {
            return value.toDate().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }

        if (value.seconds) {
            return new Date(value.seconds * 1000).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    } catch (error) {
        console.error('Date format failed', error);
    }

    return 'Recently updated';
};

const defaultAdminSettings = {
    bookingAlerts: true,
    travelerAlerts: true,
    priorityMode: false,
    compactCards: false,
};

const statusStyles = {
    new: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20 shadow-brand-gold/5',
    responded: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-900/5',
    archived: 'bg-slate-50 text-slate-700 border-slate-200 shadow-slate-900/5',
};

const AdminDashboard = () => {
    const { currentUser, isAdmin, userProfile } = useAuth();
    const navigate = useNavigate();
    const emailIsAdmin = currentUser?.email?.trim().toLowerCase() === getAdminEmail();
    const hasAdminAccess = isAdmin || emailIsAdmin;
    const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
    const [activeTab, setActiveTab] = useState('overview');
    const [packages, setPackages] = useState([]);
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [panelError, setPanelError] = useState('');
    const [adminSettings, setAdminSettings] = useState(defaultAdminSettings);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
    const [authPopup, setAuthPopup] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        try {
            const savedSettings = window.localStorage.getItem('yatrago-admin-settings');
            if (savedSettings) {
                setAdminSettings({ ...defaultAdminSettings, ...JSON.parse(savedSettings) });
            }
        } catch (error) {
            console.error('Admin settings restore failed', error);
        }

        return undefined;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.setItem('yatrago-admin-settings', JSON.stringify(adminSettings));
        } catch (error) {
            console.error('Admin settings save failed', error);
        }
    }, [adminSettings]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const popupPayload = window.sessionStorage.getItem('yatrago-auth-popup');
        if (!popupPayload) return undefined;

        try {
            setAuthPopup(JSON.parse(popupPayload));
        } catch (error) {
            console.error('Auth popup restore failed', error);
        }

        window.sessionStorage.removeItem('yatrago-auth-popup');

        const timer = window.setTimeout(() => {
            setAuthPopup(null);
        }, 2000);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!db) {
            setPanelError('Firebase database is not available.');
            return undefined;
        }

        const unsubscribes = [
            onSnapshot(
                collection(db, 'packages'),
                (snapshot) => {
                    setPackages(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
                },
                (error) => {
                    console.error('Packages listener failed', error);
                    setPanelError('Packages data load nahi ho pa raha hai.');
                }
            ),
            onSnapshot(
                collection(db, 'users'),
                (snapshot) => {
                    setUsers(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
                },
                (error) => {
                    console.error('Users listener failed', error);
                    setPanelError('Users data load nahi ho pa raha hai.');
                }
            ),
            onSnapshot(
                collection(db, 'bookings'),
                (snapshot) => {
                    const nextBookings = snapshot.docs
                        .map((entry) => ({ id: entry.id, ...entry.data() }))
                        .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                    setBookings(nextBookings);
                },
                (error) => {
                    console.error('Bookings listener failed', error);
                    setPanelError('Bookings data load nahi ho pa raha hai.');
                }
            ),
            onSnapshot(
                collection(db, 'enquiries'),
                (snapshot) => {
                    const nextEnquiries = snapshot.docs
                        .map((entry) => ({ id: entry.id, ...entry.data() }))
                        .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                    setEnquiries(nextEnquiries);
                },
                (error) => {
                    console.error('Enquiries listener failed', error);
                    setPanelError('Enquiries data load nahi ho pa raha hai.');
                }
            ),
        ];

        return () => unsubscribes.forEach((unsubscribe) => unsubscribe && unsubscribe());
    }, []);

    const stats = useMemo(() => ({
        packages: packages.length,
        users: users.length,
        bookings: bookings.length,
        enquiries: enquiries.length,
        pendingBookings: bookings.filter((booking) => booking.status === 'pending').length,
        confirmedBookings: bookings.filter((booking) => booking.status === 'confirmed').length,
        newEnquiries: enquiries.filter((enquiry) => enquiry.status === 'new').length,
    }), [packages, users, bookings, enquiries]);

    const recentUsers = useMemo(
        () => [...users].sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0)).slice(0, 4),
        [users]
    );

    const recentBookings = useMemo(
        () => [...bookings].sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0)).slice(0, 4),
        [bookings]
    );

    const recentEnquiries = useMemo(
        () => [...enquiries].sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0)).slice(0, 4),
        [enquiries]
    );

    const settingsSnapshot = useMemo(() => {
        const withPhone = bookings.filter((booking) => booking.customerPhone?.trim()).length;
        const bookingPhoneCoverage = stats.bookings ? Math.round((withPhone / stats.bookings) * 100) : 100;
        const travelerPhoneCoverage = users.length
            ? Math.round((users.filter((user) => user.phone?.trim()).length / users.length) * 100)
            : 100;
        const bookingConversion = stats.bookings ? Math.round((stats.confirmedBookings / stats.bookings) * 100) : 0;

        return {
            bookingPhoneCoverage,
            travelerPhoneCoverage,
            bookingConversion,
            pendingLoadLabel: stats.pendingBookings <= 3 ? 'Comfortable' : stats.pendingBookings <= 8 ? 'Busy' : 'Needs attention',
            responseGoalLabel: stats.pendingBookings === 0 ? 'All clear' : stats.pendingBookings <= 5 ? 'Reply within 30 mins' : 'Prioritize callbacks now',
        };
    }, [bookings, users, stats]);

    const quickActions = [
        {
            label: 'Review pending bookings',
            description: `${stats.pendingBookings} request(s) are waiting right now.`,
            tab: 'bookings',
            icon: CalendarClock,
            color: 'from-brand-gold to-brand-sunset'
        },
        {
            label: 'Refresh traveler records',
            description: `${stats.users} traveler profile(s) are in the system.`,
            tab: 'users',
            icon: UserCheck,
            color: 'from-brand-blue to-brand-azure'
        },
        {
            label: 'Polish package catalog',
            description: `${stats.packages} package(s) are currently live.`,
            tab: 'packages',
            icon: Package,
            color: 'from-emerald-500 to-teal-600'
        },
        {
            label: 'Respond to enquiries',
            description: `${stats.newEnquiries} new message(s) awaiting response.`,
            tab: 'enquiries',
            icon: MessageSquare,
            color: 'from-brand-blue to-teal-400'
        },
    ];

    const preferenceCards = [
        {
            key: 'bookingAlerts',
            title: 'Instant booking alerts',
            description: 'Keep fresh trip requests top of mind while working inside the dashboard.',
            icon: Bell,
        },
        {
            key: 'travelerAlerts',
            title: 'Traveler signup alerts',
            description: 'Track new registrations quickly so follow-ups feel personal and timely.',
            icon: UserCheck,
        },
        {
            key: 'priorityMode',
            title: 'Priority response mode',
            description: 'Useful on busy days when pending requests need faster callbacks and triage.',
            icon: Target,
        },
        {
            key: 'compactCards',
            title: 'Compact executive cards',
            description: 'A lighter visual density preference for focused reviewing sessions.',
            icon: SlidersHorizontal,
        },
    ];

    const serviceChecklist = [
        {
            label: 'Phone captured in bookings',
            value: `${settingsSnapshot.bookingPhoneCoverage}%`,
            tone: settingsSnapshot.bookingPhoneCoverage >= 85 ? 'text-emerald-400' : 'text-amber-400',
        },
        {
            label: 'Traveler profile completeness',
            value: `${settingsSnapshot.travelerPhoneCoverage}%`,
            tone: settingsSnapshot.travelerPhoneCoverage >= 75 ? 'text-emerald-400' : 'text-amber-400',
        },
        {
            label: 'Booking confirmation rate',
            value: `${settingsSnapshot.bookingConversion}%`,
            tone: settingsSnapshot.bookingConversion >= 45 ? 'text-emerald-400' : 'text-slate-700',
        },
    ];

    const toggleAdminSetting = (key) => {
        setAdminSettings((current) => ({
            ...current,
            [key]: !current[key],
        }));
    };

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!hasAdminAccess) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleLogout = async () => {
        if (!auth) return;
        await signOut(auth);
        setLogoutPopupOpen(false);
        navigate('/');
    };

    const navItems = [
        { id: 'home', label: 'Back to Home', icon: Home, type: 'link' },
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'packages', label: 'Packages', icon: Package },
        { id: 'bookings', label: 'Bookings', icon: CalendarClock },
        { id: 'users', label: 'Travelers', icon: Users },
        { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const highlightCards = [
        {
            label: 'Live Packages',
            value: stats.packages,
            icon: Package,
            note: 'Active inventory ready for customers',
            tone: 'from-brand-gold/5 via-brand-gold/10 to-white',
            accent: 'bg-brand-gold/20 text-brand-gold'
        },
        {
            label: 'Trip Requests',
            value: stats.bookings,
            icon: CalendarClock,
            note: `${stats.pendingBookings} awaiting attention`,
            tone: 'from-brand-blue/5 via-brand-blue/10 to-white',
            accent: 'bg-brand-blue/20 text-brand-blue'
        },
        {
            label: 'Confirmed Trips',
            value: stats.confirmedBookings,
            icon: ShieldCheck,
            note: 'Smooth progress across the journey desk',
            tone: 'from-emerald-500/5 via-emerald-500/10 to-white',
            accent: 'bg-emerald-500/20 text-emerald-600'
        },
        {
            label: 'Registered Travelers',
            value: stats.users,
            icon: Users,
            note: 'Your growing customer circle',
            tone: 'from-indigo-500/5 via-indigo-500/10 to-white',
            accent: 'bg-indigo-500/20 text-indigo-600'
        },
        {
            label: 'User Enquiries',
            value: stats.enquiries,
            icon: MessageSquare,
            note: `${stats.newEnquiries} fresh signals to decode`,
            tone: 'from-orange-500/5 via-orange-500/10 to-white',
            accent: 'bg-orange-500/20 text-orange-600'
        },
    ];

    return (
        <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-sans selection:bg-brand-gold/30 selection:text-brand-dark">
            {/* Elegant Fixed Sidebar */}
            <aside className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-80 group overflow-hidden border-r border-slate-200 bg-white/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.02)]">
                {/* Visual Flair in Sidebar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-emerald opacity-50" />
                <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50" />
                
                <div className="relative flex h-full flex-col">
                    <div className="flex h-28 items-center justify-center border-b border-slate-50 px-8">
                        <Link to="/" className="flex items-center gap-3 sm:gap-4 group/logo">
                            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-dark shadow-xl shadow-brand-dark/10 ring-1 ring-white/10 transition-transform duration-500 group-hover/logo:scale-105">
                                <img
                                    src={logoSrc}
                                    alt="Yatra Go"
                                    className="h-6 sm:h-8 w-auto object-contain brightness-0 invert"
                                    onError={(event) => {
                                        event.target.style.display = 'none';
                                        event.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <span className="hidden h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-brand-gold text-[10px] sm:text-sm font-black text-white">YG</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-brand-gold leading-none">Yatra Go</span>
                                <span className="mt-1 text-lg sm:mt-1.5 sm:text-xl font-serif font-black text-brand-dark tracking-tight">Admin Panel</span>
                            </div>
                        </Link>
                    </div>

                    <div className="px-6 pt-10">
                        <div className="rounded-[1.5rem] sm:rounded-[2.5rem] bg-gradient-to-br from-brand-dark to-slate-800 p-4 sm:p-6 text-white shadow-2xl shadow-brand-dark/20 relative overflow-hidden group/profile">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/profile:bg-brand-gold/10 transition-colors duration-700" />
                            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                                <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/20 text-base sm:text-xl font-black text-brand-gold shadow-lg">
                                    {currentUser.user?.charAt(0).toUpperCase() || 'YG'}
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-base sm:text-lg font-black tracking-tight">Yatra Go</div>
                                    <div className="mt-0.5 sm:mt-1 truncate text-[10px] text-slate-300 font-bold">{currentUser.email}</div>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-6 flex items-center justify-between rounded-xl sm:rounded-2xl bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-[10px] backdrop-blur relative z-10 border border-white/5">
                                <span className="font-black uppercase tracking-widest text-slate-300">Security Dept.</span>
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-400">
                                    <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold" /> Level 1
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1.5 overflow-y-auto px-5 py-10">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => item.type === 'link' ? navigate('/') : setActiveTab(item.id)}
                                className={`group flex w-full items-center gap-4 rounded-[1.25rem] px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                                    activeTab === item.id
                                        ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20 translate-x-1'
                                        : 'text-slate-600 hover:bg-white hover:text-brand-dark hover:shadow-lg hover:shadow-slate-500/60 hover:-translate-y-0.5'
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
                            className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-rose-100 bg-rose-50/50 px-4 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-rose-500 transition-all hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95"
                        >
                            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Exit Desk
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="ml-0 min-h-screen px-3 pb-16 pt-8 sm:px-4 lg:ml-80 lg:px-8 lg:pt-10 accent-pattern">
                <div className="mx-auto max-w-7xl">
                    <ScrollReveal direction="down">
                        <header className="overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white bg-white/60 shadow-[0_30px_100px_rgba(8,38,61,0.06)] backdrop-blur-2xl ring-1 ring-slate-100">
                            <div className="grid gap-6 sm:gap-8 px-4 sm:px-6 py-6 sm:py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark">
                                        <Sparkles size={14} className="text-brand-gold" /> Command Center Live
                                    </div>
                                    <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-[1.15]">
                                        Strategy & <span className="text-brand-gold italic underline decoration-slate-200 underline-offset-4 sm:underline-offset-6">Execution.</span>
                                    </h1>
                                    <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-slate-700 italic">
                                        Managing the mechanics of high-impact travel, with precision data and intuitive control.
                                    </p>
                                </div>
                                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    <div className="rounded-xl sm:rounded-2xl bg-brand-dark p-4 sm:p-5 text-white shadow-2xl shadow-brand-dark/15 border border-white/5 relative group overflow-hidden">
                                        <div className="absolute top-11 right-1 -translate-y-1/2 p-3 opacity-30 group-hover:opacity-20 transition-all group-hover:scale-110">
                                            <CalendarClock size={40} />
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Awaiting Action</div>
                                        <div className="mt-2 sm:mt-3 text-3xl sm:text-4xl font-black font-serif">{stats.pendingBookings}</div>
                                        <div className="mt-1 sm:mt-2 text-[11px] sm:text-xs font-bold text-slate-300">Fresh trip requests today</div>
                                    </div>
                                    <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm ring-1 ring-slate-50 group overflow-hidden relative">
                                        <div className="absolute top-11 right-1 -translate-y-1/2 p-3 opacity-30 group-hover:opacity-20 transition-all group-hover:scale-110">
                                            <Users size={40} />
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Global Reach</div>
                                        <div className="mt-2 sm:mt-3 text-3xl sm:text-4xl font-black font-serif text-slate-900">{stats.users}</div>
                                        <div className="mt-1 sm:mt-2 text-[11px] sm:text-xs font-bold text-slate-700">Total travelers registered</div>
                                    </div>
                                    <div className="rounded-xl sm:rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-4 sm:p-5 shadow-sm ring-1 ring-brand-gold/5 group overflow-hidden relative">
                                        <div className="absolute top-11 right-1 -translate-y-1/2 p-3 opacity-30 group-hover:opacity-20 transition-all group-hover:scale-110">
                                            <MessageSquare size={40} />
                                        </div>
                                        <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Signal Queue</div>
                                        <div className="mt-2 sm:mt-3 text-3xl sm:text-4xl font-black font-serif text-slate-900">{stats.newEnquiries}</div>
                                        <div className="mt-1 sm:mt-2 text-[11px] sm:text-xs font-bold text-slate-700">New enquiries to review</div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </ScrollReveal>

                    {/* Mobile Navigation */}
                    <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 lg:hidden">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => item.type === 'link' ? navigate('/') : setActiveTab(item.id)}
                                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-2 py-3 text-[8px] sm:text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                    activeTab === item.id
                                        ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20 scale-105'
                                        : 'bg-white/80 text-slate-700 shadow-sm border border-slate-100 hover:bg-white hover:shadow-md hover:scale-[1.02] active:scale-95'
                                }`}
                            >
                                <item.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeTab === item.id ? 'text-brand-gold' : item.id === 'home' ? 'text-brand-blue' : ''}`} />
                                <span className="truncate">{item.label.split(' ').pop()}</span>
                            </button>
                        ))}
                    </div>

                    {panelError && (
                        <ScrollReveal>
                            <div className="mt-6 flex items-start gap-3 sm:gap-4 rounded-lg sm:rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 text-amber-950 backdrop-blur-sm">
                                <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} />
                                <div>
                                    <div className="font-black uppercase tracking-widest text-[10px] sm:text-xs mb-0.5 sm:mb-1">Sync Warning</div>
                                    <div className="text-xs sm:text-sm font-medium leading-relaxed">{panelError}</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {activeTab === 'overview' && (
                        <div className="mt-10 space-y-10">
                            <section className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {highlightCards.map((card, i) => (
                                    <ScrollReveal key={card.label} direction="up" delay={i * 0.1}>
                                        <div
                                            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white bg-gradient-to-br ${card.tone} p-4 sm:p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2`}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <div className={`flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg sm:rounded-2xl ${card.accent} shadow-sm transition-transform duration-500 group-hover:scale-110`}>
                                                    <card.icon size={18} sm:size={22} />
                                                </div>
                                                <span className="rounded-full bg-white/80 px-3 py-1 sm:px-4 sm:py-1.5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm border border-slate-50">Pulse</span>
                                            </div>
                                            <div className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tighter relative z-10">{card.value}</div>
                                            <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900 relative z-10">{card.label}</div>
                                            <p className="mt-2 sm:mt-4 text-[10px] sm:text-xs font-medium leading-relaxed text-slate-700 relative z-10">{card.note}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </section>

                            <div className="grid gap-6 sm:gap-7 xl:grid-cols-[1.2fr_0.8fr]">
                                <ScrollReveal direction="up" className="space-y-6 sm:space-y-7">
                                    <div className="rounded-xl sm:rounded-2xl border border-white bg-white/70 p-5 sm:p-7 lg:p-8 shadow-3xl shadow-slate-200/30 backdrop-blur-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-slate-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="relative mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Executive Review</div>
                                                <h2 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-serif font-black text-slate-950">Recent Travelers</h2>
                                            </div>
                                            <Link to="/admin/dashboard" onClick={() => setActiveTab('users')} className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-brand-blue hover:text-brand-dark transition-colors flex items-center gap-1 sm:gap-2">View List <ArrowUpRight size={12} sm:size={14} /></Link>
                                        </div>
                                        <div className="relative space-y-3 sm:space-y-4">
                                            {recentUsers.length > 0 ? recentUsers.map((user, i) => (
                                                <div key={user.id} className="admin-glass group flex flex-col gap-3 sm:gap-4 rounded-lg sm:rounded-xl border-slate-50 bg-white/50 px-3 sm:px-5 py-3 sm:py-4 sm:flex-row sm:items-center sm:justify-between transition-all hover:bg-white hover:shadow-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 sm:h-11 w-9 sm:w-11 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-black text-xs sm:text-sm">
                                                            {user.name?.charAt(0) || 'T'}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="truncate text-sm sm:text-base font-black text-slate-900 leading-tight">{user.name || 'Anonymous Traveler'}</div>
                                                            <div className="mt-0.5 truncate text-[10px] sm:text-xs text-slate-700 font-bold tracking-tight">{user.email || 'Email Private'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <span className="rounded-full bg-indigo-50 px-2 sm:px-3 py-1 sm:py-1.5 text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-indigo-600 border border-indigo-100">{user.role || 'Explorer'}</span>
                                                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 hidden sm:inline">{formatDate(user.createdAt)}</span>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 text-center text-slate-700 font-bold italic">
                                                    Traveler registrations queue is currently calm.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl sm:rounded-3xl border border-brand-gold/10 bg-brand-cream/40 p-5 sm:p-7 lg:p-10 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                            <MessageSquare size={80} sm:size={100} lg:size={120} className="text-brand-gold" />
                                        </div>
                                        <div className="relative">
                                            <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-brand-sunset">Signal Pulse</div>
                                            <h2 className="mt-2 sm:mt-4 text-lg sm:text-2xl font-serif font-black text-slate-950">Recent Enquiries</h2>
                                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                                                {recentEnquiries.length > 0 ? recentEnquiries.map((enquiry) => (
                                                    <div key={enquiry.id} className="rounded-lg sm:rounded-xl bg-white/50 border border-slate-200 p-3 sm:p-4 transition-all hover:bg-white hover:shadow-md group/enq">
                                                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                                                            <div className="text-[10px] sm:text-xs font-black text-slate-900 truncate flex-1 group-hover/enq:text-brand-gold">{enquiry.name}</div>
                                                            <span className={`px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${statusStyles[enquiry.status || 'new']}`}>
                                                                {enquiry.status || 'new'}
                                                            </span>
                                                        </div>
                                                        <div className="text-[9px] sm:text-[10px] text-slate-700 font-medium italic line-clamp-1">{enquiry.message}</div>
                                                    </div>
                                                )) : (
                                                    <div className="text-center py-6 sm:py-8 text-slate-700 font-bold italic border-2 border-dashed border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                                                        No new signals currently detected.
                                                    </div>
                                                )}
                                            </div>
                                            <button onClick={() => setActiveTab('enquiries')} className="mt-4 sm:mt-6 w-full py-2 sm:py-3 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-brand-gold hover:text-brand-dark transition-colors flex items-center justify-center gap-1 sm:gap-2">Review All Signals <ArrowUpRight size={12} sm:size={14} /></button>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 lg:p-10 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                            <Target size={80} sm:size={100} lg:size={120} className="text-brand-gold" />
                                        </div>
                                        <div className="relative">
                                            <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-brand-sunset">Operational Blueprint</div>
                                            <h2 className="mt-2 sm:mt-4 text-lg sm:text-2xl font-serif font-black text-slate-950">Executive Guidelines</h2>
                                            <div className="mt-4 sm:mt-6 grid gap-6 sm:gap-8 sm:grid-cols-2">
                                                <div className="space-y-2 sm:space-y-3">
                                                    <div className="h-0.5 sm:h-1 text-brand-gold bg-brand-gold/20 rounded-full" />
                                                    <h3 className="text-[11px] sm:text-sm font-black uppercase tracking-widest text-slate-900">Visibility</h3>
                                                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">Premium visibility into every traveler and trip request, ensuring zero leakage in communication.</p>
                                                </div>
                                                <div className="space-y-2 sm:space-y-3">
                                                     <div className="h-0.5 sm:h-1 text-brand-blue bg-brand-blue/20 rounded-full" />
                                                     <h3 className="text-[11px] sm:text-sm font-black uppercase tracking-widest text-slate-900">Efficiency</h3>
                                                     <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">Fast response handling for fresh bookings, prioritizing the elite customer experience.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2}>
                                    <div className="space-y-6 sm:space-y-7">
                                        <div className="rounded-2xl sm:rounded-3xl bg-brand-dark p-5 sm:p-7 lg:p-10 text-white shadow-3xl shadow-brand-dark/20 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,138,23,0.1),_transparent_40%)]" />
                                            <div className="relative">
                                                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Reservation Pipeline</div>
                                                <h2 className="mt-2 sm:mt-4 text-lg sm:text-xl lg:text-2xl font-serif font-black">Strategic Pulse</h2>
                                                <div className="mt-5 sm:mt-7 space-y-3 sm:space-y-4">
                                                    {recentBookings.length > 0 ? recentBookings.map((booking) => (
                                                        <div key={booking.id} className="rounded-lg sm:rounded-xl bg-white/5 border border-white/5 p-3 sm:p-4 transition-all hover:bg-white/10 group/item">
                                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                                <div className="text-xs sm:text-sm font-black tracking-tight group-hover/item:text-brand-gold transition-colors">{booking.packageTitle || 'Elite Expedition'}</div>
                                                                <span className={`rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-gold/20 text-brand-gold'}`}>
                                                                    {booking.status || 'Triage'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 sm:gap-3">
                                                                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-300">
                                                                    <LogOut size={12} sm:size={14} className="rotate-180" />
                                                                </div>
                                                                <div className="text-[10px] sm:text-xs font-bold text-slate-300 truncate flex-1">{booking.customerName || booking.customerEmail || 'Guest Traveler'}</div>
                                                                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-600 hidden sm:inline">{formatDate(booking.createdAt)}</div>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="rounded-lg sm:rounded-xl border border-dashed border-white/10 py-8 sm:py-12 text-center text-slate-500 font-bold italic text-xs sm:text-sm">
                                                            No active strategic signals found.
                                                        </div>
                                                    )}
                                                </div>
                                                <button onClick={() => setActiveTab('bookings')} className="mt-5 sm:mt-7 w-full rounded-lg sm:rounded-2xl bg-white/5 py-2 sm:py-3 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all">Deep Review All <ArrowUpRight size={12} sm:size={14} className="inline ml-1" /></button>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 lg:p-10 shadow-3xl shadow-slate-200/20 relative group">
                                            <div className="absolute -bottom-8 sm:-bottom-10 -right-8 sm:-right-10 text-slate-50 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                                <Activity size={140} sm:size={160} lg:size={180} />
                                            </div>
                                            <div className="relative">
                                                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Service Standards</div>
                                                <h2 className="mt-2 sm:mt-4 text-lg sm:text-2xl font-serif font-black text-slate-950">Queue Health</h2>
                                                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                                                    <div className="space-y-1.5 sm:space-y-2">
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700">Load Factor</span>
                                                            <span className="text-xs sm:text-sm font-black text-brand-dark">{settingsSnapshot.pendingLoadLabel}</span>
                                                        </div>
                                                        <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={`h-full bg-brand-gold transition-all duration-1000 ${stats.pendingBookings > 5 ? 'w-full' : 'w-1/3'}`} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 sm:space-y-3">
                                                        {serviceChecklist.map((item) => (
                                                            <div key={item.label} className="flex items-center justify-between gap-3 py-1 sm:py-1.5">
                                                                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-700">{item.label}</span>
                                                                <span className={`text-xs sm:text-sm font-black font-serif ${item.tone}`}>{item.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    )}

                    {activeTab === 'packages' && <ScrollReveal><div className="mt-12"><ManagePackages /></div></ScrollReveal>}
                    {activeTab === 'bookings' && <ScrollReveal><div className="mt-12"><ManageBookings /></div></ScrollReveal>}
                    {activeTab === 'users' && <ScrollReveal><div className="mt-12"><ManageUsers /></div></ScrollReveal>}
                    {activeTab === 'enquiries' && <ScrollReveal><div className="mt-12"><ManageEnquiries /></div></ScrollReveal>}

                    {activeTab === 'settings' && (
                        <div className="mt-12 space-y-12">
                            <ScrollReveal direction="up" className="grid gap-6 sm:gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                                <div className="rounded-[2rem] sm:rounded-[3.5rem] bg-brand-dark p-6 sm:p-10 lg:p-14 text-white shadow-2xl sm:shadow-4xl shadow-brand-dark/30 relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[radial-gradient(circle_at_center,_rgba(255,138,23,0.15),_transparent_70%)] blur-3xl opacity-50" />
                                     <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10">
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <div className="h-16 sm:h-24 w-16 sm:w-24 rounded-[1.5rem] sm:rounded-[2.5rem] shrink-0 bg-white/10 flex items-center justify-center text-2xl sm:text-4xl font-black text-brand-gold shadow-2xl backdrop-blur ring-1 ring-white/20">
                                                {userProfile?.name?.charAt(0) || 'A'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-brand-gold">Executive Identity</div>
                                                <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-200 truncate">{userProfile?.name || 'Yatra Go Admin'}</h2>
                                                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold text-slate-200 truncate">{currentUser.email}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 flex items-center justify-center w-full sm:w-auto gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur">
                                            <BadgeCheck className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-emerald-400" />
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Corporate Verified</span>
                                        </div>
                                     </div>
                                     
                                     <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3">
                                        {[
                                            { label: 'System Queue', value: settingsSnapshot.pendingLoadLabel, note: settingsSnapshot.responseGoalLabel, icon: Activity, color: 'text-brand-gold' },
                                            { label: 'Booking Reach', value: `${settingsSnapshot.bookingPhoneCoverage}%`, note: 'Phone capture rate', icon: Phone, color: 'text-brand-blue' },
                                            { label: 'ROI Benchmark', value: `${settingsSnapshot.bookingConversion}%`, note: 'Confirmed / Requests', icon: Target, color: 'text-emerald-400' }
                                        ].map((stat, i) => (
                                            <div key={i} className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 p-4 sm:p-6 hover:bg-white/10 transition-colors">
                                                <div className={`flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/5 ${stat.color} mb-4 sm:mb-6`}>
                                                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                                <div className="text-xl sm:text-2xl font-black">{stat.value}</div>
                                                <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-100">{stat.label}</div>
                                                <p className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] font-bold text-slate-100 leading-relaxed">{stat.note}</p>
                                            </div>
                                        ))}
                                     </div>
                                </div>

                                <div className="rounded-[2rem] sm:rounded-[3.5rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-2xl sm:shadow-3xl shadow-slate-200/20 relative overflow-hidden group">
                                     <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">Operations Point</div>
                                     <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-serif font-black text-slate-950">Priority Contact</h2>
                                     <p className="mt-3 sm:mt-6 text-base sm:text-xl font-bold text-brand-dark italic break-all underline decoration-brand-gold/30 underline-offset-4">{getAdminEmail()}</p>
                                     <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium leading-[1.6] sm:leading-[1.8] text-slate-700 italic">
                                         New traveler registrations, triage reports, and strategic signals are prioritized via this address.
                                     </p>
                                     
                                     <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-brand-dark shadow-xl sm:shadow-2xl shadow-brand-dark/20 relative group/standards overflow-hidden">
                                         <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-brand-gold/5 rounded-full blur-3xl" />
                                         <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-gold/60 mb-5 sm:mb-8 flex items-center gap-1.5 sm:gap-2">
                                             <ShieldCheck className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /> Compliance Pulse
                                         </div>
                                         <div className="space-y-4">
                                             {serviceChecklist.map((item) => (
                                                <div key={item.label} className="flex items-center justify-between border-b border-white/5 pb-4">
                                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.label}</span>
                                                    <span className={`text-base font-black ${item.tone}`}>{item.value}</span>
                                                </div>
                                             ))}
                                         </div>
                                     </div>
                                </div>
                            </ScrollReveal>

                            <section className="grid gap-10 xl:grid-cols-2">
                                <ScrollReveal direction="up" delay={0.1}>
                                    <div className="rounded-2xl sm:rounded-3xl border border-white bg-white/70 p-5 sm:p-7 lg:p-10 shadow-3xl shadow-slate-200/30 backdrop-blur-2xl relative accent-pattern-blue">
                                        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-8 lg:mb-10">
                                            <h2 className="text-lg sm:text-2xl font-serif font-black text-slate-950">Quick Maneuvers</h2>
                                            <div className="rounded-full bg-slate-100 px-2 sm:px-4 py-1 sm:py-1.5 text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-slate-700 whitespace-nowrap text-center">Jump To Section</div>
                                        </div>
                                        <div className="grid gap-2 sm:gap-3 lg:gap-4">
                                            {quickActions.map((action) => (
                                                <button
                                                    key={action.label}
                                                    type="button"
                                                    onClick={() => setActiveTab(action.tab)}
                                                    className="group flex w-full items-center gap-3 sm:gap-4 lg:gap-5 rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 lg:p-6 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-xl sm:hover:shadow-2xl hover:border-brand-blue/20"
                                                >
                                                    <div className={`flex h-10 sm:h-12 lg:h-14 w-10 sm:w-12 lg:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl lg:rounded-[1.25rem] bg-gradient-to-br ${action.color} text-white shadow-lg`}>
                                                        <action.icon size={16} sm:size={18} lg:size={22} />
                                                    </div>
                                                    <div className="min-w-0 flex-1 text-left">
                                                        <div className="text-xs sm:text-sm lg:text-lg font-black text-slate-900 group-hover:text-brand-blue transition-colors">{action.label}</div>
                                                        <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs font-bold text-slate-700 italic line-clamp-1">{action.description}</div>
                                                    </div>
                                                    <div className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10 flex items-center justify-center rounded-lg sm:rounded-lg lg:rounded-xl bg-slate-50 text-slate-600 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors shrink-0">
                                                        <ArrowUpRight size={14} sm:size={16} lg:size={20} />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3}>
                                    <div className="rounded-2xl sm:rounded-3xl border border-white bg-white/70 p-5 sm:p-7 lg:p-10 shadow-3xl shadow-slate-200/30 backdrop-blur-2xl relative accent-pattern">
                                        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-8 lg:mb-10">
                                            <h2 className="text-lg sm:text-2xl font-serif font-black text-slate-950">Desk Atmosphere</h2>
                                            <div className="rounded-full bg-brand-gold/10 px-2 sm:px-4 py-1 sm:py-1.5 text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-brand-gold whitespace-nowrap text-center">Local Tuning</div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                            {preferenceCards.map((item) => (
                                                <div key={item.key} className="flex items-center justify-between gap-3 sm:gap-5 rounded-lg sm:rounded-xl lg:rounded-[2.5rem] border border-slate-200 bg-white/60 p-3 sm:p-4 lg:p-6 backdrop-blur transition-all duration-300 hover:border-brand-gold/20">
                                                    <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center">
                                                        <div className="flex h-9 sm:h-10 lg:h-12 w-9 sm:w-10 lg:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-lg lg:rounded-2xl bg-slate-950 text-brand-gold shadow-lg">
                                                            <item.icon size={14} sm:size={16} lg:size={20} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-xs sm:text-sm lg:text-base font-black text-slate-900">{item.title}</div>
                                                            <p className="mt-0.5 text-[8px] sm:text-[10px] lg:text-[11px] font-medium text-slate-700 line-clamp-1 italic">{item.description}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAdminSetting(item.key)}
                                                        className={`relative h-6 sm:h-7 lg:h-8 w-11 sm:w-12 lg:w-14 shrink-0 rounded-full transition-all duration-500 shadow-inner ${adminSettings[item.key] ? 'bg-brand-gold' : 'bg-slate-200'}`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 sm:top-1.5 h-4 sm:h-5 lg:h-5 w-4 sm:w-5 lg:w-5 rounded-full bg-white shadow-xl transition-all duration-500 ${adminSettings[item.key] ? 'left-5 sm:left-6 lg:left-7' : 'left-1'}`}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>
                        </div>
                    )}
                </div>

                <ConfirmPopup
                    open={logoutPopupOpen}
                    onCancel={() => setLogoutPopupOpen(false)}
                    onConfirm={handleLogout}
                    title="Terminate Executive Session?"
                    confirmLabel="Confirm Exit"
                    cancelLabel="Stay Active"
                />
                <SuccessPopup
                    open={Boolean(authPopup)}
                    onClose={() => setAuthPopup(null)}
                    title={authPopup?.title || 'Login Success!'}
                    message={authPopup?.message || 'Your admin desk is live now.'}
                    eyebrow="Identity Verified"
                    subtitle="Strategic Access Granted"
                    helperText=""
                    showButton={false}
                    showClose={false}
                    variant="auth-card"
                    autoHideMs={2200}
                />
            </main>
        </div>
    );
};

export default AdminDashboard;
