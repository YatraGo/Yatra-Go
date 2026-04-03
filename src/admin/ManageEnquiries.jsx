import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { Mail, Phone, UserRound, MapPin, MessageSquare, Search, Filter, Trash2, CheckCircle2, Clock, Sparkles, RefreshCw, Archive } from 'lucide-react';
import { db } from '../firebase/config';
import ScrollReveal from '../components/ui/ScrollReveal';

const statuses = ['new', 'responded', 'archived'];

const statusStyles = {
    new: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20 shadow-brand-gold/5',
    responded: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-900/5',
    archived: 'bg-slate-100 text-slate-700 border-slate-200 shadow-slate-900/5',
};

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!db) return undefined;

        const unsubscribe = onSnapshot(
            collection(db, 'enquiries'),
            (snapshot) => {
                const nextEnquiries = snapshot.docs
                    .map((entry) => ({ id: entry.id, ...entry.data() }))
                    .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                setEnquiries(nextEnquiries);
            },
            (err) => {
                console.error('Enquiries listener failed', err);
                setError('Enquiries load nahi ho pa rahi hain.');
            }
        );

        return unsubscribe;
    }, []);

    const updateStatus = async (id, status) => {
        if (!db) return;
        await setDoc(doc(db, 'enquiries', id), { status, updatedAt: serverTimestamp() }, { merge: true });
    };

    const deleteEnquiry = async (id) => {
        if (!db) return;
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            await deleteDoc(doc(db, 'enquiries', id));
        }
    };

    const filteredEnquiries = enquiries.filter(enquiry => {
        const matchesSearch = !searchTerm || [
            enquiry.name,
            enquiry.email,
            enquiry.phone,
            enquiry.destination,
            enquiry.message
        ].some(val => val?.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-10">
            <div className="admin-glass p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-dark">
                             <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" /> Communication Hub
                        </div>
                        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-serif font-black text-brand-dark">User Enquiries</h2>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 sm:mt-2 uppercase tracking-widest leading-relaxed">{enquiries.length} messages currently in queue</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full xl:w-auto">
                        <div className="relative flex-1 sm:w-80 group">
                            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-gold transition-colors w-4 h-4 sm:w-5 sm:h-5" />
                            <input 
                                type="text" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search messages..." 
                                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/50 pl-11 sm:pl-14 pr-5 sm:pr-6 py-3.5 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-gold shadow-sm" 
                            />
                        </div>
                        <div className="relative group flex-1 md:flex-none">
                            <Filter className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full md:w-48 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/50 pl-11 sm:pl-14 pr-8 sm:pr-10 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-gold shadow-sm appearance-none cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {error && <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-rose-500">{error}</div>}

                <div className="space-y-6">
                    {filteredEnquiries.map((enquiry, i) => (
                        <ScrollReveal key={enquiry.id} direction="up" delay={i * 0.05}>
                            <div className="premium-card rounded-[2.5rem] border border-slate-200 bg-white p-7 lg:p-8 transition-all duration-500 hover:border-brand-gold/30 group">
                                <div className="flex flex-col xl:flex-row xl:items-start gap-8">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className="text-2xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors">{enquiry.name}</h3>
                                            <div className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border shadow-sm ${statusStyles[enquiry.status || 'new']}`}>
                                                {enquiry.status || 'new'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold shrink-0" /> Correspondence
                                                </div>
                                                <p className="font-bold text-[10px] sm:text-xs text-slate-700 truncate">{enquiry.email}</p>
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 shrink-0" /> WhatsApp/Call
                                                </div>
                                                <p className="font-bold text-[10px] sm:text-xs text-slate-700 truncate">{enquiry.phone}</p>
                                            </div>
                                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue shrink-0" /> Target Sector
                                                </div>
                                                <p className="font-serif font-black text-sm sm:text-base text-slate-900 truncate">{enquiry.destination}</p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 p-4 sm:p-6 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic relative group-hover:bg-slate-50 transition-colors duration-500">
                                            <Sparkles className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 text-brand-gold w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            {enquiry.message}
                                        </div>
                                        
                                        <div className="flex items-center justify-between gap-3 flex-wrap">
                                            <div className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-slate-700">MSG_ID: #{enquiry.id.slice(0,10)}</div>
                                            <div className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-1.5 sm:gap-2">
                                                <Clock className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5" /> {formatDate(enquiry.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:gap-6 shrink-0 w-full xl:w-64 border-t xl:border-t-0 xl:border-l border-slate-50 pt-5 xl:pt-0 xl:pl-8">
                                        <div className="space-y-2 sm:space-y-3">
                                            <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-700 ml-1 sm:ml-2">Workflow Status</label>
                                            <div className="relative group/sel">
                                                <select 
                                                    value={enquiry.status || 'new'} 
                                                    onChange={(e) => updateStatus(enquiry.id, e.target.value)} 
                                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:border-brand-gold shadow-sm appearance-none cursor-pointer"
                                                >
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                                <RefreshCw className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-hover/sel:rotate-180 transition-transform duration-700 w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2 sm:gap-3">
                                            <button 
                                                onClick={() => updateStatus(enquiry.id, 'responded')}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-brand-dark text-white px-3 sm:px-4 py-3 sm:py-3.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all duration-300 shadow-md active:scale-95"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Responded</span><span className="xs:hidden">Set Resp.</span>
                                            </button>
                                            <button 
                                                onClick={() => deleteEnquiry(enquiry.id)}
                                                className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-300 border border-rose-100 shadow-sm"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    {filteredEnquiries.length === 0 && (
                        <div className="admin-glass py-24 text-center border-dashed border-2 border-slate-200 bg-slate-100/50 rounded-[3rem]">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-slate-900 shadow-sm text-slate-600 mb-8">
                                <MessageSquare size={48} />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-slate-900">No Signal Detected</h3>
                            <p className="mt-4 text-slate-700 font-bold uppercase tracking-widest text-xs">No user signals match your current focus.</p>
                             <button onClick={() => {setSearchTerm(''); setStatusFilter('all');}} className="mt-10 text-brand-gold font-black uppercase tracking-widest text-xs hover:underline mx-auto">Reset Focus</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageEnquiries;
