import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { submitWeb3Form } from '../../lib/web3forms';

/* ─────────────────────────── TAB DATA ─────────────────────────── */
const tabs = [
  {
    id: 'acceptance',
    icon: '📜',
    label: 'Acceptance',
    badge: '01',
    color: '#1399de',
    accentBg: 'rgba(19,153,222,0.08)',
    headline: 'Acceptance of Terms',
    tagline: 'By using Yatra Go, you agree to the following legal agreement.',
    type: 'paragraphs',
    items: [
      {
        icon: '✦',
        title: 'Binding Agreement',
        body: 'By accessing and using the Yatra Go website or services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms & Conditions. This includes all bookings, enquiries, and interactions with our team.',
      },
      {
        icon: '◆',
        title: 'Third-Party Representation',
        body: 'If you are booking on behalf of a group or a third-party, you confirm that you hold authority to accept these terms on their behalf, and that all members of the party are fully aware of and agree to these terms.',
      },
      {
        icon: '◉',
        title: 'Right to Amend',
        body: 'We reserve the right to modify these terms at any time without prior notice. Continued use of our services after any such changes constitutes your acceptance of the revised terms. Please review this page periodically.',
      },
    ],
  },
  {
    id: 'booking',
    icon: '🗓️',
    label: 'Bookings',
    badge: '02',
    color: '#ff8a17',
    accentBg: 'rgba(255,138,23,0.08)',
    headline: 'Booking & Reservations',
    tagline: 'Everything you need to know before confirming your journey.',
    type: 'cards',
    items: [
      { icon: '🔖', title: 'Availability', body: 'All bookings are subject to availability at time of reservation. A written confirmation will be sent to your registered email within 24 hours.' },
      { icon: '💳', title: 'Advance Payment', body: 'A minimum 50% advance of the total tour cost is required to confirm a booking. The balance must be cleared at least 7 days before departure.' },
      { icon: '💱', title: 'Pricing Policy', body: 'All prices are in INR unless stated otherwise and may change due to tariff revisions, government taxes, or exchange rate fluctuations without prior notice.' },
      { icon: '👥', title: 'Group Bookings', body: 'Groups of 10 or more are eligible for special pricing and bespoke itineraries. Contact our Group Travel Desk at sales.yatrago@gmail.com.' },
      { icon: '🪪', title: 'Documentation', body: 'You are solely responsible for ensuring all travellers carry valid IDs, visas, and required permits for every destination on your itinerary.' },
      { icon: '✈️', title: 'Flight Bookings', body: 'For packages including airfare, tickets will be issued only after full payment is received. Airline fees and surcharges are subject to change up to the ticketing date.' },
    ],
  },
  {
    id: 'cancellation',
    icon: '🚫',
    label: 'Cancellation',
    badge: '03',
    color: '#ef4444',
    accentBg: 'rgba(239,68,68,0.07)',
    headline: 'Cancellation Policy',
    tagline: 'Understand our cancellation tiers and refund timelines before you book.',
    type: 'timeline',
    notice: 'All cancellation requests must be submitted in writing via email to sales.yatrago@gmail.com.',
    items: [
      { period: '30+ Days Before Departure', fee: '10% Cancellation Fee', status: 'Low', color: '#22c55e', glow: 'rgba(34,197,94,0.25)' },
      { period: '15–29 Days Before Departure', fee: '50% Cancellation Fee', status: 'Medium', color: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
      { period: '8–14 Days Before Departure',  fee: '75% Cancellation Fee', status: 'High',   color: '#f97316', glow: 'rgba(249,115,22,0.25)' },
      { period: 'Within 7 Days of Departure',  fee: '100% — Non-Refundable', status: 'None', color: '#ef4444', glow: 'rgba(239,68,68,0.25)' },
      { period: 'No Show / Early Departure',   fee: 'No Refund Applicable', status: 'None',  color: '#7f1d1d', glow: 'rgba(127,29,29,0.2)'  },
    ],
    footer: 'Applicable refunds are processed within 7–14 business days to the original payment source.',
  },
  {
    id: 'itinerary',
    icon: '🗺️',
    label: 'Itinerary',
    badge: '04',
    color: '#71cf3f',
    accentBg: 'rgba(113,207,63,0.08)',
    headline: 'Itinerary Changes & Force Majeure',
    tagline: 'What happens when the unexpected disrupts your travel plans?',
    type: 'paragraphs',
    items: [
      {
        icon: '🌦️',
        title: 'Right to Modify',
        body: 'Yatra Go reserves the right to alter itineraries, substitute hotels, change transportation, or modify activities when necessary due to adverse weather, political unrest, natural events, or unavoidable operational requirements.',
      },
      {
        icon: '⭐',
        title: 'Equal or Better Standard',
        body: 'In the event of any forced substitution, we commit to providing alternatives of equal or higher standard at no additional cost to you. All changes will be communicated promptly.',
      },
      {
        icon: '🌍',
        title: 'Force Majeure',
        body: 'Events beyond our reasonable control (acts of God, war, strikes, pandemics, government orders) release Yatra Go from contractual obligations. We will proactively work to reschedule or issue credit notes in such cases.',
      },
    ],
  },
  {
    id: 'liability',
    icon: '⚖️',
    label: 'Liability',
    badge: '05',
    color: '#6366f1',
    accentBg: 'rgba(99,102,241,0.08)',
    headline: 'Liability & Indemnification',
    tagline: 'Understanding the boundaries of Yatra Go\'s responsibility during your journey.',
    type: 'cards',
    items: [
      { icon: '🏨', title: 'Third-Party Services', body: 'Yatra Go acts as an agent for hotels, airlines, and transport contractors. Their own terms and conditions govern the services they individually provide.' },
      { icon: '⚠️', title: 'Unforeseen Events', body: 'We shall not be liable for loss, injury, or delay arising from natural hazards, flight cancellations, mechanical breakdowns, weather conditions, or political closures.' },
      { icon: '🎒', title: 'Personal Belongings', body: 'Travellers bear full responsibility for their personal belongings, valuables, and travel documents throughout the journey. Yatra Go recommends using secure storage.' },
      { icon: '🩺', title: 'Medical Fitness', body: 'We strongly advise all travellers, especially those on adventure or high-altitude tours, to consult a physician prior to booking to confirm medical fitness.' },
    ],
  },
  {
    id: 'insurance',
    icon: '🛡️',
    label: 'Insurance',
    badge: '06',
    color: '#0891b2',
    accentBg: 'rgba(8,145,178,0.08)',
    headline: 'Travel Insurance',
    tagline: 'Protect your journey against the unexpected — it\'s always worth it.',
    type: 'paragraphs',
    note: '💡 Yatra Go can assist you in arranging travel insurance through our trusted partner providers. Ask your travel advisor for personalised recommendations.',
    items: [
      {
        icon: '🛡️',
        title: 'Why Insurance Matters',
        body: 'We strongly recommend that all travellers obtain comprehensive travel insurance before departure. A good policy should cover medical emergencies, trip cancellation or curtailment, loss of baggage, and personal liability.',
      },
      {
        icon: '🏔️',
        title: 'Adventure Activity Coverage',
        body: 'Some activities in our packages — such as river rafting, trekking, or snow sports — may require specific adventure activity endorsements on your insurance policy. Please check with your insurer before travelling.',
      },
      {
        icon: '💰',
        title: 'Cost of Uninsured Risks',
        body: 'Yatra Go is not responsible for any costs incurred due to inadequate travel insurance. Emergency medical evacuation in remote Himalayan areas can be extremely costly without proper coverage.',
      },
    ],
  },
  {
    id: 'conduct',
    icon: '🤝',
    label: 'Conduct',
    badge: '07',
    color: '#d97706',
    accentBg: 'rgba(217,119,6,0.08)',
    headline: 'Traveller Conduct & Responsibility',
    tagline: 'We expect every explorer to travel with respect and responsibility.',
    type: 'cards',
    items: [
      { icon: '🙏', title: 'Respectful Behaviour', body: 'All travellers must behave respectfully towards fellow travellers, Yatra Go staff, local residents, and the natural environment at every destination.' },
      { icon: '⚖️', title: 'Legal Compliance', body: 'Travellers must comply with applicable local, regional, and national laws at all destinations. Yatra Go is not liable for consequences arising from a traveller\'s illegal activities.' },
      { icon: '🚫', title: 'Removal from Tour', body: 'Yatra Go reserves the right to remove any traveller from a tour if their conduct is deemed harmful to others. No refund will be issued in such circumstances.' },
      { icon: '🩺', title: 'Health Declaration', body: 'By booking an adventure or high-altitude package, you confirm that you are in adequate physical and mental health to participate in all included activities.' },
    ],
  },
  {
    id: 'privacy',
    icon: '🔒',
    label: 'Privacy',
    badge: '08',
    color: '#7c3aed',
    accentBg: 'rgba(124,58,237,0.08)',
    headline: 'Privacy & Data Protection',
    tagline: 'Your data is handled with the utmost care and transparency.',
    type: 'paragraphs',
    items: [
      {
        icon: '📋',
        title: 'Data Collection',
        body: 'Personal information collected during booking and enquiry is processed in strict accordance with our Privacy Policy. By using our services, you consent to such collection and use.',
      },
      {
        icon: '🔐',
        title: 'Security Measures',
        body: 'We implement industry-standard encryption and security protocols to protect your personal data from unauthorised access, disclosure, alteration, or destruction. We never sell your data to third parties.',
      },
      {
        icon: '📩',
        title: 'Communications',
        body: 'We may contact you with booking confirmations, travel updates, and curated promotional offers. You may unsubscribe from marketing communications at any time by contacting us at sales.yatrago@gmail.com.',
      },
    ],
  },
  {
    id: 'ip',
    icon: '©️',
    label: 'IP Rights',
    badge: '09',
    color: '#0c3553',
    accentBg: 'rgba(12,53,83,0.07)',
    headline: 'Intellectual Property',
    tagline: 'All creative work on this platform is protected under applicable law.',
    type: 'paragraphs',
    items: [
      {
        icon: '🎨',
        title: 'Owned Content',
        body: 'All text, images, videos, graphics, logos, and software on the Yatra Go website are the property of Yatra Go or its licensed suppliers, protected under Indian and international intellectual property laws.',
      },
      {
        icon: '🚫',
        title: 'Usage Restrictions',
        body: 'You may not reproduce, distribute, republish, or create derivative works from our content without explicit prior written consent from Yatra Go. Unauthorised use may result in legal action.',
      },
      {
        icon: '📸',
        title: 'User-Generated Content',
        body: 'By sharing photos, reviews, or posts tagging Yatra Go, you grant us a royalty-free, non-exclusive licence to use, display, and distribute your content for promotional purposes across our platforms.',
      },
    ],
  },
  {
    id: 'disputes',
    icon: '🏛️',
    label: 'Disputes',
    badge: '10',
    color: '#1399de',
    accentBg: 'rgba(19,153,222,0.08)',
    headline: 'Governing Law & Disputes',
    tagline: 'In the rare event of disagreement, here\'s how we resolve it.',
    type: 'cards',
    items: [
      { icon: '🇮🇳', title: 'Indian Law Governs', body: 'These Terms & Conditions are governed by and construed in accordance with the laws of the Republic of India.' },
      { icon: '🏛️', title: 'Jurisdiction', body: 'Any disputes shall be subject to the exclusive jurisdiction of the courts of Haridwar / Rishikesh, Uttarakhand, India.' },
      { icon: '🤝', title: 'Amicable Resolution', body: 'We encourage all parties to reach an amicable resolution first. Our team is committed to fair, prompt, and transparent resolution of all customer concerns.' },
      { icon: '⚖️', title: 'Mediation First', body: 'In the event of an unresolved dispute, both parties agree to attempt formal mediation before initiating legal proceedings.' },
    ],
  },
];

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02, delayChildren: 0 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } },
};
const fadeSlide = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.14, ease: [0.22, 1, 0.36, 1] } },
};

