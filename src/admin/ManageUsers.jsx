import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, serverTimestamp, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ShieldCheck, UserRound, Mail, Fingerprint, Search, ShieldAlert, ArrowUpRight, Sparkles, UserCircle2, Trash2, AlertCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { getAdminEmail } from '../lib/userProfile';
import ScrollReveal from '../components/ui/ScrollReveal';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [deleteModal, setDeleteModal] = useState({ show: false, user: null });

    useEffect(() => {
        if (!db) return undefined;

        const unsubscribe = onSnapshot(
            collection(db, 'users'),
            (snapshot) => {
                const nextUsers = snapshot.docs
                    .map((entry) => ({ id: entry.id, ...entry.data() }))
                    .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                setUsers(nextUsers);
            },
            (listenerError) => {
                console.error('Users listener failed', listenerError);
                setError('Users load nahi ho pa rahe.');
            }
        );

        return unsubscribe;
    }, []);

    const syncRole = async (userId, email) => {
        if (!db) return;

        const nextRole = email?.trim().toLowerCase() === getAdminEmail() ? 'admin' : 'user';
        await setDoc(
            doc(db, 'users', userId),
            { role: nextRole, updatedAt: serverTimestamp() },
            { merge: true }
        );
    };

    const deleteUser = async (userId) => {
        if (!db) return;
        try {
            await deleteDoc(doc(db, 'users', userId));
            setDeleteModal({ show: false, user: null });
            setError('');
        } catch (err) {
            setError('User delete karte time error aaya.');
            console.error('Delete error:', err);
        }
    };

    const filteredUsers = users.filter(user => 
        !searchTerm || [user.name, user.email, user.id, user.role].some(val => 
            val?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-10">
            <div className="admin-glass p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600">
                             <Fingerprint className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Identity Registry
                        </div>
                        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-serif font-black text-brand-dark">Traveler Accounts</h2>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 sm:mt-2 uppercase tracking-widest leading-relaxed">{users.length} identity profiles currently indexed</p>
                    </div>

                    <div className="relative w-full xl:w-80 group">
                        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors w-4 h-4 sm:w-5 sm:h-5" />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search identities..." 
                            className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 pl-11 sm:pl-14 pr-5 sm:pr-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-indigo-500 shadow-sm" 
                        />
                    </div>
                </div>

                {error && <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-rose-500">{error}</div>}

                <div className="grid gap-6 sm:grid-cols-2">
                    {filteredUsers.map((user, i) => (
                        <ScrollReveal key={user.id} direction="up" delay={i * 0.05}>
                            <div className="premium-card rounded-2xl sm:rounded-[2.5rem] border border-slate-100 bg-white p-4 sm:p-6 transition-all duration-500 hover:border-indigo-200 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-50 transition-colors" />
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-brand-dark text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                                                <UserCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-base sm:text-xl font-serif font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{user.name || 'Anonymous Traveler'}</h3>
                                                <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700 mt-0.5 sm:mt-1 truncate">
                                                     <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold shrink-0" /> {user.email || 'Privacy Shield On'}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[7px] sm:text-[9px] font-black uppercase tracking-widest border shadow-sm shrink-0 ${
                                            user.role === 'admin' 
                                            ? 'bg-brand-gold text-brand-dark border-brand-gold/20' 
                                            : 'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </div>

                                    <div className="mt-auto space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-2 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-slate-700 truncate">
                                            <Fingerprint className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> UID: {user.id.slice(0,12)}...
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button 
                                                type="button" 
                                                onClick={() => syncRole(user.id, user.email)} 
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-brand-dark text-white px-3 sm:px-4 py-3 sm:py-3.5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-slate-900 transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                                            >
                                                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" />
                                                Invite
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteModal({ show: true, user })}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-transparent hover:border-rose-600 cursor-pointer shadow-sm hover:shadow-md shrink-0"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="col-span-full admin-glass py-24 text-center border-dashed border-2 border-slate-200 bg-slate-100/50 rounded-[3rem]">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-slate-900 shadow-sm text-slate-700 mb-8">
                                <ShieldAlert size={48} />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-slate-900">Zero Signals</h3>
                            <p className="mt-4 text-slate-700 font-bold uppercase tracking-widest text-xs">No identity matches your specific search parameters.</p>
                            <button onClick={() => setSearchTerm('')} className="mt-10 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline mx-auto cursor-pointer">Reset Radar</button>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteModal.show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-100 mx-auto mb-4">
                                <AlertCircle className="text-rose-600" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">Delete User</h3>
                            <p className="text-center text-slate-600 mb-6">
                                Are you sure you want to delete <span className="font-bold text-slate-900">{deleteModal.user?.name}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteModal({ show: false, user: null })}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteUser(deleteModal.user?.id)}
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

export default ManageUsers;
