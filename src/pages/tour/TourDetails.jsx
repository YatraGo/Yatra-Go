import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    HeartHandshake,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    XCircle,
} from 'lucide-react';
import { Button, SuccessPopup } from '../../components/ui';
import { ALL_PACKAGES, formatPrice, getPackageBySlug } from '../../data/packages';
import { useAuth } from '../../context/AuthContext';
import { submitWeb3Form } from '../../lib/web3forms';

const travelStyles = [
    { id: 'comfort', label: 'Comfort Stay', note: 'Balanced hotel + sightseeing flow' },
    { id: 'premium', label: 'Premium Escape', note: 'Better rooms and smoother transfers' },
    { id: 'family', label: 'Family Focused', note: 'Pacing designed for mixed age groups' },
];

const contactModes = [
    { id: 'email', label: 'Email First' },
    { id: 'call', label: 'Quick Call Back' },
    { id: 'dashboard', label: 'Dashboard Follow-up' },
];

const monthOptions = [
    'As soon as possible',
    'Next 30 days',
    'April - June',
    'July - September',
    'October - December',
    'Flexible dates',
];

const badgeTones = {
    BESTSELLER: 'bg-brand-gold text-brand-dark',
    TRENDING: 'bg-orange-500 text-white',
    POPULAR: 'bg-sky-500 text-white',
    WEEKEND: 'bg-violet-500 text-white',
    WILDLIFE: 'bg-emerald-600 text-white',
    SNOW: 'bg-cyan-500 text-white',
    PILGRIMAGE: 'bg-amber-600 text-white',
    CULTURAL: 'bg-indigo-500 text-white',
    ADVENTURE: 'bg-rose-500 text-white',
    TREKKING: 'bg-lime-600 text-white',
    HONEYMOON: 'bg-pink-500 text-white',
    SCENIC: 'bg-teal-500 text-white',
    COMPLETE: 'bg-purple-600 text-white',
};

