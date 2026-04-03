import React, { useEffect, useMemo, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { 
    Edit2, 
    Plus, 
    Save, 
    Search, 
    Trash2, 
    UploadCloud, 
    Sparkles, 
    MapPin, 
    Trophy, 
    Clock, 
    Wallet,
    Package,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/ui';
import { db } from '../firebase/config';
import { PACKAGES } from '../data/packages';
import ScrollReveal from '../components/ui/ScrollReveal';

const emptyForm = {
    title: '',
    slug: '',
    location: '',
    region: '',
    days: '',
    price: '',
    imageUrl: '',
    status: 'active',
};

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [feedback, setFeedback] = useState('');
    const [saving, setSaving] = useState(false);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        if (!db) return undefined;

        const unsubscribe = onSnapshot(
            collection(db, 'packages'),
            (snapshot) => {
                const nextPackages = snapshot.docs
                    .map((entry) => ({ id: entry.id, ...entry.data() }))
                    .sort((left, right) => (right.createdAt?.seconds || 0) - (left.createdAt?.seconds || 0));
                setPackages(nextPackages);
            },
            (error) => {
                console.error('Packages listener failed', error);
                setFeedback('Packages load nahi ho pa rahe. Firestore rules check karo.');
            }
        );

        return unsubscribe;
    }, []);

    const filteredPackages = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();
        if (!search) return packages;
        return packages.filter((pkg) =>
            [pkg.title, pkg.location, pkg.region, pkg.slug]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(search))
        );
    }, [packages, searchTerm]);

    const resetForm = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!db) return;

        setSaving(true);
        setFeedback('');

        try {
            const payload = {
                title: form.title.trim(),
                slug: form.slug.trim(),
                location: form.location.trim(),
                region: form.region.trim(),
                days: form.days.trim(),
                price: Number(form.price || 0),
                imageUrl: form.imageUrl.trim(),
                status: form.status,
                updatedAt: serverTimestamp(),
            };

            if (editingId) {
                await setDoc(doc(db, 'packages', editingId), payload, { merge: true });
                setFeedback('Package successfully updated.');
            } else {
                await addDoc(collection(db, 'packages'), {
                    ...payload,
                    createdAt: serverTimestamp(),
                });
                setFeedback('New package added to Firestore.');
            }

            resetForm();
        } catch (error) {
            console.error('Package save failed', error);
            setFeedback('Package save nahi ho paya. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (pkg) => {
        setEditingId(pkg.id);
        setForm({
            title: pkg.title || '',
            slug: pkg.slug || '',
            location: pkg.location || '',
            region: pkg.region || '',
            days: pkg.days || '',
            price: pkg.price || '',
            imageUrl: pkg.imageUrl || '',
            status: pkg.status || 'active',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!db) return;
        if (window.confirm('Are you sure you want to delete this package?')) {
            await deleteDoc(doc(db, 'packages', id));
        }
    };

    const handleSeedPackages = async () => {
        if (!db) return;

        setSeeding(true);
        setFeedback('');

        try {
            await Promise.all(
                PACKAGES.map((pkg) =>
                    setDoc(
                        doc(db, 'packages', pkg.slug),
                        {
                            title: pkg.title,
                            slug: pkg.slug,
                            location: pkg.location,
                            region: pkg.region,
                            days: pkg.days,
                            price: pkg.price,
                            imageUrl: pkg.image || '',
                            status: 'active',
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp(),
                        },
                        { merge: true }
                    )
                )
            );

            setFeedback('Featured packages imported into Firestore.');
        } catch (error) {
            console.error('Package seed failed', error);
            setFeedback('Package import nahi ho paya.');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-10">
            <div className="grid xl:grid-cols-[420px_1fr] gap-6 sm:gap-10 items-start">
                {/* 🌟 PREMIUM CREATE FORM */}
                <form onSubmit={handleSubmit} className="admin-glass p-6 sm:p-8 lg:p-10 sticky top-4 lg:top-10">
                    <div className="mb-6 sm:mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-dark">
                            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" /> Inventory Desk
                        </div>
                        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-serif font-black text-brand-dark">{editingId ? 'Edit Expedition' : 'Curate Journey'}</h2>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 sm:mt-2 uppercase tracking-widest leading-relaxed">Defining high-impact travel experiences</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1.5 sm:space-y-2">
                             <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Expedition Title</label>
                             <input 
                                value={form.title} 
                                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} 
                                placeholder="e.g. Valley of Flowers Trek" 
                                className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5" 
                                required 
                             />
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                             <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Unique Slug</label>
                             <input 
                                value={form.slug} 
                                onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} 
                                placeholder="valley-trek-2024" 
                                className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5" 
                                required 
                             />
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Destination</label>
                                <input value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} placeholder="Joshimath" className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold" required />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Region</label>
                                <input value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))} placeholder="Garhwal" className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Duration</label>
                                <input value={form.days} onChange={(event) => setForm((current) => ({ ...current, days: event.target.value }))} placeholder="5 Days" className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Price (Rs.)</label>
                                <input type="number" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} placeholder="12500" className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold" required />
                            </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Display Image URL</label>
                            <div className="relative">
                                <UploadCloud className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                <input 
                                    value={form.imageUrl} 
                                    onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} 
                                    placeholder="https://images.unsplash.com/..." 
                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 pl-11 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold outline-none transition-all focus:bg-white focus:border-brand-gold" 
                                />
                            </div>
                            {form.imageUrl && (
                                <div className="mt-2 rounded-xl overflow-hidden h-20 border border-slate-100">
                                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL'} />
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 sm:ml-2">Catalog Status</label>
                            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-gold appearance-none">
                                <option value="active">Active Listing</option>
                                <option value="draft">Draft Protocol</option>
                                <option value="archived">Vault Records</option>
                            </select>
                        </div>
                    </div>

                    {feedback && (
                        <div className="mt-8 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 px-5 py-4 text-xs font-black uppercase tracking-widest text-brand-dark flex items-center gap-3">
                            <Sparkles size={16} className="text-brand-gold" /> {feedback}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 mt-8 sm:mt-10">
                        <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 bg-brand-dark text-white font-black px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:bg-brand-gold transition-all duration-300 shadow-xl shadow-brand-dark/10 disabled:opacity-50 text-[11px] sm:text-sm">
                            {saving ? 'Processing...' : editingId ? <><Edit2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" /> Sync Expedition</> : <><Plus className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" /> Finalize Protocol</>}
                        </button>
                        <button type="button" onClick={handleSeedPackages} disabled={seeding} className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-slate-100 text-slate-400 font-black px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:border-brand-dark hover:text-brand-dark transition-all duration-300 text-[11px] sm:text-sm">
                             <UploadCloud className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" /> {seeding ? 'Importing...' : 'Sync Featured Base'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-dark transition-colors">Abort Editing</button>
                        )}
                    </div>
                </form>

                {/* 🌟 PREMIUM PACKAGE LIST */}
                <div className="space-y-6 sm:space-y-8">
                    <div className="admin-glass p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark">Expedition Registry</h2>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 sm:mt-2 uppercase tracking-widest leading-relaxed">{packages.length} protocol(s) currently active</p>
                            </div>
                            <div className="relative w-full sm:w-80 group">
                                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors w-4 h-4 sm:w-5 sm:h-5" />
                                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Filter catalog..." className="w-full rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 pl-11 sm:pl-14 pr-5 sm:pr-6 py-3.5 sm:py-4 text-[10px] sm:text-xs font-black uppercase tracking-widest outline-none transition-all focus:bg-white focus:border-brand-gold shadow-sm" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredPackages.map((pkg, i) => (
                                <ScrollReveal key={pkg.id} direction="up" delay={i * 0.05}>
                                    <div className="premium-card rounded-2xl sm:rounded-[2.5rem] border border-slate-100 bg-white p-5 sm:p-6 transition-all duration-500 hover:border-brand-gold/30 group">
                                        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 items-start justify-between">
                                            <div className="w-full lg:w-48 h-40 sm:h-48 lg:h-32 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                                                {pkg.imageUrl ? (
                                                    <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                                                        <Package className="w-6 h-6 sm:w-8 sm:h-8" />
                                                        <span className="text-[8px] font-black uppercase tracking-widest mt-2">No Visual</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                    <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors truncate">{pkg.title}</h3>
                                                    <span className={`px-3 sm:px-4 py-1 sm:py-1.5 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full shadow-sm border ${
                                                        pkg.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                        pkg.status === 'draft' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                        'bg-slate-50 text-slate-500 border-slate-100'
                                                    }`}>
                                                        {pkg.status} protocol
                                                    </span>
                                                </div>
                                                
                                                <div className="mt-5 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            <MapPin size={12} className="text-brand-gold" /> Territory
                                                        </div>
                                                        <p className="font-serif font-black text-slate-900">{pkg.location}</p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            <Trophy size={12} className="text-brand-blue" /> Sector
                                                        </div>
                                                        <p className="font-serif font-black text-slate-900">{pkg.region}</p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            <Clock size={12} className="text-orange-500" /> Duration
                                                        </div>
                                                        <p className="font-serif font-black text-slate-900">{pkg.days || '--'}</p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            <Wallet size={12} className="text-brand-gold" /> Fee
                                                        </div>
                                                        <p className="text-xl font-serif font-black text-brand-gold">₹{pkg.price?.toLocaleString('en-IN')}</p>
                                                    </div>
                                                </div>
                                                
                                                <p className="mt-5 sm:mt-6 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-slate-300">ID: #{pkg.id.slice(0,8)}... · Protocol Slug: {pkg.slug}</p>
                                            </div>

                                            <div className="flex shrink-0 gap-2 sm:gap-3 lg:gap-3 place-self-end lg:place-self-start mt-4 lg:mt-0">
                                                <button onClick={() => handleEdit(pkg)} className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl sm:rounded-2xl bg-brand-gold/10 text-brand-gold hover:bg-brand-dark hover:text-white transition-all shadow-sm">
                                                    <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(pkg.id)} className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl sm:rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}

                            {filteredPackages.length === 0 && (
                                <div className="admin-glass py-24 text-center border-dashed border-2 border-slate-100 bg-slate-50/50">
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white shadow-sm text-slate-300 mb-8">
                                        <Package size={48} />
                                    </div>
                                    <h3 className="text-3xl font-serif font-black text-slate-900">Signals Missing</h3>
                                    <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">No expeditions match your current filter parameters.</p>
                                    <button onClick={() => setSearchTerm('')} className="mt-10 text-brand-gold font-black uppercase tracking-widest text-xs hover:underline flex items-center gap-2 mx-auto">Reset Signal <ArrowUpRight size={14} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePackages;
