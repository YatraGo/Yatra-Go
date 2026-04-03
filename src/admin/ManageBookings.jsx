import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { CalendarDays, CalendarClock, Mail, UserRound, Phone, MapPin, Search, CheckCircle2, Clock, XCircle, RefreshCw, Sparkles, Filter, Trash2, AlertCircle } from 'lucide-react';
import { db } from '../firebase/config';
import ScrollReveal from '../components/ui/ScrollReveal';

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusStyles = {
    pending: 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-900/5',
    confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-900/5',
    completed: 'bg-brand-blue/5 text-brand-blue border-brand-blue/10 shadow-brand-blue/5',
    cancelled: 'bg-rose-50 text-rose-500 border-rose-100 shadow-rose-900/5',
};

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [error, setError] = useState('');
    const [deleteModal, setDeleteModal] = useState({ show: false, booking: null });

    useEffect(() => {
        if (!db) return undefined;

        const unsubscribe = onSnapshot(
            collection(db, 'bookings'),
            (snapshot) => {
                const nextBookings = snapshot.docs
                    .map((entry) => ({ id: entry.id, ...entry.data() }))
                    .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                setBookings(nextBookings);
            },
            (listenerError) => {
                console.error('Bookings listener failed', listenerError);
                setError('Bookings load nahi ho pa rahi.');
            }
        );

        return unsubscribe;
    }, []);

    const updateStatus = async (bookingId, status) => {
        if (!db) return;
        await setDoc(doc(db, 'bookings', bookingId), { status, updatedAt: serverTimestamp() }, { merge: true });
    };

    const deleteBooking = async (bookingId) => {
        if (!db) return;
        try {
            await deleteDoc(doc(db, 'bookings', bookingId));
            setDeleteModal({ show: false, booking: null });
            setError('');
        } catch (err) {
            setError('Booking delete karte time error aaya.');
            console.error('Delete error:', err);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = !searchTerm || [
            booking.packageTitle, 
            booking.customerName, 
            booking.customerEmail, 
            booking.destination,
            booking.id
        ].some(val => val?.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10">
            <div className="admin-glass p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-blue">
                             <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Reservation Desk
                        </div>
                        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-serif font-black text-brand-dark">Manage Bookings</h2>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 sm:mt-2 uppercase tracking-widest leading-relaxed">{bookings.length} reservations currently in pipeline</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full xl:w-auto">
                        <div className="relative flex-1 sm:w-80 group">
                            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-blue transition-colors w-4 h-4 sm:w-5 sm:h-5" />
                            <input 
                                type="text" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search reservations..." 
                                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/50 pl-11 sm:pl-14 pr-5 sm:pr-6 py-3.5 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-blue shadow-sm" 
                            />
                        </div>
                        <div className="relative group flex-1 md:flex-none">
                            <Filter className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full md:w-48 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/50 pl-11 sm:pl-14 pr-8 sm:pr-10 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-blue shadow-sm appearance-none cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {error && <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-rose-500">{error}</div>}

                <div className="space-y-6">
                    {filteredBookings.map((booking, i) => (
                        <ScrollReveal key={booking.id} direction="up" delay={i * 0.05}>
                            <div className="premium-card rounded-[2.5rem] border border-slate-200 bg-white p-7 lg:p-8 transition-all duration-500 hover:border-brand-blue/30 group">
                                <div className="flex flex-col xl:flex-row xl:items-start gap-8">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className="text-2xl font-serif font-black text-slate-900 group-hover:text-brand-blue transition-colors">{booking.packageTitle}</h3>
                                            <div className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border shadow-sm ${statusStyles[booking.status || 'pending']}`}>
                                                {booking.status || 'pending'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700">
                                                    <UserRound className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue shrink-0" /> Traveler
                                                </div>
                                                <p className="font-serif font-black text-sm sm:text-base text-slate-900 truncate">{booking.customerName || 'Explorer'}</p>
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700">
                                                    <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold shrink-0" /> Correspondence
                                                </div>
                                                <p className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">{booking.customerEmail || 'No Email'}</p>
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700">
                                                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 shrink-0" /> Target
                                                </div>
                                                <p className="font-serif font-black text-sm sm:text-base text-slate-900 truncate">{booking.destination || 'Uttarakhand'}</p>
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700">
                                                    <CalendarDays className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 shrink-0" /> Dates
                                                </div>
                                                <p className="font-serif font-black text-sm sm:text-base text-slate-900 truncate">{booking.travelDate || 'Discussion'}</p>
                                            </div>
                                        </div>

                                        {booking.notes && (
                                            <div className="rounded-xl sm:rounded-2xl bg-brand-gold/5 border border-brand-gold/10 p-4 sm:p-5 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed italic relative">
                                                <Sparkles className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 text-brand-gold w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                {booking.notes}
                                            </div>
                                        )}
                                        
                                        <div className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-slate-700">REQ_ID: #{booking.id.slice(0,10)}</div>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:gap-6 shrink-0 w-full xl:w-64 border-t xl:border-t-0 xl:border-l border-slate-50 pt-5 xl:pt-0 xl:pl-8">
                                        <div className="rounded-xl sm:rounded-[1.5rem] bg-slate-100/50 p-4 sm:p-5 border border-slate-200 group-hover:bg-brand-blue/5 transition-colors">
                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700">Group Size</span>
                                                <UserRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue" />
                                            </div>
                                            <div className="font-serif font-black text-xl sm:text-2xl text-slate-900">{booking.travelers || 1} <span className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-widest">Persons</span></div>
                                        </div>
                                        
                                        <div className="space-y-2 sm:space-y-3">
                                            <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-700 ml-1 sm:ml-2">Pipeline Status</label>
                                            <div className="relative group/sel">
                                                <select 
                                                    value={booking.status || 'pending'} 
                                                    onChange={(e) => updateStatus(booking.id, e.target.value)} 
                                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:border-brand-blue shadow-sm appearance-none cursor-pointer"
                                                >
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                                <RefreshCw className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-hover/sel:rotate-180 transition-transform duration-700 w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setDeleteModal({ show: true, booking })}
                                            className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-rose-200 hover:border-rose-600 cursor-pointer text-xs sm:text-sm"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    {filteredBookings.length === 0 && (
                        <div className="admin-glass py-24 text-center border-dashed border-2 border-slate-200 bg-slate-100/50 rounded-[3rem]">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-slate-900 shadow-sm text-slate-600 mb-8">
                                <CalendarClock size={48} />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-slate-900">No Pipeline Data</h3>
                            <p className="mt-4 text-slate-700 font-bold uppercase tracking-widest text-xs">No reservations match your current radar scan.</p>
                             <button onClick={() => {setSearchTerm(''); setStatusFilter('all');}} className="mt-10 text-brand-blue font-black uppercase tracking-widest text-xs hover:underline mx-auto cursor-pointer">Calibrate Radar</button>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteModal.show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-100 mx-auto mb-4">
                                <AlertCircle className="text-rose-600" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">Delete Booking</h3>
                            <p className="text-center text-slate-600 mb-6">
                                Are you sure you want to delete the booking for <span className="font-bold text-slate-900">{deleteModal.booking?.packageTitle}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteModal({ show: false, booking: null })}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteBooking(deleteModal.booking?.id)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBookings;