const TourDetails = () => {
    const { slug } = useParams();
    const { currentUser, userProfile } = useAuth();
    const pkg = getPackageBySlug(slug);
    const [activeImage, setActiveImage] = useState(pkg?.gallery?.[0] || pkg?.img || '');
    const [travelers, setTravelers] = useState(2);
    const [travelStyle, setTravelStyle] = useState('comfort');
    const [departureWindow, setDepartureWindow] = useState(monthOptions[0]);
    const [contactMode, setContactMode] = useState('email');
    const [submitting, setSubmitting] = useState(false);
    const [requestError, setRequestError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [requestForm, setRequestForm] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const relatedPackages = useMemo(() => {
        if (!pkg) return [];

        return ALL_PACKAGES
            .filter((item) => item.slug !== pkg.slug && item.region === pkg.region)
            .slice(0, 3);
    }, [pkg]);

    const plannerSummary = useMemo(() => {
        if (!pkg) return '';

        const selectedStyle = travelStyles.find((item) => item.id === travelStyle)?.label || 'Comfort Stay';
        const selectedContact = contactModes.find((item) => item.id === contactMode)?.label || 'Email First';

        return [
            `Package: ${pkg.title}`,
            `Travelers: ${travelers}`,
            `Travel style: ${selectedStyle}`,
            `Preferred departure: ${departureWindow}`,
            `Preferred contact: ${selectedContact}`,
        ].join(' | ');
    }, [pkg, travelers, travelStyle, departureWindow, contactMode]);

    useEffect(() => {
        setRequestForm((current) => ({
            ...current,
            name: userProfile?.name || currentUser?.displayName || '',
            email: currentUser?.email || '',
            phone: userProfile?.phone || '',
        }));
    }, [currentUser, userProfile]);

    if (!pkg) {
        return <Navigate to="/tour-packages" replace />;
    }

    const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;
    const gallery = pkg.gallery?.length ? pkg.gallery : [pkg.img];
    const selectedContactLabel = contactModes.find((item) => item.id === contactMode)?.label || 'Email First';

    const handleBookingRequest = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setRequestError('');

        try {
            await submitWeb3Form({
                subject: `${pkg.title} Package Booking Request`,
                replyTo: requestForm.email,
                fields: {
                    inquiry_type: 'Package Page Booking Request',
                    package_title: pkg.title,
                    region: pkg.region,
                    destination: pkg.location,
                    travelers: String(travelers),
                    travel_style: travelStyles.find((item) => item.id === travelStyle)?.label || 'Comfort Stay',
                    preferred_departure: departureWindow,
                    preferred_contact: selectedContactLabel,
                    customer_name: requestForm.name.trim(),
                    customer_email: requestForm.email.trim(),
                    customer_phone: requestForm.phone.trim(),
                    trip_summary: plannerSummary,
                    notes: requestForm.notes.trim() || 'No extra notes provided.',
                    estimated_budget: formatPrice(pkg.price * travelers),
                },
            });

            setShowSuccess(true);
            setRequestForm((current) => ({
                ...current,
                notes: '',
            }));
        } catch (error) {
            console.error('Package booking request failed', error);
            setRequestError('Booking request mail abhi send nahi ho pa rahi. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-[linear-gradient(180deg,_#f6f1e5_0%,_#ffffff_34%,_#eef4fb_100%)]">
            <Helmet>
                <title>{`${pkg.title} | Yatra Go`}</title>
                <meta name="description" content={`${pkg.title} by Yatra Go. ${pkg.desc}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Product',
                        name: pkg.title,
                        image: gallery,
                        description: pkg.desc,
                        brand: { '@type': 'Brand', name: 'Yatra Go' },
                        offers: {
                            '@type': 'Offer',
                            priceCurrency: 'INR',
                            price: pkg.price,
                            availability: 'https://schema.org/InStock',
                            url: `https://yatrago.com/tour/${pkg.slug}`,
                        },
                    })}
                </script>
            </Helmet>

            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={activeImage} alt={pkg.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.92)_10%,_rgba(15,23,42,0.60)_45%,_rgba(15,23,42,0.78)_100%)]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${badgeTones[pkg.tag] || 'bg-white text-slate-900'}`}>
                                    {pkg.tag}
                                </span>
                                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/85">
                                    {pkg.region}
                                </span>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-serif font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                {pkg.title}
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                                {pkg.desc}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/90">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                    <MapPin size={16} /> {pkg.location}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                    <Clock3 size={16} /> {pkg.days}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                    <Star size={16} className="fill-brand-gold text-brand-gold" /> {pkg.rating} rating
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                    <Users size={16} /> {pkg.reviews}+ happy travelers
                                </span>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                {gallery.map((image, index) => (
                                    <button
                                        key={`${pkg.slug}-${index}`}
                                        type="button"
                                        onClick={() => setActiveImage(image)}
                                        className={`overflow-hidden rounded-[22px] border-2 transition-all ${
                                            activeImage === image ? 'border-brand-gold shadow-[0_10px_30px_rgba(229,186,74,0.25)]' : 'border-white/10'
                                        }`}
                                    >
                                        <img src={image} alt={`${pkg.title} ${index + 1}`} className="h-20 w-28 object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[34px] border border-white/10 bg-white/10 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.30)] backdrop-blur-xl sm:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-xs uppercase tracking-[0.24em] text-brand-gold/80">Starting from</div>
                                    <div className="mt-3 text-4xl font-black text-white">{formatPrice(pkg.price)}</div>
                                    <div className="mt-2 text-sm text-white/60">per person, customizable before final confirmation</div>
                                </div>
                                {pkg.originalPrice && (
                                    <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-right">
                                        <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">Savings</div>
                                        <div className="mt-1 text-lg font-bold text-emerald-100">{discount}% OFF</div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-white/10 px-4 py-4">
                                    <div className="text-xs uppercase tracking-[0.18em] text-white/55">Duration</div>
                                    <div className="mt-2 text-base font-bold">{pkg.days}</div>
                                </div>
                                <div className="rounded-2xl bg-white/10 px-4 py-4">
                                    <div className="text-xs uppercase tracking-[0.18em] text-white/55">Inclusions</div>
                                    <div className="mt-2 text-base font-bold">{pkg.includes?.length || 0} items</div>
                                </div>
                                <div className="rounded-2xl bg-white/10 px-4 py-4">
                                    <div className="text-xs uppercase tracking-[0.18em] text-white/55">Itinerary</div>
                                    <div className="mt-2 text-base font-bold">{pkg.itinerary?.length || 0} days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-8">
                        <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <Sparkles className="text-brand-gold" size={20} />
                                <h2 className="text-2xl font-serif font-black text-slate-950">Why this package stands out</h2>
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {pkg.highlights?.map((item) => (
                                    <div key={item} className="rounded-[24px] border border-slate-100 bg-[#fffaf1] px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-gold" />
                                            <div className="text-sm leading-7 text-slate-700">{item}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                                <h2 className="text-2xl font-serif font-black text-slate-950">What’s included</h2>
                                <div className="mt-6 space-y-3">
                                    {pkg.includes?.map((item) => (
                                        <div key={item} className="flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                                <h2 className="text-2xl font-serif font-black text-slate-950">Before you plan</h2>
                                <div className="mt-6 space-y-3">
                                    {pkg.excludes?.map((item) => (
                                        <div key={item} className="flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-900">
                                            <XCircle size={16} className="mt-0.5 shrink-0 text-rose-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="text-brand-gold" size={20} />
                                <h2 className="text-2xl font-serif font-black text-slate-950">Itinerary flow</h2>
                            </div>
                            <div className="mt-8 space-y-4">
                                {pkg.itinerary?.map((item, index) => (
                                    <div key={`${pkg.slug}-${item.day}-${index}`} className="rounded-[26px] border border-slate-100 bg-white px-5 py-5 shadow-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <div className="inline-flex rounded-full bg-[#fff3cf] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8a6420]">
                                                    {item.day}
                                                </div>
                                                <h3 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h3>
                                            </div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                Step {index + 1}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="sticky top-24 rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(148,163,184,0.16)] backdrop-blur-xl sm:p-7">
                            <div className="flex items-center gap-3">
                                <HeartHandshake className="text-brand-gold" size={20} />
                                <div>
                                    <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Unique booking option</div>
                                    <h2 className="mt-1 text-2xl font-serif font-black text-slate-950">Build your trip design board</h2>
                                </div>
                            </div>

                            <form id="package-booking-request" onSubmit={handleBookingRequest} className="mt-6 space-y-5">
                                <div>
                                    <div className="mb-3 text-sm font-semibold text-slate-700">Travelers</div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setTravelers((current) => Math.max(1, current - 1))}
                                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-bold text-slate-900"
                                        >
                                            -
                                        </button>
                                        <div className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-center text-lg font-bold text-white">
                                            {travelers} traveler{travelers > 1 ? 's' : ''}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setTravelers((current) => current + 1)}
                                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-bold text-slate-900"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-3 text-sm font-semibold text-slate-700">Travel style</div>
                                    <div className="grid gap-3">
                                        {travelStyles.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setTravelStyle(item.id)}
                                                className={`rounded-[24px] border px-4 py-4 text-left transition-all ${
                                                    travelStyle === item.id
                                                        ? 'border-brand-gold bg-[#fffaf1] shadow-sm'
                                                        : 'border-slate-200 bg-white'
                                                }`}
                                            >
                                                <div className="text-sm font-bold text-slate-950">{item.label}</div>
                                                <div className="mt-1 text-sm text-slate-500">{item.note}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-slate-700">Preferred departure window</label>
                                    <select
                                        value={departureWindow}
                                        onChange={(event) => setDepartureWindow(event.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold"
                                    >
                                        {monthOptions.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <div className="mb-3 text-sm font-semibold text-slate-700">How should we reach you?</div>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        {contactModes.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setContactMode(item.id)}
                                                className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                                                    contactMode === item.id
                                                        ? 'border-slate-950 bg-slate-950 text-white'
                                                        : 'border-slate-200 bg-white text-slate-700'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        required
                                        value={requestForm.name}
                                        onChange={(event) => setRequestForm((current) => ({ ...current, name: event.target.value }))}
                                        placeholder="Your name"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold"
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={requestForm.email}
                                        onChange={(event) => setRequestForm((current) => ({ ...current, email: event.target.value }))}
                                        placeholder="Email address"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold"
                                    />
                                </div>

                                <input
                                    type="tel"
                                    required
                                    value={requestForm.phone}
                                    onChange={(event) => setRequestForm((current) => ({ ...current, phone: event.target.value }))}
                                    placeholder="Phone number"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold"
                                />

                                <textarea
                                    rows="3"
                                    value={requestForm.notes}
                                    onChange={(event) => setRequestForm((current) => ({ ...current, notes: event.target.value }))}
                                    placeholder="Pickup city, room preference, senior citizen support, budget note..."
                                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold"
                                />
                            </form>

                            <div className="mt-6 rounded-[28px] bg-[linear-gradient(135deg,_#0f172a_0%,_#162238_55%,_#22314e_100%)] p-5 text-white">
                                <div className="text-xs uppercase tracking-[0.2em] text-brand-gold/75">Trip summary</div>
                                <div className="mt-4 space-y-3 text-sm text-slate-200">
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Package</span>
                                        <span className="font-semibold text-white">{pkg.title}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Estimated group</span>
                                        <span className="font-semibold text-white">{travelers} traveler{travelers > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Contact mode</span>
                                        <span className="font-semibold text-white">{selectedContactLabel}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Starting estimate</span>
                                        <span className="font-semibold text-white">{formatPrice(pkg.price * travelers)}</span>
                                    </div>
                                </div>
                            </div>

                            {requestError && (
                                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                    {requestError}
                                </div>
                            )}

                            <div className="mt-6 grid gap-3">
                                <button
                                    type="submit"
                                    form="package-booking-request"
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gold px-5 py-4 text-sm font-black text-slate-950 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <Mail size={18} /> {submitting ? 'Sending Request...' : 'Send Booking Request To Email'}
                                </button>

                                <a
                                    href="tel:+918979931256"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-950 px-5 py-4 text-sm font-bold text-slate-950 transition-colors hover:bg-slate-950 hover:text-white"
                                >
                                    <Phone size={18} /> Talk to booking desk
                                </a>

                                <Link to={currentUser ? '/dashboard' : '/contact'}>
                                    <Button variant="secondary" size="lg" fullWidth className="w-full">
                                        {currentUser ? 'Open dashboard booking' : 'Open contact form'}
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                                Every booking request from this page goes directly to your configured email inbox for follow-up.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_22px_70px_rgba(148,163,184,0.14)] backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-brand-gold" size={20} />
                        <h2 className="text-2xl font-serif font-black text-slate-950">Good to know</h2>
                    </div>
                    <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-3">
                        <li className="rounded-2xl bg-slate-50 px-4 py-4">
                            Pricing shown is a starting estimate and may shift with season, hotel category, and transport choice.
                        </li>
                        <li className="rounded-2xl bg-slate-50 px-4 py-4">
                            Our team can customize pickup city, room category, extra sightseeing, or elderly-friendly pacing.
                        </li>
                        <li className="rounded-2xl bg-slate-50 px-4 py-4">
                            For high-demand seasons, earlier confirmation usually gets stronger inventory and smoother logistics.
                        </li>
                    </ul>
                </div>
            </section>

            {relatedPackages.length > 0 && (
                <section className="border-t border-white/60 bg-white/60 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">More from {pkg.region}</div>
                                <h2 className="mt-2 text-3xl font-serif font-black text-slate-950">Related journeys</h2>
                            </div>
                            <Link to="/tour-packages" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-gold">
                                Explore all packages <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {relatedPackages.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={`/tour/${item.slug}`}
                                    className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
                                >
                                    <div className="h-56 shrink-0 overflow-hidden">
                                        <img src={item.img} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-2">{item.tag}</div>
                                        <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-brand-gold transition-colors line-clamp-2 min-h-[3.5rem] leading-tight mb-4">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest italic">
                                            <MapPin size={12} className="text-brand-gold" /> {item.location.split('·')[0].trim()}
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <div className="text-2xl font-black text-brand-gold">{formatPrice(item.price)}</div>
                                            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-brand-gold transition-colors">
                                                View Pack <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SuccessPopup
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Booking Request Sent"
                message={`Your ${pkg.title} booking request has been sent successfully to the Yatra Go team email.`}
                eyebrow="Package Booking"
                subtitle="We have received your trip details."
                helperText="The team will review your preferences and get back to you on your email and phone details."
            />
        </div>
    );
};

export default TourDetails;
