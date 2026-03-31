import React, { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getLocationSuggestions } from '../../data/indiaLocations';

const LocationAutocomplete = ({
    value,
    onChange,
    placeholder,
    className = '',
    panelClassName = '',
    inputClassName = '',
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const suggestions = useMemo(() => {
        if (!isFocused || !isTyping || !value.trim()) return [];
        return getLocationSuggestions(value);
    }, [isFocused, isTyping, value]);

    return (
        <div className={`relative ${className}`}>
            <div className={`flex items-center rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl transition-all focus-within:border-brand-gold/60 focus-within:bg-white/15 ${inputClassName}`}>
                <MapPin className="mr-3 text-orange-400" size={18} />
                <input
                    type="text"
                    value={value}
                    onChange={(event) => {
                        setIsTyping(true);
                        onChange(event.target.value);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => window.setTimeout(() => {
                        setIsFocused(false);
                        setIsTyping(false);
                    }, 120)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
                    autoComplete="off"
                />
            </div>

            {suggestions.length > 0 && (
                <div className={`absolute left-0 right-0 top-[calc(100%+10px)] z-50 max-h-80 overflow-y-auto rounded-2xl border border-white/15 bg-slate-950/95 shadow-2xl shadow-black/40 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ${panelClassName}`}>
                    {suggestions.map((location) => (
                        <button
                            key={location}
                            type="button"
                            onMouseDown={() => {
                                onChange(location);
                                setIsTyping(false);
                            }}
                            className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left text-sm font-semibold text-white/85 transition-colors hover:bg-white/8 hover:text-white last:border-b-0"
                        >
                            <MapPin size={14} className="text-brand-gold" />
                            {location}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationAutocomplete;
