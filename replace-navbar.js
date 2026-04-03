const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// 1. Padding
content = content.replace("border-white/20 bg-white/80 py-4 lg:py-5", "border-white/20 bg-white/80 py-3 lg:py-5");

// 2. Logo size
content = content.replace("className=\"h-10 xl:h-12 w-auto object-contain transition-all duration-500\"", "className=\"h-8 sm:h-10 xl:h-12 w-auto object-contain transition-all duration-500\"");

// 3. Mobile menu button div sizes
content = content.replace(
`                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-dark transition-all active:scale-95 shadow-xl border border-slate-200"
                                >
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>`,
`                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white text-brand-dark transition-all active:scale-95 shadow-xl border border-slate-200"
                                >
                                    {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
                                </button>`
);

// 4. Drawer container details
content = content.replace(
`                                <div className="px-6 py-8 flex flex-col overflow-y-auto">
                                    <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8">
                                        <a href="tel:+918979931256" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-50 text-base font-black text-slate-900 border border-slate-200">
                                            <Phone size={18} className="text-brand-gold" /> +91 89799 31256
                                        </a>
                                        <div className="flex justify-center gap-6 text-slate-400">
                                            <a href="https://www.facebook.com/profile.php?id=61570195815554" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Facebook size={20} /></a>
                                            <a href="https://www.instagram.com/yatrago_official/" className="w-12 h-12 rounded-xl bg-slate-60 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Instagram size={20} /></a>
                                            <a href="https://www.youtube.com/@YatraGo-q4o" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Youtube size={20} /></a>
                                        </div>
                                    </div>`,
`                                <div className="px-5 sm:px-6 py-6 sm:py-8 flex flex-col overflow-y-auto">
                                    <div className="mb-6 sm:mb-8 flex flex-col gap-4 border-b border-slate-200/50 pb-6 sm:pb-8">
                                        <a href="tel:+918979931256" className="flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-[14px] sm:rounded-2xl bg-slate-50 text-sm sm:text-base font-black text-slate-900 border border-slate-200/80 shadow-sm">
                                            <Phone size={16} className="text-brand-gold sm:w-5 sm:h-5" /> +91 89799 31256
                                        </a>
                                        <div className="flex justify-center gap-4 sm:gap-6 text-slate-400">
                                            <a href="https://www.facebook.com/profile.php?id=61570195815554" className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-xl bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Facebook size={18} className="sm:w-5 sm:h-5" /></a>
                                            <a href="https://www.instagram.com/yatrago_official/" className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-xl bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Instagram size={18} className="sm:w-5 sm:h-5" /></a>
                                            <a href="https://www.youtube.com/@YatraGo-q4o" className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-xl bg-slate-50 flex items-center justify-center hover:text-brand-gold border border-slate-100"><Youtube size={18} className="sm:w-5 sm:h-5" /></a>
                                        </div>
                                    </div>`
);

content = content.replace(
`                                                <div
                                                    className={\`flex justify-between items-center w-full rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all
                                                \${isActive(link.path) ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-slate-500 active:bg-slate-50'}\`}
                                                    onClick={() => (link.dropdown || link.megaMenu) ? toggleDropdown(link.name) : setIsMobileMenuOpen(false)}
                                                >`,
`                                                <div
                                                    className={\`flex justify-between items-center w-full rounded-[14px] sm:rounded-2xl px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all
                                                \${isActive(link.path) ? 'bg-brand-gold text-brand-dark shadow-md sm:shadow-lg' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-50'}\`}
                                                    onClick={() => (link.dropdown || link.megaMenu) ? toggleDropdown(link.name) : setIsMobileMenuOpen(false)}
                                                >`
);

content = content.replace(
`                                                    {(link.dropdown || link.megaMenu) && (
                                                        <ChevronDown size={18} className={\`transition-transform duration-500 \${openDropdowns[link.name] ? 'rotate-180 text-brand-gold' : ''}\`} />
                                                    )}`,
`                                                    {(link.dropdown || link.megaMenu) && (
                                                        <ChevronDown size={16} className={\`sm:w-[18px] sm:h-[18px] transition-transform duration-500 \${openDropdowns[link.name] ? 'rotate-180 text-brand-gold' : ''}\`} />
                                                    )}`
);

