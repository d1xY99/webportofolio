import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { lockScroll, onAnchorClick } from '../../hooks/use-smooth-scroll';

export const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'education', label: 'Education' },
];

function useActiveSection(ids) {
    const [active, setActive] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        [...ids, 'top', 'contact'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);

    return active;
}

function Navbar({ ready }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const active = useActiveSection(navLinks.map((link) => link.id));
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setScrolled(latest > 40);
        setHidden(latest > 600 && latest > previous && !open);
    });

    useEffect(() => {
        lockScroll(open);
    }, [open]);

    const handleNav = (event) => {
        setOpen(false);
        onAnchorClick(event);
    };

    return (
        <>
            <motion.header
                className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
                initial={{ y: -120, opacity: 0 }}
                animate={ready ? { y: hidden ? -120 : 0, opacity: 1 } : undefined}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <nav className='nav__links' aria-label='Main'>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={handleNav}
                            className={active === link.id ? 'is-active' : ''}
                        >
                            {active === link.id && (
                                <motion.span
                                    layoutId='nav-pill'
                                    className='nav__pill'
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className='nav__label'>{link.label}</span>
                        </a>
                    ))}
                </nav>

                <div className='nav__actions'>
                    <a href='#contact' className='btn btn--light btn--small nav__cta' onClick={handleNav}>
                        Let's talk <FiArrowUpRight />
                    </a>

                    <button
                        type='button'
                        className={`nav__burger ${open ? 'is-open' : ''}`}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className='mobile-menu'
                        initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <nav aria-label='Mobile'>
                            {[...navLinks, { id: 'contact', label: 'Contact' }].map((link, i) => (
                                <motion.a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={handleNav}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className='mobile-menu__index'>0{i + 1}</span>
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
