import { motion, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const spring = { stiffness: 220, damping: 16, mass: 0.4 };

function Magnetic({ children, strength = 0.3, className }) {
    const ref = useRef(null);
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);

    const handleMove = (event) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x, y, display: 'inline-flex' }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}

export default Magnetic;
