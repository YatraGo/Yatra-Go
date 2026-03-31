import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const INTERACTIVE_SELECTOR = 'a,button,[role="button"],summary,[data-sound-click="true"]';
const HOVER_SELECTOR = '[data-sound-hover="true"],nav a,nav button,.sound-hover';

const GlobalUiSounds = () => {
    const location = useLocation();
    const audioContextRef = useRef(null);
    const unlockedRef = useRef(false);
    const lastHoverTimeRef = useRef(0);
    const lastHoverElementRef = useRef(null);
    const hasMountedRef = useRef(false);

    const getAudioContext = () => {
        if (typeof window === 'undefined') return null;
        if (audioContextRef.current) return audioContextRef.current;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;

        audioContextRef.current = new AudioContextClass();
        return audioContextRef.current;
    };

    const playTone = ({ freq, toFreq, duration = 0.06, type = 'triangle', volume = 0.02 }) => {
        if (!unlockedRef.current) return;
        const ctx = getAudioContext();
        if (!ctx || ctx.state !== 'running') return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (toFreq) osc.frequency.exponentialRampToValueAtTime(toFreq, now + duration);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
    };

    const unlockAudio = () => {
        const ctx = getAudioContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();
        unlockedRef.current = true;
    };

    const playClickSound = () => {
        playTone({ freq: 420, toFreq: 280, duration: 0.07, type: 'triangle', volume: 0.022 });
    };

    const playHoverSound = () => {
        const now = performance.now();
        if (now - lastHoverTimeRef.current < 100) return;
        lastHoverTimeRef.current = now;
        playTone({ freq: 640, toFreq: 720, duration: 0.04, type: 'sine', volume: 0.013 });
    };

    const playRouteSound = () => {
        playTone({ freq: 520, toFreq: 660, duration: 0.05, type: 'triangle', volume: 0.016 });
    };

    useEffect(() => {
        window.addEventListener('pointerdown', unlockAudio, { once: true });
        window.addEventListener('keydown', unlockAudio, { once: true });

        return () => {
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
            audioContextRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!(event.target instanceof Element)) return;
            const interactive = event.target.closest(INTERACTIVE_SELECTOR);
            if (!interactive) return;
            if (interactive.matches(':disabled') || interactive.getAttribute('aria-disabled') === 'true') return;
            playClickSound();
        };

        const handleKeyAction = (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const active = document.activeElement;
            if (!(active instanceof Element)) return;
            if (!active.closest(INTERACTIVE_SELECTOR)) return;
            playClickSound();
        };

        const handleMouseOver = (event) => {
            const canHover = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
            if (!canHover) return;
            if (!(event.target instanceof Element)) return;

            const hoverable = event.target.closest(HOVER_SELECTOR);
            if (!hoverable) return;
            if (hoverable === lastHoverElementRef.current) return;

            lastHoverElementRef.current = hoverable;
            playHoverSound();
        };

        document.addEventListener('pointerdown', handlePointerDown, true);
        document.addEventListener('keydown', handleKeyAction, true);
        document.addEventListener('mouseover', handleMouseOver, true);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown, true);
            document.removeEventListener('keydown', handleKeyAction, true);
            document.removeEventListener('mouseover', handleMouseOver, true);
        };
    }, []);

    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }
        playRouteSound();
    }, [location.pathname]);

    return null;
};

export default GlobalUiSounds;
