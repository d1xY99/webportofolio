import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { headerData } from '../../data/headerData';
import { prefersReducedMotion } from '../../hooks/use-smooth-scroll';

function Preloader({ onDone }) {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const duration = prefersReducedMotion() ? 0 : 1500;
        const start = performance.now();
        let frame;
        let timeout;

        const tick = (now) => {
            const progress = duration ? Math.min(1, (now - start) / duration) : 1;
            setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                timeout = setTimeout(() => {
                    setVisible(false);
                    onDone();
                }, 200);
            }
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timeout);
        };
    }, [onDone]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className='preloader'
                    initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    <motion.div
                        className='preloader__name'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                    >
                        {headerData.firstName} <em className='serif'>{headerData.lastName}</em>
                    </motion.div>
                    <div className='preloader__count'>
                        {String(count).padStart(3, '0')}
                    </div>
                    <div className='preloader__bar'>
                        <span style={{ transform: `scaleX(${count / 100})` }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Preloader;