content = content.replace(
`                                    <div className="flex flex-col gap-4 py-8 mt-4">
                                        {currentUser ? (
                                            <button
                                                onClick={() => setLogoutPopupOpen(true)}
                                                className="w-full rounded-2xl bg-rose-500/10 px-6 py-5 font-black uppercase tracking-widest text-rose-400 border border-rose-500/20 flex items-center justify-center gap-3"
                                            >
                                                <LogOut size={20} /> Logout Account
                                            </button>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4">
                                                <button onClick={() => { setIsMobileMenuOpen(false); setBookingModalOpen(true); }} className="rounded-2xl border-2 border-slate-200 py-5 text-center font-black uppercase tracking-[0.2em] text-slate-400">
                                                    Enquire
                                                </button>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="rounded-2xl bg-brand-gold py-5 text-center font-black uppercase tracking-[0.2em] text-brand-dark shadow-xl shadow-brand-gold/20"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        )}
                                    </div>`,
`                                    <div className="flex flex-col gap-3 py-6 mt-2">
                                        {currentUser ? (
                                            <button
                                                onClick={() => setLogoutPopupOpen(true)}
                                                className="w-full rounded-[14px] sm:rounded-2xl bg-rose-50 px-5 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-rose-500 border border-rose-100 flex items-center justify-center gap-2"
                                            >
                                                <LogOut size={16} className="sm:w-5 sm:h-5" /> Logout Account
                                            </button>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                <button onClick={() => { setIsMobileMenuOpen(false); setBookingModalOpen(true); }} className="rounded-[14px] sm:rounded-2xl border border-slate-200 py-3.5 sm:py-5 text-center text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
                                                    Enquire
                                                </button>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="rounded-[14px] sm:rounded-2xl bg-brand-gold py-3.5 sm:py-5 text-center text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-brand-dark shadow-xl shadow-brand-gold/20 active:scale-95 transition-all"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        )}
                                    </div>`
);

let linkItemsContent = `                                                            {link.megaMenu ? link.megaMenu.map((group) => (
                                                                <div key={group.region} className="border-b border-white/10 last:border-0 p-4">
                                                                    <div className="pl-2 text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-2">{group.region}</div>
                                                                    {group.items.map(item => (
                                                                        <Link key={item.name} to={item.path}
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                            className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold text-slate-600 active:text-brand-dark active:bg-slate-50 transition-all">
                                                                            <span>{item.name}</span>
                                                                            {item.badge && <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[8px] font-black text-brand-gold">{item.badge}</span>}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )) : link.dropdown.map(subItem => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    to={subItem.path}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="block px-8 py-4 text-xs font-bold text-slate-600 active:text-brand-dark active:bg-slate-50 transition-all border-b border-slate-100 last:border-0"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}`;

let replaceLinkItemsContent = `                                                            {link.megaMenu ? link.megaMenu.map((group) => (
                                                                <div key={group.region} className="border-b border-slate-200/50 last:border-0 p-4">
                                                                    <div className="pl-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold mb-2">{group.region}</div>
                                                                    {group.items.map(item => (
                                                                        <Link key={item.name} to={item.path}
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-brand-dark hover:bg-white transition-all">
                                                                            <span>{item.name}</span>
                                                                            {item.badge && <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[8px] font-black text-brand-gold">{item.badge}</span>}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )) : link.dropdown.map(subItem => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    to={subItem.path}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="block px-6 py-3.5 text-xs font-bold text-slate-600 hover:text-brand-dark hover:bg-white transition-all border-b border-slate-100 last:border-0"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}`;

content = content.replace(linkItemsContent, replaceLinkItemsContent);

content = content.replace('className="overflow-hidden bg-white/5 rounded-2xl mt-1"', 'className="overflow-hidden bg-slate-50/50 rounded-[14px] sm:rounded-2xl mt-1 border border-slate-100/50"');



fs.writeFileSync('src/components/Navbar.jsx', content);
console.log("Replaced");
