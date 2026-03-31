import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react';

const LAST_UPDATED = 'March 1, 2025';

const SECTIONS = [
    { id: 'overview', title: '1. Overview', icon: '🔍' },
    { id: 'information-we-collect', title: '2. Information We Collect', icon: '📋' },
    { id: 'how-we-use', title: '3. How We Use Your Information', icon: '⚙️' },
    { id: 'sharing', title: '4. Sharing of Information', icon: '🤝' },
    { id: 'cookies', title: '5. Cookies & Tracking', icon: '🍪' },
    { id: 'data-security', title: '6. Data Security', icon: '🔒' },
    { id: 'data-retention', title: '7. Data Retention', icon: '📅' },
    { id: 'your-rights', title: '8. Your Rights', icon: '⚖️' },
    { id: 'third-party', title: '9. Third-Party Links', icon: '🌐' },
    { id: 'children', title: '10. Children\'s Privacy', icon: '👦' },
    { id: 'updates', title: '11. Changes to this Policy', icon: '📝' },
    { id: 'contact', title: '12. Contact Us', icon: '📞' },
];

const SectionContent = ({ id }) => {
    switch (id) {
        case 'overview':
            return (
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                    <p>Yatra Go ("we", "us", or "our") operates the website <strong>www.yatrago.com</strong> and provides travel booking and related services. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.</p>
                    <p>By accessing or using our website, mobile resources, services, or by contacting us, you consent to the collection and use of information in accordance with this policy.</p>
                    <p>We are committed to safeguarding your privacy and ensuring that your personal data is handled responsibly and in compliance with applicable laws, including the Information Technology Act, 2000 and its amendments.</p>
                </div>
            );
        case 'information-we-collect':
            return (
                <div className="text-sm text-gray-600 space-y-4">
                    <p>We collect the following types of information:</p>
                    <div>
                        <h4 className="font-bold text-brand-dark mb-2">A. Information You Provide Directly</h4>
                        <ul className="space-y-1.5">
                            {['Full name, email address, phone number, and home/billing address', 'Travel preferences, destination choices, and trip requirements', 'Payment and transaction details (processed securely via payment gateways)', 'Passport details, ID proofs, and travel documents (for international bookings)', 'Any messages, enquiries, or feedback you send to us'].map((item, i) => (
                                <li key={i} className="flex gap-2 items-start"><span className="text-brand-gold font-bold mt-0.5 shrink-0">→</span> {item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-dark mb-2">B. Automatically Collected Information</h4>
                        <ul className="space-y-1.5">
                            {['IP address, browser type, device type, and operating system', 'Pages visited, time spent on pages, and referring URLs', 'Cookies and similar tracking technologies', 'Location data (if you grant permission)'].map((item, i) => (
                                <li key={i} className="flex gap-2 items-start"><span className="text-brand-gold font-bold mt-0.5 shrink-0">→</span> {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        case 'how-we-use':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We use the information collected for the following purposes:</p>
                    <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        {[
                            { icon: '✈️', title: 'Process Bookings', desc: 'To confirm, manage, and fulfil your tour packages, hotel, cab, and ticket bookings.' },
                            { icon: '📞', title: 'Customer Support', desc: 'To respond to enquiries, WhatsApp messages, calls, and resolve any issues.' },
                            { icon: '📧', title: 'Communications', desc: 'To send booking confirmations, itineraries, invoices, and service updates.' },
                            { icon: '🎯', title: 'Personalization', desc: 'To tailor travel recommendations and package suggestions based on your preferences.' },
                            { icon: '🔧', title: 'Improve Services', desc: 'To analyze usage patterns, improve our website, and develop new features.' },
                            { icon: '🛡️', title: 'Security & Fraud Prevention', desc: 'To detect and prevent fraudulent transactions and protect your account.' },
                            { icon: '📊', title: 'Legal Compliance', desc: 'To comply with applicable laws, tax regulations, and government requirements.' },
                            { icon: '💬', title: 'Marketing', desc: 'To send promotional offers and newsletters (with your consent; opt out anytime).' },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-3 flex gap-3 border border-gray-100">
                                <span className="text-xl shrink-0">{item.icon}</span>
                                <div><p className="font-semibold text-brand-dark text-xs">{item.title}</p><p className="text-gray-500 text-xs mt-0.5">{item.desc}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'sharing':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We do <strong>not sell or rent</strong> your personal information to third parties. We may share your data only in limited circumstances:</p>
                    <ul className="space-y-3 mt-3">
                        {[
                            { title: 'Service Partners', desc: 'Hotels, airlines, cab operators, and activity providers needed to fulfil your booking.' },
                            { title: 'Payment Processors', desc: 'Secure payment gateways (Razorpay, PhonePe) under strict data protection agreements.' },
                            { title: 'Legal Obligations', desc: 'Government or law enforcement authorities when required by law or court order.' },
                            { title: 'Business Transfers', desc: 'In the event of a merger or acquisition, with prior notice to you.' },
                            { title: 'With Your Consent', desc: 'Any other sharing with your explicit consent at the time of collection.' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start list-none">
                                <span className="w-6 h-6 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                <div><span className="font-semibold text-brand-dark">{item.title}: </span><span className="text-gray-500">{item.desc}</span></div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'cookies':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We use cookies and similar technologies to enhance your experience on our website.</p>
                    <div className="overflow-x-auto mt-3">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-brand-dark text-white">
                                    <th className="text-left px-4 py-2 rounded-tl-lg">Cookie Type</th>
                                    <th className="text-left px-4 py-2">Purpose</th>
                                    <th className="text-left px-4 py-2 rounded-tr-lg">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { type: 'Essential', purpose: 'Session management, login, form data retention', duration: 'Session' },
                                    { type: 'Analytics', purpose: 'Google Analytics — page views, traffic sources, behaviour', duration: '2 years' },
                                    { type: 'Functional', purpose: 'Remembering your preferences and filter selections', duration: '30 days' },
                                    { type: 'Marketing', purpose: 'Google Ads, Facebook Pixel — retargeting and remarketing', duration: '90 days' },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2.5 font-medium text-brand-dark">{row.type}</td>
                                        <td className="px-4 py-2.5 text-gray-600">{row.purpose}</td>
                                        <td className="px-4 py-2.5 text-gray-500">{row.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-500">You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.</p>
                </div>
            );
        case 'data-security':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We implement industry-standard security measures to protect your personal information:</p>
                    <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        {[
                            { icon: '🔐', text: 'SSL/TLS encryption for all data transmitted to and from our website' },
                            { icon: '🏦', text: 'Payment data processed via PCI-DSS compliant payment gateways — we never store card numbers' },
                            { icon: '🔑', text: 'Access controls and authentication protocols for our internal systems' },
                            { icon: '💾', text: 'Regular security audits and vulnerability assessments' },
                            { icon: '👤', text: 'Staff trained on data protection and confidentiality policies' },
                            { icon: '🗂️', text: 'Data minimization — we only collect what is necessary for your booking' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-2 items-start bg-green-50 border border-green-100 rounded-xl p-3">
                                <span className="text-lg shrink-0">{item.icon}</span>
                                <span className="text-gray-600 text-xs">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-3 mt-2">
                        <strong>Note:</strong> While we take every precaution, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
                    </p>
                </div>
            );
        case 'data-retention':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                    <ul className="space-y-2 mt-3">
                        {[
                            'Booking records are retained for 7 years for tax and accounting compliance (as per Indian law)',
                            'Account information is retained as long as your account is active',
                            'Marketing preferences are retained until you opt out',
                            'Support conversations are retained for 2 years',
                            'Analytics data is anonymised and retained for up to 3 years',
                        ].map((item, i) => (
                            <li key={i} className="flex gap-2 items-start list-none"><span className="text-brand-gold font-bold mt-0.5 shrink-0">→</span> {item}</li>
                        ))}
                    </ul>
                </div>
            );
        case 'your-rights':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>You have the following rights regarding your personal information:</p>
                    <div className="space-y-2 mt-3">
                        {[
                            { right: 'Right to Access', desc: 'Request a copy of the personal data we hold about you.' },
                            { right: 'Right to Correction', desc: 'Request correction of inaccurate or incomplete data.' },
                            { right: 'Right to Erasure', desc: 'Request deletion of your data (subject to legal obligations).' },
                            { right: 'Right to Portability', desc: 'Request your data in a structured, machine-readable format.' },
                            { right: 'Right to Withdraw Consent', desc: 'Withdraw your consent for marketing communications at any time.' },
                            { right: 'Right to Object', desc: 'Object to the processing of your data for direct marketing purposes.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start bg-blue-50 border border-blue-100 rounded-xl p-3">
                                <ChevronRight size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                <div><span className="font-semibold text-brand-dark">{item.right}: </span><span className="text-gray-600">{item.desc}</span></div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:info@yatrago.com" className="text-brand-gold hover:underline font-semibold">info@yatrago.com</a>. We will respond within 30 days.</p>
                </div>
            );
        case 'third-party':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
                    <p>Third-party services we use include:</p>
                    <ul className="space-y-2 mt-2">
                        {['Google Analytics — for website traffic analysis', 'Google Maps — for location display', 'Razorpay / PhonePe — for payment processing', 'WhatsApp Business API — for customer support', 'Firebase — for authentication and database services'].map((item, i) => (
                            <li key={i} className="flex gap-2 items-start list-none"><span className="text-brand-gold font-bold mt-0.5 shrink-0">→</span> {item}</li>
                        ))}
                    </ul>
                </div>
            );
        case 'children':
            return (
                <p className="text-sm text-gray-600">Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a child has provided us personal information without parental consent, please contact us at <a href="mailto:info@yatrago.com" className="text-brand-gold hover:underline font-semibold">info@yatrago.com</a> and we will promptly delete such data.</p>
            );
        case 'updates':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>We may update this Privacy Policy from time to time. When we make changes, we will:</p>
                    <ul className="space-y-2 mt-2">
                        {['Update the "Last Updated" date at the top of this page', 'Post a notice on our website homepage for significant changes', 'Notify registered users via email for material changes'].map((item, i) => (
                            <li key={i} className="flex gap-2 items-start list-none"><span className="text-brand-gold font-bold mt-0.5 shrink-0">→</span> {item}</li>
                        ))}
                    </ul>
                    <p>Continued use of our services after any changes constitutes your acceptance of the updated policy.</p>
                </div>
            );
        case 'contact':
            return (
                <div className="text-sm text-gray-600 space-y-3">
                    <p>For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out:</p>
                    <div className="mt-4 bg-brand-dark text-white rounded-2xl p-6 space-y-3">
                        <div className="font-serif font-black text-brand-gold text-lg">Yatra Go — Data Protection</div>
                        <div className="flex items-start gap-3 text-white/80 text-sm">
                            <span className="text-xl shrink-0">🏢</span>
                            <span>Yatra Go House, Yoravar Enclave, Phase-1, Ganesh Vihar, Sitapur, Jwalapur, Haridwar, Uttarakhand — 249407, INDIA</span>
                        </div>
                        <a href="mailto:info@yatrago.com" className="flex items-center gap-3 text-brand-gold hover:text-yellow-300 transition-colors text-sm">
                            <Mail size={16} /> info@yatrago.com
                        </a>
                        <a href="tel:+918979931256" className="flex items-center gap-3 text-brand-gold hover:text-yellow-300 transition-colors text-sm">
                            <Phone size={16} /> +91 8979931256
                        </a>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

const AccordionSection = ({ section, isOpen, onToggle }) => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-amber-50 transition-colors">
            <span className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-bold text-brand-dark">{section.title}</span>
            </span>
            <ChevronDown size={18} className={`text-brand-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="px-6 pb-6 bg-white border-t border-gray-100">
                <div className="pt-4">
                    <SectionContent id={section.id} />
                </div>
            </div>
        )}
    </div>
);

const PrivacyPolicy = () => {
    const [openSection, setOpenSection] = useState('overview');

    const toggle = (id) => setOpenSection(openSection === id ? null : id);

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Privacy Policy | Yatra Go</title>
                <meta name="description" content="Read the Yatra Go Privacy Policy. Learn how we collect, use, and protect your personal data when you book tours, hotels, and travel services with us." />
            </Helmet>

            {/* ── HERO ── */}
            <section className="bg-brand-dark py-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full mb-5">
                        <Shield size={30} className="text-brand-gold" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-serif font-black text-white mb-3">Privacy <span className="text-brand-gold">Policy</span></h1>
                    <p className="text-white/60 text-lg">Your trust is our priority. We are transparent about how we handle your data.</p>
                    <div className="flex items-center justify-center gap-4 mt-5 text-sm text-white/40">
                        <span>Last Updated: <strong className="text-white/60">{LAST_UPDATED}</strong></span>
                        <span>·</span>
                        <span>Effective Immediately</span>
                    </div>
                </motion.div>
            </section>

            {/* ── TABLE OF CONTENTS ── */}
            <section className="py-8 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Table of Contents</p>
                    <div className="flex flex-wrap gap-2">
                        {SECTIONS.map(s => (
                            <button key={s.id}
                                onClick={() => { setOpenSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${openSection === s.id ? 'border-brand-gold text-brand-gold bg-amber-50' : 'border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold'}`}>
                                {s.icon} {s.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ACCORDION SECTIONS ── */}
            <section className="py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
                    {SECTIONS.map(section => (
                        <div key={section.id} id={section.id}>
                            <AccordionSection section={section} isOpen={openSection === section.id} onToggle={() => toggle(section.id)} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── COMPLIANCE BADGES ── */}
            <section className="py-10 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-5">Our Commitments</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['🇮🇳 IT Act 2000 Compliant', '🔒 SSL Secured', '🏦 PCI-DSS Payments', '🚫 No Data Selling', '✉️ Opt-out Anytime'].map((badge, i) => (
                            <span key={i} className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">{badge}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUICK LINKS ── */}
            <section className="py-10 bg-amber-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h3 className="font-serif font-black text-brand-dark text-xl mb-4">Related Legal Pages</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link to="/terms-and-conditions" className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-dark font-semibold px-5 py-2.5 rounded-xl hover:border-brand-gold hover:text-brand-gold transition-colors text-sm">
                            📜 Terms &amp; Conditions
                        </Link>
                        <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-gold hover:text-brand-dark transition-colors text-sm">
                            📞 Contact for Data Requests
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
