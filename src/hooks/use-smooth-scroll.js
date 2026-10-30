import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis = null;

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function useSmoothScroll() {
    useEffect(() => {
        if (prefersReducedMotion()) return undefined;

        const instance = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        lenis = instance;

        let frame;
        const raf = (time) => {
            instance.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            instance.destroy();
            lenis = null;
        };
    }, []);
}

export function scrollToId(id) {
    const target = id === 'top' ? 0 : document.getElementById(id);
    if (target === null) return;

    if (lenis) {
        lenis.scrollTo(target, { offset: id === 'top' ? 0 : -24 });
    } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Lets in-page anchors (href="#section") use the smooth scroller.
export function onAnchorClick(event) {
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    scrollToId(href.slice(1) || 'top');
}

export function lockScroll(locked) {
    if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
    }
    document.documentElement.style.overflow = locked ? 'hidden' : '';
}
