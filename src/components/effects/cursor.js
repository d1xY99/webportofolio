import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/use-smooth-scroll';

const canUseCursor = () =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion();

function Cursor() {
    const [enabled] = useState(canUseCursor);
    const [hovering, setHovering] = useState(false);
    const [label, setLabel] = useState('');
    const [visible, setVisible] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
    const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

    useEffect(() => {
        if (!enabled) return undefined;
        document.documentElement.classList.add('has-custom-cursor');

        const handleMove = (event) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setVisible(true);
        };
        const handleOver = (event) => {
            const target = event.target.closest('a, button, [data-cursor]');
            setHovering(Boolean(target));
            setLabel(target?.dataset.cursor || '');
        };
        const handleLeave = () => setVisible(false);

        window.addEventListener('pointermove', handleMove, { passive: true });
        document.addEventListener('pointerover', handleOver);
        document.documentElement.addEventListener('pointerleave', handleLeave);
        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
            window.removeEventListener('pointermove', handleMove);
            document.removeEventListener('pointerover', handleOver);
            document.documentElement.removeEventListener('pointerleave', handleLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const size = label ? 84 : hovering ? 56 : 34;

    return (
        <>
            <motion.div
                className='cursor-dot'
                style={{ x, y, opacity: visible && !label ? 1 : 0 }}
            />
            <motion.div
                className={`cursor-ring ${label ? 'cursor-ring--label' : ''}`}
                style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
                animate={{ width: size, height: size }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
                <AnimatePresence>
                    {label && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default Cursor;