const conciergeServiceOptions = [
  'Tour Package (Uttarakhand)',
  'Tour Package (Himachal)',
  'Char Dham Yatra',
  'Hotel Booking',
  'Car / Coach Rental',
  'Air Ticket',
  'Railway Booking',
  'Adventure Activity',
  'Customized Trip',
];

const conciergeDepartureOptions = [
  'As soon as possible',
  'Next 15 days',
  'Next 30 days',
  'April - June',
  'July - September',
  'October - December',
  'Flexible dates',
];

const conciergeContactModes = [
  'Email First',
  'Quick Call Back',
  'WhatsApp Follow-up',
];

const initialConciergeForm = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  serviceType: 'Customized Trip',
  travelDate: '',
  returnDate: '',
  travelers: '2',
  budget: '',
  departureWindow: 'As soon as possible',
  contactMode: 'Email First',
  pickupCity: '',
  hotelPreference: '',
  message: '',
};

/* ─────────────────────── PARAGRAPH CONTENT ─────────────────────── */
const ParagraphContent = ({ items, color }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="tc-para-grid">
    {items.map((item, i) => (
      <motion.div key={i} variants={itemVariants} className="tc-para-card" style={{ '--accent': color }}>
        <div className="tc-para-icon-wrap" style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}>
          <span className="tc-para-icon">{item.icon}</span>
        </div>
        <div>
          <h3 className="tc-para-title">{item.title}</h3>
          <p className="tc-para-body">{item.body}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

/* ─────────────────────── CARDS CONTENT ─────────────────────── */
const CardsContent = ({ items, color }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="tc-cards-grid">
    {items.map((item, i) => (
      <motion.div key={i} variants={itemVariants} className="tc-feature-card" style={{ '--accent': color }}>
        <span className="tc-feature-emoji">{item.icon}</span>
        <h3 className="tc-feature-title">{item.title}</h3>
        <p className="tc-feature-body">{item.body}</p>
        <div className="tc-feature-shine" />
      </motion.div>
    ))}
  </motion.div>
);

/* ─────────────────────── TIMELINE CONTENT ─────────────────────── */
const TimelineContent = ({ items, notice, footer }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show">
    {notice && (
      <motion.div variants={fadeSlide} className="tc-notice">
        <span>⚑</span> {notice}
      </motion.div>
    )}
    <div className="tc-timeline">
      {items.map((item, i) => (
        <motion.div key={i} variants={itemVariants} className="tc-timeline-row" style={{ '--glow': item.glow }}>
          <div className="tc-timeline-left">
            <div className="tc-timeline-dot" style={{ background: item.color, boxShadow: `0 0 14px ${item.glow}` }} />
            {i < items.length - 1 && <div className="tc-timeline-line" />}
          </div>
          <div className="tc-timeline-card">
            <div className="tc-timeline-card-inner">
              <div>
                <span className="tc-timeline-period">{item.period}</span>
                <span className="tc-timeline-fee" style={{ color: item.color }}>{item.fee}</span>
              </div>
              <span className="tc-timeline-badge" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}35` }}>
                {item.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    {footer && <motion.p variants={fadeSlide} className="tc-timeline-footer">{footer}</motion.p>}
  </motion.div>
);

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */
const TermsConditions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isConciergeFormOpen, setIsConciergeFormOpen] = useState(false);
  const [conciergeForm, setConciergeForm] = useState(initialConciergeForm);
  const [isSubmittingConcierge, setIsSubmittingConcierge] = useState(false);
  const [conciergeSuccess, setConciergeSuccess] = useState(false);
  const [conciergeError, setConciergeError] = useState('');
  const tab = tabs[activeTab];
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tabsRowRef = useRef(null);
  const contactEmail = 'sales.yatrago@gmail.com';
  const whatsappMessage = 'Hi Yatra Go Team, I would like to connect with your team regarding my travel plans.';
  const whatsappLink = `https://wa.me/918979931256?text=${encodeURIComponent(whatsappMessage)}`;
  const today = new Date().toISOString().split('T')[0];

  // Scroll active tab pill into view on mobile
  useEffect(() => {
    if (tabsRowRef.current) {
      const active = tabsRowRef.current.querySelector('.tc-tab-btn.active');
      if (active) active.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  useEffect(() => {
    document.body.style.overflow = isContactOpen || isConciergeFormOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isContactOpen, isConciergeFormOpen]);

  useEffect(() => {
    if (!isContactOpen && !isConciergeFormOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (isConciergeFormOpen) {
        setIsConciergeFormOpen(false);
        setConciergeError('');
        return;
      }
      setIsContactOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isContactOpen, isConciergeFormOpen]);

  const handleConciergeFieldChange = (field, value) => {
    setConciergeForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'travelDate' && current.returnDate && value && current.returnDate < value
        ? { returnDate: value }
        : {}),
    }));
  };

  const handleConciergeSubmit = async (event) => {
    event.preventDefault();
    setIsSubmittingConcierge(true);
    setConciergeError('');

    try {
      await submitWeb3Form({
        subject: `Email Concierge Booking Request: ${conciergeForm.destination || conciergeForm.serviceType}`,
        replyTo: conciergeForm.email,
        fields: {
          inquiry_type: 'Legal Page Email Concierge',
          customer_name: conciergeForm.name.trim(),
          customer_email: conciergeForm.email.trim(),
          customer_phone: conciergeForm.phone.trim(),
          service_type: conciergeForm.serviceType,
          destination: conciergeForm.destination.trim() || 'Not specified',
          travel_date: conciergeForm.travelDate || 'Not selected',
          return_date: conciergeForm.returnDate || 'Not selected',
          travelers: conciergeForm.travelers || '2',
          preferred_budget: conciergeForm.budget.trim() || 'Not shared',
          preferred_departure: conciergeForm.departureWindow,
          preferred_contact: conciergeForm.contactMode,
          pickup_city: conciergeForm.pickupCity.trim() || 'Not shared',
          hotel_preference: conciergeForm.hotelPreference.trim() || 'Not shared',
          message: conciergeForm.message.trim() || 'No additional notes provided.',
          source_page: 'Terms & Conditions Premium Support Lounge',
        },
      });

      setConciergeSuccess(true);
      setConciergeForm(initialConciergeForm);

      window.setTimeout(() => {
        setConciergeSuccess(false);
        setIsConciergeFormOpen(false);
      }, 2600);
    } catch (error) {
      console.error('Email concierge booking request failed', error);
      setConciergeError('Request abhi send nahi ho pa rahi. Please thoda der baad try karein.');
    } finally {
      setIsSubmittingConcierge(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Yatra Go</title>
        <meta name="description" content="Read Yatra Go's Terms and Conditions before booking your premium Himalayan travel package." />
      </Helmet>

      <style>{`
        /* ══════════════════════════════════════════════
           TERMS & CONDITIONS — BRAND-MATCHED STYLES
           Colors: #1399de (blue) · #ff8a17 (gold)
                   #0c3553 (dark) · #71cf3f (green)
           Fonts: Sora (sans) · Cinzel (serif)
        ══════════════════════════════════════════════ */

        .tc-root {
          min-height: 100vh;
          background:
            radial-gradient(circle at 14% 12%, rgba(19,153,222,0.14), transparent 36%),
            radial-gradient(circle at 88% 16%, rgba(255,138,23,0.11), transparent 32%),
            radial-gradient(circle at 20% 88%, rgba(113,207,63,0.12), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f7fbff 50%, #eef8ff 100%);
          padding-top: 0px;
          font-family: 'Sora', 'Segoe UI', sans-serif;
        }

        /* ── HERO ── */
        .tc-hero {
          position: relative;
          text-align: center;
          padding: 70px 24px 60px;
          overflow: hidden;
        }
        .tc-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .tc-hero-orb-1 { width: 420px; height: 420px; background: rgba(19,153,222,0.12); top: -120px; left: -100px; }
        .tc-hero-orb-2 { width: 320px; height: 320px; background: rgba(255,138,23,0.10); top: -80px;  right: -80px; }
        .tc-hero-orb-3 { width: 200px; height: 200px; background: rgba(113,207,63,0.10); bottom: 0;   left: 50%;    transform: translateX(-50%); }

        /* Floating particles */
        .tc-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: tc-float linear infinite;
        }
        @keyframes tc-float {
          0%   { transform: translateY(0)   rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }

        .tc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(19,153,222,0.12), rgba(255,138,23,0.10));
          border: 1.5px solid rgba(19,153,222,0.25);
          color: #1399de;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 100px;
          margin-bottom: 20px;
          font-family: 'Sora', sans-serif;
        }
        .tc-badge-dot {
          width: 6px; height: 6px;
          background: #ff8a17;
          border-radius: 50%;
          animation: tc-pulse 2s ease-in-out infinite;
        }
        @keyframes tc-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }

        .tc-hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          color: #0c3553;
          line-height: 1.12;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }
        .tc-hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #1399de 0%, #ff8a17 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tc-hero-sub {
          font-size: 1.05rem;
          color: #5a7f99;
          max-width: 540px;
          margin: 0 auto 36px;
          line-height: 1.75;
          font-weight: 400;
        }

        .tc-hero-pills {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tc-hero-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(19,153,222,0.15);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0c3553;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 12px rgba(19,153,222,0.07);
          transition: all 0.3s ease;
        }
        .tc-hero-pill:hover {
          border-color: #1399de;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(19,153,222,0.15);
        }
        .tc-hero-pill span:first-child { font-size: 1rem; }

        /* ── TABS ROW ── */
        .tc-tabs-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 0;
        }
        .tc-tabs-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          overflow: visible;
          padding: 6px 4px 16px;
          align-items: stretch;
        }

        .tc-tab-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1.5px solid rgba(12,53,83,0.1);
          background: rgba(255,255,255,0.8);
          color: #5a7f99;
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          white-space: normal;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          flex: 1 1 220px;
          max-width: 280px;
          min-width: 220px;
          justify-content: flex-start;
          text-align: left;
        }
        .tc-tab-label {
          line-height: 1.35;
          flex: 1;
        }
        .tc-tab-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .tc-tab-btn:hover::after { transform: translateX(100%); }
        .tc-tab-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 24px rgba(12,53,83,0.12);
          border-color: rgba(19,153,222,0.3);
          color: #0c3553;
        }
        .tc-tab-btn.active {
          color: #fff;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .tc-tab-num {
          font-size: 0.67rem;
          font-weight: 800;
          background: rgba(255,255,255,0.22);
          padding: 2px 7px;
          border-radius: 100px;
          letter-spacing: 0.06em;
        }
        .tc-tab-btn.active .tc-tab-num { background: rgba(255,255,255,0.2); }

        /* ── CONTENT PANEL ── */
        .tc-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .tc-panel {
          background: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(19,153,222,0.1);
          border-radius: 28px;
          padding: 42px 40px;
          box-shadow: 0 20px 60px rgba(12,53,83,0.07), 0 4px 16px rgba(19,153,222,0.05);
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }
        .tc-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--panel-grad, linear-gradient(90deg, #1399de, #ff8a17));
          border-radius: 28px 28px 0 0;
        }
        .tc-panel-accent {
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .tc-panel-header { margin-bottom: 32px; }
        .tc-panel-num {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--panel-color, #1399de);
          background: var(--panel-bg, rgba(19,153,222,0.09));
          border: 1px solid var(--panel-border, rgba(19,153,222,0.2));
          padding: 4px 12px;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 14px;
        }
        .tc-panel-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          color: #0c3553;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .tc-panel-tagline {
          font-size: 0.95rem;
          color: #5a7f99;
          line-height: 1.65;
        }

        /* ── PARAGRAPH CARDS ── */
        .tc-para-grid {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .tc-para-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 22px 24px;
          border-radius: 16px;
          background: rgba(247,251,255,0.8);
          border: 1.5px solid rgba(12,53,83,0.07);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .tc-para-card:hover {
          border-color: var(--accent, #1399de);
          background: white;
          transform: translateX(6px);
          box-shadow: -4px 0 0 var(--accent, #1399de), 0 10px 30px rgba(12,53,83,0.08);
        }
        .tc-para-icon-wrap {
          width: 46px; height: 46px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .tc-para-card:hover .tc-para-icon-wrap { transform: scale(1.15) rotate(-5deg); }
        .tc-para-icon { font-size: 1.3rem; }
        .tc-para-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0c3553;
          margin-bottom: 6px;
        }
        .tc-para-body { font-size: 0.9rem; color: #5a7f99; line-height: 1.8; margin: 0; }

        /* ── FEATURE CARDS ── */
        .tc-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .tc-feature-card {
          position: relative;
          padding: 26px 24px;
          border-radius: 20px;
          background: white;
          border: 1.5px solid rgba(12,53,83,0.08);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
          cursor: default;
        }
        .tc-feature-card:hover {
          border-color: var(--accent, #1399de);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(12,53,83,0.13), 0 0 0 1px var(--accent, #1399de);
        }
        .tc-feature-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%) translateY(-100%);
          transition: transform 0.6s ease;
        }
        .tc-feature-card:hover .tc-feature-shine { transform: translateX(100%) translateY(100%); }
        .tc-feature-emoji {
          font-size: 2rem;
          display: block;
          margin-bottom: 14px;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .tc-feature-card:hover .tc-feature-emoji { transform: scale(1.2) rotate(-8deg); }
        .tc-feature-title {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0c3553;
          margin-bottom: 8px;
        }
        .tc-feature-body { font-size: 0.85rem; color: #5a7f99; line-height: 1.75; margin: 0; }

        /* ── TIMELINE ── */
        .tc-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: linear-gradient(135deg, rgba(255,138,23,0.08), rgba(255,138,23,0.03));
          border: 1.5px solid rgba(255,138,23,0.25);
          border-left: 4px solid #ff8a17;
          padding: 13px 18px;
          border-radius: 12px;
          color: #5a7f99;
          font-size: 0.88rem;
          margin-bottom: 26px;
          font-weight: 500;
        }
        .tc-timeline { display: flex; flex-direction: column; gap: 0; }
        .tc-timeline-row { display: flex; gap: 0; align-items: flex-start; }
        .tc-timeline-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 22px;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .tc-timeline-dot {
          width: 16px; height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
          border: 3px solid white;
        }
        .tc-timeline-line {
          width: 2px;
          flex: 1;
          min-height: 24px;
          background: linear-gradient(180deg, rgba(12,53,83,0.15), rgba(12,53,83,0.05));
          margin: 6px 0;
        }
        .tc-timeline-card {
          flex: 1;
          padding: 14px 0;
        }
        .tc-timeline-card-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: white;
          border: 1.5px solid rgba(12,53,83,0.07);
          border-radius: 14px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-bottom: 8px;
        }
        .tc-timeline-row:hover .tc-timeline-card-inner {
          transform: translateX(8px);
          box-shadow: 0 8px 24px rgba(12,53,83,0.1);
          border-color: rgba(19,153,222,0.2);
        }
        .tc-timeline-period {
          display: block;
          font-size: 0.88rem;
          color: #5a7f99;
          font-weight: 500;
          margin-bottom: 5px;
        }
        .tc-timeline-fee {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Cinzel', serif;
        }
        .tc-timeline-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tc-timeline-footer {
          margin-top: 16px;
          font-size: 0.83rem;
          color: #8aabbd;
          font-style: italic;
          padding: 10px 16px;
          background: rgba(19,153,222,0.04);
          border-radius: 10px;
          border: 1px solid rgba(19,153,222,0.1);
        }

        /* ── NOTE BOX ── */
        .tc-note-box {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(19,153,222,0.06);
          border: 1.5px solid rgba(19,153,222,0.18);
          border-radius: 12px;
          font-size: 0.87rem;
          color: #0c3553;
          line-height: 1.7;
          font-weight: 500;
        }

        /* ── BOTTOM CTA ── */
        .tc-cta {
          max-width: 800px;
          margin: 40px auto 0;
          background: linear-gradient(135deg, #0c3553 0%, #08263d 50%, #0c3553 100%);
          border-radius: 28px;
          padding: 48px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .tc-cta::before {
          content: '';
          position: absolute;
          top: -50px; left: -50px;
          width: 200px; height: 200px;
          background: rgba(19,153,222,0.15);
          border-radius: 50%;
          filter: blur(60px);
        }
        .tc-cta::after {
          content: '';
          position: absolute;
          bottom: -40px; right: -40px;
          width: 160px; height: 160px;
          background: rgba(255,138,23,0.15);
          border-radius: 50%;
          filter: blur(50px);
        }
        .tc-cta h3 { font-family: 'Cinzel', serif; font-size: 1.7rem; color: #fff; margin-bottom: 10px; position: relative; z-index: 1; }
        .tc-cta p  { font-size: 0.92rem; color: rgba(255,255,255,0.55); max-width: 420px; margin: 0 auto 28px; line-height: 1.7; position: relative; z-index: 1; }
        .tc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #ff8a17, #ffaa44);
          color: #0c3553;
          font-weight: 800;
          font-size: 0.88rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 34px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 28px rgba(255,138,23,0.35);
          border: none;
          position: relative; z-index: 1;
        }
        .tc-cta-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 16px 40px rgba(255,138,23,0.5);
          background: linear-gradient(135deg, #ffaa44, #ff8a17);
        }

        .tc-contact-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            radial-gradient(circle at top, rgba(19,153,222,0.16), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255,138,23,0.12), transparent 28%),
            linear-gradient(180deg, rgba(237,246,252,0.82), rgba(228,239,248,0.88));
          backdrop-filter: blur(18px);
        }
        .tc-contact-modal {
          width: min(760px, 100%);
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          padding: 34px;
          background:
            radial-gradient(circle at top right, rgba(19,153,222,0.12), transparent 24%),
            radial-gradient(circle at bottom left, rgba(255,138,23,0.1), transparent 26%),
            linear-gradient(145deg, rgba(255,255,255,0.98), rgba(241,247,252,0.96));
          border: 1px solid rgba(12,53,83,0.12);
          box-shadow: 0 36px 90px rgba(12,53,83,0.18);
          transform-style: preserve-3d;
        }
        .tc-contact-modal::before,
        .tc-contact-modal::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(12px);
        }
        .tc-contact-modal::before {
          width: 220px;
          height: 220px;
          top: -90px;
          right: -80px;
          background: rgba(19,153,222,0.16);
        }
        .tc-contact-modal::after {
          width: 180px;
          height: 180px;
          bottom: -70px;
          left: -60px;
          background: rgba(255,138,23,0.14);
        }
        .tc-contact-close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(12,53,83,0.12);
          background: rgba(255,255,255,0.86);
          color: #0c3553;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(12,53,83,0.1);
          transition: all 0.3s ease;
        }
        .tc-contact-close:hover {
          transform: rotate(90deg) scale(1.08);
          background: #ffffff;
          box-shadow: 0 18px 32px rgba(12,53,83,0.15);
        }
        .tc-contact-shell {
          position: relative;
          z-index: 1;
        }
        .tc-contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: linear-gradient(145deg, rgba(241,248,252,0.98), rgba(228,239,247,0.98));
          border: 1px solid rgba(19,153,222,0.16);
          color: #0f6fa3;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          box-shadow: 0 12px 24px rgba(12,53,83,0.08);
        }
        .tc-contact-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #71cf3f;
          box-shadow: 0 0 14px rgba(113,207,63,0.8);
        }
        .tc-contact-header {
          margin-top: 20px;
          display: grid;
          gap: 14px;
        }
        .tc-contact-title {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.08;
          color: #0c3553;
        }
        .tc-contact-title em {
          font-style: normal;
          color: #1399de;
        }
        .tc-contact-subtitle {
          margin: 0;
          max-width: 560px;
          color: #5f7e94;
          font-size: 1rem;
          line-height: 1.8;
        }
        .tc-contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-top: 30px;
        }
        .tc-contact-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 250px;
          padding: 28px;
          border-radius: 28px;
          text-decoration: none;
          color: #0c3553;
          border: 1px solid rgba(19,153,222,0.1);
          background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(243,248,252,0.94));
          cursor: pointer;
          text-align: left;
          font: inherit;
          transform-style: preserve-3d;
          box-shadow: 0 22px 44px rgba(12,53,83,0.1), 0 8px 18px rgba(12,53,83,0.06);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
          isolation: isolate;
          will-change: transform;
        }
        .tc-contact-card::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 27px;
          background: linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.3));
          opacity: 0.9;
          z-index: -2;
        }
        .tc-contact-card::after {
          content: '';
          position: absolute;
          inset: -40% auto auto -20%;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: var(--contact-glow);
          opacity: 0.55;
          filter: blur(8px);
          transform: scale(0.75);
          transition: transform 0.45s ease, opacity 0.35s ease;
          z-index: -1;
        }
        .tc-contact-card:hover {
          transform: perspective(1200px) translateY(-10px) rotateX(4deg) rotateY(-4deg) scale(1.015);
          border-color: rgba(19,153,222,0.18);
          box-shadow: 0 32px 58px rgba(12,53,83,0.16), 0 14px 24px rgba(19,153,222,0.1);
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(238,246,252,0.98));
        }
        .tc-contact-card:hover::after {
          transform: scale(1.05);
          opacity: 0.85;
        }
        .tc-contact-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .tc-contact-icon {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.7rem;
          background: linear-gradient(145deg, rgba(244,249,252,0.96), rgba(224,235,244,0.96));
          border: 1px solid rgba(19,153,222,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 22px rgba(12,53,83,0.08);
          transition: transform 0.35s ease, background 0.35s ease;
        }
        .tc-contact-card:hover .tc-contact-icon {
          transform: translateY(-3px) rotate(-6deg) scale(1.06);
          background: linear-gradient(145deg, rgba(255,255,255,1), rgba(229,241,249,0.96));
        }
        .tc-contact-arrow {
          font-size: 1.2rem;
          color: #4c708a;
          transition: transform 0.35s ease;
        }
        .tc-contact-card:hover .tc-contact-arrow {
          transform: translateX(6px);
        }
        .tc-contact-card h4 {
          margin: 20px 0 8px;
          font-size: 1.2rem;
          font-family: 'Cinzel', serif;
          color: #0c3553;
          line-height: 1.3;
        }
        .tc-contact-card p {
          margin: 0;
          color: #4e6980;
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .tc-contact-meta {
          margin-top: auto;
          padding-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #31506a;
          font-size: 0.88rem;
          font-weight: 700;
          flex-wrap: wrap;
        }
        .tc-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 999px;
          background: linear-gradient(145deg, rgba(227,241,249,0.98), rgba(214,230,241,0.98));
          border: 1px solid rgba(19,153,222,0.16);
          box-shadow: 0 10px 20px rgba(12,53,83,0.06);
          color: #0c3553;
          flex: 0 1 auto;
          max-width: 100%;
        }
        .tc-contact-meta > span:last-child {
          color: #0d4368;
          font-weight: 800;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .tc-contact-footer {
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 24px;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(241,247,251,0.94));
          border: 1px solid rgba(19,153,222,0.1);
          box-shadow: 0 24px 44px rgba(12,53,83,0.1), 0 10px 18px rgba(12,53,83,0.05);
          transform-style: preserve-3d;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .tc-contact-footer:hover {
          transform: perspective(1200px) translateY(-6px) rotateX(3deg);
          box-shadow: 0 28px 52px rgba(12,53,83,0.13), 0 12px 24px rgba(19,153,222,0.08);
        }
        .tc-contact-footer-copy {
          color: #617f94;
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .tc-contact-footer-copy strong {
          display: block;
          color: #0c3553;
          margin-bottom: 4px;
        }
        .tc-contact-mini {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          color: #0c3553;
          background: linear-gradient(135deg, rgba(19,153,222,0.16), rgba(255,138,23,0.18));
          border: 1px solid rgba(19,153,222,0.14);
          box-shadow: 0 16px 28px rgba(12,53,83,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          font-weight: 800;
        }
        .tc-contact-mini:hover {
          transform: perspective(1000px) translateY(-4px) rotateX(3deg);
          box-shadow: 0 22px 36px rgba(12,53,83,0.12);
          background: linear-gradient(135deg, rgba(19,153,222,0.2), rgba(255,138,23,0.22));
        }

        /* ── HERO DIVIDER ── */
        .tc-concierge-overlay {
          position: fixed;
          inset: 0;
          z-index: 220;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            radial-gradient(circle at top left, rgba(19,153,222,0.18), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255,138,23,0.14), transparent 30%),
            linear-gradient(180deg, rgba(238,247,255,0.72), rgba(233,243,251,0.82));
          backdrop-filter: blur(18px);
        }
        .tc-concierge-modal {
          position: relative;
          width: min(1240px, 100%);
          max-height: 94vh;
          overflow-y: auto;
          overflow-x: hidden;
          border-radius: 34px;
          border: 1px solid rgba(12,53,83,0.12);
          background:
            radial-gradient(circle at top right, rgba(19,153,222,0.14), transparent 22%),
            radial-gradient(circle at bottom left, rgba(255,138,23,0.12), transparent 26%),
            linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,248,253,0.96));
          box-shadow: 0 44px 120px rgba(12,53,83,0.18);
          transform-style: preserve-3d;
          animation: tc-concierge-float 7s ease-in-out infinite;
        }
        .tc-concierge-modal::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 33px;
          border: 1px solid rgba(255,255,255,0.75);
          pointer-events: none;
        }
        .tc-concierge-modal::after {
          content: '';
          position: absolute;
          inset: auto 28px 0 auto;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(19,153,222,0.12), transparent 70%);
          filter: blur(18px);
          pointer-events: none;
        }
        @keyframes tc-concierge-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .tc-concierge-close {
          position: absolute;
          top: 22px;
          right: 22px;
          z-index: 2;
          width: 46px;
          height: 46px;
          border: 0;
          border-radius: 50%;
          background: rgba(12,53,83,0.08);
          color: #0c3553;
          cursor: pointer;
          box-shadow: 0 12px 26px rgba(12,53,83,0.08);
          transition: transform 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
        }
        .tc-concierge-close:hover {
          transform: translateY(-2px) rotate(90deg);
          background: rgba(12,53,83,0.14);
          box-shadow: 0 18px 30px rgba(12,53,83,0.14);
        }
        .tc-concierge-layout {
          display: grid;
          grid-template-columns: minmax(340px, 0.92fr) minmax(520px, 1.08fr);
          align-items: start;
        }
        .tc-concierge-aside {
          position: relative;
          padding: 42px 34px 36px;
          border-right: 1px solid rgba(12,53,83,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.5), rgba(233,244,251,0.6));
        }
        .tc-concierge-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(12,53,83,0.06);
          color: #1399de;
          border: 1px solid rgba(19,153,222,0.12);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .tc-concierge-tag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffb257;
          box-shadow: 0 0 18px rgba(255,178,87,0.85);
        }
        .tc-concierge-aside h3 {
          margin: 22px 0 12px;
          color: #0c3553;
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          line-height: 1.08;
        }
        .tc-concierge-aside p {
          margin: 0;
          color: #4e6b82;
          line-height: 1.8;
          font-size: 1.02rem;
        }
        .tc-concierge-points {
          margin: 34px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 18px;
        }
        .tc-concierge-points li {
          display: grid;
          grid-template-columns: 54px 1fr;
          gap: 16px;
          align-items: start;
          padding: 20px 18px;
          border-radius: 24px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(19,153,222,0.08);
          box-shadow: 0 18px 38px rgba(12,53,83,0.08);
          transform-style: preserve-3d;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .tc-concierge-points li:hover {
          transform: perspective(1000px) translateY(-6px) rotateX(3deg) rotateY(-3deg);
          box-shadow: 0 26px 44px rgba(12,53,83,0.12);
          border-color: rgba(19,153,222,0.18);
        }
        .tc-concierge-point-icon {
          width: 54px;
          height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(19,153,222,0.16), rgba(255,138,23,0.18));
          color: #0c3553;
          font-size: 1.15rem;
          font-weight: 800;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .tc-concierge-point-copy strong {
          display: block;
          color: #0c3553;
          margin-bottom: 6px;
          font-size: 1.08rem;
        }
        .tc-concierge-point-copy span {
          color: #5f788e;
          font-size: 0.98rem;
          line-height: 1.72;
        }
        .tc-concierge-stats {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .tc-concierge-stat {
          padding: 18px 16px;
          border-radius: 22px;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(19,153,222,0.08);
          box-shadow: 0 16px 32px rgba(12,53,83,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tc-concierge-stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 38px rgba(12,53,83,0.12);
        }
        .tc-concierge-stat strong {
          display: block;
          color: #0c3553;
          font-size: 1.2rem;
        }
        .tc-concierge-stat span {
          color: #668196;
          font-size: 0.86rem;
          line-height: 1.6;
        }
        .tc-concierge-form-shell {
          padding: 42px 34px 34px;
          overflow-y: auto;
          background: linear-gradient(180deg, rgba(255,255,255,0.82), rgba(246,250,253,0.92));
        }
        .tc-concierge-form-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
        }
        .tc-concierge-form-head h4 {
          margin: 0;
          color: #0c3553;
          font-size: clamp(1.7rem, 2vw, 2.1rem);
          font-weight: 800;
        }
        .tc-concierge-form-head span {
          display: block;
          margin-top: 6px;
          color: #628097;
          font-size: 1rem;
          line-height: 1.7;
        }
        .tc-concierge-badge {
          padding: 11px 16px;
          border-radius: 999px;
          color: #1277af;
          font-size: 0.8rem;
          font-weight: 700;
          white-space: nowrap;
          border: 1px solid rgba(19,153,222,0.14);
          background: rgba(19,153,222,0.08);
        }
        .tc-concierge-form {
          display: grid;
          gap: 22px;
        }
        .tc-concierge-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }
        .tc-concierge-grid.tc-concierge-grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .tc-concierge-field {
          display: grid;
          gap: 9px;
        }
        .tc-concierge-field label {
          color: #1d425d;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .tc-concierge-control,
        .tc-concierge-field textarea {
          width: 100%;
          border: 1px solid rgba(12,53,83,0.12);
          background: rgba(255,255,255,0.92);
          color: #0c3553;
          border-radius: 20px;
          padding: 17px 18px;
          outline: none;
          font-size: 1rem;
          line-height: 1.5;
          transition: border-color 0.24s ease, box-shadow 0.24s ease, transform 0.24s ease, background 0.24s ease;
          box-shadow: 0 12px 28px rgba(12,53,83,0.06), inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .tc-concierge-control:hover,
        .tc-concierge-field textarea:hover {
          background: #ffffff;
          box-shadow: 0 18px 34px rgba(12,53,83,0.09);
        }
        .tc-concierge-control:focus,
        .tc-concierge-field textarea:focus {
          border-color: rgba(19,153,222,0.4);
          box-shadow: 0 0 0 5px rgba(19,153,222,0.12), 0 20px 36px rgba(19,153,222,0.08);
          transform: perspective(900px) translateY(-2px) rotateX(1deg);
          background: #ffffff;
        }
        .tc-concierge-control::placeholder,
        .tc-concierge-field textarea::placeholder {
          color: #8aa1b3;
        }
        .tc-concierge-control option {
          color: #0c3553;
        }
        .tc-concierge-date-wrap {
          position: relative;
        }
        .tc-concierge-date-wrap::after {
          content: '✦';
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #1399de;
          pointer-events: none;
          font-size: 0.95rem;
        }
        .tc-concierge-control[type='date']::-webkit-calendar-picker-indicator {
          opacity: 0.01;
          cursor: pointer;
        }
        .tc-concierge-field textarea {
          min-height: 168px;
          resize: vertical;
        }
        .tc-concierge-helper {
          color: #7290a4;
          font-size: 0.84rem;
          line-height: 1.7;
        }
        .tc-concierge-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 8px;
        }
        .tc-concierge-note {
          color: #698397;
          font-size: 0.9rem;
          line-height: 1.7;
          max-width: 440px;
        }
        .tc-concierge-submit {
          border: 0;
          border-radius: 20px;
          padding: 18px 28px;
          min-width: 260px;
          color: #fff;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          background: linear-gradient(135deg, #1399de 0%, #1fb9ff 38%, #ff8a17 100%);
          box-shadow: 0 22px 40px rgba(19,153,222,0.2);
          transition: transform 0.28s ease, box-shadow 0.28s ease, opacity 0.28s ease;
        }
        .tc-concierge-submit:hover {
          transform: perspective(1000px) translateY(-4px) rotateX(4deg);
          box-shadow: 0 28px 52px rgba(19,153,222,0.26);
        }
        .tc-concierge-submit:disabled {
          opacity: 0.75;
          cursor: wait;
        }
        .tc-concierge-feedback {
          margin-top: 2px;
          padding: 12px 14px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.6;
        }
        .tc-concierge-feedback.error {
          color: #b93c4c;
          border: 1px solid rgba(255,107,107,0.18);
          background: rgba(255,107,107,0.08);
        }
        .tc-concierge-feedback.success {
          color: #1d7d43;
          border: 1px solid rgba(113,207,63,0.2);
          background: rgba(113,207,63,0.08);
        }
        @media (max-width: 1180px) {
          .tc-concierge-layout {
            grid-template-columns: 1fr;
          }
          .tc-concierge-aside {
            border-right: 0;
            border-bottom: 1px solid rgba(12,53,83,0.08);
          }
        }
        @media (max-width: 920px) {
          .tc-contact-grid {
            grid-template-columns: 1fr;
          }
          .tc-contact-card,
          .tc-contact-footer {
            padding: 24px;
          }
          .tc-contact-title {
            font-size: clamp(1.8rem, 7vw, 2.6rem);
          }
          .tc-contact-meta {
            align-items: flex-start;
          }
          .tc-concierge-overlay {
            padding: 16px;
          }
          .tc-concierge-aside,
          .tc-concierge-form-shell {
            padding: 30px 22px;
          }
          .tc-concierge-grid.tc-concierge-grid-3 {
            grid-template-columns: 1fr 1fr;
          }
        }
        .tc-divider {
          max-width: 1200px;
          margin: 10px auto 28px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tc-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(19,153,222,0.18), transparent); }
        .tc-divider-text { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(19,153,222,0.45); white-space: nowrap; }

        @media (max-width: 640px) {
          .tc-tabs-wrapper { padding: 0 16px 0; }
          .tc-tab-btn {
            flex-basis: 100%;
            max-width: none;
            min-width: 0;
            padding: 12px 16px;
          }
          .tc-panel { padding: 28px 20px; }
          .tc-cards-grid { grid-template-columns: 1fr; }
          .tc-cta { padding: 36px 24px; }
          .tc-contact-modal { padding: 24px 18px 18px; border-radius: 26px; }
          .tc-contact-grid { grid-template-columns: 1fr; }
          .tc-contact-footer { flex-direction: column; align-items: stretch; }
          .tc-contact-card {
            min-height: 0;
            padding: 22px 18px;
          }
          .tc-contact-card h4 {
            font-size: 1.08rem;
          }
          .tc-contact-card p,
          .tc-contact-footer-copy {
            font-size: 0.92rem;
          }
          .tc-contact-chip,
          .tc-contact-meta > span:last-child {
            font-size: 0.84rem;
          }
          .tc-concierge-overlay { padding: 12px; }
          .tc-concierge-modal { border-radius: 24px; }
          .tc-concierge-layout { grid-template-columns: 1fr; }
          .tc-concierge-aside { padding: 24px 18px 20px; border-right: 0; border-bottom: 1px solid rgba(12,53,83,0.08); }
          .tc-concierge-form-shell { padding: 22px 18px 20px; }
          .tc-concierge-form-head { flex-direction: column; align-items: start; }
          .tc-concierge-grid,
          .tc-concierge-grid.tc-concierge-grid-3,
          .tc-concierge-stats { grid-template-columns: 1fr; }
          .tc-concierge-actions { flex-direction: column; align-items: stretch; }
          .tc-concierge-submit { width: 100%; min-width: 0; }
          .tc-concierge-modal { max-height: 96vh; }
        }
      `}</style>

      <div className="tc-root">

        {/* ── HERO ── */}
        <div className="tc-hero" ref={heroRef}>
          <div className="tc-hero-orb tc-hero-orb-1" />
          <div className="tc-hero-orb tc-hero-orb-2" />
          <div className="tc-hero-orb tc-hero-orb-3" />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="tc-particle" style={{
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              background: i % 2 === 0 ? 'rgba(19,153,222,0.25)' : 'rgba(255,138,23,0.25)',
              left: `${10 + i * 11}%`,
              bottom: `${15 + (i % 3) * 12}%`,
              animationDuration: `${4 + i * 0.7}s`,
              animationDelay: `${i * 0.4}s`,
            }} />
          ))}

          <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="tc-badge">
              <span className="tc-badge-dot" />
              Legal Agreement · Effective March 2025
            </div>
          </motion.div>

          <motion.h1
            className="tc-hero-title"
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Terms &amp; <em>Conditions</em>
          </motion.h1>

          <motion.p
            className="tc-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            Please read these terms carefully. They govern your relationship with Yatra Go and outline your rights and responsibilities as a valued traveller.
          </motion.p>

          <motion.div
            className="tc-hero-pills"
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            {[['📋', '10 Sections'], ['📅', 'Updated March 2025'], ['🇮🇳', 'Indian Law'], ['✅', 'Legally Binding']].map(([icon, text], i) => (
              <div key={i} className="tc-hero-pill">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="tc-divider">
          <div className="tc-divider-line" />
          <span className="tc-divider-text">Select a Section</span>
          <div className="tc-divider-line" />
        </div>

        {/* ── TABS ROW ── */}
        <div className="tc-tabs-wrapper">
          <div className="tc-tabs-row" ref={tabsRowRef}>
            {tabs.map((t, i) => (
              <button
                key={t.id}
                className={`tc-tab-btn${activeTab === i ? ' active' : ''}`}
                style={activeTab === i ? { background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` } : {}}
                onClick={() => setActiveTab(i)}
              >
                <span>{t.icon}</span>
                <span className="tc-tab-label">{t.headline}</span>
                <span className="tc-tab-num">{t.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT PANEL ── */}
        <div className="tc-content-wrapper">
          <motion.div
              key={tab.id}
              className="tc-panel"
              style={{
                '--panel-grad': `linear-gradient(90deg, ${tab.color}, ${tab.color}88)`,
                '--panel-color': tab.color,
                '--panel-bg': tab.accentBg,
                '--panel-border': `${tab.color}30`,
              }}
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            >
              {/* Background accent orb */}
              <div className="tc-panel-accent" style={{ background: `${tab.color}18` }} />

              {/* Panel header */}
              <motion.div className="tc-panel-header" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                <span className="tc-panel-num">{tab.badge} — {tab.label}</span>
                <h2 className="tc-panel-title">{tab.headline}</h2>
                <p className="tc-panel-tagline">{tab.tagline}</p>
              </motion.div>

              {/* Content by type */}
              {tab.type === 'paragraphs' && <ParagraphContent items={tab.items} color={tab.color} />}
              {tab.type === 'cards'      && <CardsContent     items={tab.items} color={tab.color} />}
              {tab.type === 'timeline'   && <TimelineContent  items={tab.items} notice={tab.notice} footer={tab.footer} />}

              {/* Optional note */}
              {tab.note && (
                <motion.div className="tc-note-box" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  <span>{tab.note.split(' ')[0]}</span>
                  <span>{tab.note.substring(tab.note.indexOf(' ') + 1)}</span>
                </motion.div>
              )}
          </motion.div>

          {/* ── BOTTOM CTA ── */}
          <motion.div
            className="tc-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>Have Questions About Our Terms?</h3>
            <p>Our travel advisors are ready to clarify anything before you embark on your Himalayan journey with us.</p>
            <button type="button" className="tc-cta-btn" onClick={() => setIsContactOpen(true)}>
              ✉️ Contact Our Team
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              className="tc-contact-overlay"
              onClick={() => setIsContactOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <motion.div
                className="tc-contact-modal"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, y: 36, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.96 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <button type="button" className="tc-contact-close" onClick={() => setIsContactOpen(false)} aria-label="Close contact popup">
                  ×
                </button>

                <div className="tc-contact-shell">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.24 }}>
                    <div className="tc-contact-badge">
                      <span className="tc-contact-badge-dot" />
                      Premium Support Lounge
                    </div>
                  </motion.div>

                  <motion.div className="tc-contact-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.28 }}>
                    <h3 className="tc-contact-title">Connect With Our <em>Travel Team</em></h3>
                    <p className="tc-contact-subtitle">
                      Choose your fastest route to our team. Reach out by email for detailed planning or jump on WhatsApp for an instant premium conversation.
                    </p>
                  </motion.div>

                  <div className="tc-contact-grid">
                    {[
                      {
                        href: '#',
                        icon: '✉️',
                        type: 'form',
                        title: 'Email Concierge',
                        body: 'Open a premium booking form with destination, dates, travelers, budget and custom itinerary preferences that lands directly in your email inbox.',
                        chip: 'Premium booking form',
                        value: 'Direct to inbox',
                        glow: 'radial-gradient(circle, rgba(19,153,222,0.72), transparent 68%)',
                      },
                      {
                        href: whatsappLink,
                        icon: '💬',
                        type: 'link',
                        title: 'WhatsApp Priority Line',
                        body: 'Open a fast, premium chat flow for live trip assistance, availability checks, and quick answers from our travel desk.',
                        chip: 'Instant response vibe',
                        value: '+91 89799 31256',
                        glow: 'radial-gradient(circle, rgba(113,207,63,0.8), transparent 68%)',
                      },
                    ].map((item, index) => (
                      <motion.a
                        key={item.title}
                        href={item.href}
                        target={item.type === 'link' ? '_blank' : undefined}
                        rel={item.type === 'link' ? 'noreferrer' : undefined}
                        className="tc-contact-card"
                        style={{ '--contact-glow': item.glow }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 + index * 0.08, duration: 0.28 }}
                        onClick={(event) => {
                          if (item.type !== 'form') return;
                          event.preventDefault();
                          setConciergeError('');
                          setConciergeSuccess(false);
                          setIsConciergeFormOpen(true);
                        }}
                      >
                        <div className="tc-contact-card-top">
                          <span className="tc-contact-icon">{item.icon}</span>
                          <span className="tc-contact-arrow">→</span>
                        </div>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                        <div className="tc-contact-meta">
                          <span className="tc-contact-chip">{item.chip}</span>
                          <span>{item.value}</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div className="tc-contact-footer" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.28 }}>
                    <div className="tc-contact-footer-copy">
                      <strong>Need a human touch right away?</strong>
                      Our team is ready to help with bookings, clarifications, and tailor-made itineraries.
                    </div>
                    <a className="tc-contact-mini" href={whatsappLink} target="_blank" rel="noreferrer">
                      <span>✨</span>
                      <span>Start Priority Chat</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isConciergeFormOpen && (
            <motion.div
              className="tc-concierge-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => setIsConciergeFormOpen(false)}
            >
              <motion.div
                className="tc-concierge-modal"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 22, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  className="tc-concierge-close"
                  aria-label="Close email concierge form"
                  onClick={() => setIsConciergeFormOpen(false)}
                >
                  X
                </button>

                <div className="tc-concierge-layout">
                  <div className="tc-concierge-aside">
                    <div className="tc-concierge-tag">
                      <span className="tc-concierge-tag-dot" />
                      Email Concierge
                    </div>
                    <h3>Craft A Premium Booking Brief</h3>
                    <p>
                      Share the same details travellers usually discuss across the website in one polished form, and the full request goes directly to your configured Yatra Go email inbox.
                    </p>

                    <ul className="tc-concierge-points">
                      <li>
                        <span className="tc-concierge-point-icon">+</span>
                        <div className="tc-concierge-point-copy">
                          <strong>Fast and focused</strong>
                          <span>Lean native inputs keep the popup responsive while still feeling premium and executive.</span>
                        </div>
                      </li>
                      <li>
                        <span className="tc-concierge-point-icon">D</span>
                        <div className="tc-concierge-point-copy">
                          <strong>Premium date experience</strong>
                          <span>Styled departure and return calendar fields give users a clean modern scheduling flow without heavy libraries.</span>
                        </div>
                      </li>
                      <li>
                        <span className="tc-concierge-point-icon">@</span>
                        <div className="tc-concierge-point-copy">
                          <strong>Direct email delivery</strong>
                          <span>Destination, budget, group size, contact preference and special notes are sent straight to your inbox.</span>
                        </div>
                      </li>
                    </ul>

                    <div className="tc-concierge-stats">
                      <div className="tc-concierge-stat">
                        <strong>12+</strong>
                        <span>Useful trip-planning fields</span>
                      </div>
                      <div className="tc-concierge-stat">
                        <strong>24h</strong>
                        <span>Ideal follow-up response window</span>
                      </div>
                      <div className="tc-concierge-stat">
                        <strong>1 Inbox</strong>
                        <span>{contactEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div className="tc-concierge-form-shell">
                    <div className="tc-concierge-form-head">
                      <div>
                        <h4>Trip Design Request</h4>
                        <span>Professional, premium, and ready for fast planning.</span>
                      </div>
                      <div className="tc-concierge-badge">Secure email submission</div>
                    </div>

                    <form className="tc-concierge-form" onSubmit={handleConciergeSubmit}>
                      <div className="tc-concierge-grid">
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-name">Full name</label>
                          <input
                            id="tc-concierge-name"
                            className="tc-concierge-control"
                            type="text"
                            required
                            value={conciergeForm.name}
                            onChange={(event) => handleConciergeFieldChange('name', event.target.value)}
                            placeholder="Traveler full name"
                          />
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-phone">Phone number</label>
                          <input
                            id="tc-concierge-phone"
                            className="tc-concierge-control"
                            type="tel"
                            required
                            value={conciergeForm.phone}
                            onChange={(event) => handleConciergeFieldChange('phone', event.target.value)}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="tc-concierge-grid">
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-email">Email address</label>
                          <input
                            id="tc-concierge-email"
                            className="tc-concierge-control"
                            type="email"
                            required
                            value={conciergeForm.email}
                            onChange={(event) => handleConciergeFieldChange('email', event.target.value)}
                            placeholder="name@example.com"
                          />
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-service">Service type</label>
                          <select
                            id="tc-concierge-service"
                            className="tc-concierge-control"
                            value={conciergeForm.serviceType}
                            onChange={(event) => handleConciergeFieldChange('serviceType', event.target.value)}
                          >
                            {conciergeServiceOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="tc-concierge-grid">
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-destination">Destination</label>
                          <input
                            id="tc-concierge-destination"
                            className="tc-concierge-control"
                            type="text"
                            required
                            value={conciergeForm.destination}
                            onChange={(event) => handleConciergeFieldChange('destination', event.target.value)}
                            placeholder="Kedarnath, Manali, Auli, Char Dham..."
                          />
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-pickup">Pickup city</label>
                          <input
                            id="tc-concierge-pickup"
                            className="tc-concierge-control"
                            type="text"
                            value={conciergeForm.pickupCity}
                            onChange={(event) => handleConciergeFieldChange('pickupCity', event.target.value)}
                            placeholder="Delhi, Haridwar, Dehradun..."
                          />
                        </div>
                      </div>

                      <div className="tc-concierge-grid tc-concierge-grid-3">
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-travel-date">Departure date</label>
                          <div className="tc-concierge-date-wrap">
                            <input
                              id="tc-concierge-travel-date"
                              className="tc-concierge-control"
                              type="date"
                              min={today}
                              required
                              value={conciergeForm.travelDate}
                              onChange={(event) => handleConciergeFieldChange('travelDate', event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-return-date">Return date</label>
                          <div className="tc-concierge-date-wrap">
                            <input
                              id="tc-concierge-return-date"
                              className="tc-concierge-control"
                              type="date"
                              min={conciergeForm.travelDate || today}
                              value={conciergeForm.returnDate}
                              onChange={(event) => handleConciergeFieldChange('returnDate', event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-travelers">Travelers</label>
                          <input
                            id="tc-concierge-travelers"
                            className="tc-concierge-control"
                            type="number"
                            min="1"
                            required
                            value={conciergeForm.travelers}
                            onChange={(event) => handleConciergeFieldChange('travelers', event.target.value)}
                            placeholder="2"
                          />
                        </div>
                      </div>

                      <div className="tc-concierge-grid tc-concierge-grid-3">
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-budget">Estimated budget</label>
                          <input
                            id="tc-concierge-budget"
                            className="tc-concierge-control"
                            type="text"
                            value={conciergeForm.budget}
                            onChange={(event) => handleConciergeFieldChange('budget', event.target.value)}
                            placeholder="INR 25,000 per person"
                          />
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-window">Departure window</label>
                          <select
                            id="tc-concierge-window"
                            className="tc-concierge-control"
                            value={conciergeForm.departureWindow}
                            onChange={(event) => handleConciergeFieldChange('departureWindow', event.target.value)}
                          >
                            {conciergeDepartureOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                        <div className="tc-concierge-field">
                          <label htmlFor="tc-concierge-contact-mode">Preferred contact</label>
                          <select
                            id="tc-concierge-contact-mode"
                            className="tc-concierge-control"
                            value={conciergeForm.contactMode}
                            onChange={(event) => handleConciergeFieldChange('contactMode', event.target.value)}
                          >
                            {conciergeContactModes.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="tc-concierge-field">
                        <label htmlFor="tc-concierge-hotel">Hotel preference</label>
                        <input
                          id="tc-concierge-hotel"
                          className="tc-concierge-control"
                          type="text"
                          value={conciergeForm.hotelPreference}
                          onChange={(event) => handleConciergeFieldChange('hotelPreference', event.target.value)}
                          placeholder="Luxury stay, family room, mountain view, near temple..."
                        />
                      </div>

                      <div className="tc-concierge-field">
                        <label htmlFor="tc-concierge-message">Trip notes and requirements</label>
                        <textarea
                          id="tc-concierge-message"
                          value={conciergeForm.message}
                          onChange={(event) => handleConciergeFieldChange('message', event.target.value)}
                          placeholder="Share sightseeing goals, kids or senior support, transport choice, meal preference, hotel category, or any custom request..."
                        />
                        <div className="tc-concierge-helper">
                          Include anything important from your website enquiry flow: destination, dates, rooms, budget, support needs, permits, flights, or custom itinerary notes.
                        </div>
                      </div>

                      {conciergeError && <div className="tc-concierge-feedback error">{conciergeError}</div>}
                      {conciergeSuccess && <div className="tc-concierge-feedback success">Booking brief sent successfully. Please check your inbox and phone for the Yatra Go follow-up.</div>}

                      <div className="tc-concierge-actions">
                        <div className="tc-concierge-note">
                          Form submission goes through the existing site email service, so requests stay fast and land directly in your configured mailbox.
                        </div>
                        <button type="submit" className="tc-concierge-submit" disabled={isSubmittingConcierge}>
                          {isSubmittingConcierge ? 'Sending Your Request...' : 'Send Booking Request To Email'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default TermsConditions;
